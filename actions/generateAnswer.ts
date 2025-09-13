/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import index from "@/lib/pinecone";
import getEmbeddingsForChunks from "./getEmbedding";
import { generateEnhancedTemplateAnswer } from "@/lib/templateAnswerGenerator";


async function queryHuggingFace(data: any) {
    const models = [
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    ];

    for (const modelUrl of models) {
        try {
            // Create a better prompt for the model
            const enhancedContext = `Context: ${data.inputs.context}\n\nQuestion: ${data.inputs.question}\n\nAnswer:`;

            const response = await fetch(modelUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: enhancedContext,
                    parameters: {
                        max_length: 150,
                        min_length: 20,
                        do_sample: true,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                }),
            });

            // Check if response is ok before trying to parse JSON
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Hugging Face API error for ${modelUrl}: ${response.status} - ${errorText}`);
                continue; // Try next model
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error(`Error with model ${modelUrl}:`, error);
            continue; // Try next model
        }
    }

    // If all models fail, throw error
    throw new Error("All Hugging Face models failed");
}

export default async function generateAnswer(input: string, id: string) {

    const questionEmbedding = await getEmbeddingsForChunks([input]);
    console.log("Question embedding generated, length:", questionEmbedding[0]?.length);

    const results = await index.namespace(id).query({
        vector: questionEmbedding as any,
        topK: 20,
        includeMetadata: true
    });

    console.log("Vector search results:", results.matches?.length || 0, "matches found");
    console.log("Match scores:", results.matches?.map(m => m.score) || []);

    const contextChunks = results.matches.map(match => match.metadata?.chunks).filter(Boolean);
    console.log("Found context chunks:", contextChunks.length);

    // Check if we have any context
    if (contextChunks.length === 0) {
        return "I couldn't find any relevant information in the document to answer your question. Please try rephrasing your question or make sure the document contains information related to your query.";
    }

    const contextString = contextChunks.join(" ").replace(/([a-z])([A-Z])/g, '$1 $2'); // Adding spaces before capital letters for camelCase strings
    console.log("Context string length:", contextString.length);
    //console.log(contextString)
    const queryData = {
        inputs: {
            question: input,
            context: contextString,  // Use the retrieved context for the question
        },
    };

    try {
        // Step 5: Query Hugging Face's document question answering model
        const response = await queryHuggingFace(queryData);

        // Handle the response from roberta-base-squad2 model
        if (response.answer) {
            return response.answer;
        } else if (response.error) {
            throw new Error(response.error);
        } else {
            // Fallback if response format is unexpected
            return generateEnhancedTemplateAnswer(input, contextString);
        }
    } catch (error) {
        console.error("Error generating answer with Hugging Face API, using local fallback:", error);
        // Use local answer generator as fallback
        return generateEnhancedTemplateAnswer(input, contextString);
    }
}


