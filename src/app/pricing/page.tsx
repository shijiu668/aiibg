// 修改您的订阅页面，添加 Paddle.js 集成

"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'
import { subscriptionPlans } from '@/constants/subscription-plans'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import AuthModal from '@/components/AuthModal'
import CreditDisplay from '@/components/CreditDisplay'

export default function SubscriptionPage() {
  const { user, profile, loading, signOut, refreshProfile } = useUser()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin'
  })
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<string | null>(null)
  const [paddleLoaded, setPaddleLoaded] = useState(false)
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [isCanceling, setIsCanceling] = useState(false);

  // Paddle.js 加载完成后的回调
  const handlePaddleLoad = () => {
    console.log('=== 🔍 PADDLE LOAD DEBUG ===')
    console.log('1. Paddle.js loaded successfully')
    console.log('2. Window.Paddle exists:', !!window.Paddle)

    setPaddleLoaded(true)

    if (window.Paddle) {
      console.log('3. Setting Paddle environment...')
      const env = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox'
      console.log('4. Environment:', env)

      window.Paddle.Environment.set(env)
      console.log('5. Environment set successfully')

      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      console.log('6. Client token (first 20 chars):', token?.substring(0, 20))
      console.log('7. Client token length:', token?.length)

      window.Paddle.Initialize({
        token: token
      })
      console.log('8. Paddle initialized successfully')

      // 🔍 验证初始化
      setTimeout(() => {
        console.log('9. Post-initialization check:')
        console.log('   - Paddle.Environment:', window.Paddle.Environment)
        console.log('   - Paddle.Checkout available:', !!window.Paddle.Checkout)
      }, 1000)
    } else {
      console.error('❌ Window.Paddle not available after load load')
    }
    console.log('=== 🔍 PADDLE LOAD DEBUG END ===')
  }
  // 🆕 显示支付成功模态框
  const showPaymentSuccessModal = () => {
    setShowSuccessModal(true)
    setCountdown(5)
  }

  // 🆕 倒计时效果
  useEffect(() => {
    if (!showSuccessModal) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // 倒计时结束，自动跳转
          handleSuccessRedirect()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showSuccessModal])

  // 🆕 处理成功跳转
  const handleSuccessRedirect = async () => {
    setShowSuccessModal(false)

    // 刷新用户资料
    if (refreshProfile) {
      await refreshProfile()
    }

    // 跳转到成功页面
    router.push('/pricing/success')
  }

  // 🆕 手动刷新按钮
  const handleManualRefresh = () => {
    window.location.reload()
  }

  const handleSubscribe = async (planId: string) => {
    console.log('=== 🔍 SUBSCRIPTION DEBUG START ===')
    console.log('1. Plan ID:', planId)
    console.log('2. User:', user)
    console.log('3. Profile:', profile)
    console.log('4. Paddle Loaded:', paddleLoaded)
    console.log('5. Window.Paddle exists:', !!window.Paddle)

    if (!user) {
      console.log('❌ No user found')
      setAuthModal({ isOpen: true, mode: 'signin' })
      return
    }

    if (planId === 'basic') {
      alert('You already have the Basic Plan! This is your default free plan.')
      return
    }

    if (profile?.subscription_status === planId) {
      const planName = planId === 'pro' ? 'Pro Plan' : planId === 'premium' ? 'Premium Plan' : planId;
      alert(`You already have the ${planName}! Your subscription is currently active.`)
      return
    }

    if (!paddleLoaded || !window.Paddle) {
      console.log('❌ Paddle not loaded:', { paddleLoaded, windowPaddle: !!window.Paddle })
      alert('Payment system is loading, please try again in a moment.')
      return
    }

    setIsCheckoutLoading(planId)

    try {
      const plan = subscriptionPlans.find(p => p.id === planId)
      console.log('6. Found plan:', plan)

      if (!plan) {
        console.log('❌ Plan not found for ID:', planId)
        setIsCheckoutLoading(null)
        return
      }

      const priceId = billingCycle === 'monthly'
        ? plan.paddleMonthlyPriceId
        : plan.paddleYearlyPriceId

      console.log('7. Billing cycle:', billingCycle)
      console.log('8. Selected price ID:', priceId)

      // 🔧 添加价格 ID 验证
      if (!priceId) {
        console.error('❌ Price ID is empty for plan:', planId, 'billing cycle:', billingCycle)
        alert('Configuration error: Missing price information. Please contact support.')
        setIsCheckoutLoading(null)
        return
      }

      // 🔧 验证价格 ID 格式
      if (!priceId.startsWith('pri_')) {
        console.error('❌ Invalid price ID format:', priceId)
        alert('Configuration error: Invalid price format. Please contact support.')
        setIsCheckoutLoading(null)
        return
      }

      console.log('9. Environment variables:')
      console.log('   - PADDLE_ENV:', process.env.NEXT_PUBLIC_PADDLE_ENV)
      console.log('   - CLIENT_TOKEN:', process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.substring(0, 20) + '...')

      // 🔧 检查环境匹配
      const isLiveToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.startsWith('live_')
      const isProdEnv = process.env.NEXT_PUBLIC_PADDLE_ENV === 'production'

      if (isLiveToken && !isProdEnv) {
        console.warn('⚠️ Live token but not production environment')
      } else if (!isLiveToken && isProdEnv) {
        console.warn('⚠️ Production environment but not live token')
      }

      // 🔍 检查 Paddle 环境和初始化
      console.log('10. Paddle Environment Check:')
      if (window.Paddle) {
        console.log('   - Paddle object exists')
        console.log('   - Paddle.Environment:', window.Paddle.Environment)
        console.log('   - Paddle.Checkout:', !!window.Paddle.Checkout)
      }

      const checkoutData = {
        items: [
          {
            priceId: priceId,
            quantity: 1
          }
        ],
        customer: {
          email: user.email
        },
        customData: {
          user_id: user.id
        },
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en',
          // 🔧 添加更多配置来解决字体问题
          allowLogout: true,
          showAddDiscounts: true,
          allowDiscountRemoval: true,
          showAddTaxId: true,
          variant: 'multi-page'
        }
      }

      console.log('11. Checkout data:', JSON.stringify(checkoutData, null, 2))
      console.log('12. Opening Paddle checkout...')

      // 使用 Paddle.js 直接打开支付弹窗
      window.Paddle.Checkout.open({
        ...checkoutData,
        onComplete: (data: any) => {
          console.log('✅ Payment completed:', data)

          // 显示成功消息并开始倒计时
          showPaymentSuccessModal()
        },
        onError: (error: any) => {
          console.error('❌ Payment error:', error)
          console.log('Payment error details:', JSON.stringify(error, null, 2))

          // 🔧 改进错误信息
          let errorMessage = 'Payment failed. '
          if (error.code === 'checkout_invalid_items') {
            errorMessage += 'Invalid product configuration. Please contact support.'
          } else if (error.code === 'checkout_invalid_customer') {
            errorMessage += 'Customer information error. Please try again.'
          } else if (error.code === 'checkout_invalid_price') {
            errorMessage += 'Product pricing error. Please contact support.'
          } else if (error.message) {
            errorMessage += error.message
          } else {
            errorMessage += 'Please try again or contact support if the issue persists.'
          }

          alert(errorMessage)
          setIsCheckoutLoading(null)
        },
        onClose: () => {
          console.log('🔒 Checkout closed')
          setIsCheckoutLoading(null)
        }
      })

    } catch (error: any) {
      console.error('❌ Checkout error:', error)
      console.log('Error stack:', error.stack)
      console.log('Error details:', JSON.stringify(error, null, 2))

      // 🔧 改进错误信息
      let errorMessage = 'Failed to open checkout. '
      if (error.message?.includes('Invalid price')) {
        errorMessage += 'Product configuration error. Please contact support.'
      } else if (error.message?.includes('network')) {
        errorMessage += 'Network error. Please check your connection and try again.'
      } else {
        errorMessage += error.message || 'Please try again later.'
      }

      alert(errorMessage)
      setIsCheckoutLoading(null)
    } finally {
      console.log('=== 🔍 SUBSCRIPTION DEBUG END ===')
    }
  }

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? Your access will continue until the end of the current billing period.')) {
      return;
    }

    setIsCanceling(true);
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      alert('Your subscription has been scheduled for cancellation.');
      await refreshProfile(); // 刷新用户资料以更新UI

    } catch (error: any) {
      alert(`Failed to cancel subscription: ${error.message}`);
    } finally {
      setIsCanceling(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      {/* 加载 Paddle.js */}
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={handlePaddleLoad}
        strategy="afterInteractive"
      />
      {/* 导航栏 */}
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

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Get more credits for abstract artwork generation, surreal text creation, and entertainment voice synthesis
            </p>

            {/* 计费周期切换 */}
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${billingCycle === 'yearly' ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
              <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
                Yearly <span className="text-green-600 text-sm">(Save 16%)</span>
              </span>
            </div>

            {/* Paddle 加载状态 */}
            {!paddleLoaded && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-blue-700">Loading payment system...</p>
              </div>
            )}
          </div>
          {/* 当前状态 - 只在用户登录时显示 */}
          {user && profile && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Current Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{profile.credits}</div>
                  <div className="text-gray-600">Credits Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.subscription_status === 'basic' ? 'Basic Plan' :
                      profile.subscription_status === 'pro' ? 'Pro Plan' :
                        profile.subscription_status === 'premium' ? 'Premium Plan' :
                          profile.subscription_status || 'Basic Plan'}
                  </div>
                  <div className="text-gray-600">Current Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.subscription_status && profile.subscription_status !== 'basic' ? 'Active' : 'No Subscription'}
                  </div>
                  <div className="text-gray-600">Status</div>
                </div>

                <div className="text-center">
                  {profile.subscription_status && profile.subscription_status !== 'basic' && (
                    <button
                      onClick={handleCancelSubscription}
                      disabled={isCanceling}
                      className="btn-orange w-full md:w-auto" // 使用 'btn-orange' 样式
                    >
                      {isCanceling ? 'Canceling...' : 'Cancel Subscription'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {profile && (profile.subscription_status === 'basic' || !profile.subscription_status) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-700">
                🎉 You're currently on our Basic Plan with {profile.credits} credits!
                Upgrade to get more credits for abstract art generation and entertainment content creation.
              </p>
            </div>
          )}


          {/* 合规说明 - 在订阅计划网格之前添加 */}

          {/* 订阅计划 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl p-8 shadow-lg relative flex flex-col h-full ${plan.popular && profile?.subscription_status !== plan.id ? 'ring-2 ring-purple-500' : ''
                  } ${(plan.id === 'basic' && (profile?.subscription_status === 'basic' || !profile?.subscription_status)) ||
                    (plan.id !== 'basic' && profile?.subscription_status === plan.id)
                    ? 'ring-2 ring-green-400 bg-green-50'
                    : ''
                  }`}
              >
                {plan.popular && profile?.subscription_status !== plan.id && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {((plan.id === 'basic' && (profile?.subscription_status === 'basic' || !profile?.subscription_status)) ||
                  (plan.id !== 'basic' && profile?.subscription_status === plan.id)) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Current Plan
                      </span>
                    </div>
                  )}
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <span className="text-4xl font-bold gradient-text">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-600">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>

                    <div className="text-lg font-semibold text-purple-600">
                      {plan.monthlyCredits} credits
                      <span className="text-sm text-gray-500 block">
                        every month
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={
                      (plan.id === 'basic' && (profile?.subscription_status === 'basic' || !profile?.subscription_status)) ||
                      profile?.subscription_status === plan.id ||
                      isCheckoutLoading === plan.id ||
                      (plan.id !== 'basic' && !paddleLoaded)
                    }
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${(plan.id === 'basic' && (profile?.subscription_status === 'basic' || !profile?.subscription_status)) || profile?.subscription_status === plan.id
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } ${(!paddleLoaded || isCheckoutLoading === plan.id) && plan.id !== 'basic' && profile?.subscription_status !== plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {(plan.id === 'basic' && (profile?.subscription_status === 'basic' || !profile?.subscription_status))
                      ? '✓ Current Plan'
                      : profile?.subscription_status === plan.id
                        ? '✓ Current Plan'
                        : isCheckoutLoading === plan.id
                          ? 'Opening Checkout...'
                          : !paddleLoaded
                            ? 'Loading...'
                            : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-12 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🎯 Service Features & Deliverables</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-700">
              <div>
                <h4 className="font-semibold mb-2">Abstract Art Generation</h4>
                <ul className="text-sm space-y-1">
                  <li>• 3D rendered objects and shapes</li>
                  <li>• Food-themed artistic creations</li>
                  <li>• Surreal landscape scenes</li>
                  <li>• Abstract geometric designs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Text Content Creation</h4>
                <ul className="text-sm space-y-1">
                  <li>• Humorous Italian-style text</li>
                  <li>• Surreal narrative content</li>
                  <li>• Creative writing prompts</li>
                  <li>• Entertainment scripts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Voice Synthesis</h4>
                <ul className="text-sm space-y-1">
                  <li>• Text-to-speech conversion</li>
                  <li>• Multiple voice styles</li>
                  <li>• Audio file downloads</li>
                  <li>• Entertainment narration</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🎨 What You Get With Our Service</h3>
            <div className="text-blue-700 space-y-2">
              <p><strong>✅ Abstract Artwork Generation:</strong> Create unique 3D rendered objects, food items, and surreal landscapes in Italian Brainrot style</p>
              <p><strong>✅ Surreal Text Creation:</strong> Generate entertaining Italian-style text content for creative projects</p>
              <p><strong>✅ Entertainment Voice Synthesis:</strong> Convert text to stylized audio narration for fun content</p>
              <p><strong>❌ What We Don't Generate:</strong> No human faces, realistic characters, face swaps, deepfakes, or voice impersonations</p>
            </div>
          </div>
        </div>
      </main>

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
                  <Link href="/italian-brainrot-video" className="text-left pl-0 pr-1 py-1 rounded transition-colors">
                    <div className="text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap">Italian Brainrot Video</div>
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
      {/* 🆕 支付成功模态框 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your subscription has been activated and credits have been added to your account.
              </p>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-medium">
                  Redirecting in {countdown} seconds...
                </p>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(5 - countdown) * 20}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSuccessRedirect}
                  className="btn-primary flex-1"
                >
                  Continue Now
                </button>
                <button
                  onClick={handleManualRefresh}
                  className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex-1 hover:bg-gray-300 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ ...authModal, mode })}
      />
    </>
  )
}