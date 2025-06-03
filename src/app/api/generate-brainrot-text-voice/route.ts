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

    // System prompt - you can modify this as needed
    const systemPrompt = `You are a content transformer that converts any input text into engaging \"brainrot\" style content. Your task is to: 1. Extract the key points from the input text 2. Rewrite them in an attention-grabbing, modern internet style that uses: - Trendy slang and internet terminology - Short, punchy sentences - Engaging hooks and dramatic language - Pop culture references when relevant - Hyperbolic expressions - Stream-of-consciousness flow **Output Requirements:** - Length: 50-150 words exactly - Style: Brainrot/internet culture style - No explanations or meta-commentary - Direct transformation only Transform the input text immediately without any preamble or explanation.`;

    const response = await fetch('https://ismaque.org/v1/chat/completions', {
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
            content: text
          }
        ],
        max_tokens: 1688,
        temperature: 0.5,
        stream: false
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Text generation API error:', data);
      return NextResponse.json(
        { error: data.error || 'Text generation failed' },
        { status: response.status }
      );
    }

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const generatedText = data.choices[0].message.content;
      return NextResponse.json({ text: generatedText });
    } else {
      console.error('Unexpected API response format:', data);
      return NextResponse.json(
        { error: 'Unexpected response format from text generation API' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Brainrot text generation error:', error);
    return NextResponse.json(
      { error: `Text generation failed: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}