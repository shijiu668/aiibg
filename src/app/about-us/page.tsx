"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutUs() {
    const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);

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

            {/* 主要内容 */}
            <div className="z-10 max-w-6xl w-full" style={{ padding: "3rem 1rem 1rem 1rem" }}>
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
                        About AI Italian Brainrot Generator
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl text-gray-600 leading-relaxed">
                            A cutting-edge creative platform that transforms the way people create and interact with Italian Brainrot content through the power of artificial intelligence.
                        </p>
                    </div>
                </div>

                {/* Mission Section with Large Card */}
                <div className="mb-20">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text mb-4">Our Mission</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    We democratize AI-powered content creation, making it accessible to everyone who wants to explore the whimsical world of Italian Brainrot aesthetics.
                                </p>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    By combining advanced artificial intelligence with the distinctive Italian Brainrot style, we empower users to generate unique 3D characters, surreal text, and engaging voice content.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
                                    <div className="text-6xl mb-4">🎨</div>
                                    <div className="text-lg font-semibold text-gray-800">Creative Freedom</div>
                                    <div className="text-gray-600">No Boundaries</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold gradient-text mb-4">What We Offer</h2>
                        <p className="text-gray-600 text-lg">Powerful tools to unleash your creativity</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">🤖</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">AI-Powered Generation</h3>
                            </div>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Advanced AI models create authentic Italian Brainrot content including 3D characters, text, and voice narration.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">🛠️</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Multiple Tools</h3>
                            </div>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Comprehensive suite of AI-powered creative instruments from PDF conversion to voice generation.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">🆓</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Free Access</h3>
                            </div>
                            <p className="text-gray-600 text-center leading-relaxed">
                                All tools are completely free to use. Creativity should be accessible to everyone.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">👥</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Community Focus</h3>
                            </div>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Building a community that appreciates Italian culture and internet aesthetics.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technology Section */}
                <div className="mb-20">
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-white">Our Technology</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl mb-4">🧠</div>
                                <h3 className="text-xl font-semibold mb-3">AI Models</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    State-of-the-art artificial intelligence for image generation, natural language processing, and voice synthesis.
                                </p>
                            </div>
                            <div>
                                <div className="text-4xl mb-4">🎭</div>
                                <h3 className="text-xl font-semibold mb-3">Authentic Style</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Every generation maintains authentic Brainrot aesthetic with exaggerated features and vibrant colors.
                                </p>
                            </div>
                            <div>
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-semibold mb-3">Continuous Improvement</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Algorithms continuously improved to capture the whimsical essence of Italian Brainrot content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mb-16">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
                        <h2 className="text-3xl font-bold mb-6">Join Our Creative Journey</h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                            Whether you're a content creator, social media enthusiast, or someone who appreciates quirky Italian Brainrot aesthetics, our platform welcomes you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/" className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                Start Creating Now
                            </a>
                            <a href="/italian-brainrot-generator" className="inline-block border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-purple-600 transition-colors duration-300">
                                Explore Tools
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 页脚区域 - 白色背景包含所有内容 */}
            <div className="w-full bg-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4">
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
            </div>
        </main>
    );
}