import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 创建单一实例 - 使用更稳定的方式
let supabaseInstance: ReturnType<typeof createClientComponentClient> | null = null

export function createSupabaseClient() {
  if (typeof window === 'undefined') {
    // 服务端渲染时创建新实例
    return createClientComponentClient()
  }
  
  if (!supabaseInstance) {
    // 客户端只创建一次实例
    supabaseInstance = createClientComponentClient()
  }
  return supabaseInstance
}

// 备用的直接客户端，某些情况下可能需要
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          credits: number
          subscription_status: string | null
          subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          credits?: number
          subscription_status?: string | null
          subscription_id?: string | null
        }
        Update: {
          email?: string
          credits?: number
          subscription_status?: string | null
          subscription_id?: string | null
          updated_at?: string
        }
      }
      credit_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'earned' | 'spent' | 'refunded'
          description: string
          created_at: string
        }
        Insert: {
          user_id: string
          amount: number
          type: 'earned' | 'spent' | 'refunded'
          description: string
        }
      }
    }
  }
}