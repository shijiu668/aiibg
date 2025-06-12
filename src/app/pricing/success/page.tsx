"use client"

import { useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const { refreshProfile } = useUser()

  useEffect(() => {
    // 刷新用户信息以获取最新的订阅状态
    refreshProfile()
  }, [refreshProfile])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Subscription Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for subscribing! Your credits have been added to your account and you can now enjoy premium features.
          </p>
          
          <div className="space-y-4">
            <Link href="/" className="btn-primary block w-full text-center">
              Start Creating
            </Link>
            <Link href="/pricing" className="text-purple-600 hover:text-purple-500 text-sm">
              Manage Pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}