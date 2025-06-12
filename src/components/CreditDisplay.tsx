"use client"

import { useUser } from '@/contexts/UserContext'

export default function CreditDisplay() {
  const { profile } = useUser()

  if (!profile) return null

  return (
    <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg">
      <span className="text-sm font-medium text-gray-700 mr-2">Credits:</span>
      <span className="text-lg font-bold gradient-text">{profile.credits}</span>
    </div>
  )
}