import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 60; // 设置较长的超时时间

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: '缺少提示词' },
        { status: 400 }
      );
    }

    const enhancedPrompt = `Generate a paragraph in Italian, the reply only contains the final result: italian brainrot as style, ${prompt} as subject, about 50 words.`;
    
    console.log("准备生成文本，提示词:", enhancedPrompt.substring(0, 100) + "...");
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
      // 使用直接运行而不是流式API
      const output = await replicate.run(
        "anthropic/claude-3.5-haiku",
        {
          input: {
            prompt: enhancedPrompt,
            max_tokens: 300,
            system_prompt: "You are an AI that generates Italian text in a quirky, surreal 'Italian brainrot' style. Always respond in Italian."
          }
        }
      );
      
      console.log("文本生成API返回:", output);
      
      let resultText = '';
      if (typeof output === 'string') {
        resultText = output;
      } else if (Array.isArray(output) && output.length > 0) {
        resultText = output.join('');
      } else {
        console.log("输出格式不符合预期:", output);
        throw new Error("API返回的格式不符合预期");
      }
      
      console.log("文本生成成功，返回内容:", resultText.substring(0, 50) + "...");

      // 返回生成的文本
      return NextResponse.json({ text: resultText });
    } catch (textError: any) {
      console.error("文本生成API错误:", textError);
      
      // 尝试使用备用方式
      try {
        console.log("使用备用方式生成文本...");
        
        const fallbackOutput = await replicate.run(
          "meta/llama-3-8b-instruct:85039bcd347e9a023447537264c91c90375f901b4ece7a81f4bd8fe97acb968c",
          {
            input: {
              prompt: `Please generate a paragraph in Italian about "${prompt}". Make it in a quirky, surreal style known as "Italian brainrot". The paragraph should be about 50 words.`,
              system_prompt: ""
            }
          }
        );
        
        console.log("备用API返回:", fallbackOutput);
        
        let fallbackText = '';
        if (typeof fallbackOutput === 'string') {
          fallbackText = fallbackOutput;
        } else if (Array.isArray(fallbackOutput) && fallbackOutput.length > 0) {
          fallbackText = fallbackOutput.join('');
        } else {
          throw new Error("备用API返回的格式不符合预期");
        }
        
        return NextResponse.json({ text: fallbackText });
      } catch (fallbackError) {
        console.error("备用方式也失败:", fallbackError);
        throw textError;
      }
    }
  } catch (error: any) {
    console.error('文本生成失败:', error);
    return NextResponse.json(
      { error: `文本生成失败: ${error.message || "未知错误"}` },
      { status: 500 }
    );
  }
}