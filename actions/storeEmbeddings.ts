/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import index from "@/lib/pinecone";
import { generateChunks } from "./textProcessing";
import getEmbeddingsForChunks from "./getEmbedding";


export async function storeEmbeddingsInPinecone(docsID: string, docsURL: string) {

  const chunks = await generateChunks(docsURL);

  const pageContents = chunks.map((chunk: any) => chunk.pageContent);

  const embeddings = await getEmbeddingsForChunks(pageContents);

  for (let i = 0; i < embeddings.length; i++) {
    const embedding = embeddings[i];

    // Check if embedding is valid before proceeding
    if (!Array.isArray(embedding)) {
      console.error(`Embedding at index ${i} is invalid`);
      continue;
    }

    await index.namespace(docsID).upsert([

      {
        id: `chunk-${docsID}-${i}`,
        values: embedding as any,
        metadata: { chunks: `${pageContents[i]}` }
      }
    ]);
  }


}