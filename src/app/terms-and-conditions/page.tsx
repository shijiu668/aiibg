"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsAndConditions() {
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
                    Terms and Conditions
                </h1>

                <div className="space-y-8 w-full text-left">
                    <div className="result-container">
                        <p className="text-gray-600 mb-6 text-center">
                            <strong>Effective Date:</strong> June 5, 2025<br />
                            <strong>Last Updated:</strong> June 5, 2025
                        </p>

                        <h2 className="text-2xl font-bold mb-4 gradient-text">Agreement to Terms</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            By accessing and using AI Italian Brainrot Generator ("the Service") available at italianbrainrots.org, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Description of Service</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI Italian Brainrot Generator is a free online platform that provides AI-powered content generation services, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Generation of Italian Brainrot style images, text, and voice content</li>
                            <li>PDF to Brainrot content transformation</li>
                            <li>Voice generation and translation tools</li>
                            <li>Interactive games and entertainment features</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Acceptable Use</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                            <li>To generate content that is harmful, offensive, or violates any laws</li>
                            <li>To harass, abuse, insult, harm, defame, slander, or intimidate others</li>
                            <li>To submit false or misleading information</li>
                            <li>To upload viruses or any other malicious code</li>
                            <li>To attempt to gain unauthorized access to our systems</li>
                            <li>To interfere with, disrupt, or create an undue burden on our Service</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Content and Intellectual Property</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You retain ownership of any content you submit to our Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and process your content solely for the purpose of providing our services.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Generated Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Content generated by our AI tools is provided to you under a Creative Commons license. You may use, modify, and distribute generated content for personal and commercial purposes, subject to applicable laws and third-party rights.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Our Intellectual Property</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The Service, including its original content, features, and functionality, is owned by AI Italian Brainrot Generator and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Disclaimers and Limitations</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Service Availability</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We provide the Service on an "as is" and "as available" basis. We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at any time.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">AI-Generated Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI-generated content is created by artificial intelligence algorithms and may not always be accurate, appropriate, or suitable for your intended use. You are responsible for reviewing and verifying all generated content before use.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Limitation of Liability</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            To the maximum extent permitted by law, AI Italian Brainrot Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Privacy and Data Protection</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to the collection and use of your information as outlined in our Privacy Policy.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Termination</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Indemnification</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You agree to defend, indemnify, and hold harmless AI Italian Brainrot Generator and its officers, directors, employees, and agents from any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of your use of the Service or violation of these Terms.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Governing Law</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AI Italian Brainrot Generator operates, without regard to its conflict of law provisions.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Changes to Terms</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Severability</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect, and the invalid or unenforceable provision will be replaced with a valid and enforceable provision that most closely approximates the intent of the original provision.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about these Terms and Conditions, please contact us through our website. We are committed to addressing your concerns and clarifying any aspects of these Terms.
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