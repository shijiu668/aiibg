"use client";

import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { useUser } from '@/contexts/UserContext';
import AuthModal from '@/components/AuthModal';
import CreditDisplay from '@/components/CreditDisplay';

export default function PdfToBrainrot() {
    const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
        isOpen: false,
        mode: 'signin'
    });
    const { user, profile, deductCredits, signOut } = useUser();
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [selectedVideoTemplate, setSelectedVideoTemplate] = useState("");
    const [selectedAudioTemplate, setSelectedAudioTemplate] = useState("am_onyx");
    const [selectedBackgroundMusic, setSelectedBackgroundMusic] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState("");
    const [progress, setProgress] = useState(0);
    const [finalVideoUrl, setFinalVideoUrl] = useState("");
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const finalVideoRef = useRef<HTMLVideoElement>(null);

    // Video templates
    const videoTemplates = [
        { id: "template1", name: "Video1", file: "/templates/videos/1.mp4" },
        { id: "template2", name: "Video2", file: "/templates/videos/2.mp4" },
        { id: "template3", name: "Video3", file: "/templates/videos/3.mp4" },
        { id: "template4", name: "Video4", file: "/templates/videos/4.mp4" }
    ];

    // Audio templates
    const audioTemplates = [
        { id: "am_onyx", name: "Deep Male Voice", sample: "/templates/audio/male_sample.wav" },
        { id: "af_bella", name: "Elegant Female Voice", sample: "/templates/audio/female_sample.wav" }
    ];

    // Background music
    const backgroundMusic = [
        { id: "energetic", name: "Music1", file: "/templates/music/1.mp3" },
        { id: "chill", name: "Music2", file: "/templates/music/2.mp3" },
        { id: "dramatic", name: "Music3", file: "/templates/music/3.mp3" },
        { id: "upbeat", name: "Music4", file: "/templates/music/4.mp3" }
    ];

    // Handle PDF file upload
    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setError("");
        } else {
            setError("Please upload a valid PDF file");
        }
    };

    // Update video preview when template changes
    useEffect(() => {
        if (selectedVideoTemplate && videoPreviewRef.current) {
            const template = videoTemplates.find(t => t.id === selectedVideoTemplate);
            if (template) {
                videoPreviewRef.current.src = template.file;
                videoPreviewRef.current.load();
            }
        }
    }, [selectedVideoTemplate]);

    // Play audio sample
    // 音频状态管理
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

    // Play/Pause audio sample
    const toggleAudioSample = (sampleFile: string) => {
        if (currentlyPlaying === sampleFile && audioInstance) {
            // 暂停当前播放
            audioInstance.pause();
            setCurrentlyPlaying(null);
            setAudioInstance(null);
        } else {
            // 停止之前的音频
            if (audioInstance) {
                audioInstance.pause();
            }
            // 播放新音频
            const audio = new Audio(sampleFile);
            audio.play();
            setCurrentlyPlaying(sampleFile);
            setAudioInstance(audio);

            // 音频结束时重置状态
            audio.onended = () => {
                setCurrentlyPlaying(null);
                setAudioInstance(null);
            };
        }
    };

    // Extract text from PDF
    // Extract text from PDF
    const extractTextFromPdf = async (file: File): Promise<string> => {
        try {
            console.log("Starting PDF extraction for file:", file.name);

            // 创建FormData并上传到API
            const formData = new FormData();
            formData.append('pdf', file);

            const response = await fetch('/api/pdf-to-text', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'PDF解析失败');
            }

            console.log("PDF extraction completed, text:", result.text.substring(0, 200) + "...");
            console.log("PDF text length:", result.text.length);
            console.log("PDF pages:", result.pages);

            return result.text;
        } catch (error) {
            console.error("PDF extraction error:", error);
            throw new Error("Failed to extract text from PDF");
        }
    };

    // Generate brainrot text
    const generateBrainrotText = async (pdfText: string): Promise<string> => {
        try {
            const response = await fetch("/api/generate-brainrot-text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pdfText }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Text generation failed");
            }

            return data.text;
        } catch (error) {
            throw new Error("Failed to generate brainrot text");
        }
    };

    // Generate audio from text
    const generateAudio = async (text: string, voice: string): Promise<string> => {
        try {
            const response = await fetch("/api/generate-brainrot-audio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, voice }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Audio generation failed");
            }

            return data.audioUrl;
        } catch (error) {
            throw new Error("Failed to generate audio");
        }
    };

    // Merge video components using FFmpeg
    const mergeVideoComponents = async (
        videoTemplate: string,
        audioUrl: string,
        backgroundMusicId: string
    ): Promise<string> => {
        try {


            // Initialize FFmpeg
            const ffmpeg = new FFmpeg();
            await ffmpeg.load();

            // Fetch files
            const videoTemplate_file = videoTemplates.find(t => t.id === videoTemplate)?.file || "";
            const selectedMusic = backgroundMusic.find((m: any) => m.id === backgroundMusicId);
            const backgroundMusicFile = selectedMusic?.file || "";

            // Write files to FFmpeg file system
            // Write files to FFmpeg file system
            await ffmpeg.writeFile('template.mp4', await fetchFile(videoTemplate_file));
            await ffmpeg.writeFile('audio.wav', await fetchFile(audioUrl));
            await ffmpeg.writeFile('music.mp3', await fetchFile(backgroundMusicFile));

            // Merge video with audio and background music
            await ffmpeg.exec([
                '-i', 'template.mp4',
                '-i', 'audio.wav',
                '-i', 'music.mp3',
                '-filter_complex', '[1:a]volume=1.8[a1];[2:a]volume=0.3[a2];[a1][a2]amix=inputs=2:duration=first:dropout_transition=3[a]',
                '-map', '0:v',
                '-map', '[a]',
                '-c:v', 'copy',
                '-c:a', 'aac',
                '-shortest',
                'output.mp4'
            ]);

            // Get the result
            const data = await ffmpeg.readFile('output.mp4');
            const blob = new Blob([data], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);

            return url;
        } catch (error) {
            throw new Error("Failed to merge video components");
        }
    };


    // Main generation function
    // Progress interval management
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Function to start progress increment
    const startProgressIncrement = (startValue: number, maxValue: number) => {
        setProgress(startValue);
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= maxValue) {
                    if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current);
                    }
                    return maxValue;
                }
                return prev + 1;
            });
        }, 1000);
    };

    // Function to stop progress increment
    const stopProgressIncrement = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    // Main generation function
    const handleGenerate = async () => {
        if (!pdfFile || !selectedVideoTemplate || !selectedBackgroundMusic) {
            setError("Please upload a PDF file and select all templates");
            return;
        }

        // 检查用户是否登录
        if (!user) {
            setAuthModal({ isOpen: true, mode: 'signin' });
            return;
        }

        // 检查积分是否足够
        // 检查用户配置是否已加载
        if (!profile) {
            setError("Credit information is updating, please try again in a few seconds.");
            return;
        }

        // 检查积分是否足够
        if (profile.credits < 1) {
            setError("Insufficient credits. Please purchase more credits or upgrade your subscription.");
            return;
        }

        // 扣除积分
        // 立即设置加载状态
        setIsGenerating(true);
        setError("");
        setFinalVideoUrl("");
        setProgress(0);
        setGenerationStep("Preparing to generate...");

        // 异步扣除积分
        try {
            const success = await deductCredits(1, "PDF to Brainrot Generator");
            if (!success) {
                // 如果扣除积分失败，重置状态
                setIsGenerating(false);
                setGenerationStep("");
                setProgress(0);
                setError("Failed to deduct credits. Please try again.");
                return;
            }
        } catch (error) {
            // 如果出现异常，重置状态
            setIsGenerating(false);
            setGenerationStep("");
            setProgress(0);
            setError("An error occurred. Please try again.");
            return;
        }

        try {
            // Step 1: Extract text from PDF
            setGenerationStep("Extracting text from PDF...");
            startProgressIncrement(0, 29);
            const pdfText = await extractTextFromPdf(pdfFile);
            stopProgressIncrement();

            // Step 2: Generate brainrot text
            setGenerationStep("Generating brainrot content...");
            startProgressIncrement(30, 59);
            const brainrotText = await generateBrainrotText(pdfText);
            stopProgressIncrement();

            // Step 3: Generate audio
            setGenerationStep("Generating audio narration...");
            startProgressIncrement(60, 79);
            const audioUrl = await generateAudio(brainrotText, selectedAudioTemplate);
            stopProgressIncrement();

            // Step 4: Merge video components
            setGenerationStep("Video rendering...\nThis process may take 3-5 minutes for the first time.");
            startProgressIncrement(80, 99);
            const finalVideo = await mergeVideoComponents(
                selectedVideoTemplate,
                audioUrl,
                selectedBackgroundMusic
            );
            stopProgressIncrement();
            setProgress(100);
            setFinalVideoUrl(finalVideo);
            setGenerationStep("Video generation completed!");
        } catch (err: any) {
            console.error("Generation error:", err);
            setError(err.message || "Video generation failed");
            stopProgressIncrement();
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center orange-flag-gradient">
            {/* Navigation */}
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

            {/* Main Content */}
            <div className="z-10 max-w-7xl w-full px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text-orange">
                        PDF to Brainrot
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">
                        Transform your PDF documents into engaging brainrot-style videos. Upload, customize, and generate viral content instantly.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Side - Controls */}
                    <div className="space-y-6">
                        {/* PDF Upload */}
                        <div className="result-container-orange">
                            <h3 className="text-lg font-semibold mb-3">Upload PDF File</h3>
                            <div
                                className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    onChange={handlePdfUpload}
                                    className="hidden"
                                />
                                {pdfFile ? (
                                    <div>
                                        <p className="text-green-600 font-medium">{pdfFile.name}</p>
                                        <p className="text-sm text-gray-500">Click to change file</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-600">Click to upload PDF file</p>
                                        <p className="text-sm text-gray-400">Supports PDF files up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Video Template Selection */}
                        <div className="result-container-orange">
                            <h3 className="text-lg font-semibold mb-3">Select Video Template</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {videoTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        className={`p-3 rounded-lg border transition-all ${selectedVideoTemplate === template.id
                                            ? "border-orange-500 bg-orange-50"
                                            : "border-gray-300 hover:border-orange-300"
                                            }`}
                                        onClick={() => setSelectedVideoTemplate(template.id)}
                                    >
                                        <p className="font-medium text-sm">{template.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Audio Template Selection */}
                        <div className="result-container-orange">
                            <h3 className="text-lg font-semibold mb-3">Select Audio Template</h3>
                            <div className="space-y-2">
                                {audioTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className={`p-3 rounded-lg border transition-all ${selectedAudioTemplate === template.id
                                            ? "border-orange-500 bg-orange-50"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="audioTemplate"
                                                    value={template.id}
                                                    checked={selectedAudioTemplate === template.id}
                                                    onChange={(e) => setSelectedAudioTemplate(e.target.value)}
                                                    className="mr-2"
                                                />
                                                <span className="font-medium text-sm">{template.name}</span>
                                            </label>
                                            <button
                                                onClick={() => toggleAudioSample(template.sample)}
                                                className="text-orange-600 hover:text-orange-700 text-sm"
                                            >
                                                {currentlyPlaying === template.sample ? "Pause" : "Preview"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Background Music Selection */}
                        {/* Background Music Selection */}
                        <div className="result-container-orange">
                            <h3 className="text-lg font-semibold mb-3">Select Background Music</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {backgroundMusic.map((music) => (
                                    <div
                                        key={music.id}
                                        className={`p-3 rounded-lg border transition-all ${selectedBackgroundMusic === music.id
                                            ? "border-orange-500 bg-orange-50"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <button
                                                className="text-left flex-1"
                                                onClick={() => setSelectedBackgroundMusic(music.id)}
                                            >
                                                <p className="font-medium text-sm">{music.name}</p>
                                            </button>
                                            <button
                                                onClick={() => toggleAudioSample(music.file)}
                                                className="text-orange-600 hover:text-orange-700 text-sm ml-2"
                                            >
                                                {currentlyPlaying === music.file ? "Pause" : "Preview"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            className="btn-orange w-full"
                            onClick={handleGenerate}
                            disabled={isGenerating || !pdfFile || !selectedVideoTemplate || !selectedBackgroundMusic}
                        >
                            {isGenerating ? <BeatLoader color="#ffffff" size={8} /> : "Start Generation"}
                        </button>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>

                    {/* Right Side - Video Preview/Result */}
                    <div className="result-container-orange">
                        <h3 className="text-lg font-semibold mb-3">
                            {finalVideoUrl ? "Generated Video" : "Video Preview"}
                        </h3>

                        {isGenerating ? (
                            <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg h-96">
                                <BeatLoader color="#ea580c" size={12} />
                                <p className="text-gray-600 mt-4 whitespace-pre-line text-center">{generationStep}</p>

                                {/* Progress Bar */}
                                <div className="w-64 mt-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-orange-600 h-2 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ) : finalVideoUrl ? (
                            <div>
                                <video
                                    ref={finalVideoRef}
                                    controls
                                    className="w-full rounded-lg"
                                    src={finalVideoUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="mt-4 text-center">
                                    <a
                                        href={finalVideoUrl}
                                        download="brainrot-video.mp4"
                                        className="btn-orange inline-block"
                                    >
                                        Download Video
                                    </a>
                                </div>
                            </div>
                        ) : selectedVideoTemplate ? (
                            <video
                                ref={videoPreviewRef}
                                controls
                                muted
                                className="w-full rounded-lg"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="flex justify-center items-center bg-gray-100 rounded-lg h-96">
                                <p className="text-gray-500">Select a video template to preview</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO Content Area */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                        <h2 className="text-2xl font-bold mb-6 gradient-text-orange">Transform PDFs into Viral Brainrot Videos</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">What is PDF to Brainrot Video Generation?</h3>
                            <p className="mb-3 text-gray-700">PDF to brainrot video generation revolutionizes how we consume written content by transforming static PDF documents into engaging, viral-style videos. Our PDF to brainrot generator extracts text from your PDF files and converts them into captivating brainrot-style content that resonates with modern audiences.</p>
                            <p className="text-gray-700">The PDF to brainrot process combines artificial intelligence with creative video editing to produce entertaining content that makes complex information digestible and shareable. Whether you're converting academic papers, business reports, or educational materials, PDF to brainrot technology ensures your content reaches wider audiences through engaging video formats.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">How PDF to Brainrot Generation Works</h3>
                            <p className="mb-3 text-gray-700">Our advanced PDF to brainrot system follows a sophisticated multi-step process. First, our PDF to brainrot engine extracts all text content from your uploaded PDF document using advanced parsing technology. The extracted content is then processed through AI models specifically trained for brainrot-style content generation.</p>
                            <p className="mb-3 text-gray-700">The PDF to brainrot transformation continues as our system generates engaging narration that captures the essence of viral brainrot content. Finally, the PDF to brainrot generator combines your chosen video template, AI-generated audio, and background music to create a complete brainrot video experience that transforms boring PDFs into entertaining content.</p>
                            <p className="text-gray-700">Each PDF to brainrot video maintains the core information from your original document while presenting it in an accessible, entertaining format that appeals to social media audiences and modern content consumption preferences.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">Benefits of PDF to Brainrot Video Creation</h3>
                            <p className="mb-3 text-gray-700">PDF to brainrot conversion offers numerous advantages for content creators, educators, and businesses. The PDF to brainrot approach significantly increases engagement rates compared to traditional PDF sharing, as video content receives higher interaction on social platforms.</p>
                            <p className="mb-3 text-gray-700">Educational institutions benefit from PDF to brainrot technology by making learning materials more accessible and engaging for students. Complex academic PDFs become digestible brainrot videos that maintain educational value while improving comprehension and retention.</p>
                            <p className="text-gray-700">Businesses can leverage PDF to brainrot generation to transform lengthy reports, proposals, and documentation into shareable video content that captures audience attention and communicates key messages effectively through the popular brainrot format.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">Advanced PDF to Brainrot Features</h3>
                            <p className="mb-3 text-gray-700">Our PDF to brainrot generator includes multiple video templates optimized for different content types and audiences. Each PDF to brainrot template is designed to enhance the viral potential of your content while maintaining professional quality and clear communication.</p>
                            <p className="mb-3 text-gray-700">Voice customization in our PDF to brainrot system allows users to select between male and female narration options, ensuring the generated brainrot video matches your brand voice and target audience preferences. The PDF to brainrot audio generation uses advanced text-to-speech technology for natural-sounding narration.</p>
                            <p className="text-gray-700">Background music integration in the PDF to brainrot process adds emotional depth and engagement to your videos. Our curated music library complements the brainrot aesthetic while ensuring your PDF to brainrot videos maintain professional quality and viral appeal.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-orange-100">
                        <h2 className="text-2xl font-bold mb-6 gradient-text-orange">PDF to Brainrot: Frequently Asked Questions</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">Is PDF to brainrot generation free to use?</h3>
                            <p className="text-gray-700">Yes, our PDF to brainrot generator is completely free. Convert unlimited PDF documents to brainrot videos without subscription fees. Experience the power of PDF to brainrot transformation without any cost barriers.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">What PDF file types support PDF to brainrot conversion?</h3>
                            <p className="text-gray-700">Our PDF to brainrot system supports all standard PDF formats, including text-based PDFs, scanned documents, and multi-page files. The PDF to brainrot engine automatically extracts readable text content for optimal brainrot video generation.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">How long does PDF to brainrot video generation take?</h3>
                            <p className="text-gray-700">PDF to brainrot processing typically completes within 2-5 minutes, depending on your PDF size and complexity. Our optimized PDF to brainrot pipeline ensures fast generation while maintaining high-quality brainrot video output.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">Can I customize my PDF to brainrot video templates?</h3>
                            <p className="text-gray-700">Absolutely! Our PDF to brainrot generator offers multiple video templates, voice options, and background music choices. Customize every aspect of your PDF to brainrot creation to match your style and audience preferences.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-left">What makes PDF to brainrot videos go viral?</h3>
                            <p className="text-gray-700">PDF to brainrot videos leverage the popular brainrot aesthetic that resonates with modern social media audiences. The PDF to brainrot format transforms serious content into entertaining, shareable videos that capture attention and encourage engagement across platforms.</p>
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