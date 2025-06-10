"use client";

import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
const EFFECT_FILE_URL = '/effect/brainrot-effect.mov';
export default function ItalianBrainrotVideo() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");

    // 各个生成状态
    const [imagePromptLoading, setImagePromptLoading] = useState(false);
    const [textLoading, setTextLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [videoLoading, setVideoLoading] = useState(false);

    // 生成结果
    const [imagePrompt, setImagePrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    // 错误状态
    const [imagePromptError, setImagePromptError] = useState("");
    const [textError, setTextError] = useState("");
    const [imageError, setImageError] = useState("");
    const [audioError, setAudioError] = useState("");
    const [videoError, setVideoError] = useState("");

    const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const [videoProgress, setVideoProgress] = useState(0);
    const [showVideoPreview, setShowVideoPreview] = useState(false);

    const [effectFileCache, setEffectFileCache] = useState<File | null>(null);
    const [isPreloading, setIsPreloading] = useState(false);
    // 初始化FFmpeg
    useEffect(() => {
        const initFFmpeg = async () => {
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpeg();
                const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
                await ffmpegRef.current.load({
                    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                });
            }
        };
        initFFmpeg();
    }, []);

    // 防止请求超时的安全机制
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isGenerating) {
            timeoutId = setTimeout(() => {
                if (isGenerating) {
                    setIsGenerating(false);
                    setError("Generation process timed out, please check your network connection or try again");
                }
            }, 180000); // 3分钟超时保护
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isGenerating]);


    const preloadEffectFile = async () => {
        if (effectFileCache || isPreloading) return; // 避免重复下载

        setIsPreloading(true);
        try {
            console.log('开始预加载特效文件...');
            const effectFile = await downloadFileInChunks(EFFECT_FILE_URL);
            setEffectFileCache(effectFile);
            console.log('特效文件预加载完成');
        } catch (error) {
            console.error('特效文件预加载失败:', error);
            // 预加载失败不影响主流程，用户点击生成时会重新下载
        } finally {
            setIsPreloading(false);
        }
    };

    // 页面加载完成后开始预加载
    useEffect(() => {
        // 延迟3秒开始预加载，避免影响页面初始加载性能
        const timer = setTimeout(() => {
            preloadEffectFile();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // 主生成函数
    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt");
            return;
        }

        if (isGenerating) return;

        // 重置所有状态
        setError("");
        setIsGenerating(true);
        setImagePrompt("");
        setGeneratedText("");
        setImageUrl("");
        setAudioUrl("");
        setVideoUrl("");
        setImagePromptError("");
        setTextError("");
        setImageError("");
        setAudioError("");
        setVideoError("");
        setVideoProgress(0);
        setShowVideoPreview(false);

        // 立即显示所有加载状态
        setImagePromptLoading(true);
        setTextLoading(true);
        setImageLoading(true);
        setAudioLoading(true);
        setVideoLoading(false); // 视频稍后开始

        try {
            // 步骤1: 并发生成图片提示词和文本
            setImagePromptLoading(true);
            setTextLoading(true);

            const [imagePromptResult, textResult] = await Promise.allSettled([
                generateImagePrompt(prompt),
                generateText(prompt)
            ]);

            // 处理图片提示词结果
            if (imagePromptResult.status === 'fulfilled' && imagePromptResult.value) {
                setImagePrompt(imagePromptResult.value);
                setImagePromptLoading(false);

                // 步骤2: 使用图片提示词生成图片
                setImageLoading(true);
                try {
                    const imageResult = await generateImage(imagePromptResult.value);
                    if (imageResult) {
                        setImageUrl(imageResult);
                    }
                } catch (err: any) {
                    setImageError(err.message);
                } finally {
                    setImageLoading(false);
                }
            } else {
                setImagePromptError("Failed to generate image prompt");
                setImagePromptLoading(false);
            }

            // 处理文本结果
            if (textResult.status === 'fulfilled' && textResult.value) {
                setGeneratedText(textResult.value);
                setTextLoading(false);

                // 步骤3: 使用生成的文本生成音频
                setAudioLoading(true);
                try {
                    const audioResult = await generateAudio(textResult.value);
                    if (audioResult) {
                        setAudioUrl(audioResult);
                    }
                } catch (err: any) {
                    setAudioError(err.message);
                } finally {
                    setAudioLoading(false);
                }
            } else {
                setTextError("Failed to generate text");
                setTextLoading(false);
            }

        } catch (error: any) {
            console.error("Generation error:", error);
            setError(error.message || "An error occurred during generation");
        } finally {
            setIsGenerating(false);
        }
    };

    // 当图片和音频都生成完成后，自动生成视频
    useEffect(() => {
        if (imageUrl && audioUrl && !videoLoading && !videoUrl) {
            generateVideo();
        }
    }, [imageUrl, audioUrl]);

    // 生成图片提示词
    const generateImagePrompt = async (userPrompt: string): Promise<string> => {
        const response = await fetch("/api/italian-brainrot-video/generate-image-prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userPrompt }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to generate image prompt");
        }
        return data.processedPrompt;
    };

    // 生成文本
    const generateText = async (userPrompt: string): Promise<string> => {
        const response = await fetch("/api/italian-brainrot-video/generate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userPrompt }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to generate text");
        }
        return data.text;
    };

    // 生成图片
    const generateImage = async (promptText: string): Promise<string> => {
        const response = await fetch("/api/italian-brainrot-video/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptText }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to generate image");
        }
        return data.imageUrl;
    };

    // 生成音频
    const generateAudio = async (textContent: string): Promise<string> => {
        const response = await fetch("/api/italian-brainrot-video/generate-audio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: textContent }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to generate audio");
        }
        return data.audioUrl;
    };

    // 生成视频
    // 生成视频
    // 生成视频 - 添加详细调试
    // 修改后的生成视频函数 - 避免网络请求
    const generateVideo = async () => {
        if (!imageUrl || !audioUrl || !ffmpegRef.current) return;

        setVideoLoading(true);
        setVideoError("");
        setShowVideoPreview(true);
        setVideoProgress(0);

        try {
            const ffmpeg = ffmpegRef.current;

            const progressHandler = ({ progress }: { progress: number }) => {
                if (progress > 0) {
                    const adjustedProgress = 20 + Math.round(progress * 79);
                    setVideoProgress(adjustedProgress);
                }
            };

            try {
                ffmpeg.off('progress', progressHandler);
            } catch (e) {
                // 忽略清除错误
            }

            ffmpeg.on('progress', progressHandler);

            setVideoProgress(2);
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();

            const audioResponse = await fetch(audioUrl);
            const audioBlob = await audioResponse.blob();

            setVideoProgress(5);

            let effectFile: File;
            if (effectFileCache) {
                console.log('使用预加载的特效文件');
                effectFile = effectFileCache;
                setVideoProgress(13); // 直接跳到13%
            } else {
                console.log('实时下载特效文件（预加载未完成）');
                effectFile = await downloadFileInChunks(EFFECT_FILE_URL);
                setVideoProgress(13);
            }

            await ffmpeg.writeFile('image.jpg', await fetchFile(imageBlob));
            await ffmpeg.writeFile('audio.wav', await fetchFile(audioBlob));
            await ffmpeg.writeFile('effect.mov', await fetchFile(effectFile));

            setVideoProgress(20);

            await ffmpeg.exec([
                '-loop', '1', '-i', 'image.jpg',
                '-stream_loop', '-1', '-i', 'effect.mov',
                '-i', 'audio.wav',
                '-filter_complex',
                '[0:v]scale=1080:1080[bg];[1:v]scale=1080:1080[fx];[bg][fx]overlay=0:0',
                '-map', '2:a',
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-pix_fmt', 'yuv420p',
                '-crf', '28',
                '-preset', 'ultrafast',
                '-tune', 'fastdecode',
                '-x264-params', 'ref=1:bframes=0:me=dia:subme=1:analyse=none:trellis=0:deblock=0,0', // 极速x264参数
                '-shortest',
                '-y',
                'output.mp4'
            ]);

            setVideoProgress(90);

            const videoData = await ffmpeg.readFile('output.mp4');
            const videoBlob = new Blob([videoData], { type: 'video/mp4' });
            const videoUrl = URL.createObjectURL(videoBlob);

            setVideoUrl(videoUrl);
            setVideoProgress(100);

            await ffmpeg.deleteFile('image.jpg');
            await ffmpeg.deleteFile('audio.wav');
            await ffmpeg.deleteFile('effect.mov');
            await ffmpeg.deleteFile('output.mp4');

            ffmpeg.off('progress', progressHandler);

        } catch (error: any) {
            console.error("Video generation error:", error);
            setVideoError("Failed to generate video: " + error.message);
        } finally {
            setVideoLoading(false);
            setShowVideoPreview(false);
        }
    };

    async function downloadFileInChunks(url: string): Promise<File> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        const contentLength = parseInt(response.headers.get('content-length') || '0');
        const reader = response.body?.getReader();

        if (!reader) {
            throw new Error('ReadableStream not supported');
        }

        const chunks: Uint8Array[] = [];
        let receivedLength = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            const downloadProgress = Math.round((receivedLength / contentLength) * 8);
            setVideoProgress(5 + downloadProgress);
        }

        const uint8Array = new Uint8Array(receivedLength);
        let position = 0;

        for (const chunk of chunks) {
            uint8Array.set(chunk, position);
            position += chunk.length;
        }

        const file = new File([uint8Array], 'brainrot-effect.mov', {
            type: 'video/quicktime'
        });

        return file;
    }
    // 下载函数
    const downloadFile = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 清理临时URL
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            // 如果下载失败，回退到原来的方法
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // 复制文本
    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(generatedText);
            // 可以添加复制成功的提示
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-black text-white">
            {/* 导航栏 */}
            <nav className="w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-xl font-bold gradient-text">
                            AI Italian Brainrot
                        </Link>
                        <div className="flex space-x-6">
                            <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                                Home
                            </Link>
                            <Link href="/italian-brainrot-generator" className="text-gray-300 hover:text-purple-400 transition-colors">
                                Italian Brainrot Generator 2.0
                            </Link>
                            <Link href="/pdf-to-brainrot" className="text-gray-300 hover:text-purple-400 transition-colors">
                                PDF to Brainrot
                            </Link>
                            <div
                                className="relative"
                                onMouseEnter={() => setShowAIToolsDropdown(true)}
                                onMouseLeave={() => setShowAIToolsDropdown(false)}
                            >
                                <span className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                                    AI Brainrot Tools
                                    <svg className="ml-1 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                                {showAIToolsDropdown && (
                                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-56 z-50">
                                        <div className="h-4 w-full"></div>
                                        <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-3">
                                            <Link
                                                href="/italian-brainrot-translator"
                                                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors"
                                            >
                                                Italian Brainrot Translator
                                            </Link>
                                            <Link
                                                href="/brainrot-voice-generator"
                                                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors"
                                            >
                                                Brainrot Voice Generator
                                            </Link>
                                            <Link
                                                href="/italian-brainrot-clicker"
                                                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors"
                                            >
                                                Italian Brainrot Clicker
                                            </Link>
                                            <Link
                                                href="/italian-brainrot-video"
                                                className="block px-4 py-3 text-purple-400 bg-gray-800 transition-colors"
                                            >
                                                Italian Brainrot Video
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="z-10 max-w-5xl w-full items-center justify-center text-center px-4 py-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 gradient-text">
                    Italian Brainrot Video
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-400">
                    Create stunning Italian brainrot video content with AI-generated visuals, surreal text, and immersive audio. Transform your ideas into captivating italian brainrot video experiences.
                </p>

                {/* 功能区 */}
                <div className="mb-8">
                    <textarea
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] transition-all duration-300"
                        placeholder="Describe your italian brainrot video concept: pizza dancing robot, flying pasta monster, singing gelato..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isGenerating}
                    />
                    {error && <p className="text-red-400 mt-2">{error}</p>}
                    <button
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg mt-4 w-full sm:w-auto transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                    >
                        {isGenerating ? <BeatLoader color="#ffffff" size={8} /> : "Generate Italian Brainrot Video"}
                    </button>
                </div>

                {/* 生成结果展示区域 */}
                {(isGenerating || videoUrl || imageUrl || audioUrl || generatedText ||
                    imagePromptError || textError || imageError || audioError || videoError) && (
                        <div className="space-y-8 w-full">
                            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                                <h2 className="text-2xl font-bold mb-6 text-left text-white">Italian Brainrot Video Generation Results</h2>

                                {/* 视频区域 */}
                                <div className="mb-8 flex flex-col items-center">
                                    <h3 className="text-lg font-semibold mb-4 text-left text-gray-300 w-full">Generated Italian Brainrot Video</h3>
                                    <div className="w-full max-w-sm">
                                        {videoLoading && showVideoPreview && imageUrl ? (
                                            // 真正合成时的状态 - 保持不变
                                            <div className="space-y-4">
                                                <div className="w-full aspect-square relative">
                                                    <img
                                                        src={imageUrl}
                                                        alt="Video Preview"
                                                        className="w-full h-full rounded-lg object-cover filter grayscale"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg">
                                                        <div className="bg-white rounded-full p-4 mb-4">
                                                            <BeatLoader color="#8B5CF6" size={8} />
                                                        </div>
                                                        <p className="text-white font-semibold text-lg">Composing Video...</p>
                                                        <p className="text-gray-300 text-sm">{videoProgress}%</p>
                                                        <div className="w-48 bg-gray-700 rounded-full h-2 mt-3">
                                                            <div
                                                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${videoProgress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (videoLoading || imageLoading || audioLoading || textLoading) ? (
                                            <div className="w-full aspect-square flex flex-col justify-center items-center bg-gray-800 rounded-lg">
                                                <BeatLoader color="#8B5CF6" size={12} />
                                                <p className="text-gray-400 mt-4">Preparing italian brainrot video...</p>
                                            </div>
                                        ) : videoError ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-red-400">{videoError}</p>
                                            </div>
                                        ) : videoUrl ? (
                                            <div className="space-y-4">
                                                <div className="w-full aspect-square">
                                                    <video
                                                        ref={videoRef}
                                                        controls
                                                        className="w-full h-full rounded-lg"
                                                    >
                                                        <source src={videoUrl} type="video/mp4" />
                                                        Your browser does not support the video element.
                                                    </video>
                                                </div>
                                                <button
                                                    onClick={() => downloadFile(videoUrl, 'italian-brainrot-video.mp4')}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                                >
                                                    Download Video
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-gray-500">Your italian brainrot video will appear here</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 下方三个内容区域 */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                                    {/* 音频区域 */}
                                    {/* 音频区域 */}
                                    <div className="flex flex-col h-full w-64">
                                        <h3 className="text-lg font-semibold mb-3 text-left text-gray-300">Audio</h3>
                                        {audioLoading ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <BeatLoader color="#8B5CF6" />
                                            </div>
                                        ) : audioError ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-red-400 text-sm">{audioError}</p>
                                            </div>
                                        ) : audioUrl ? (
                                            <>
                                                <div className="mb-3">
                                                    <div className="w-full aspect-square flex items-center justify-center bg-gray-800 rounded-lg p-4">
                                                        <audio ref={audioRef} controls className="w-full">
                                                            <source src={audioUrl} type="audio/wav" />
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </div>
                                                </div>
                                                <div className="flex-1"></div>
                                                <button
                                                    onClick={() => downloadFile(audioUrl, 'italian-brainrot-audio.wav')}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm w-full transition-colors"
                                                >
                                                    Download Audio
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-gray-500 text-sm">Audio will appear here</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* 图片区域 */}
                                    {/* 图片区域 */}
                                    <div className="flex flex-col h-full w-64">
                                        <h3 className="text-lg font-semibold mb-3 text-left text-gray-300">Image</h3>
                                        {imageLoading ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <BeatLoader color="#8B5CF6" />
                                            </div>
                                        ) : imageError ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-red-400 text-sm">{imageError}</p>
                                            </div>
                                        ) : imageUrl ? (
                                            <>
                                                <div className="mb-3">
                                                    <div className="w-full aspect-square">
                                                        <img
                                                            src={imageUrl}
                                                            alt="Generated Italian Brainrot"
                                                            className="w-full h-full rounded-lg object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1"></div>
                                                <button
                                                    onClick={() => downloadFile(imageUrl, 'italian-brainrot-image.jpg')}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm w-full transition-colors"
                                                >
                                                    Download Image
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-gray-500 text-sm">Image will appear here</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* 文本区域 */}
                                    {/* 文本区域 */}
                                    <div className="flex flex-col h-full w-64">
                                        <h3 className="text-lg font-semibold mb-3 text-left text-gray-300">Text</h3>
                                        {textLoading ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <BeatLoader color="#8B5CF6" />
                                            </div>
                                        ) : textError ? (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-red-400 text-sm">{textError}</p>
                                            </div>
                                        ) : generatedText ? (
                                            <>
                                                <div className="mb-3">
                                                    <div className="bg-gray-800 rounded-lg p-3 h-32 overflow-y-auto">
                                                        <p className="text-gray-300 text-sm italic text-left">{generatedText}</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1"></div>
                                                <button
                                                    onClick={copyText}
                                                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm w-full transition-colors"
                                                >
                                                    Copy Text
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full aspect-square flex justify-center items-center bg-gray-800 rounded-lg">
                                                <p className="text-gray-500 text-sm">Text will appear here</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* SEO区域 - 优化后的布局和内容 */}
            <div className="max-w-5xl w-full mt-16 px-4">
                {/* 主标题区域 */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Ultimate Italian Brainrot Video Generator
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Create viral italian brainrot video content with cutting-edge AI technology. Transform your creative ideas into
                        captivating italian brainrot video experiences that dominate social media platforms worldwide.
                    </p>
                </div>

                {/* 特色功能网格 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-purple-300">
                            🎬 Advanced Italian Brainrot Video Creation
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">Multi-Modal AI Processing</h3>
                                <p className="text-gray-300">
                                    Our italian brainrot video generator employs sophisticated AI models to simultaneously create images,
                                    text, and audio. Each italian brainrot video component is crafted with precision to maintain the
                                    authentic surreal aesthetic that defines the italian brainrot phenomenon.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">Real-Time Video Composition</h3>
                                <p className="text-gray-300">
                                    Experience lightning-fast italian brainrot video generation with our optimized FFmpeg processing.
                                    From concept to completed italian brainrot video, our system delivers professional-quality results
                                    in minutes, not hours.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">
                            🚀 Why Choose Our Italian Brainrot Video Tool
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-green-300">Unlimited Creative Freedom</h3>
                                <p className="text-gray-300">
                                    Generate unlimited italian brainrot video content without restrictions. Our platform supports
                                    endless creativity, allowing you to produce unique italian brainrot video concepts that capture
                                    the essence of this viral internet movement.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-green-300">Professional Quality Output</h3>
                                <p className="text-gray-300">
                                    Every italian brainrot video features high-resolution 1080p visuals, crystal-clear Italian audio
                                    narration, and seamless special effects integration. Share your italian brainrot video creations
                                    across all major social media platforms with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 流程展示 */}
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                        How Italian Brainrot Video Generation Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-lg font-semibold mb-2 text-purple-300">Input Your Concept</h3>
                            <p className="text-gray-300 text-sm">
                                Describe your italian brainrot video idea with creative prompts that blend Italian culture with surreal elements.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-pink-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-lg font-semibold mb-2 text-pink-300">AI Content Generation</h3>
                            <p className="text-gray-300 text-sm">
                                Our AI creates enhanced image prompts and authentic italian brainrot text simultaneously for your video.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-lg font-semibold mb-2 text-blue-300">Media Synthesis</h3>
                            <p className="text-gray-300 text-sm">
                                Generate high-quality 3D visuals and natural Italian voice narration for complete italian brainrot video experience.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                            <h3 className="text-lg font-semibold mb-2 text-green-300">Video Compilation</h3>
                            <p className="text-gray-300 text-sm">
                                Automatic video composition with special effects creates your final downloadable italian brainrot video masterpiece.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 双列内容区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-orange-300">
                            🎯 Italian Brainrot Video Creative Strategies
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-yellow-300">Viral Content Creation Techniques</h3>
                                <p className="text-gray-300 mb-3">
                                    Master the art of italian brainrot video creation with proven strategies that maximize engagement.
                                    Combine traditional Italian cultural elements with unexpected fantastical concepts to create
                                    italian brainrot video content that resonates with global audiences.
                                </p>
                                <p className="text-gray-300">
                                    Successful italian brainrot video themes include anthropomorphic food characters, time-traveling
                                    cultural icons, and everyday objects with human characteristics navigating absurd Italian scenarios.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-yellow-300">Trending Italian Brainrot Video Ideas</h3>
                                <p className="text-gray-300">
                                    Explore popular italian brainrot video concepts: dancing pizza chef robots in Venice, flying
                                    spaghetti monsters terrorizing Rome, singing espresso cups with legs, gelato vendors traveling
                                    through time, and pasta-powered flying machines. Each italian brainrot video concept offers
                                    unlimited creative possibilities.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-cyan-300">
                            📈 Italian Brainrot Video Marketing Power
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-teal-300">Social Media Dominance</h3>
                                <p className="text-gray-300 mb-3">
                                    Italian brainrot video content consistently achieves viral status across TikTok, Instagram,
                                    YouTube, and Twitter. The unique aesthetic and humor of italian brainrot video perfectly
                                    matches current social media trends and algorithm preferences.
                                </p>
                                <p className="text-gray-300">
                                    Content creators using italian brainrot video report 300% higher engagement rates compared
                                    to traditional video content, with italian brainrot video posts receiving significantly
                                    more shares and comments.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-teal-300">Brand Integration Opportunities</h3>
                                <p className="text-gray-300">
                                    Smart brands leverage italian brainrot video aesthetics for memorable marketing campaigns.
                                    The surreal nature of italian brainrot video creates lasting impressions while maintaining
                                    entertainment value that audiences actively seek and share.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ区域 */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">
                        Frequently Asked Questions About Italian Brainrot Video
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">What makes italian brainrot video content unique?</h3>
                                <p className="text-gray-300">
                                    Italian brainrot video combines distinctive 3D character aesthetics with surreal Italian-themed scenarios.
                                    Each italian brainrot video features exaggerated designs, vibrant colors, absurdist humor, and authentic
                                    Italian narration creating immersive multimedia experiences that define the italian brainrot movement.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">How long does italian brainrot video generation take?</h3>
                                <p className="text-gray-300">
                                    Complete italian brainrot video generation typically requires 2-4 minutes including AI processing for
                                    images, text, audio, and video compilation. Our optimized workflow ensures rapid italian brainrot video
                                    creation without compromising quality or authenticity of the final output.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">Can I customize my italian brainrot video style?</h3>
                                <p className="text-gray-300">
                                    Yes! Our italian brainrot video generator adapts to your creative input while maintaining core aesthetic
                                    principles. Experiment with different prompt combinations to discover unique italian brainrot video styles
                                    that match your creative vision and brand requirements.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-300">Is the italian brainrot video generator completely free?</h3>
                                <p className="text-gray-300">
                                    Our italian brainrot video generator offers completely free access with no hidden costs, subscription
                                    requirements, or usage limits. Create unlimited italian brainrot video content, download all generated
                                    materials, and access every feature without restrictions or watermarks.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-300">What formats can I download my italian brainrot video in?</h3>
                                <p className="text-gray-300">
                                    Download your italian brainrot video in high-quality MP4 format optimized for all social media platforms.
                                    Additionally, access individual components including high-resolution images (JPG), audio files (WAV), and
                                    generated Italian text for maximum flexibility in your italian brainrot video projects.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-300">How can I optimize my italian brainrot video for viral success?</h3>
                                <p className="text-gray-300">
                                    Successful italian brainrot video creation combines unexpected element fusion, cultural contrast, and
                                    emotional engagement. Focus on prompts that blend familiar Italian themes with surprising fantastical
                                    elements to create italian brainrot video content that captures viewer attention and encourages sharing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 技术特性展示 */}
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/50 rounded-xl p-8">
                    <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
                        Advanced Italian Brainrot Video Technology
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-indigo-600 rounded-lg p-6 mb-4">
                                <h3 className="text-xl font-semibold mb-3 text-white">AI-Powered Generation</h3>
                                <p className="text-indigo-100 text-sm">
                                    State-of-the-art GPT models create authentic italian brainrot video prompts and surreal Italian text
                                    that captures the essence of this viral phenomenon.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-600 rounded-lg p-6 mb-4">
                                <h3 className="text-xl font-semibold mb-3 text-white">High-Quality Rendering</h3>
                                <p className="text-purple-100 text-sm">
                                    Advanced SDXL-Lightning generates stunning 1080p italian brainrot video visuals with professional
                                    3D character designs and cinematic lighting effects.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-pink-600 rounded-lg p-6 mb-4">
                                <h3 className="text-xl font-semibold mb-3 text-white">Seamless Video Composition</h3>
                                <p className="text-pink-100 text-sm">
                                    Browser-based FFmpeg.wasm technology enables real-time italian brainrot video compilation with
                                    special effects integration for complete multimedia experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 页脚区域 */}
            <footer className="w-full bg-gray-900 border-t border-gray-800 py-8 mt-16">
                <div className="max-w-6xl mx-auto px-4">
                    {/* 页脚导航 */}
                    <div className="flex justify-center mb-8">
                        <div className="grid grid-cols-5 gap-32">
                            {/* Generator 列 */}
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-300">Generator</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">AI Italian Brainrot Generator</div>
                                    </Link>
                                    <Link href="/italian-brainrot-generator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Italian Brainrot Generator 2.0</div>
                                    </Link>
                                    <Link href="/brainrot-voice-generator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Brainrot Voice Generator</div>
                                    </Link>
                                    <Link href="/italian-brainrot-video" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-purple-400 whitespace-nowrap">Italian Brainrot Video</div>
                                    </Link>
                                </div>
                            </div>

                            {/* PDF 列 */}
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-300">PDF</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/pdf-to-brainrot" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">PDF to Brainrot</div>
                                    </Link>
                                </div>
                            </div>

                            {/* Translator 列 */}
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-300">Translator</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/italian-brainrot-translator" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Italian Brainrot Translator</div>
                                    </Link>
                                </div>
                            </div>

                            {/* Game 列 */}
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-300">Game</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/italian-brainrot-clicker" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Italian Brainrot Clicker</div>
                                    </Link>
                                </div>
                            </div>

                            {/* Support 列 */}
                            <div className="flex flex-col">
                                <h4 className="text-sm font-bold mb-3 text-left text-gray-300">Support</h4>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/about-us" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">About Us</div>
                                    </Link>
                                    <div className="text-left pl-0 pr-1 py-1 relative">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap cursor-pointer group">
                                            Contact Us
                                            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                                We'd love to hear from you!
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/privacy-policy" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Privacy Policy</div>
                                    </Link>
                                    <Link href="/terms-and-conditions" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                                        <div className="text-sm text-gray-400 hover:text-purple-400 whitespace-nowrap">Terms and Conditions</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 分隔线 */}
                    <div className="w-full border-t-2 border-gray-700 mb-6"></div>

                    {/* 原页脚内容 */}
                    <div className="text-center text-gray-400 text-sm">
                        <div className="mb-4">
                            <a
                                href="https://italianbrainrots.org"
                                className="text-xl font-bold text-gray-300 hover:text-gray-100 transition-colors"
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
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                All in AI Tools
                            </a>

                            <span className="mx-2">•</span>
                            <a
                                href="https://right-ai.com/"
                                title="RightAI Tools Directory"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                RightAI Tools Directory
                            </a>

                            <span className="mx-2">•</span>
                            <a
                                href="https://aijustworks.com"
                                title="AI Just Works"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                AI Just Works
                            </a>

                            <span className="mx-2">•</span>
                            <a
                                href="https://SeekAIs.com/"
                                title="SeekAIs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
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