import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 60;

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Missing prompt' },
                { status: 400 }
            );
        }

        const enhancedPrompt = `Generate a paragraph in Italian, the reply only contains the final result: italian brainrot as style, ${prompt} as subject, about 50 words.`;

        console.log("Preparing to generate text, prompt:", enhancedPrompt.substring(0, 100) + "...");

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        try {
            const response = await fetch('https://api.apicore.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-JH380KfiI12qwZQFfVaFgy8KsBM0nUbBASgZwJ4uA21QvTab'
                },
                body: JSON.stringify({
                    model: "gpt-4.1-nano",
                    messages: [
                        {
                            role: "system",
                            content: "You are an AI that generates Italian text in a quirky, surreal 'Italian brainrot' style. Always respond in Italian."
                        },
                        {
                            role: "user",
                            content: enhancedPrompt
                        }
                    ],
                    max_tokens: 1688,
                    temperature: 0.5,
                    stream: false
                })
            });

            const output = await response.json();

            console.log("Text generation API returned:", output);

            let resultText = '';
            if (output.choices && output.choices[0] && output.choices[0].message) {
                resultText = output.choices[0].message.content;
            } else {
                console.log("Output format unexpected:", output);
                throw new Error("API returned unexpected format");
            }

            console.log("Text generation successful, returned content:", resultText.substring(0, 50) + "...");

            return NextResponse.json({ text: resultText });
        } catch (textError: any) {
            console.error("Text generation API error:", textError);

            try {
                console.log("Using fallback method for text generation...");

                const fallbackOutput = await replicate.run(
                    "meta/llama-3-8b-instruct:85039bcd347e9a023447537264c91c90375f901b4ece7a81f4bd8fe97acb968c",
                    {
                        input: {
                            prompt: `Please generate a paragraph in Italian tongue twister about "${prompt}". Make it in a quirky, surreal style known as "Italian brainrot". The paragraph should be about 20 words.`,
                            system_prompt: ""
                        }
                    }
                );

                console.log("Fallback API returned:", fallbackOutput);

                let fallbackText = '';
                if (typeof fallbackOutput === 'string') {
                    fallbackText = fallbackOutput;
                } else if (Array.isArray(fallbackOutput) && fallbackOutput.length > 0) {
                    fallbackText = fallbackOutput.join('');
                } else {
                    throw new Error("Fallback API returned unexpected format");
                }

                return NextResponse.json({ text: fallbackText });
            } catch (fallbackError) {
                console.error("Fallback method also failed:", fallbackError);
                throw textError;
            }
        }
    } catch (error: any) {
        console.error('Text generation failed:', error);
        return NextResponse.json(
            { error: `Text generation failed: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}