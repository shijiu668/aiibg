"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createSupabaseClient } from '@/lib/supabase'

interface UserProfile {
  id: string
  email: string
  credits: number
  subscription_status: string | null
  subscription_id: string | null
}

interface UserContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  deductCredits: (amount: number, description: string) => Promise<boolean>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    let mounted = true

    // 初始化认证状态
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        console.log('Initial session:', session?.user?.email, error)
        
        if (mounted) {
          if (session?.user) {
            setUser(session.user)
            // 立即获取用户配置，不延迟
            await getProfile(session.user)
          } else {
            setUser(null)
            setProfile(null)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        if (!mounted) return

        if (session?.user) {
          setUser(session.user)
          // Google登录后可能需要稍微等待
          if (event === 'SIGNED_IN') {
            setTimeout(async () => {
              if (mounted) {
                await getProfile(session.user)
              }
            }, 100)
          } else {
            await getProfile(session.user)
          }
        } else {
          setUser(null)
          setProfile(null)
        }
        
        if (event !== 'INITIAL_SESSION') {
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function getProfile(currentUser?: User) {
    try {
      const userToUse = currentUser || user
      if (!userToUse) {
        console.log('No user available for profile fetch')
        return
      }

      console.log('Getting profile for user:', userToUse.email)
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userToUse.id)
        .single()

      console.log('Database query result:', { data, error })

      if (error && error.code === 'PGRST116') {
        console.log('Creating new user in database')
        // 用户不存在，创建新用户
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            id: userToUse.id,
            email: userToUse.email!,
            credits: 10, // 注册获得10积分
            subscription_status: 'basic'
          })
          .select()
          .single()

        console.log('User creation result:', { newUser, insertError })

        if (!insertError && newUser) {
          setProfile(newUser as UserProfile)
          // 记录积分获得
          await supabase.from('credit_transactions').insert({
            user_id: userToUse.id,
            amount: 10,
            type: 'earned',
            description: 'Registration bonus'
          })
        } else {
          console.error('Failed to create user:', insertError)
        }
      } else if (!error && data) {
        console.log('Setting existing user profile:', data)
        setProfile(data as UserProfile)
      } else if (error) {
        console.error('Database error:', error)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  async function refreshProfile() {
    await getProfile()
  }

  async function signOut() {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  async function deductCredits(amount: number, description: string): Promise<boolean> {
    if (!profile || profile.credits < amount) {
      return false
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          credits: profile.credits - amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (!error) {
        // 记录积分消费
        await supabase.from('credit_transactions').insert({
          user_id: profile.id,
          amount: -amount,
          type: 'spent',
          description
        })

        setProfile(prev => prev ? { ...prev, credits: prev.credits - amount } : null)
        return true
      }
    } catch (error) {
      console.error('Error deducting credits:', error)
    }
    return false
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
    deductCredits
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}