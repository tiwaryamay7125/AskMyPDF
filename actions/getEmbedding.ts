/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function getEmbeddingsForChunks(chunks: any) {
    try {
        // Validate input chunks
        if (!chunks || !Array.isArray(chunks) || chunks.length === 0) {
            throw new Error("Invalid chunks input: must be a non-empty array");
        }

        // Filter out empty or invalid chunks
        const validChunks = chunks.filter((chunk: any) =>
            chunk && typeof chunk === 'string' && chunk.trim().length > 0
        );

        if (validChunks.length === 0) {
            throw new Error("No valid text chunks found");
        }

        // Call the API route to generate embeddings
        const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/generate-embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texts: validChunks }),
        });

        if (!response.ok) {
            throw new Error(`Failed to generate embeddings: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.embeddings;
    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw error;
    }
}