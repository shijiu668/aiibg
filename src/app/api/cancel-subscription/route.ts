import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Paddle } from '@paddle/paddle-node-sdk'
import type { Database } from '@/lib/supabase'

const paddle = new Paddle(process.env.PADDLE_API_KEY!)

export async function POST() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in to cancel a subscription.' },
        { status: 401 }
      )
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('subscription_id, subscription_status')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Could not find your user profile.' },
        { status: 500 }
      )
    }

    if (!profile.subscription_id || (profile.subscription_status !== 'pro' && profile.subscription_status !== 'premium')) {
      return NextResponse.json(
        { error: 'No active subscription found to cancel.' },
        { status: 400 }
      )
    }

    // ================= 修正的部分 =================
    // 将 subscription_id 作为第一个参数，选项作为第二个参数传入
    const canceledSubscription = await paddle.subscriptions.cancel(
      profile.subscription_id,
      { effectiveFrom: 'next_billing_period' }
    )
    // ===========================================

    await supabase
      .from('users')
      .update({
        subscription_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    return NextResponse.json({
      message: 'Your subscription has been successfully canceled and will remain active until the end of the current billing period.',
      subscriptionId: canceledSubscription.id
    })

  } catch (error: any) {
    console.error('An unexpected error occurred during subscription cancellation:', error)
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` },
      { status: 500 }
    )
  }
}