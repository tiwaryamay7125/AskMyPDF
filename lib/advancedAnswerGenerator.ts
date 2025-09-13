// Advanced answer generator with better NLP techniques
interface SentenceScore {
    sentence: string;
    score: number;
    relevance: number;
    position: number;
}

interface QuestionAnalysis {
    type: 'what' | 'how' | 'why' | 'when' | 'where' | 'who' | 'general';
    isDefinition: boolean;
    isProcess: boolean;
    isComparison: boolean;
}

export function generateAdvancedAnswer(question: string, context: string): string {
    if (!context || context.trim().length === 0) {
        return "I don't have enough information to answer that question. Please make sure the document has been properly uploaded and processed.";
    }

    // Clean and normalize the context
    const cleanContext = context.replace(/\s+/g, ' ').trim();
    const sentences = splitIntoSentences(cleanContext);

    if (sentences.length === 0) {
        return "I couldn't extract any meaningful information from the document to answer your question.";
    }

    // Analyze question type and extract key terms
    const questionAnalysis = analyzeQuestion(question);
    const keyTerms = extractKeyTerms(question);

    // Score sentences based on multiple factors
    const scoredSentences = scoreSentences(sentences, questionAnalysis, keyTerms);

    // Select the best sentences for the answer
    const selectedSentences = selectBestSentences(scoredSentences, questionAnalysis);

    // Generate a coherent answer
    const answer = generateCoherentAnswer(selectedSentences, question, questionAnalysis);

    return answer;
}

function splitIntoSentences(text: string): string[] {
    // More sophisticated sentence splitting
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
    return sentences.map(s => s.trim());
}

function analyzeQuestion(question: string): QuestionAnalysis {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('what is') || lowerQuestion.includes('what are') || lowerQuestion.includes('define')) {
        return { type: 'what', isDefinition: true, isProcess: false, isComparison: false };
    }
    if (lowerQuestion.includes('how') || lowerQuestion.includes('process') || lowerQuestion.includes('steps')) {
        return { type: 'how', isDefinition: false, isProcess: true, isComparison: false };
    }
    if (lowerQuestion.includes('why')) {
        return { type: 'why', isDefinition: false, isProcess: false, isComparison: false };
    }
    if (lowerQuestion.includes('when')) {
        return { type: 'when', isDefinition: false, isProcess: false, isComparison: false };
    }
    if (lowerQuestion.includes('where')) {
        return { type: 'where', isDefinition: false, isProcess: false, isComparison: false };
    }
    if (lowerQuestion.includes('who')) {
        return { type: 'who', isDefinition: false, isProcess: false, isComparison: false };
    }
    if (lowerQuestion.includes('compare') || lowerQuestion.includes('difference') || lowerQuestion.includes('versus')) {
        return { type: 'general', isDefinition: false, isProcess: false, isComparison: true };
    }

    return { type: 'general', isDefinition: false, isProcess: false, isComparison: false };
}

function extractKeyTerms(question: string): string[] {
    // Remove common words and extract meaningful terms
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
        'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'how', 'why', 'when', 'where', 'who'
    ]);

    const words = question.toLowerCase().split(/\s+/);
    return words.filter(word => word.length > 2 && !stopWords.has(word));
}

function scoreSentences(sentences: string[], questionAnalysis: QuestionAnalysis, keyTerms: string[]): SentenceScore[] {
    return sentences.map((sentence, index) => {
        const sentenceLower = sentence.toLowerCase();
        let score = 0;
        let relevance = 0;

        // Term frequency scoring
        keyTerms.forEach(term => {
            const termCount = (sentenceLower.match(new RegExp(term, 'g')) || []).length;
            score += termCount * 2;
            if (termCount > 0) relevance += 1;
        });

        // Question type specific scoring
        if (questionAnalysis.isDefinition) {
            if (sentenceLower.includes('is') || sentenceLower.includes('are') || sentenceLower.includes('refers to')) {
                score += 3;
            }
            if (sentenceLower.includes('definition') || sentenceLower.includes('means') || sentenceLower.includes('consists of')) {
                score += 5;
            }
        }

        if (questionAnalysis.isProcess) {
            if (sentenceLower.includes('step') || sentenceLower.includes('process') || sentenceLower.includes('procedure')) {
                score += 3;
            }
            if (sentenceLower.includes('first') || sentenceLower.includes('then') || sentenceLower.includes('finally')) {
                score += 2;
            }
        }

        // Position scoring (earlier sentences get higher scores for definitions)
        const positionScore = questionAnalysis.isDefinition ?
            Math.max(0, 10 - index) : // Prefer earlier sentences for definitions
            Math.max(0, 5 - Math.abs(index - sentences.length / 2)); // Prefer middle sentences for processes

        score += positionScore;

        // Length scoring (prefer medium-length sentences)
        const lengthScore = Math.max(0, 10 - Math.abs(sentence.length - 100));
        score += lengthScore;

        return {
            sentence,
            score,
            relevance: relevance / keyTerms.length,
            position: index
        };
    });
}

function selectBestSentences(scoredSentences: SentenceScore[], questionAnalysis: QuestionAnalysis): string[] {
    // Sort by score and relevance
    const sorted = scoredSentences
        .filter(s => s.score > 0)
        .sort((a, b) => {
            // Primary sort by score
            if (b.score !== a.score) return b.score - a.score;
            // Secondary sort by relevance
            return b.relevance - a.relevance;
        });

    // Select sentences based on question type
    let selectedCount = questionAnalysis.isDefinition ? 2 : 3;
    if (questionAnalysis.isProcess) selectedCount = 4;

    return sorted.slice(0, selectedCount).map(s => s.sentence);
}

function generateCoherentAnswer(sentences: string[], question: string, questionAnalysis: QuestionAnalysis): string {
    if (sentences.length === 0) {
        return "Based on the available information, I cannot provide a specific answer to your question.";
    }

    // Clean up sentences
    const cleanSentences = sentences.map(s => s.trim().replace(/^[^a-zA-Z]*/, '').replace(/[^a-zA-Z]*$/, ''));

    // Generate answer based on question type
    if (questionAnalysis.isDefinition) {
        return cleanSentences[0] + (cleanSentences[1] ? ' ' + cleanSentences[1] : '');
    }

    if (questionAnalysis.isProcess) {
        return cleanSentences.join(' ');
    }

    // General answer
    return cleanSentences.join(' ');
}

// Enhanced TF-IDF with better weighting
export function generateEnhancedTFIDFAnswer(question: string, context: string): string {
    return generateAdvancedAnswer(question, context);
} 