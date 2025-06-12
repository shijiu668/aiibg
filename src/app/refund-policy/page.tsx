"use client";

import { useState } from "react";
import Link from "next/link";

export default function RefundPolicy() {
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 gradient-text" style={{ lineHeight: '1.2' }}>
                    Refund Policy
                </h1>

                <div className="space-y-8 w-full text-left">
                    <div className="result-container">
                        <p className="text-gray-600 mb-6 text-center">
                            <strong>Effective Date:</strong> June 12, 2025<br />
                            <strong>Last Updated:</strong> June 12, 2025
                        </p>

                        <h2 className="text-2xl font-bold mb-4 gradient-text">Introduction</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            At AI Italian Brainrot Generator, operated by italianbrainrots.org, we strive to provide our users with the best AI-powered content generation experience possible. We understand that circumstances may change, and you might need to request a refund. Please read our refund policy carefully before making a purchase.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Refund Eligibility</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Time Limit</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Refund requests must be made within <strong>7 days</strong> of your purchase. After this period, we cannot process any refund requests. This time limit ensures we can efficiently manage our service while providing reasonable protection for our customers.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Credit Usage Limit</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you have used more than <strong>20% of your purchased credits</strong>, you are not eligible for a full refund, regardless of the time since purchase. However, we may consider partial refunds on a case-by-case basis.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Service Issues</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you experience technical issues that prevent you from using our AI generation services, please contact our support team first. We will work to resolve any service-related problems before considering refund options.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">How to Request a Refund</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you meet the eligibility criteria and wish to request a refund, please follow these steps:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">1. Contact Our Support Team</h4>
                                <p className="text-gray-700">
                                    Email us at support@italianbrainrots.org. We aim to respond to all refund requests within 24 hours.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">2. Provide Required Details</h4>
                                <p className="text-gray-700">Include the following information in your refund request:</p>
                                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                    <li>Your account email address</li>
                                    <li>Transaction ID or order number</li>
                                    <li>Purchase date and amount</li>
                                    <li>Detailed reason for the refund request</li>
                                    <li>Number of credits used (if applicable)</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">3. Submit Within Time Limit</h4>
                                <p className="text-gray-700">
                                    Ensure your request is submitted within 7 days of your purchase. Late requests cannot be processed.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Processing Refunds</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Review Process</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Once we receive your refund request, our team will review it thoroughly and notify you of the approval or denial within 2-3 business days. We may request additional information if needed.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment Processing</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If your refund is approved, it will be processed to your original payment method within 5-10 business days. The exact timing may vary depending on your bank or payment provider.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Partial Refunds</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            In some cases, we may offer partial refunds based on credit usage or other circumstances. Partial refund amounts will be calculated fairly and communicated clearly.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Non-Refundable Items</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The following items are not eligible for refunds:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Credits that have been fully or substantially used (more than 20%)</li>
                            <li>Purchases made more than 7 days ago</li>
                            <li>Custom requests or specialized services</li>
                            <li>Promotional or discounted subscription periods</li>
                            <li>Fees related to third-party services or integrations</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Subscription Cancellations</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            For subscription-based services:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>You can cancel your subscription at any time through your account settings</li>
                            <li>Cancellations take effect at the end of your current billing period</li>
                            <li>No refunds are provided for partial subscription periods unless required by law</li>
                            <li>Unused credits from cancelled subscriptions do not carry over</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Dispute Resolution</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you disagree with our refund decision, you may request a review by contacting our customer service team. We are committed to resolving disputes fairly and will work with you to find a satisfactory solution.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Changes to This Policy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We reserve the right to update our refund policy at any time. Any changes will be reflected on this page with an updated "Last Modified" date. We encourage you to review this policy periodically. Continued use of our services after policy changes constitutes acceptance of the updated terms.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Refund Policy or need to request a refund, please contact us at support@italianbrainrots.org. We are committed to providing excellent customer service and will address your concerns promptly.
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
            </div>
        </main>
    );
}