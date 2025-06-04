import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'Missing text content' },
                { status: 400 }
            );
        }

        const systemPrompt = "You are an Italian Brainrot translator. Your task is to transform any user input into Italian Brainrot style - a playful, nonsensical jumble of Italian words that turns normal language into delightful gibberish filled with the spirited energy of Italian Brainrot.\nRules:\n- Transform user input directly into Italian Brainrot style without any explanations or additional commentary\n- Mix Italian words, expressions, and sounds in a chaotic but entertaining way\n- Include typical Italian exclamations, food references, and cultural elements\n- Make it sound like confetti sprinkled on conversations\n- Respond ONLY with the transformed Italian Brainrot text - no explanations, no meta-commentary\n- Stay true to the playful, nonsensical spirit while maintaining an Italian flavor\nTransform everything into this delightful Italian linguistic chaos! The output length remains consistent with the user input length";

        const requestBody = {
            "model": "gpt-4.1-nano",
            "messages": [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            "max_tokens": 1688,
            "temperature": 0.5,
            "stream": false
        };

        const response = await fetch('https://api.apicore.ai/v1/chat/completions', {
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

        const translatedText = data.choices?.[0]?.message?.content || '';

        if (!translatedText) {
            throw new Error('No translated text content returned from API');
        }

        return NextResponse.json({ translatedText });

    } catch (error: any) {
        console.error('Translation failed:', error);
        return NextResponse.json(
            { error: `Translation failed: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}