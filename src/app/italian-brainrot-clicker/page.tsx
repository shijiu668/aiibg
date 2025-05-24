"use client";

import Link from "next/link";

export default function ItalianBrainrotClicker() {
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
                Italian Brainrot Generator
              </Link>
              <Link href="/italian-brainrot-clicker" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Italian Brainrot Clicker
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="z-10 max-w-6xl w-full px-4 py-8">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-green-600">
            Italian Brainrot Clicker
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
            Experience the most addictive Italian Brainrot Clicker game! Click your way through surreal Italian adventures with viral characters and endless Italian Brainrot fun.
          </p>
        </div>

        {/* 游戏区域 */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Play Italian Brainrot Clicker Now!</h2>
              <p className="text-gray-600">Click to start your Italian Brainrot Clicker adventure</p>
            </div>
            
            {/* iframe游戏容器 */}
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-inner">
              <div className="aspect-video max-w-4xl mx-auto">
                <iframe
                  src="https://games.crazygames.com/en_US/italian-brainrot-clicker-usp/index.html?czyDynamicPriceFloorVariantsCZY_14537=portalandgameframe&amp;v=1.331"
                  className="w-full h-full rounded-xl border-2 border-green-300 shadow-lg"
                  title="Italian Brainrot Clicker Game"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                🎮 Use mouse to click and play • 🎯 Collect Italian Brainrot points • 🏆 Unlock achievements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO内容区域 - 独特的绿色主题样式 */}
      <div className="w-full bg-gradient-to-b from-green-100 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* 主要介绍区域 */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-8 text-green-800">
              The Ultimate Italian Brainrot Clicker Experience
            </h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-2 border-green-200">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Welcome to the most engaging Italian Brainrot Clicker game on the internet! Our Italian Brainrot Clicker combines the addictive mechanics of incremental gaming with the surreal charm of Italian Brainrot culture. This Italian Brainrot Clicker offers endless entertainment as you click your way through bizarre Italian adventures.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Italian Brainrot Clicker features authentic Italian Brainrot characters, surreal storylines, and progressive gameplay that keeps you engaged for hours. Experience the viral phenomenon of Italian Brainrot Clicker gaming with unique mechanics designed specifically for Italian Brainrot enthusiasts.
              </p>
            </div>
          </div>

          {/* 游戏特色网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-2xl border-3 border-green-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🎮</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">Addictive Italian Brainrot Clicker</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Our Italian Brainrot Clicker delivers the perfect balance of simple clicking mechanics and complex progression systems. The Italian Brainrot Clicker features multiple upgrade paths, achievements, and unlockable Italian Brainrot characters that keep the gameplay fresh and engaging.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-2xl border-3 border-green-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🇮🇹</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">Authentic Italian Brainrot Theme</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Experience authentic Italian Brainrot culture through our Italian Brainrot Clicker game. Every element of this Italian Brainrot Clicker incorporates genuine Italian Brainrot aesthetics, from surreal character designs to absurdist storylines that define the Italian Brainrot phenomenon.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-2xl border-3 border-green-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🏆</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">Progressive Italian Brainrot Clicker</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                The Italian Brainrot Clicker features comprehensive progression systems with multiple prestige levels, special Italian Brainrot events, and seasonal content updates. This Italian Brainrot Clicker grows with your skills, offering new challenges and rewards as you advance.
              </p>
            </div>
          </div>

          {/* 游戏玩法指南 */}
          <div className="bg-gradient-to-r from-white via-green-50 to-emerald-50 rounded-3xl p-12 shadow-2xl border-3 border-green-300 mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center text-green-800">
              How to Master Italian Brainrot Clicker
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-700">Italian Brainrot Clicker Basic Strategy</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <p className="text-gray-700">Start clicking the main Italian Brainrot Clicker button to accumulate points and unlock your first Italian Brainrot character upgrades.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <p className="text-gray-700">Invest in Italian Brainrot Clicker automation features to generate passive income while you focus on strategic clicking.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <p className="text-gray-700">Unlock special Italian Brainrot Clicker achievements and bonuses by completing specific milestone challenges.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-green-700">Advanced Italian Brainrot Clicker Tips</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">🎯</div>
                    <p className="text-gray-700">Time your Italian Brainrot Clicker special events and power-ups for maximum efficiency and point multiplication.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">⚡</div>
                    <p className="text-gray-700">Master the Italian Brainrot Clicker prestige system to reset with permanent bonuses and unlock exclusive content.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">🌟</div>
                    <p className="text-gray-700">Participate in limited-time Italian Brainrot Clicker events for rare rewards and leaderboard recognition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ部分 */}
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-3 border-green-300">
            <h2 className="text-3xl font-bold mb-12 text-center text-green-800">
              Italian Brainrot Clicker - Frequently Asked Questions
            </h2>
            <div className="space-y-10">
              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">What makes this Italian Brainrot Clicker special?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our Italian Brainrot Clicker stands out as the first clicker game specifically designed around Italian Brainrot culture. This Italian Brainrot Clicker incorporates authentic Italian Brainrot characters, surreal storylines, and unique progression mechanics that you won't find in any other Italian Brainrot Clicker game.
                </p>
              </div>

              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">Is the Italian Brainrot Clicker free to play?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! The Italian Brainrot Clicker is completely free to play with no hidden costs or required downloads. Simply load the Italian Brainrot Clicker in your browser and start clicking immediately. The Italian Brainrot Clicker offers optional premium features, but the core Italian Brainrot Clicker experience is entirely free.
                </p>
              </div>

              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">How does the Italian Brainrot Clicker progression work?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Italian Brainrot Clicker features multiple progression layers including character upgrades, automation systems, prestige mechanics, and achievement unlocks. As you advance in the Italian Brainrot Clicker, you'll unlock new Italian Brainrot characters, storylines, and gameplay mechanics that expand your Italian Brainrot Clicker experience.
                </p>
              </div>

              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">Can I save my Italian Brainrot Clicker progress?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Italian Brainrot Clicker automatically saves your progress to your browser's local storage. Your Italian Brainrot Clicker game state, achievements, and unlocked content are preserved between sessions. For enhanced security, the Italian Brainrot Clicker also offers cloud save options for registered players.
                </p>
              </div>

              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">What devices support the Italian Brainrot Clicker?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Italian Brainrot Clicker is optimized for all modern devices including desktop computers, laptops, tablets, and smartphones. The Italian Brainrot Clicker features responsive design that adapts to your screen size, ensuring the best Italian Brainrot Clicker experience regardless of your device.
                </p>
              </div>

              <div className="border-l-6 border-green-500 pl-8 bg-green-50 rounded-r-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">Are there multiplayer features in Italian Brainrot Clicker?</h3>
                <p className="text-gray-700 leading-relaxed">
                  While the core Italian Brainrot Clicker experience is single-player focused, the game includes competitive leaderboards, achievement sharing, and special multiplayer events. The Italian Brainrot Clicker community features allow you to compare progress with other Italian Brainrot Clicker enthusiasts worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg mb-4">© {new Date().getFullYear()} Italian Brainrot Clicker. All rights reserved.</p>
          <p className="text-gray-400 mb-6">
            Play the most addictive Italian Brainrot Clicker game online - Free Italian Brainrot Clicker experience
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <span className="text-gray-400">Recommended Gaming Sites:</span>
            <a
              title="All The Best AI Tools"
              href="https://allinai.tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              All in AI Tools
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://right-ai.com/"
              title="RightAI Tools Directory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              RightAI Tools Directory
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://aijustworks.com"
              title="AI Just Works"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              AI Just Works
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://SeekAIs.com/"
              title="SeekAIs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              SeekAIs - AI Tools Directory
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}