// Template-based answer generator for better structured responses

export function generateTemplateAnswer(question: string, context: string): string {
    if (!context || context.trim().length === 0) {
        return "I don't have enough information to answer that question. Please make sure the document has been properly uploaded and processed.";
    }

    const keyTerms = extractKeyTerms(question);
    const sentences = splitIntoSentences(context);

    if (sentences.length === 0) {
        return "I couldn't extract any meaningful information from the document to answer your question.";
    }

    // Find the most relevant sentence
    const mostRelevantSentence = findMostRelevantSentence(sentences, keyTerms);

    // Apply template based on question type
    const answer = applyAnswerTemplate(question, mostRelevantSentence);

    return answer;
}

function extractKeyTerms(question: string): string[] {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
        'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'how', 'why', 'when', 'where', 'who'
    ]);

    const words = question.toLowerCase().split(/\s+/);
    return words.filter(word => word.length > 2 && !stopWords.has(word));
}

function splitIntoSentences(text: string): string[] {
    return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
}

function findMostRelevantSentence(sentences: string[], keyTerms: string[]): string {
    let bestSentence = sentences[0];
    let bestScore = 0;

    sentences.forEach(sentence => {
        const sentenceLower = sentence.toLowerCase();
        let score = 0;

        keyTerms.forEach(term => {
            const termCount = (sentenceLower.match(new RegExp(term, 'g')) || []).length;
            score += termCount * 3;
        });

        if (score > bestScore) {
            bestScore = score;
            bestSentence = sentence;
        }
    });

    return bestSentence;
}

function applyAnswerTemplate(question: string, relevantSentence: string): string {
    const questionLower = question.toLowerCase();

    // Definition questions
    if (questionLower.includes('what is') || questionLower.includes('what are') || questionLower.includes('define')) {
        return `Based on the document, ${relevantSentence.trim()}`;
    }

    // How questions
    if (questionLower.includes('how')) {
        return `According to the document, ${relevantSentence.trim()}`;
    }

    // Why questions
    if (questionLower.includes('why')) {
        return `The document indicates that ${relevantSentence.trim()}`;
    }

    // When questions
    if (questionLower.includes('when')) {
        return `The document states that ${relevantSentence.trim()}`;
    }

    // Where questions
    if (questionLower.includes('where')) {
        return `According to the document, ${relevantSentence.trim()}`;
    }

    // Who questions
    if (questionLower.includes('who')) {
        return `The document mentions that ${relevantSentence.trim()}`;
    }

    // Default template
    return `Based on the available information: ${relevantSentence.trim()}`;
}

// Enhanced version that combines multiple relevant sentences
export function generateEnhancedTemplateAnswer(question: string, context: string): string {
    if (!context || context.trim().length === 0) {
        return "I don't have enough information to answer that question. Please make sure the document has been properly uploaded and processed.";
    }

    const keyTerms = extractKeyTerms(question);
    const sentences = splitIntoSentences(context);

    if (sentences.length === 0) {
        return "I couldn't extract any meaningful information from the document to answer your question.";
    }

    // Score all sentences
    const scoredSentences = sentences.map(sentence => {
        const sentenceLower = sentence.toLowerCase();
        let score = 0;

        keyTerms.forEach(term => {
            const termCount = (sentenceLower.match(new RegExp(term, 'g')) || []).length;
            score += termCount * 3;
        });

        return { sentence, score };
    });

    // Get top 2-3 relevant sentences
    const topSentences = scoredSentences
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(s => s.sentence);

    if (topSentences.length === 0) {
        return "I couldn't find specific information related to your question in the document.";
    }

    // Apply template
    const questionLower = question.toLowerCase();

    if (questionLower.includes('what is') || questionLower.includes('what are') || questionLower.includes('define')) {
        return `Based on the document: ${topSentences.join(' ')}`;
    }

    if (questionLower.includes('how')) {
        return `According to the document: ${topSentences.join(' ')}`;
    }

    return `Based on the available information: ${topSentences.join(' ')}`;
} 