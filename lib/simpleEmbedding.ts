// Simple embedding implementation using a basic hash-based approach
// This is a fallback when xenova transformers are not available

export function generateSimpleEmbeddings(texts: string[]): number[][] {
    return texts.map(text => generateSimpleEmbedding(text));
}

function generateSimpleEmbedding(text: string): number[] {
    const dimension = 384; // Match the dimension of all-MiniLM-L6-v2
    const embedding = new Array(dimension).fill(0);

    // Simple hash-based embedding generation
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const position = i % dimension;
        embedding[position] += charCode / 1000; // Normalize
    }

    // Normalize the embedding
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
        for (let i = 0; i < dimension; i++) {
            embedding[i] /= magnitude;
        }
    }

    return embedding;
}

// Alternative: Use a more sophisticated approach with word frequency
export function generateWordBasedEmbeddings(texts: string[]): number[][] {
    return texts.map(text => generateWordBasedEmbedding(text));
}

function generateWordBasedEmbedding(text: string): number[] {
    const dimension = 384;
    const embedding = new Array(dimension).fill(0);

    // Simple word frequency approach
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq: { [key: string]: number } = {};

    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    // Convert word frequencies to embedding
    Object.entries(wordFreq).forEach(([word, freq]) => {
        const hash = simpleHash(word);
        const position = hash % dimension;
        embedding[position] += freq;
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
        for (let i = 0; i < dimension; i++) {
            embedding[i] /= magnitude;
        }
    }

    return embedding;
}

function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
} 