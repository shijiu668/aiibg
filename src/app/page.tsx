"use client";

import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";

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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt word");
      return;
    }

    // 重置所有状态
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

    // 独立生成图片
    generateImage(prompt);

    // 独立生成文本
    generateText(prompt);
  };

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
    <main className="flex min-h-screen flex-col items-center italian-flag-gradient" style={{ padding: "3rem 1rem 1rem 1rem" }}>
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text">
          AI Italian Brainrot Generator
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-600">
          Enter your ideas and generate Italian-style images, text and voice content
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
            className="btn-primary mt-4 w-full sm:w-auto"
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{ marginTop: "1rem" }}
          >
            {isGenerating ? <BeatLoader color="#ffffff" size={8} /> : "Start generating"}
          </button>
        </div>

        {(imageUrl || text || audioUrl || imageLoading || textLoading || audioLoading ||
          imageError || textError || audioError || isGenerating) && (
            <div className="space-y-8 w-full" style={{ marginTop: "2rem" }}>
              <div className="result-container">
                <h2 className="text-xl font-bold mb-4 text-left">Generate results</h2>

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
                    <h3 className="text-lg font-semibold mb-2 text-left">italian brainrot text</h3>
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
              </div>
            </div>
          )}
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
          <h2 className="text-2xl font-bold mb-6 gradient-text">How Our Generator Works</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">AI-Powered Creation</h3>
            <p className="mb-3 text-gray-700">Our generator uses advanced artificial intelligence models to transform your simple prompts into complete Italian Brainrot experiences. Behind the scenes, we leverage state-of-the-art models from Replicate, including SDXL for images and Claude for text generation.</p>
            <p className="text-gray-700">When you submit a prompt, our system enhances it with carefully crafted style instructions that guide the AI to produce authentic Italian Brainrot content across multiple formats.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-left">Three-in-One Output</h3>
            <p className="mb-3 text-gray-700">What makes our generator unique is its ability to create a complete multimedia experience from a single prompt. Your input simultaneously generates:</p>
            <p className="mb-3 text-gray-700"><strong>1. A Visual Masterpiece:</strong> A high-quality 3D-rendered character in the distinctive Italian Brainrot style.</p>
            <p className="mb-3 text-gray-700"><strong>2. Quirky Italian Text:</strong> A paragraph of surreal, humorous Italian text that embodies the absurdist nature of the style.</p>
            <p className="text-gray-700"><strong>3. Audio Narration:</strong> An Italian voice recording that brings the text to life, completing the immersive experience.</p>
          </div>
        </div>

        <div className="result-container mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Creative Inspiration</h2>

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
      </div>

      <footer className="text-center text-gray-500 text-sm" style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        <p>© {new Date().getFullYear()} AI Italian Brainrot Generator. 保留所有权利。</p>
        <p style={{ marginTop: "0.5rem" }}>使用Replicate API提供支持。</p>
      </footer>
    </main>
  );
}