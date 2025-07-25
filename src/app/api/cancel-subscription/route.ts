import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Paddle from 'paddle-billing' // 最终修正：移除花括号，使用默认导入
import type { Database } from '@/lib/supabase'

// 初始化 Paddle 客户端
const paddle = new Paddle(process.env.PADDLE_API_KEY!)

export async function POST() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    // 1. 获取当前登录的用户信息
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Error getting user:', userError)
      return NextResponse.json(
        { error: 'You must be logged in to cancel a subscription.' },
        { status: 401 }
      )
    }

    // 2. 从你的数据库中获取用户的订阅信息
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('subscription_id, subscription_status')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      console.error('Error getting user profile:', profileError)
      return NextResponse.json(
        { error: 'Could not find your user profile.' },
        { status: 500 }
      )
    }

    // 检查用户是否真的有可以取消的订阅
    if (!profile.subscription_id || (profile.subscription_status !== 'pro' && profile.subscription_status !== 'premium')) {
      return NextResponse.json(
        { error: 'No active subscription found to cancel.' },
        { status: 400 }
      )
    }

    // 3. 调用 Paddle API 取消订阅
    const canceledSubscription = await paddle.subscriptions.cancel(profile.subscription_id, {
        effectiveFrom: 'next_billing_period'
    })

    console.log(`Successfully canceled subscription ${canceledSubscription.id} on Paddle.`);

    // 4. 更新 Supabase 数据库中的用户状态
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        subscription_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Failed to update user subscription status in DB:', updateError)
      return NextResponse.json({
        message: 'Subscription successfully canceled with payment provider, but failed to update status in our system. Please contact support.',
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Your subscription has been successfully canceled and will remain active until the end of the current billing period.',
      canceledSubscriptionId: canceledSubscription.id
    })

  } catch (error: any) {
    console.error('An unexpected error occurred during subscription cancellation:', error)
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` },
      { status: 500 }
    )
  }
}