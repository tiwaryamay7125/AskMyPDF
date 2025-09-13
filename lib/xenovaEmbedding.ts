import { pipeline } from '@xenova/transformers';

// Cache the pipeline to avoid reloading the model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embeddingPipeline: any | null = null;

export async function getEmbeddingPipeline() {
    if (!embeddingPipeline) {
        try {
            // Use a sentence transformer model for embeddings
            embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        } catch (error) {
            console.error('Error loading embedding model:', error);
            throw error;
        }
    }
    return embeddingPipeline;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    try {
        const pipeline = await getEmbeddingPipeline();
        const embeddings: number[][] = [];

        // Process texts in batches to avoid memory issues
        const batchSize = 10;

        for (let i = 0; i < texts.length; i += batchSize) {
            const batch = texts.slice(i, i + batchSize);

            try {
                const results = await pipeline(batch, {
                    pooling: 'mean',
                    normalize: true
                });

                // Handle both single and batch results
                if (Array.isArray(results)) {
                    embeddings.push(...results);
                } else {
                    // If single result, convert to array
                    embeddings.push(Array.from(results.data));
                }
            } catch (batchError) {
                console.error(`Error processing batch ${i / batchSize + 1}:`, batchError);
                // Add fallback embeddings for failed batches
                for (let j = 0; j < batch.length; j++) {
                    embeddings.push(generateFallbackEmbedding());
                }
            }
        }

        return embeddings;
    } catch (error) {
        console.error('Error generating embeddings:', error);
        // Return fallback embeddings if everything fails
        return texts.map(() => generateFallbackEmbedding());
    }
}

// Fallback embedding function
function generateFallbackEmbedding(): number[] {
    const dimension = 384; // Standard dimension for all-MiniLM-L6-v2
    const embedding = [];
    for (let i = 0; i < dimension; i++) {
        embedding.push(Math.random() - 0.5);
    }
    return embedding;
} 