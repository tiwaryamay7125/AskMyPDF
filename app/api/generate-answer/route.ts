import { NextRequest, NextResponse } from 'next/server';
import { generateTFIDFAnswer } from '@/lib/localAnswerGenerator';

export async function POST(request: NextRequest) {
    try {
        const { question, context } = await request.json();

        if (!question || !context) {
            return NextResponse.json({
                error: 'Question and context are required'
            }, { status: 400 });
        }

        // Generate answer using local TF-IDF approach
        const answer = generateTFIDFAnswer(question, context);

        return NextResponse.json({
            answer,
            method: 'local-tfidf',
            model: 'none'
        });
    } catch (error) {
        console.error('Error generating answer:', error);
        return NextResponse.json({
            error: 'Failed to generate answer'
        }, { status: 500 });
    }
} 