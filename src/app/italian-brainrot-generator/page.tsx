"use client";

import { useState, useRef, useEffect, useCallback, startTransition } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { useUser } from '@/contexts/UserContext';
import AuthModal from '@/components/AuthModal';
import CreditDisplay from '@/components/CreditDisplay';

export default function ItalianBrainrotGenerator() {
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
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
        isOpen: false,
        mode: 'signin'
    });

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

    const { user, profile, deductCredits, signOut } = useUser();

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt word");
            return;
        }

        // 检查用户是否登录
        if (!user) {
            setAuthModal({ isOpen: true, mode: 'signin' });
            return;
        }

        // 检查积分是否足够
        if (!profile || profile.credits < 1) {
            setError("Insufficient credits. Please purchase more credits or upgrade your subscription.");
            return;
        }

        // 防止重复点击
        if (isGenerating) return;

        // 扣除积分
        const success = await deductCredits(1, "Italian Brainrot Generator 2.0");
        if (!success) {
            setError("Failed to deduct credits. Please try again.");
            return;
        }

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

    // 生成图片的函数 - 使用新的API路由
    // 生成图片的函数 - 先处理提示词，再生成图片
    const generateImage = async (userPrompt: string) => {
        try {
            // 第一步：处理用户输入的提示词
            console.log("第一步：处理用户提示词");
            const processResponse = await fetch("/api/brainrot/process-prompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userPrompt }),
            });

            const processData = await processResponse.json();

            if (!processResponse.ok) {
                throw new Error(processData.error || "Prompt processing failed");
            }

            if (!processData.processedPrompt) {
                throw new Error("No processed prompt returned");
            }

            console.log("提示词处理成功，处理后的提示词:", processData.processedPrompt.substring(0, 100) + "...");

            // 第二步：使用处理后的提示词生成图片
            console.log("第二步：使用处理后的提示词生成图片");
            const response = await fetch("/api/brainrot/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: processData.processedPrompt }),
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

    // 生成文本的函数 - 使用新的API路由
    const generateText = async (userPrompt: string) => {
        try {
            const response = await fetch("/api/brainrot/generate-text", {
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

    // 生成音频的函数 - 使用新的API路由
    const generateAudio = async (textContent: string) => {
        setAudioLoading(true);

        try {
            const response = await fetch("/api/brainrot/generate-audio", {
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

                        <div className="flex items-center space-x-4">
                            <div className="flex space-x-6">
                                <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
                                    Pricing
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
                                                <Link href="/italian-brainrot-video" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                    Italian Brainrot Video
                                                </Link>
                                                <Link href="/italian-brainrot-generator" className="block px-4 py-3 gradient-text-premium hover:bg-purple-50 transition-colors">
                                                    Italian Brainrot Generator 2.0
                                                </Link>
                                                <Link href="/pdf-to-brainrot" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                    PDF to Brainrot
                                                </Link>
                                                <Link href="/italian-brainrot-translator" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                    Italian Brainrot Translator
                                                </Link>
                                                <Link href="/brainrot-voice-generator" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                    Brainrot Voice Generator
                                                </Link>
                                                <Link href="/italian-brainrot-clicker" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                    Italian Brainrot Clicker
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {user ? (
                                <>
                                    <CreditDisplay />
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setShowUserDropdown(true)}
                                        onMouseLeave={() => setShowUserDropdown(false)}
                                    >
                                        <div className="flex items-center space-x-2 cursor-pointer">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                {user.email?.[0]?.toUpperCase()}
                                            </div>
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showUserDropdown && (
                                            <div className="absolute top-6 right-0 w-48 z-50">
                                                <div className="h-4 w-full"></div>
                                                <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                                                    </div>
                                                    <button onClick={signOut} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })} className="text-gray-700 hover:text-purple-600 transition-colors">
                                        Sign In
                                    </button>
                                    <button onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })} className="btn-primary">
                                        Start for Free
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="z-10 max-w-7xl w-full px-4 py-8">
                {/* 标题区域 */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-orange-600">
                        Italian Brainrot Generator
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Experience the ultimate Italian Brainrot Generator with AI-powered content creation. Generate authentic Italian Brainrot characters, surreal text, and immersive audio content in seconds.
                    </p>
                </div>

                {/* 左右布局的主要内容区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* 左侧：输入区域 */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                            <h2 className="text-2xl font-bold mb-4 text-orange-600">Create Your Italian Brainrot</h2>
                            <div className="space-y-4">
                                <textarea
                                    className="w-full border-2 border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 p-4 min-h-[120px] resize-none"
                                    placeholder="Enter your creative prompt: shark, elephant, airplane..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    disabled={isGenerating}
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !prompt.trim()}
                                >
                                    {isGenerating ? (
                                        <div className="flex items-center justify-center">
                                            <BeatLoader color="#ffffff" size={8} />
                                            <span className="ml-2">Generating Italian Brainrot...</span>
                                        </div>
                                    ) : (
                                        "Generate Italian Brainrot Content"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* 提示和说明 */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                            <h3 className="text-lg font-semibold mb-3 text-orange-700">Italian Brainrot Generator Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    Combine everyday objects with living creatures for surreal body fusion results
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    Try object-animal hybrids: "coffee cup ninja" or "tire frog walking"
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    Mix vehicles with animals: "airplane crocodile" or "shark wearing sneakers"
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2">•</span>
                                    The Body Fusion Generator creates impossible 3D characters automatically
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 右侧：结果展示区域 */}
                    <div className="space-y-6">
                        {/* 图片结果 */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-semibold mb-4 text-orange-600">Generated Image</h3>
                            <div className="flex justify-center">
                                <div
                                    className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex justify-center items-center"
                                    style={{
                                        width: "100%",
                                        height: "320px", // 固定高度 (max-h-80 = 320px)
                                        maxWidth: "600px"
                                    }}
                                >
                                    {imageLoading ? (
                                        <div className="text-center">
                                            <BeatLoader color="#ea580c" size={12} />
                                            <p className="text-orange-600 mt-3">Creating Italian Brainrot character...</p>
                                        </div>
                                    ) : imageError ? (
                                        <p className="text-red-500 text-center px-4">{imageError}</p>
                                    ) : imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="Generated Italian Brainrot Character"
                                            className="rounded-xl object-contain shadow-lg"
                                            style={{
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                                width: "auto",
                                                height: "auto"
                                            }}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <p className="text-gray-500">Your Italian Brainrot character will appear here</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 文本结果 */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-semibold mb-4 text-orange-600">Generated Text</h3>
                            <div
                                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center"
                                style={{ minHeight: "128px" }} // 固定最小高度 (h-32 = 128px)
                            >
                                {textLoading ? (
                                    <div className="text-center py-4">
                                        <BeatLoader color="#ea580c" size={10} />
                                        <p className="text-orange-600 mt-3">Writing Italian Brainrot story...</p>
                                    </div>
                                ) : textError ? (
                                    <p className="text-red-500 text-center px-4">{textError}</p>
                                ) : text ? (
                                    <div className="w-full p-4">
                                        <p className="italic text-gray-700 leading-relaxed">{text}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Your Italian Brainrot text will appear here</p>
                                )}
                            </div>
                        </div>

                        {/* 音频结果 */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-semibold mb-4 text-orange-600">Generated Audio</h3>
                            <div
                                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center"
                                style={{ minHeight: "80px" }} // 固定最小高度 (h-20 = 80px)
                            >
                                {audioLoading ? (
                                    <div className="text-center py-4">
                                        <BeatLoader color="#ea580c" size={8} />
                                        <p className="text-orange-600 mt-2">Creating Italian voice...</p>
                                    </div>
                                ) : audioError ? (
                                    <p className="text-red-500 text-center px-4">{audioError}</p>
                                ) : audioUrl ? (
                                    <div className="w-full p-4">
                                        <audio ref={audioRef} controls className="w-full">
                                            <source src={audioUrl} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                ) : text ? (
                                    <div className="text-center py-4">
                                        <BeatLoader color="#ea580c" size={8} />
                                        <p className="text-orange-600">Preparing Italian voice generation...</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Your Italian Brainrot audio will appear here</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO内容区域 - 不同的样式 */}
            <div className="w-full bg-gradient-to-b from-orange-50 to-red-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    {/* 主要介绍区域 */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-orange-700">
                            Advanced Italian Brainrot Generator Technology
                        </h2>
                        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                            Our Italian Brainrot Generator represents the cutting-edge of AI-powered content creation. This sophisticated Italian Brainrot Generator combines advanced machine learning algorithms with deep understanding of the Italian Brainrot aesthetic to deliver authentic, engaging content that captures the essence of this unique internet phenomenon.
                        </p>
                    </div>

                    {/* 功能特点网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-2xl text-white">🎨</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-orange-700">3D Character Creation</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Italian Brainrot Generator creates stunning 3D characters with the signature bulging eyes, tiny limbs, and surreal proportions that define the Italian Brainrot aesthetic. Each character generated by our Italian Brainrot Generator is unique and captures the whimsical essence of this viral art style.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-2xl text-white">📝</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-orange-700">Surreal Text Generation</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our Italian Brainrot Generator produces authentic Italian text that embodies the absurdist humor and linguistic playfulness characteristic of Italian Brainrot content. The Italian Brainrot Generator's text output maintains the perfect balance of nonsensical charm and cultural references.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-2xl text-white">🎵</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-orange-700">Italian Voice Synthesis</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Complete your Italian Brainrot Generator experience with authentic Italian voice narration. The Italian Brainrot Generator's audio feature brings your surreal text to life with natural-sounding Italian pronunciation and intonation, creating an immersive multimedia experience.
                            </p>
                        </div>
                    </div>

                    {/* 技术优势部分 */}
                    <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-orange-200 mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center text-orange-700">
                            Why Choose Our Italian Brainrot Generator?
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6 text-orange-600">Authentic Italian Brainrot Style</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Unlike generic AI generators, our Italian Brainrot Generator is specifically trained to understand and replicate the unique aesthetic principles of Italian Brainrot culture. The Italian Brainrot Generator incorporates authentic visual elements, cultural references, and stylistic nuances that make each creation genuinely representative of the Italian Brainrot phenomenon.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Every output from our Italian Brainrot Generator maintains the characteristic hyperrealistic 3D rendering style, anthropomorphic features, and vibrant color palettes that define authentic Italian Brainrot content. The Italian Brainrot Generator ensures consistency with established Italian Brainrot visual conventions while allowing for creative innovation.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-6 text-orange-600">Multi-Modal Content Creation</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Our Italian Brainrot Generator goes beyond simple image generation by providing a complete multimedia experience. The Italian Brainrot Generator seamlessly integrates visual, textual, and audio elements to create cohesive Italian Brainrot content that's perfect for social media sharing, creative projects, and entertainment purposes.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    The Italian Brainrot Generator's advanced AI technology ensures that all three output formats - image, text, and audio - are thematically connected and reinforce the overall Italian Brainrot aesthetic. This comprehensive approach sets our Italian Brainrot Generator apart from single-purpose AI tools.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ部分 */}
                    <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-orange-200">
                        <h2 className="text-3xl font-bold mb-10 text-center text-orange-700">
                            Italian Brainrot Generator - Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">What makes this Italian Brainrot Generator special?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our Italian Brainrot Generator is the first AI tool specifically designed for creating authentic Italian Brainrot content. Unlike generic AI generators, this Italian Brainrot Generator understands the unique aesthetic principles, cultural references, and stylistic elements that define the Italian Brainrot phenomenon, ensuring every creation is genuinely representative of this viral art style.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">How does the Italian Brainrot Generator create authentic content?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The Italian Brainrot Generator uses advanced AI models trained specifically on Italian Brainrot characteristics. Our Italian Brainrot Generator analyzes thousands of authentic Italian Brainrot examples to understand the distinctive visual elements, narrative patterns, and cultural context that make Italian Brainrot content instantly recognizable and engaging.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">Can I use Italian Brainrot Generator content commercially?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Content generated by our Italian Brainrot Generator is available for personal and commercial use. The Italian Brainrot Generator creates original content based on your prompts, giving you full rights to use, modify, and distribute your Italian Brainrot Generator creations across various platforms and projects.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">How fast is the Italian Brainrot Generator?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our Italian Brainrot Generator typically completes the full content creation process within 30-90 seconds. The Italian Brainrot Generator simultaneously processes image, text, and audio generation to provide you with complete Italian Brainrot content quickly and efficiently, making it perfect for rapid content creation and creative experimentation.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">What are the best prompts for the Italian Brainrot Generator?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The Italian Brainrot Generator works best with prompts that combine traditional Italian elements with surreal or unexpected concepts. Try prompts like "pizza-powered spaceship," "operatic pasta chef," or "Renaissance robot gondolier." The Italian Brainrot Generator excels at transforming these creative combinations into authentic Italian Brainrot content.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 pl-6">
                                <h2 className="text-xl font-semibold mb-3 text-orange-600">Is the Italian Brainrot Generator free to use?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Yes! Our Italian Brainrot Generator is completely free to use with no hidden fees or subscription requirements. Generate unlimited Italian Brainrot content and explore the full capabilities of our Italian Brainrot Generator without any cost barriers. Start creating unique Italian Brainrot content immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
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
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-700">Company</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/about-us" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">About Us</div>
                                    </Link>
                                    <Link href="/pricing" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Pricing</div>
                                    </Link>
                                    <div className="text-left pl-0 pr-1 py-1 relative">
                                        <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap cursor-pointer group">
                                            Contact Us
                                            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                                support@italianbrainrots.org
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/refund-policy" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Refund Policy</div>
                                    </Link>
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

            <AuthModal
                isOpen={authModal.isOpen}
                onClose={() => setAuthModal({ ...authModal, isOpen: false })}
                mode={authModal.mode}
                onModeChange={(mode) => setAuthModal({ ...authModal, mode })}
            />
        </main>
    );
}