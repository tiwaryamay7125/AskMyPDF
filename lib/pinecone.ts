import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.NEXT_PUBLIC_PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not set");
}

const pineconeClient = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
});

const index = pineconeClient.index('pdftalk');

export default index
