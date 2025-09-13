"use server"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


export async function generateChunks(docsURL: string) {
    const downloadURL = docsURL;

    if (!downloadURL) {
        throw new Error("Download URL not found");
    }

    // Step 1: Fetch the PDF from the provided URL
    const response = await fetch(downloadURL);

    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    // Step 2: Get the blob data from the response
    const data = await response.blob();

    // Step 3: Load the PDF using the PDFLoader
    const pdfLoader = new PDFLoader(data);
    const docs = await pdfLoader.load();

    // Step 4: Initialize the text splitter
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, // Adjust as needed
        chunkOverlap: 200 // Adjust as needed to maintain context between chunks
    });

    // Step 5: Split the documents into chunks
    const chunks = await splitter.splitDocuments(docs);

    // Step 6: Process chunks to ensure spaces are maintained
    const formattedChunks = chunks.map(chunk => {
        return chunk; // Ensure there are spaces between words
    });

    return formattedChunks;
}