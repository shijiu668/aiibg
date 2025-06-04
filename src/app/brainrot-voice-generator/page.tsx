"use client";

import { useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

export default function BrainrotVoiceGenerator() {
    const [inputText, setInputText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("af_bella");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [error, setError] = useState("");
    const [textLoading, setTextLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [currentPlayingVoice, setCurrentPlayingVoice] = useState<string | null>(null);
    const [templateAudio, setTemplateAudio] = useState<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const voiceOptions = [
        { value: "af_bella", label: "Bella (Female 1)", gender: "female" },
        { value: "af_nicole", label: "Nicole (Female 2)", gender: "female" },
        { value: "am_onyx", label: "Onyx (Male 1)", gender: "male" },
        { value: "am_puck", label: "Puck (Male 2)", gender: "male" },
    ];

    const playAudioTemplate = (voice: string) => {
        if (currentPlayingVoice === voice && templateAudio) {
            // 如果当前正在播放这个音频，则暂停
            templateAudio.pause();
            setCurrentPlayingVoice(null);
            setTemplateAudio(null);
        } else {
            // 如果有其他音频在播放，先停止
            if (templateAudio) {
                templateAudio.pause();
            }

            // 播放新的音频
            const newAudio = new Audio(`/audio-templates/${voice}.wav`);
            newAudio.play().catch(err => console.log("Template audio play failed:", err));

            // 音频播放结束后重置状态
            newAudio.onended = () => {
                setCurrentPlayingVoice(null);
                setTemplateAudio(null);
            };

            setCurrentPlayingVoice(voice);
            setTemplateAudio(newAudio);
        }
    };

    const handleGenerate = async () => {
        if (!inputText.trim()) {
            setError("Please enter some text content");
            return;
        }

        setError("");
        setIsGenerating(true);
        setTextLoading(true);
        setAudioLoading(false);
        setGeneratedText("");
        setAudioUrl("");

        try {
            // Generate brainrot text
            const textResponse = await fetch("/api/generate-brainrot-text-voice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText }),
            });

            const textData = await textResponse.json();
            setTextLoading(false);

            if (!textResponse.ok) {
                throw new Error(textData.error || "Text generation failed");
            }

            if (textData.text) {
                setGeneratedText(textData.text);
                setAudioLoading(true);

                // Generate audio with the generated text
                const audioResponse = await fetch("/api/generate-brainrot-voice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: textData.text,
                        voice: selectedVoice
                    }),
                });

                const audioData = await audioResponse.json();
                setAudioLoading(false);

                if (!audioResponse.ok) {
                    throw new Error(audioData.error || "Audio generation failed");
                }

                if (audioData.audioUrl) {
                    setAudioUrl(audioData.audioUrl);
                }
            }
        } catch (err: any) {
            console.error("Generation error:", err);
            setError(err.message || "Generation failed");
            setTextLoading(false);
            setAudioLoading(false);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const downloadAudio = async () => {
        if (audioUrl) {
            try {
                const response = await fetch(audioUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'brainrot-voice.wav';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download failed:', error);
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center italian-flag-gradient">
            {/* Navigation */}
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

            <div className="z-10 max-w-7xl w-full px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text-blue">
                        Brainrot Voice Generator
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">
                        Transform your text into engaging brainrot-style content with AI-powered voice generation. Create viral audio content instantly.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Side - Input Controls */}
                    <div className="space-y-6">
                        {/* Text Input Area */}
                        <div className="result-container-blue">
                            <h2 className="text-xl font-bold mb-4 gradient-text-blue">Enter Your Content</h2>
                            <textarea
                                className="input-field-blue min-h-[120px] resize-none"
                                placeholder="Type your content here... (e.g., 'Tell me about the latest gaming trends' or 'Explain quantum physics')"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                disabled={isGenerating}
                                maxLength={2000}
                            />
                            <div className="text-sm text-gray-500 mt-2 text-right">
                                {inputText.length}/2000 characters
                            </div>
                        </div>

                        {/* Voice Template Selection */}
                        <div className="result-container-blue">
                            <h2 className="text-xl font-bold mb-4 gradient-text-blue">Choose Voice Template</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {voiceOptions.map((voice) => (
                                    <div key={voice.value} className="flex items-center justify-between p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id={voice.value}
                                                name="voice"
                                                value={voice.value}
                                                checked={selectedVoice === voice.value}
                                                onChange={(e) => setSelectedVoice(e.target.value)}
                                                className="text-blue-600"
                                                disabled={isGenerating}
                                            />
                                            <label htmlFor={voice.value} className="text-sm font-medium text-gray-700 cursor-pointer">
                                                {voice.label}
                                            </label>
                                        </div>
                                        <button
                                            onClick={() => playAudioTemplate(voice.value)}
                                            className="text-blue-600 hover:text-blue-700 text-sm px-2 py-1 rounded border border-blue-300 hover:bg-blue-100 transition-colors"
                                            disabled={isGenerating}
                                        >
                                            {currentPlayingVoice === voice.value ? "Stop" : "Preview"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="result-container-blue">
                            <button
                                className="btn-blue w-full text-lg py-4"
                                onClick={handleGenerate}
                                disabled={isGenerating || !inputText.trim()}
                            >
                                {isGenerating ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <BeatLoader color="#ffffff" size={8} />
                                        <span>Generating Brainrot Content...</span>
                                    </div>
                                ) : (
                                    "Start Generating"
                                )}
                            </button>
                            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
                        </div>
                    </div>

                    {/* Right Side - Results Display */}
                    <div className="space-y-6">
                        {/* Generated Text Results */}
                        <div className="result-container-blue">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold gradient-text-blue">Generated Brainrot Text</h2>
                                {generatedText && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-blue-600 hover:text-blue-700 text-sm px-3 py-1 rounded border border-blue-300 hover:bg-blue-100 transition-colors"
                                    >
                                        {isCopied ? "Copied!" : "Copy Text"}
                                    </button>
                                )}
                            </div>
                            {textLoading ? (
                                <div className="flex justify-center items-center bg-blue-50 rounded-lg h-32">
                                    <BeatLoader color="#3b82f6" />
                                </div>
                            ) : generatedText ? (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-gray-800 leading-relaxed">{generatedText}</p>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center bg-gray-100 rounded-lg h-32">
                                    <p className="text-gray-500">Generated brainrot text will appear here</p>
                                </div>
                            )}
                        </div>

                        {/* Generated Audio Results */}
                        <div className="result-container-blue">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold gradient-text-blue">Generated Voice Audio</h2>
                                {audioUrl && (
                                    <button
                                        onClick={downloadAudio}
                                        className="text-blue-600 hover:text-blue-700 text-sm px-3 py-1 rounded border border-blue-300 hover:bg-blue-100 transition-colors"
                                    >
                                        Download Audio
                                    </button>
                                )}
                            </div>
                            {audioLoading ? (
                                <div className="flex justify-center items-center bg-blue-50 rounded-lg h-24">
                                    <div className="flex items-center space-x-2">
                                        <BeatLoader color="#3b82f6" />
                                        <span className="text-gray-600">Generating voice audio...</span>
                                    </div>
                                </div>
                            ) : audioUrl ? (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <audio ref={audioRef} controls className="w-full">
                                        <source src={audioUrl} type="audio/wav" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center bg-gray-100 rounded-lg h-24">
                                    <p className="text-gray-500">Generated voice audio will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                        <h2 className="text-3xl font-bold mb-6 text-center gradient-text-blue">Ultimate Brainrot Voice Generator Experience</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4 text-blue-700">What is Brainrot Voice Generator?</h3>
                                <p className="mb-4 text-gray-700 leading-relaxed">
                                    Our Brainrot Voice Generator is a cutting-edge AI tool that transforms ordinary text into engaging, viral-worthy brainrot content with authentic voice narration. This brainrot voice generator leverages advanced AI algorithms to create content that captures the unique style and energy of modern internet culture. Whether you're creating content for social media, entertainment, or educational purposes, our brainrot voice generator delivers professional-quality results that resonate with today's digital audience.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    The brainrot voice generator specializes in converting your input text into captivating narratives that embody the distinctive characteristics of brainrot content - energetic, engaging, and irresistibly shareable. This makes our brainrot voice generator the perfect tool for content creators, marketers, and anyone looking to create viral audio content.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Key Features of Our Brainrot Voice Generator</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start space-x-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span><strong>AI-Powered Text Transformation:</strong> Our brainrot voice generator uses advanced AI to convert your input into engaging brainrot-style content</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span><strong>Multiple Voice Options:</strong> Choose from 4 distinct voices (2 male, 2 female) to match your brainrot voice generator needs</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span><strong>Instant Audio Preview:</strong> Listen to voice templates before generating your final brainrot voice generator output</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span><strong>Download & Share:</strong> Export your brainrot voice generator creations as high-quality audio files</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-700">How to Use the Brainrot Voice Generator</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
                                    <div className="text-3xl font-bold text-blue-600 mb-3">1</div>
                                    <h4 className="font-semibold mb-2 text-gray-800">Enter Your Content</h4>
                                    <p className="text-gray-600 text-sm">Type your text into the brainrot voice generator input field. Our AI will transform any content into engaging brainrot style.</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
                                    <div className="text-3xl font-bold text-blue-600 mb-3">2</div>
                                    <h4 className="font-semibold mb-2 text-gray-800">Select Voice Template</h4>
                                    <p className="text-gray-600 text-sm">Choose your preferred voice from our brainrot voice generator templates. Preview each option to find the perfect match.</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
                                    <div className="text-3xl font-bold text-blue-600 mb-3">3</div>
                                    <h4 className="font-semibold mb-2 text-gray-800">Generate & Download</h4>
                                    <p className="text-gray-600 text-sm">Click generate and watch our brainrot voice generator create your viral-ready audio content in seconds.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Why Choose Our Brainrot Voice Generator?</h3>
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                Our brainrot voice generator stands out as the premier tool for creating engaging audio content. Unlike basic text-to-speech tools, this brainrot voice generator understands the nuances of internet culture and viral content creation. The AI-powered brainrot voice generator doesn't just read your text - it transforms it into compelling narratives that capture attention and drive engagement.
                            </p>
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                Content creators worldwide trust our brainrot voice generator for its reliability, quality, and ability to produce consistently engaging results. Whether you're making content for TikTok, YouTube, podcasts, or social media campaigns, this brainrot voice generator delivers professional-grade audio that sounds natural and captivating.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Brainrot Voice Generator Success Tips</h3>
                            <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
                                <p className="mb-3 text-gray-700"><strong>Optimize Your Input:</strong> The brainrot voice generator works best with clear, engaging source material. Provide context and interesting topics for the AI to transform.</p>
                                <p className="mb-3 text-gray-700"><strong>Voice Selection:</strong> Different voices in our brainrot voice generator suit different content types. Male voices often work well for tech and gaming content, while female voices excel at lifestyle and educational topics.</p>
                                <p className="mb-3 text-gray-700"><strong>Content Length:</strong> Our brainrot voice generator performs optimally with 50-500 words of input text, allowing for detailed transformation while maintaining audio quality.</p>
                                <p className="text-gray-700"><strong>Multiple Iterations:</strong> Don't hesitate to try different approaches with the brainrot voice generator. Each generation can yield unique and engaging results.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Start Creating with Brainrot Voice Generator Today</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Ready to revolutionize your content creation? Our free brainrot voice generator is designed to help you create viral-worthy audio content that engages audiences and drives results. With advanced AI technology, multiple voice options, and instant generation capabilities, this brainrot voice generator is your gateway to creating content that stands out in today's competitive digital landscape. Join thousands of content creators who rely on our brainrot voice generator to produce compelling audio content that captures attention and builds communities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-500 text-sm mt-16 mb-8">
                <p>© {new Date().getFullYear()} AI Italian Brainrot Generator. All rights reserved.</p>
                <div className="mt-4 flex justify-center items-center">
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
                        className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        RightAI Tools Directory
                    </a>
                    <span className="mx-2">•</span>
                    <a
                        href="https://aijustworks.com"
                        title="AI Just Works"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        AI Just Works
                    </a>
                    <span className="mx-2">•</span>
                    <a
                        href="https://SeekAIs.com/"
                        title="SeekAIs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        SeekAIs - AI Tools Directory
                    </a>
                </div>
            </footer>
        </main>
    );
}