import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: Request) {
    try {
        const { pdfText } = await request.json();

        if (!pdfText) {
            return NextResponse.json(
                { error: 'Missing PDF text content' },
                { status: 400 }
            );
        }

        // System prompt - 您可以在这里自定义
        const systemPrompt = "You are a content transformer that converts any input text into engaging \"brainrot\" style content. Your task is to: 1. Extract the key points from the input text 2. Rewrite them in an attention-grabbing, modern internet style that uses: - Trendy slang and internet terminology - Short, punchy sentences - Engaging hooks and dramatic language - Pop culture references when relevant - Hyperbolic expressions - Stream-of-consciousness flow **Output Requirements:** - Length: 50-150 words exactly - Style: Brainrot/internet culture style - No explanations or meta-commentary - Direct transformation only Transform the input text immediately without any preamble or explanation.";

        const requestBody = {
            "model": "gpt-4.1-nano",
            "messages": [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": pdfText
                }
            ],
            "max_tokens": 1688,
            "temperature": 0.5,
            "stream": false
        };

        const response = await fetch('https://ismaque.org/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TEXT_GENERATION_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Extract the generated text from the response
        const generatedText = data.choices?.[0]?.message?.content || '';

        if (!generatedText) {
            throw new Error('No text content returned from API');
        }

        return NextResponse.json({ text: generatedText });

    } catch (error: any) {
        console.error('Brainrot text generation failed:', error);
        return NextResponse.json(
            { error: `Text generation failed: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}