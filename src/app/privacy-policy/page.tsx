"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            <div className="z-10 max-w-4xl w-full items-center justify-center text-center" style={{ padding: "3rem 1rem 1rem 1rem" }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 gradient-text">
                    Privacy Policy
                </h1>

                <div className="space-y-8 w-full text-left">
                    <div className="result-container">
                        <p className="text-gray-600 mb-6 text-center">
                            <strong>Effective Date:</strong> June 5, 2025<br />
                            <strong>Last Updated:</strong> June 5, 2025
                        </p>

                        <h2 className="text-2xl font-bold mb-4 gradient-text">Introduction</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            AI Italian Brainrot Generator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website italianbrainrots.org and use our AI-powered content generation services.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Information We Collect</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Information You Provide</h3>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Text prompts and content you submit for AI generation</li>
                            <li>PDF files you upload for content transformation</li>
                            <li>Any feedback or communications you send to us</li>
                        </ul>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Automatically Collected Information</h3>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Usage data and analytics through Google Analytics and Microsoft Clarity</li>
                            <li>Browser type, device information, and IP address</li>
                            <li>Pages visited, time spent on site, and interaction patterns</li>
                            <li>Technical information for service optimization</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">How We Use Your Information</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>To provide and operate our AI content generation services</li>
                            <li>To process your content requests and generate Italian Brainrot content</li>
                            <li>To improve our website functionality and user experience</li>
                            <li>To analyze usage patterns and optimize our services</li>
                            <li>To ensure the security and integrity of our platform</li>
                            <li>To comply with legal obligations and protect our rights</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Sharing and Disclosure</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Service Providers:</strong> With third-party AI service providers (such as Replicate) necessary to deliver our services</li>
                            <li><strong>Analytics:</strong> With Google Analytics and Microsoft Clarity for website performance analysis</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Security</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Retention</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We retain your information only for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. Content you submit for AI generation is processed temporarily and not permanently stored on our servers.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Your Rights</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>The right to access your personal information</li>
                            <li>The right to correct or update your information</li>
                            <li>The right to delete your information</li>
                            <li>The right to restrict or object to processing</li>
                            <li>The right to data portability</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Cookies and Tracking</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our website uses cookies and similar tracking technologies to enhance your experience and gather analytics data. You can control cookie settings through your browser preferences, though this may affect site functionality.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Children's Privacy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated Privacy Policy.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy or our data practices, please contact us through our website. We are committed to addressing your concerns and ensuring your privacy rights are respected.
                        </p>
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