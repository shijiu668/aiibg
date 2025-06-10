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

        console.log("Preparing to process user input, original prompt:", prompt);

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const systemPrompt = `You are a creative prompt engineer specialized in generating **body fusion** image prompts for SDXL-Lightning-4step model. Your task is to transform user input into surreal characters where different elements are literally fused together as body parts.

**Core Concept: BODY FUSION**
- The character's body is composed of multiple contrasting elements merged together
- One part of the body is Element A, another part is Element B
- Create absurd, surreal combinations that shouldn't exist but look believable
- Focus on seamless physical integration of incompatible elements

**Fusion Strategy Examples:**
- (Shark) → Shark head/body with human legs wearing shoes  
- (Coffee cup) → Coffee cup torso with human arms and legs
- (Airplane) → Airplane body with crocodile head and wings
- (Tire) → Tire torso with frog head and human legs
- (Wooden stick) → Head is wooden stick, body has human limbs
- (Cow) → Cow head and face + human torso sitting in what appears to be a futuristic vehicle or pod
- (Elephant) → Elephant head and trunk + cactus body with spikes + human legs wearing sandals in desert
- (Banana monkey) → Monkey head + banana-shaped body with peel texture + human-like posture in jungle
- (Tire frog) → Frog head with bulging eyes + car tire body + human legs walking on street

**Prompt Structure Template:**
"Surreal body fusion character where [PRIMARY ELEMENT] forms the [body part] and [SECONDARY ELEMENT] forms the [other body part], [specific fusion details], [facial expression], [environment setting], photorealistic 3D render, cinematic lighting, high detail textures, professional composition, absurdist art style, seamless element integration, [additional surreal details]"

**Fusion Combinations to Inspire:**
- Animal + Object: Shark body + human legs + sneakers
- Food + Animal: Coffee cup torso + human limbs + ninja mask  
- Vehicle + Animal: Airplane body + crocodile head + mechanical wings
- Plant + Human: Cactus body + elephant head + sandals
- Tool + Animal: Wooden stick head + human body + traditional clothing

**Output Format:**
Provide only the final image generation prompt in English, do not add any descriptive content`;

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
                            content: systemPrompt
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 1688,
                    temperature: 0.5,
                    stream: false
                })
            });

            const output = await response.json();

            console.log("Prompt processing API returned:", output);

            let resultText = '';
            if (output.choices && output.choices[0] && output.choices[0].message) {
                resultText = output.choices[0].message.content;
            } else {
                console.log("Output format unexpected:", output);
                throw new Error("API returned unexpected format");
            }

            console.log("Prompt processing successful, returned content:", resultText.substring(0, 100) + "...");

            return NextResponse.json({ processedPrompt: resultText });
        } catch (textError: any) {
            console.error("Prompt processing API error:", textError);

            try {
                console.log("Using fallback method for prompt processing...");

                const fallbackOutput = await replicate.run(
                    "meta/llama-3-8b-instruct:85039bcd347e9a023447537264c91c90375f901b4ece7a81f4bd8fe97acb968c",
                    {
                        input: {
                            prompt: `Transform this concept into a surreal body fusion character prompt: "${prompt}". Create a detailed image generation prompt where different elements are literally fused together as body parts. Focus on seamless physical integration of incompatible elements. Provide only the final image generation prompt.`,
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

                return NextResponse.json({ processedPrompt: fallbackText });
            } catch (fallbackError) {
                console.error("Fallback method also failed:", fallbackError);
                throw textError;
            }
        }
    } catch (error: any) {
        console.error('Prompt processing failed:', error);
        return NextResponse.json(
            { error: `Prompt processing failed: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}