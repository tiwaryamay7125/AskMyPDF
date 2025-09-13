import { NextRequest, NextResponse } from 'next/server';
import { generateWordBasedEmbeddings } from '@/lib/simpleEmbedding';

export async function POST(request: NextRequest) {
    try {
        const { texts } = await request.json();

        if (!texts || !Array.isArray(texts) || texts.length === 0) {
            return NextResponse.json({
                error: 'Invalid texts input'
            }, { status: 400 });
        }

        // Generate embeddings using the simple word-based approach
        const embeddings = generateWordBasedEmbeddings(texts);

        return NextResponse.json({ embeddings });
    } catch (error) {
        console.error('Error generating embeddings:', error);
        return NextResponse.json({
            error: 'Failed to generate embeddings'
        }, { status: 500 });
    }
} 