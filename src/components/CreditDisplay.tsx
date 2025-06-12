"use client"

import { useUser } from '@/contexts/UserContext'

export default function CreditDisplay() {
  const { user, profile, loading } = useUser()

  // 只要用户登录就显示积分框
  if (!user) return null

  return (
    <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg">
      <span className="text-sm font-medium text-gray-700 mr-2">Credits:</span>
      {profile ? (
        <span className="text-lg font-bold gradient-text">{profile.credits}</span>
      ) : (
        <div className="flex items-center">
          <svg className="animate-spin h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-gray-500 ml-2">Loading...</span>
        </div>
      )}
    </div>
  )
}