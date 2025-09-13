import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                success: false,
                message: 'Hugging Face API key is not configured',
                hasApiKey: false
            });
        }

        // Test the API with a simple request
        const response = await fetch(
            "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: {
                        question: "What is 2+2?",
                        context: "Basic arithmetic: 2+2 equals 4."
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({
                success: false,
                message: `API test failed: ${response.status} - ${errorText}`,
                hasApiKey: true,
                status: response.status
            });
        }

        const result = await response.json();

        return NextResponse.json({
            success: true,
            message: 'Hugging Face API is working correctly',
            hasApiKey: true,
            testResult: result
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
            hasApiKey: !!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
        }, { status: 500 });
    }
} 