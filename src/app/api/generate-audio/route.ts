import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 60; // 设置较长的超时时间

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: '缺少文本内容' },
        { status: 400 }
      );
    }
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13", 
      { 
        input: {
          text: text,
          speed: 1,
          voice: "im_nicola"
        }
      }
    );

    return NextResponse.json({ audioUrl: output });
  } catch (error) {
    console.error('语音生成失败:', error);
    return NextResponse.json(
      { error: '语音生成失败' },
      { status: 500 }
    );
  }
}