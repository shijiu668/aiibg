import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import * as PaddleBilling from 'paddle-billing' // Keep the namespace import
import type { Database } from '@/lib/supabase'

// FINAL FIX: Access the class from the .default property of the namespace
// We use 'as any' to bypass TypeScript's static analysis error
const paddle = new (PaddleBilling as any).default(process.env.PADDLE_API_KEY!)

export async function POST() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    // 1. Get user info
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

    // 2. Get user profile
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

    // 3. Check for active subscription
    if (!profile.subscription_id || (profile.subscription_status !== 'pro' && profile.subscription_status !== 'premium')) {
      return NextResponse.json(
        { error: 'No active subscription found to cancel.' },
        { status: 400 }
      )
    }

    // 4. Call Paddle API
    const canceledSubscription = await paddle.subscriptions.cancel(profile.subscription_id, {
        effectiveFrom: 'next_billing_period'
    })

    // 5. Update your database
    await supabase
      .from('users')
      .update({ 
        subscription_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

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