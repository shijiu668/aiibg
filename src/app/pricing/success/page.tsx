"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const { user, profile, refreshProfile } = useUser()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 刷新用户信息以获取最新的订阅状态
        await refreshProfile()
        
        // 预加载主页和定价页面
        router.prefetch('/')
        router.prefetch('/pricing')
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error initializing success page:', error)
        setIsLoading(false)
      }
    }

    initializePage()
  }, [refreshProfile, router])

  // 处理导航到主页的函数
  const handleStartCreating = async () => {
    if (isNavigating) return // 防止重复点击
    
    setIsNavigating(true)
    
    try {
      // 确保用户数据已刷新
      await refreshProfile()
      
      // 使用 router.push 进行导航，比 Link 更快
      router.push('/')
    } catch (error) {
      console.error('Navigation error:', error)
      // 出错时仍然尝试导航
      router.push('/')
    }
  }

  // 如果还在加载中，显示加载状态
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="animate-spin w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Loading your account...
            </h1>
            
            <p className="text-gray-600">
              Please wait while we update your subscription details.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          {/* 成功图标 */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Subscription Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for subscribing! Your credits have been added to your account and you can now enjoy premium features.
          </p>

          {/* 操作按钮 */}
          <div className="space-y-4">
            <button
              onClick={handleStartCreating}
              disabled={isNavigating}
              className={`btn-primary block w-full text-center transition-all duration-200 ${
                isNavigating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isNavigating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Start Creating'
              )}
            </button>
            
            <Link href="/pricing" className="text-purple-600 hover:text-purple-500 text-sm">
              Manage Pricing
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}