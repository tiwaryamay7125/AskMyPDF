'use client';

import { useEffect } from 'react';

interface EmbeddingGeneratorProps {
    texts: string[];
    onEmbeddingsGenerated: (embeddings: number[][]) => void;
    onError: (error: string) => void;
}

export default function EmbeddingGenerator({ texts, onEmbeddingsGenerated, onError }: EmbeddingGeneratorProps) {
    useEffect(() => {
        async function generateEmbeddings() {
            if (typeof window === 'undefined' || texts.length === 0) {
                return;
            }

            try {
                // Dynamic import to avoid SSR issues
                const { pipeline } = await import('@xenova/transformers');

                const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
                const embeddings: number[][] = [];

                // Process texts in batches
                const batchSize = 5;

                for (let i = 0; i < texts.length; i += batchSize) {
                    const batch = texts.slice(i, i + batchSize);

                    try {
                        const results = await embeddingPipeline(batch, {
                            pooling: 'mean',
                            normalize: true
                        });
                        if (Array.isArray(results)) {
                            embeddings.push(...(results as number[][]));
                        } else {
                            embeddings.push(...Array.from(results as number[][]));
                        }
                    } catch (batchError) {
                        console.error(`Error processing batch ${i / batchSize + 1}:`, batchError);
                        // Add fallback embeddings for failed batches
                        for (let j = 0; j < batch.length; j++) {
                            embeddings.push(generateFallbackEmbedding());
                        }
                    }
                }

                onEmbeddingsGenerated(embeddings);
            } catch (error) {
                console.error('Error generating embeddings:', error);
                onError('Failed to generate embeddings');
            }
        }

        generateEmbeddings();
    }, [texts, onEmbeddingsGenerated, onError]);

    // This component doesn't render anything visible
    return null;
}

// Fallback embedding function
function generateFallbackEmbedding(): number[] {
    const dimension = 384;
    const embedding = [];
    for (let i = 0; i < dimension; i++) {
        embedding.push(Math.random() - 0.5);
    }
    return embedding;
} 