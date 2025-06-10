"use client";

import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { startTransition } from "react";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const [text, setText] = useState("");
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);

  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  // 防止请求超时的安全机制
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isGenerating) {
      timeoutId = setTimeout(() => {
        if (isGenerating) {
          setIsGenerating(false);
          setError("Part of the generation process may have timed out, please check your network connection or try again");
        }
      }, 90000); // 90秒超时保护
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isGenerating]);

  // 添加防抖处理
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt word");
      return;
    }

    // 防止重复点击
    if (isGenerating) return;

    // 使用 startTransition 优化用户交互响应
    startTransition(() => {
      setError("");
      setIsGenerating(true);
      setImageUrl("");
      setImageLoading(true);
      setImageError("");
      setText("");
      setTextLoading(true);
      setTextError("");
      setAudioUrl("");
      setAudioLoading(false);
      setAudioError("");
    });

    // 延迟执行 API 调用，让状态更新先完成
    setTimeout(() => {
      generateImage(prompt);
      generateText(prompt);
    }, 0);
  }, [prompt, isGenerating]);


  // 生成图片的函数
  const generateImage = async (userPrompt: string) => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error("No image URL returned");
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setImageError(err.message || "Image generation failed");
    } finally {
      setImageLoading(false);
    }
  };

  // 生成文本的函数
  const generateText = async (userPrompt: string) => {
    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Text generation failed");
      }

      if (data.text) {
        setText(data.text);

        // 文本生成成功后，开始生成音频
        generateAudio(data.text);
      } else {
        throw new Error("No text content returned");
      }
    } catch (err: any) {
      console.error("Text generation error:", err);
      setTextError(err.message || "Text generation failed");
    } finally {
      setTextLoading(false);
      // 文本生成结束，无论成功失败，整体生成过程结束
      setIsGenerating(false);
    }
  };

  // 生成音频的函数
  const generateAudio = async (textContent: string) => {
    setAudioLoading(true);

    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Speech generation failed");
      }

      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No audio URL returned");
      }
    } catch (err: any) {
      console.error("Audio Generation Error:", err);
      setAudioError(err.message || "Speech generation failed");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center italian-flag-gradient">
      {/* 导航栏 */}
      <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              AI Italian Brainrot
            </Link>
            <div className="flex space-x-6">
              <Link href="/italian-brainrot-video" className="text-gray-700 hover:text-purple-600 transition-colors">
                Italian Brainrot Video
              </Link>
              <Link href="/italian-brainrot-generator" className="gradient-text-premium hover:scale-105 transition-transform duration-300">
                Italian Brainrot Generator 2.0
              </Link>
              <Link href="/pdf-to-brainrot" className="text-gray-700 hover:text-purple-600 transition-colors">
                PDF to Brainrot
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setShowAIToolsDropdown(true)}
                onMouseLeave={() => setShowAIToolsDropdown(false)}
              >
                <span className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer">
                  AI Brainrot Tools
                  <svg className="ml-1 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {showAIToolsDropdown && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-56 z-50">
                    <div className="h-4 w-full"></div>
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-3">
                      <Link
                        href="/italian-brainrot-translator"
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        Italian Brainrot Translator
                      </Link>
                      <Link
                        href="/brainrot-voice-generator"
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        Brainrot Voice Generator
                      </Link>
                      <Link
                        href="/italian-brainrot-clicker"
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        Italian Brainrot Clicker
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="z-10 max-w-5xl w-full items-center justify-center text-center" style={{ padding: "3rem 1rem 1rem 1rem" }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text">
          AI Italian Brainrot Generator
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-600">
          AI Italian Brainrot Generator - Create 3D characters, surreal text & voice from your prompts. Transform ideas into quirky Italian Brainrot content instantly. Free online tool.
        </p>

        <div className="mb-8">
          <textarea
            className="input-field min-h-[100px]"
            placeholder="pizza in the kitchen, bean man on the street, shark..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="btn-primary mt-4 w-full sm:w-auto transform transition-transform active:scale-95"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            style={{ marginTop: "1rem" }}
          >
            {isGenerating ? <BeatLoader color="#ffffff" size={8} /> : "Start generating"}
          </button>
        </div>

        {/* 始终显示结果容器，避免布局变化 */}
        <div className="space-y-8 w-full" style={{ marginTop: "2rem" }}>
          <div className="result-container">
            <h2 className="text-xl font-bold mb-4 text-left">AI italian brainrot generate results</h2>

            {/* 只有在有内容或正在生成时才显示内容，否则显示占位 */}
            {(imageUrl || text || audioUrl || imageLoading || textLoading || audioLoading ||
              imageError || textError || audioError || isGenerating) ? (
              <div style={{ marginTop: "1.5rem" }}>
                {/* 图片结果 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 className="text-lg font-semibold mb-2 text-left">picture</h3>
                  {imageLoading ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "16rem" }}>
                      <BeatLoader color="#5643CC" />
                    </div>
                  ) : imageError ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "10rem" }}>
                      <p className="text-red-500">{imageError}</p>
                    </div>
                  ) : imageUrl ? (
                    <div className="flex justify-center">
                      <img
                        src={imageUrl}
                        alt="Generated Image"
                        className="rounded-lg object-contain"
                        style={{ maxHeight: "24rem" }}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "16rem" }}>
                      <p className="text-gray-500">The image will appear here</p>
                    </div>
                  )}
                </div>

                {/* 文本结果 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 className="text-lg font-semibold mb-2 text-left">text</h3>
                  {textLoading ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "8rem" }}>
                      <BeatLoader color="#5643CC" />
                    </div>
                  ) : textError ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "6rem" }}>
                      <p className="text-red-500">{textError}</p>
                    </div>
                  ) : text ? (
                    <div className="bg-gray-50 rounded-lg text-left" style={{ padding: "1rem" }}>
                      <p className="italic">{text}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "8rem" }}>
                      <p className="text-gray-500">Text will appear here</p>
                    </div>
                  )}
                </div>

                {/* 音频结果 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-left">voice</h3>
                  {audioLoading ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "5rem" }}>
                      <BeatLoader color="#5643CC" />
                    </div>
                  ) : audioError ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "5rem" }}>
                      <p className="text-red-500">{audioError}</p>
                    </div>
                  ) : audioUrl ? (
                    <div className="bg-gray-50 rounded-lg" style={{ padding: "1rem" }}>
                      <audio ref={audioRef} controls className="w-full">
                        <source src={audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : text ? (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "5rem" }}>
                      <BeatLoader color="#5643CC" />
                      <p className="text-gray-500 ml-2">Prepare to generate speech...</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "5rem" }}>
                      <p className="text-gray-500">The audio will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                {/* 图片占位 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 className="text-lg font-semibold mb-2 text-left">picture</h3>
                  <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "16rem" }}>
                    <p className="text-gray-500">The image will appear here</p>
                  </div>
                </div>

                {/* 文本占位 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 className="text-lg font-semibold mb-2 text-left">text</h3>
                  <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "8rem" }}>
                    <p className="text-gray-500">Text will appear here</p>
                  </div>
                </div>

                {/* 音频占位 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-left">voice</h3>
                  <div className="flex justify-center items-center bg-gray-100 rounded-lg" style={{ height: "5rem" }}>
                    <p className="text-gray-500">The audio will appear here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 作品展示区域 */}
      <div className="w-full py-12 mt-16">
        {/* 第一行 - 向左滑动 */}
        <div className="w-full overflow-hidden mb-6">
          <div className="flex animate-scroll-left">
            {Array.from({ length: 3 }).map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((imageNum) => (
                  <div key={imageNum} className="w-64 h-64 mx-2 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`/gallery/example-${imageNum}.png`}
                      alt={`AI Generated Example ${imageNum}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://picsum.photos/192/128?random=${imageNum}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 第二行 - 向右滑动 */}
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll-right">
            {Array.from({ length: 3 }).map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {[9, 10, 11, 12, 13, 14, 15, 16].map((imageNum) => (
                  <div key={imageNum} className="w-64 h-64 mx-2 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`/gallery/example-${imageNum}.png`}
                      alt={`AI Generated Example ${imageNum}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://picsum.photos/192/128?random=${imageNum}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 网站说明区域 - 添加在功能区下方 */}
      <div className="max-w-5xl w-full mt-20 px-4">
        <div className="result-container mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">What is Italian Brainrot?</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">The Quirky Internet Phenomenon</h3>
            <p className="mb-3 text-gray-700">Italian Brainrot refers to a distinctive aesthetic and humorous style that originated on social media platforms. It features anthropomorphic characters with exaggerated features, vibrant colors, and a distinctly Italian-inspired surrealist vibe.</p>
            <p className="text-gray-700">The style is characterized by its cute yet bizarre character designs, often with bulging eyes, tiny limbs, and a strange, dream-like quality that makes them both captivating and slightly unsettling.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Cultural Impact</h3>
            <p className="mb-3 text-gray-700">What began as a niche internet meme has evolved into a recognizable aesthetic that has influenced digital art, animation, and even mainstream media. Italian Brainrot has become a cultural touchpoint for a generation of internet users who appreciate its blend of nostalgia, absurdity, and charm.</p>
            <p className="text-gray-700">The style's popularity reflects the internet's ability to create and propagate new artistic movements at unprecedented speeds, crossing cultural and linguistic boundaries.</p>
          </div>
        </div>

        <div className="result-container mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">How AI Italian Brainrot Generator Works</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">AI-Powered Creation</h3>
            <p className="mb-3 text-gray-700">Our generator uses advanced artificial intelligence models to transform your simple prompts into complete Italian Brainrot experiences. Behind the scenes, we leverage state-of-the-art AI technology for image generation and natural language processing. The Brainrot aesthetic is carefully embedded into every aspect of generation, ensuring authentic Brainrot characteristics in all outputs.</p>
            <p className="text-gray-700">When you submit a prompt, our system enhances it with carefully crafted style instructions that guide the AI to produce authentic Brainrot content across multiple formats. Each generation captures the unique Brainrot essence - from exaggerated features to surreal scenarios that define the Brainrot phenomenon.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Three-in-One Output</h3>
            <p className="mb-3 text-gray-700">What makes our generator unique is its ability to create a complete multimedia experience from a single prompt. Your input simultaneously generates three distinct Brainrot elements that work together to create an immersive Brainrot experience:</p>
            <p className="mb-3 text-gray-700"><strong>1. A Visual Masterpiece:</strong> A high-quality 3D-rendered character in the distinctive Italian Brainrot style. Every Brainrot character embodies the style's signature quirky charm and surreal aesthetic.</p>
            <p className="mb-3 text-gray-700"><strong>2. Quirky Italian Text:</strong> A paragraph of surreal, humorous Italian text that embodies the absurdist nature of the style. The Brainrot text generation captures the characteristic wordplay and nonsensical charm that defines Brainrot content.</p>
            <p className="text-gray-700"><strong>3. Audio Narration:</strong> An Italian voice recording that brings the text to life, completing the immersive experience. The audio adds another layer to your Brainrot creation, making it perfect for sharing as complete Brainrot content across social media platforms.</p>
          </div>
        </div>

        <div className="result-container mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Italian Brainrot Creative Inspiration</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Getting Started</h3>
            <p className="mb-3 text-gray-700">Not sure what to type? Try these prompts to explore the Italian Brainrot universe:</p>
            <p className="mb-3 text-gray-700">• A pizza-loving astronaut cat</p>
            <p className="mb-3 text-gray-700">• Dancing spaghetti monster</p>
            <p className="mb-3 text-gray-700">• Time-traveling gelato vendor</p>
            <p className="text-gray-700">• Venetian carnival robot</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Embracing the Absurd</h3>
            <p className="mb-3 text-gray-700">The beauty of Italian Brainrot lies in its embrace of the unexpected and illogical. The most interesting results often come from combining contrasting elements: traditional Italian culture with futuristic concepts, everyday objects with fantastical abilities, or ordinary animals with extraordinary professions.</p>
            <p className="text-gray-700">Remember that this style thrives on whimsy and surrealism — the more creative and unusual your prompt, the more delightfully bizarre your results will be!</p>
          </div>
        </div>

        <div className="result-container mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Frequently Asked Questions About Italian Brainrot Generator</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Is the Italian Brainrot AI Generator free?</h3>
            <p className="text-gray-700">Yes, our AI Italian Brainrot Generator is completely free to use. Generate unlimited Italian Brainrot images, text, and voice content without any subscription fees or hidden costs. Start creating unique Italian-style characters instantly.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">How fast is the Italian Brainrot content generation?</h3>
            <p className="text-gray-700">The AI generation process typically completes within 30-60 seconds. Our Italian Brainrot Generator simultaneously creates high-quality 3D images and surreal Italian text, followed by authentic Italian voice narration. Experience fast AI-powered content creation with professional results.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">What are the best prompts for Italian Brainrot characters?</h3>
            <p className="text-gray-700">Effective Italian Brainrot prompts combine traditional Italian elements with surreal concepts. Try "pizza-loving astronaut," "dancing spaghetti monster," or "time-traveling gelato vendor." Mix Italian culture with fantastical ideas to generate the most engaging Brainrot characters and stories.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Can I download Italian Brainrot images, text, and audio?</h3>
            <p className="text-gray-700">Yes, all generated Italian Brainrot content is downloadable. Save high-resolution 3D character images, copy the surreal Italian text for sharing, and download audio files of Italian voice narration. Your AI-generated Brainrot creations are yours to keep, share, and use freely.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">What is Italian Brainrot and why is it popular?</h3>
            <p className="text-gray-700">Italian Brainrot is a viral internet aesthetic featuring anthropomorphic 3D characters with exaggerated features and surreal Italian themes. This AI art style combines cute character design with absurdist humor, creating memorable content that resonates with internet culture. Generate your own Italian Brainrot memes and join this creative phenomenon.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">How does the AI Italian Brainrot Generator work?</h3>
            <p className="text-gray-700">Our Italian Brainrot Generator uses advanced AI models to transform text prompts into complete multimedia experiences. The system automatically applies Italian Brainrot style guidelines to create authentic 3D characters, generates contextual Italian text with characteristic humor, and produces natural Italian voice narration - all from a single prompt.</p>
          </div>
        </div>
      </div>


      {/* 页脚区域 - 白色背景包含所有内容 */}
      <footer className="w-full bg-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* 页脚导航 */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-5 gap-32">
              {/* Generator 列 */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">Generator</h4>
                <div className="flex flex-col space-y-2">
                  <Link href="/" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">AI Italian Brainrot Generator</div>
                  </Link>
                  <Link href="/italian-brainrot-generator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Italian Brainrot Generator 2.0</div>
                  </Link>
                  <Link href="/brainrot-voice-generator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Brainrot Voice Generator</div>
                  </Link>
                  <Link href="/italian-brainrot-video" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Italian Brainrot Video</div>
                  </Link>
                </div>
              </div>

              {/* PDF 列 */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">PDF</h4>
                <div className="flex flex-col space-y-2">
                  <Link href="/pdf-to-brainrot" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">PDF to Brainrot</div>
                  </Link>
                </div>
              </div>

              {/* Translator 列 */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">Translator</h4>
                <div className="flex flex-col space-y-2">
                  <Link href="/italian-brainrot-translator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Italian Brainrot Translator</div>
                  </Link>
                </div>
              </div>

              {/* Game 列 */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">Game</h4>
                <div className="flex flex-col space-y-2">
                  <Link href="/italian-brainrot-clicker" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Italian Brainrot Clicker</div>
                  </Link>
                </div>
              </div>

              {/* Support 列 */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">Support</h4>
                <div className="flex flex-col space-y-2">
                  <Link href="/about-us" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">About Us</div>
                  </Link>
                  <div className="text-left pl-0 pr-1 py-1 relative">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap cursor-pointer group">
                      Contact Us
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        We'd love to hear from you!
                      </div>
                    </div>
                  </div>
                  <Link href="/privacy-policy" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Privacy Policy</div>
                  </Link>
                  <Link href="/terms-and-conditions" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Terms and Conditions</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="w-full border-t-2 border-gray-300 mb-6"></div>

          {/* 原页脚内容 */}
          <div className="text-center text-gray-500 text-sm">
            <div className="mb-4">
              <a
                href="https://italianbrainrots.org"
                className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
              >
                italianbrainrots.org
              </a>
            </div>

            <p>© {new Date().getFullYear()} AI Italian Brainrot Generator. All rights reserved.</p>

            <div style={{ marginTop: "1rem" }} className="flex justify-center items-center">
              <span className="mr-1">Friendly Links</span>
              <a
                title="All The Best AI Tools"
                href="https://allinai.tools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                All in AI Tools
              </a>

              <span className="mx-2">•</span>
              <a
                href="https://right-ai.com/"
                title="RightAI Tools Directory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                RightAI Tools Directory
              </a>

              <span className="mx-2">•</span>
              <a
                href="https://aijustworks.com"
                title="AI Just Works"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                AI Just Works
              </a>

              <span className="mx-2">•</span>
              <a
                href="https://SeekAIs.com/"
                title="SeekAIs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                SeekAIs - AI Tools Directory
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}