"use client";

import { useState } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

export default function ItalianBrainrotTranslator() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState("");
    const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setError("Please enter text to translate");
            return;
        }

        setError("");
        setIsTranslating(true);
        setTranslatedText("");

        try {
            const response = await fetch("/api/translate-to-brainrot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Translation failed");
            }

            if (data.translatedText) {
                setTranslatedText(data.translatedText);
            } else {
                throw new Error("No translated text returned");
            }
        } catch (err: any) {
            console.error("Translation error:", err);
            setError(err.message || "Translation failed");
        } finally {
            setIsTranslating(false);
        }
    };

    const handleCopyText = async () => {
        if (!translatedText) return;

        try {
            await navigator.clipboard.writeText(translatedText);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
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
                            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                                Home
                            </Link>
                            <Link href="/italian-brainrot-generator" className="text-gray-700 hover:text-purple-600 transition-colors">
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

            <div className="z-10 max-w-7xl w-full items-center justify-center text-center" style={{ padding: "3rem 1rem 1rem 1rem" }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text-pink">
                    Italian Brainrot Translator
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-600">
                    Transform any text into delightful Italian Brainrot gibberish! Our AI-powered Italian Brainrot Translator converts normal language into playful, nonsensical Italian-style content that adds confetti to your conversations.
                </p>

                {/* 功能区域 - 左右布局 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
                    {/* 左侧 - 输入区域 */}
                    <div className="space-y-6">
                        <div className="result-container-pink">
                            <h2 className="text-xl font-bold mb-4 text-left gradient-text-pink">Input Text</h2>
                            <textarea
                                className="input-field-pink min-h-[200px] w-full"
                                placeholder="Enter your text here to transform it into Italian Brainrot style..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                disabled={isTranslating}
                            />
                            {error && <p className="text-red-500 mt-2 text-left">{error}</p>}
                            <button
                                className="btn-pink mt-4 w-full"
                                onClick={handleTranslate}
                                disabled={isTranslating || !inputText.trim()}
                            >
                                {isTranslating ? <BeatLoader color="#ffffff" size={8} /> : "Translate to Italian Brainrot"}
                            </button>
                        </div>
                    </div>

                    {/* 右侧 - 结果区域 */}
                    <div className="space-y-6">
                        <div className="result-container-pink">
                            <h2 className="text-xl font-bold mb-4 text-left gradient-text-pink">Italian Brainrot Translation</h2>
                            {isTranslating ? (
                                <div className="space-y-4">
                                    <div className="bg-pink-50 rounded-lg p-4 text-left min-h-[200px] flex items-center justify-center">
                                        <div className="text-center">
                                            <BeatLoader color="#ec4899" />
                                            <p className="text-gray-600 mt-2">Translating...</p>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-pink w-full opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        Copy Text
                                    </button>
                                </div>
                            ) : translatedText ? (
                                <div className="space-y-4">
                                    <div className="bg-pink-50 rounded-lg p-4 text-left min-h-[200px]">
                                        <p className="text-gray-800 italic leading-relaxed">{translatedText}</p>
                                    </div>
                                    <button
                                        className="btn-pink w-full"
                                        onClick={handleCopyText}
                                    >
                                        {copySuccess ? "Copied!" : "Copy Text"}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-pink-50 rounded-lg p-4 text-left min-h-[200px] flex items-center justify-center">
                                        <p className="text-gray-500">Your Italian Brainrot translation will appear here</p>
                                    </div>
                                    <button
                                        className="btn-pink w-full opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        Copy Text
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO区域 */}
            <div className="max-w-6xl w-full mt-16 px-4">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 mb-12 border border-pink-100">
                    <h2 className="text-3xl font-bold mb-6 text-pink-800 text-center">What is Italian Brainrot Translator?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-pink-700">Revolutionary Language Transformation</h3>
                            <p className="text-gray-700 leading-relaxed">The Italian Brainrot Translator is an innovative AI-powered tool that transforms ordinary text into delightfully chaotic Italian Brainrot style content. This unique Italian Brainrot Translator converts normal language into a playful, nonsensical jumble of words that adds excitement and humor to any conversation. Whether you're looking to spice up your social media posts or create engaging content, our Italian Brainrot Translator delivers authentic brainrot-style transformations every time.</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-pink-700">How Italian Brainrot Translator Works</h3>
                            <p className="text-gray-700 leading-relaxed">Our advanced Italian Brainrot Translator uses cutting-edge AI technology to analyze your input text and recreate it in the distinctive Italian Brainrot style. The Italian Brainrot Translator processes your content through sophisticated language models that understand the unique characteristics of brainrot content - turning simple messages into delightful gibberish that maintains the essence of your original message while adding that special brainrot flair.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                        <h3 className="text-2xl font-semibold mb-4 text-pink-700">Features of Our Italian Brainrot Translator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-pink-800 mb-2">Instant Translation</h4>
                                <p className="text-gray-600 text-sm">Transform any text into Italian Brainrot style within seconds using our fast Italian Brainrot Translator.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-pink-800 mb-2">AI-Powered Intelligence</h4>
                                <p className="text-gray-600 text-sm">Advanced AI ensures authentic Italian Brainrot translations that capture the true spirit of brainrot content.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-pink-800 mb-2">Easy Copy & Share</h4>
                                <p className="text-gray-600 text-sm">One-click copying makes it simple to share your Italian Brainrot translations across all platforms.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                        <h3 className="text-2xl font-semibold mb-4 text-pink-700">Why Choose Our Italian Brainrot Translator?</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">The Italian Brainrot Translator represents the perfect fusion of artificial intelligence and creative content generation. Unlike basic text converters, our Italian Brainrot Translator understands the nuanced art of brainrot content creation, ensuring each translation maintains the chaotic charm that makes Italian Brainrot so engaging. From social media influencers to content creators, our Italian Brainrot Translator has become the go-to tool for generating authentic brainrot-style content.</p>
                        <p className="text-gray-700 leading-relaxed">Whether you're creating content for TikTok, Instagram, or any other platform, the Italian Brainrot Translator helps you stand out with unique, attention-grabbing text that embodies the spirit of Italian Brainrot culture. Our Italian Brainrot Translator doesn't just translate - it transforms your ordinary words into extraordinary brainrot experiences that resonate with modern internet culture.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4 text-pink-700">Frequently Asked Questions About Italian Brainrot Translator</h3>

                        <div className="space-y-4">
                            <div className="border-l-4 border-pink-500 pl-4">
                                <h4 className="font-semibold text-gray-800 mb-2">How accurate is the Italian Brainrot Translator?</h4>
                                <p className="text-gray-700">Our Italian Brainrot Translator uses advanced AI algorithms to ensure high-quality transformations that capture the authentic essence of Italian Brainrot style while maintaining readability and engagement.</p>
                            </div>

                            <div className="border-l-4 border-pink-500 pl-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Is the Italian Brainrot Translator free to use?</h4>
                                <p className="text-gray-700">Yes! Our Italian Brainrot Translator is completely free to use. Simply input your text and get instant Italian Brainrot translations without any subscription fees or hidden costs.</p>
                            </div>

                            <div className="border-l-4 border-pink-500 pl-4">
                                <h4 className="font-semibold text-gray-800 mb-2">What makes Italian Brainrot Translator special?</h4>
                                <p className="text-gray-700">The Italian Brainrot Translator combines the playful nature of brainrot content with Italian cultural elements, creating unique translations that are both entertaining and culturally rich, perfect for modern social media content.</p>
                            </div>

                            <div className="border-l-4 border-pink-500 pl-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Can I use Italian Brainrot Translator for commercial purposes?</h4>
                                <p className="text-gray-700">Absolutely! Content generated by our Italian Brainrot Translator can be used for personal projects, social media posts, marketing campaigns, and other commercial applications without restrictions.</p>
                            </div>
                        </div>
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
        </main>
    );
}