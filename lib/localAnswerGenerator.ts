// Simple local answer generator as fallback
export function generateLocalAnswer(question: string, context: string): string {
    if (!context || context.trim().length === 0) {
        return "I don't have enough information to answer that question. Please make sure the document has been properly uploaded and processed.";
    }

    // Simple keyword matching approach
    const questionLower = question.toLowerCase();
    const contextLower = context.toLowerCase();

    // Split context into sentences
    const sentences = contextLower.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Find sentences that contain question keywords
    const questionWords = questionLower.split(/\s+/).filter(word => word.length > 3);
    const relevantSentences: string[] = [];

    sentences.forEach(sentence => {
        const matchCount = questionWords.filter(word => sentence.includes(word)).length;
        if (matchCount > 0) {
            relevantSentences.push(sentence);
        }
    });

    // If we found relevant sentences, return them
    if (relevantSentences.length > 0) {
        const answer = relevantSentences.slice(0, 3).join('. ') + '.';
        return answer.charAt(0).toUpperCase() + answer.slice(1);
    }

    // Fallback: return first few sentences of context
    const fallbackAnswer = sentences.slice(0, 2).join('. ') + '.';
    return fallbackAnswer.charAt(0).toUpperCase() + fallbackAnswer.slice(1);
}

// Alternative: Use a more sophisticated approach with TF-IDF
export function generateTFIDFAnswer(question: string, context: string): string {
    if (!context || context.trim().length === 0) {
        return "I don't have enough information to answer that question. Please make sure the document has been properly uploaded and processed.";
    }

    // Simple TF-IDF implementation
    const questionWords = question.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 0);

    const sentenceScores: { sentence: string; score: number }[] = [];

    sentences.forEach(sentence => {
        const sentenceLower = sentence.toLowerCase();
        let score = 0;

        questionWords.forEach(word => {
            const wordCount = (sentenceLower.match(new RegExp(word, 'g')) || []).length;
            if (wordCount > 0) {
                score += wordCount;
            }
        });

        if (score > 0) {
            sentenceScores.push({ sentence, score });
        }
    });

    // Sort by score and return top sentences
    sentenceScores.sort((a, b) => b.score - a.score);

    if (sentenceScores.length > 0) {
        const answer = sentenceScores.slice(0, 2).map(item => item.sentence).join('. ') + '.';
        return answer.charAt(0).toUpperCase() + answer.slice(1);
    }

    // Fallback
    return generateLocalAnswer(question, context);
} 