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
                            <strong>Effective Date:</strong> June 12, 2025<br />
                            <strong>Last Updated:</strong> June 12, 2025
                        </p>

                        <h2 className="text-2xl font-bold mb-4 gradient-text">Introduction</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Welcome to AI Italian Brainrot Generator, an AI-powered content generation platform operated by italianbrainrots.org (the "Service"). By accessing or using our website at https://italianbrainrots.org (the "Site"), you agree to be bound by these Terms and Conditions (the "Terms"). These Terms govern your use of the Site and the Service provided by AI Italian Brainrot Generator ("we," "us," or "our").
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Please read these Terms carefully before using the Service. If you do not agree with any part of these Terms, you must not use the Site or the Service.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            If you have any questions or concerns regarding these Terms and the products/services we offer, you can also check our <Link href="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</Link> and <Link href="/refund-policy" className="text-purple-600 hover:underline">Refund Policy</Link>, or contact us at support@italianbrainrots.org.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Company Information</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            This Service is operated by <strong>AI Italian Brainrot Generator</strong>, accessible from italianbrainrots.org. All references to "the Company," "we," "us," or "our" in this Agreement refer to AI Italian Brainrot Generator.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Eligibility</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            To use our Service, you must be at least 18 years old or have reached the age of majority in your jurisdiction. By using the Service, you represent and warrant that you meet this eligibility requirement. If you are using the Service on behalf of a company, organization, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Description of Service</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI Italian Brainrot Generator is an online platform that provides AI-powered content generation services, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Generation of Italian Brainrot style images, text, and voice content</li>
                            <li>PDF to Brainrot content transformation</li>
                            <li>Voice generation and translation tools</li>
                            <li>Interactive games and entertainment features</li>
                            <li>Credit-based usage system for premium features</li>
                            <li>Subscription-based access to enhanced capabilities</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Account Registration</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            To access certain features of the Service, you may be required to create an account. You agree to provide accurate, complete, and up-to-date information during the registration process and to update such information as necessary. You are responsible for safeguarding your account credentials and for any activities or actions under your account, whether authorized or not. You must notify us immediately if you suspect any unauthorized use and activities of your account.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Use of the Service</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Permitted Use</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI Italian Brainrot Generator grants you a limited, non-exclusive, non-transferable, and revocable license to use the Service for lawful purposes, subject to these Terms. You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Prohibited Conduct</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">You agree not to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Use the Service to generate or distribute any content that is illegal, harmful, abusive, defamatory, obscene, or otherwise objectionable</li>
                            <li>Attempt to reverse engineer, decompile, or disassemble any part of the Service</li>
                            <li>Use any automated system, including bots, spiders, or scrapers, to access the Site or the Service</li>
                            <li>Engage in any activity that interferes with or disrupts the Service or the servers and networks connected to the Service</li>
                            <li>Use the Service to infringe upon the intellectual property rights of others</li>
                            <li>Violate any applicable laws or regulations while using our Service</li>
                            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">User Content and Intellectual Property</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You retain ownership of any content, including text prompts, images, documents, or other materials, that you upload or submit to the Service ("User Content"). You are solely responsible for the User Content you create, upload, publish, or share through the Service.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">License to AI Italian Brainrot Generator</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            By submitting User Content to the Service, you grant AI Italian Brainrot Generator a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, distribute, and display such User Content solely for the purpose of operating, improving, and promoting the Service.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Generated Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Content generated by our AI tools (including images, text, and audio) is provided to you under a Creative Commons license. You may use, modify, and distribute generated content for personal and commercial purposes, subject to applicable laws and third-party rights.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Our Intellectual Property</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The Service, including its original content, features, and functionality, is owned by AI Italian Brainrot Generator and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You are granted no rights or licenses in these materials except as expressly stated in these Terms.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Payment and Subscription</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Pricing and Fees</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our Service operates on a credit-based system with the following subscription plans:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <ul className="space-y-2 text-gray-700">
                                <li><strong>Basic Plan:</strong> Free - 10 credits included for new users</li>
                                <li><strong>Pro Plan:</strong> $3.99/month (300 credits) or $38.99/year (3,600 credits)</li>
                                <li><strong>Premium Plan:</strong> $9.90/month (1,000 credits) or $98.99/year (12,000 credits)</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Each generation (image, text, or voice) typically costs 1 credit. You agree to pay all applicable fees associated with your use of the Service. We reserve the right to change our fees and billing methods at any time upon notice to you.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Billing and Payment Processing</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Payments for the Service are processed through third-party payment processors, including Paddle. By providing payment information, you authorize AI Italian Brainrot Generator and its payment processors to charge the applicable fees to your payment method. All payments are subject to our <Link href="/refund-policy" className="text-purple-600 hover:underline">Refund Policy</Link>.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Automatic Renewal</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Subscription services automatically renew at the end of each billing period unless cancelled. You may cancel your subscription at any time through your account settings. Cancellations take effect at the end of the current billing period.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Disclaimers and Limitations</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Service Availability</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The Service is provided on an "as is" and "as available" basis without any warranties of any kind, whether express, implied, or statutory. We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at any time.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">AI-Generated Content</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI-generated content is created by artificial intelligence algorithms and may not always be accurate, appropriate, or suitable for your intended use. You are responsible for reviewing and verifying all generated content before use. We disclaim all warranties regarding the accuracy, completeness, or suitability of AI-generated content.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Limitation of Liability</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            To the maximum extent permitted by law, AI Italian Brainrot Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with your use of the Service, whether based on warranty, contract, tort, or any other legal theory, even if we have been advised of the possibility of such damages.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Privacy and Data Protection</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using our Service, you consent to the collection and use of your information as outlined in our Privacy Policy.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Termination</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Termination by You</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You may terminate your account at any time by following the instructions provided on the Site or by contacting our support team. Upon termination, your right to access and use the Service will immediately cease.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Termination by AI Italian Brainrot Generator</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We may terminate or suspend your account or access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Effect of Termination</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Upon termination, all licenses granted to you under these Terms will immediately terminate, and you must cease all use of the Service. Any accrued rights or obligations will survive termination, including those related to payment and intellectual property.
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
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AI Italian Brainrot Generator operates, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved through binding arbitration or in the courts of competent jurisdiction.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Changes to Terms</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Entire Agreement and Severability</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and AI Italian Brainrot Generator regarding your use of the Service and supersede any prior agreements between you and AI Italian Brainrot Generator.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect, and the invalid or unenforceable provision will be replaced with a valid and enforceable provision that most closely approximates the intent of the original provision.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about these Terms and Conditions, please contact us at support@italianbrainrots.org. We are committed to addressing your concerns and clarifying any aspects of these Terms.
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
                                                We'd love to hear from you!
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