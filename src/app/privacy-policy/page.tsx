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
                            <strong>Effective Date:</strong> June 12, 2025<br />
                            <strong>Last Updated:</strong> June 12, 2025
                        </p>

                        <h2 className="text-2xl font-bold mb-4 gradient-text">Introduction</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            This Privacy Policy of AI Italian Brainrot Generator ("We," "Us," or "Our") describes our policies and procedures on how we collect, store, use, and/or share your information when you use our Service. This includes use of our website at https://italianbrainrots.org (the "Website"). The Privacy Policy also tells you about your privacy rights and how the law protects you.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We use your Personal Data to provide and improve the Service. By using the Website, you agree to the collection and use of information in accordance with this Privacy Policy.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Should you have any questions or concerns regarding this Privacy Policy and our services, please check our <Link href="/terms-and-conditions" className="text-purple-600 hover:underline">Terms and Conditions</Link> and <Link href="/refund-policy" className="text-purple-600 hover:underline">Refund Policy</Link>, or contact us at support@italianbrainrots.org.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Interpretation and Definitions</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Definitions</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            For the purposes of this Privacy Policy:
                        </p>
                        <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>Website</strong> refers to AI Italian Brainrot Generator, accessible from https://italianbrainrots.org</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>Account</strong> means a unique account created by you to access our Service or parts of our Service</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>Company</strong> (referred to as either "the Company," "We," "Us" or "Our") refers to AI Italian Brainrot Generator</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>Service</strong> refers to the AI-powered content generation tools and features that we offer, including image generation, text generation, voice synthesis, and related AI products</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-700"><strong>You</strong> means the individual accessing or using the Service</p>
                            </div>
                        </div>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Information We Collect</h2>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Personal Data</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Email address (for account creation and authentication)</li>
                            <li>Account credentials and profile information</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                            <li>Usage data and service interactions</li>
                            <li>Content you submit for AI processing (text prompts, uploaded files)</li>
                        </ul>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Information from Third-Party Services</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We allow you to create an account and log in to use the Service through third-party services including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Google OAuth</li>
                            <li>Other social media authentication services</li>
                        </ul>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you decide to register through or grant us access to a third-party service, we may collect Personal Data already associated with your third-party account, such as your name, email address, and basic profile information.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Automatically Collected Information</h3>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Usage data and analytics through Google Analytics and Microsoft Clarity</li>
                            <li>Browser type, device information, and IP address</li>
                            <li>Pages visited, time spent on site, and interaction patterns</li>
                            <li>Technical information for service optimization and security</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">How We Use Your Information</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Service Provision:</strong> To provide and operate our AI content generation services</li>
                            <li><strong>Account Management:</strong> To manage your registration and account access</li>
                            <li><strong>Content Processing:</strong> To process your content requests and generate Italian Brainrot content</li>
                            <li><strong>Service Improvement:</strong> To improve our website functionality and user experience</li>
                            <li><strong>Analytics:</strong> To analyze usage patterns and optimize our services</li>
                            <li><strong>Communication:</strong> To send service-related notifications and updates</li>
                            <li><strong>Security:</strong> To ensure the security and integrity of our platform</li>
                            <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
                            <li><strong>Payment Processing:</strong> To process subscription payments and manage billing</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Sharing and Disclosure</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Service Providers:</strong> With third-party AI service providers (such as Replicate) necessary to deliver our AI generation services</li>
                            <li><strong>Payment Processing:</strong> With Paddle and other payment processors for subscription and billing management</li>
                            <li><strong>Authentication:</strong> With Supabase for user authentication and account management</li>
                            <li><strong>Analytics:</strong> With Google Analytics and Microsoft Clarity for website performance analysis</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Security and Protection</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Secure data transmission using HTTPS encryption</li>
                            <li>Access controls and authentication mechanisms</li>
                            <li>Regular security assessments and updates</li>
                            <li>Secure cloud infrastructure through trusted providers</li>
                        </ul>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            However, no internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security. We encourage you to use strong passwords and keep your account credentials confidential.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Retention</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We retain your information only for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Account Data:</strong> Retained while your account is active and for a reasonable period after deletion</li>
                            <li><strong>Content Submissions:</strong> Processed temporarily for AI generation and not permanently stored</li>
                            <li><strong>Usage Data:</strong> Retained for analytical purposes for up to 2 years</li>
                            <li><strong>Payment Records:</strong> Retained as required by law and payment processing requirements</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Your Privacy Rights</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Access:</strong> The right to access your personal information</li>
                            <li><strong>Correction:</strong> The right to correct or update your information</li>
                            <li><strong>Deletion:</strong> The right to delete your information</li>
                            <li><strong>Restriction:</strong> The right to restrict or object to processing</li>
                            <li><strong>Portability:</strong> The right to data portability</li>
                            <li><strong>Withdrawal:</strong> The right to withdraw consent for data processing</li>
                        </ul>
                        <p className="text-gray-700 mt-4 leading-relaxed">
                            To exercise these rights, please contact us at support@italianbrainrots.org. We will respond to your request within a reasonable timeframe as required by applicable law.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our website uses cookies and similar tracking technologies to enhance your experience and gather analytics data:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                            <li><strong>Analytics Cookies:</strong> Used by Google Analytics and Microsoft Clarity for usage analysis</li>
                            <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
                        </ul>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You can control cookie settings through your browser preferences, though this may affect site functionality.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Opting Out of Information Use</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            AI Italian Brainrot Generator collects and uses personal information to provide and improve our services, personalize your experience, and deliver relevant features. We respect your privacy and have outlined various ways you can opt out of certain uses of your personal information:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Browser Settings:</strong> You can configure your browser settings to refuse the use of cookies. Please note that doing so may affect the full functionality of our website</li>
                            <li><strong>Analytics Opt-Out:</strong> You can opt out of Google Analytics tracking through your browser settings or Google's opt-out tools</li>
                            <li><strong>Email Communications:</strong> You can unsubscribe from promotional emails using the unsubscribe link</li>
                            <li><strong>Account Deactivation:</strong> You can request to deactivate your account at any time by contacting us through our website</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Children's Privacy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected such information, please contact us immediately, and we will take steps to remove the information from our systems.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">International Data Transfers</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and that appropriate safeguards are in place to protect your personal information.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Third-Party Services</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our Service integrates with various third-party services to provide you with the best experience:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Supabase:</strong> For user authentication and database services</li>
                            <li><strong>Replicate:</strong> For AI model processing and content generation</li>
                            <li><strong>Paddle:</strong> For payment processing and subscription management</li>
                            <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
                            <li><strong>Microsoft Clarity:</strong> For user behavior analytics and website optimization</li>
                        </ul>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Each of these services has its own privacy policy, and we encourage you to review them to understand how they handle your data.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Data Breach Notification</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            In the unlikely event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law. We will provide timely updates about the breach, the data involved, and the steps we are taking to address the situation.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Posting the new Privacy Policy on this page with an updated "Last Updated" date</li>
                            <li>Sending you an email notification if you have an account with us</li>
                            <li>Displaying a prominent notice on our website</li>
                        </ul>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of our Service after such modifications constitutes acceptance of the updated Privacy Policy.
                        </p>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Legal Basis for Processing</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We process your personal data based on the following legal grounds:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li><strong>Consent:</strong> When you have given clear consent for us to process your data for specific purposes</li>
                            <li><strong>Contract:</strong> When processing is necessary for the performance of a contract with you</li>
                            <li><strong>Legal Obligation:</strong> When we need to comply with legal requirements</li>
                            <li><strong>Legitimate Interest:</strong> When we have a legitimate business interest that doesn't override your privacy rights</li>
                        </ul>
                    </div>

                    <div className="result-container">
                        <h2 className="text-2xl font-bold mb-4 gradient-text">Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights, please contact us at support@italianbrainrots.org. We are committed to addressing your concerns and ensuring your privacy rights are respected.
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