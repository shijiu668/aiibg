import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { text, voice } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Missing text content' },
        { status: 400 }
      );
    }
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || 'r8_Aw8ZVhfYkGUGA8g3MV6Q8eOyPe32gNp0Jd0ah',
    });

    const input = {
      text: text,
      voice: voice || "am_onyx", // 默认为男声
      speed: 1, // 默认语速
    };

    const output = await replicate.run(
      "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13", 
      { input }
    );

    if (!output) {
      throw new Error('No audio output received');
    }

    return NextResponse.json({ audioUrl: output });
  } catch (error: any) {
    console.error('Brainrot audio generation failed:', error);
    return NextResponse.json(
      { error: `Audio generation failed: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}