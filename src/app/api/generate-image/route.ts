import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: '缺少提示词' },
        { status: 400 }
      );
    }

    const enhancedPrompt = `${prompt}, anthropomorphic, 3D render, hyperrealism, character design with bulging eyes, standing pose, without any expression, vibrant colors, tiny detailed arms and legs with round fingers, italian brainrot style, PIXAR style, soft shadows, studio lighting quality, subsurface scattering, ray tracing, 8k render, octane render, Blender 3D, Dreamworks animation style, perfect composition, professionally animated, trending on Artstation.`;
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      {
        input: {
          seed: Math.floor(Math.random() * 4294967296),
          prompt: enhancedPrompt,
          width: 1024,
          height: 1024,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4,
          disable_safety_checker: true
        }
      }
    ) as string[];

    return NextResponse.json({ imageUrl: output[0] });
  } catch (error) {
    console.error('图片生成失败:', error);
    return NextResponse.json(
      { error: '图片生成失败' },
      { status: 500 }
    );
  }
}