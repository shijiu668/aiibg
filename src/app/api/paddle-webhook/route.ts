import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  console.log('Webhook received at:', new Date().toISOString())

  try {
    const body = await request.text()
    const signature = request.headers.get('paddle-signature')

    console.log('Webhook signature present:', !!signature)
    console.log('Signature value:', signature)

    // 检查是否是测试模式（没有签名的请求）
    const isTestMode = !signature && process.env.NODE_ENV === 'development'

    if (isTestMode) {
      console.log('🧪 Running in TEST MODE - skipping signature verification')
    } else if (process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET && signature) {
      // 验证webhook签名（修复版本）
      try {
        const webhookSecret = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET
        console.log('Using webhook secret (first 10 chars):', webhookSecret.substring(0, 10))

        // Paddle v2 签名格式通常是 ts=timestamp;h1=signature
        const signatureParts = signature.split(';')
        let timestamp = ''
        let hash = ''

        for (const part of signatureParts) {
          const [key, value] = part.split('=')
          if (key === 'ts') {
            timestamp = value
          } else if (key === 'h1') {
            hash = value
          }
        }

        if (!timestamp || !hash) {
          console.log('Signature format not recognized, trying direct hash comparison')
          // 尝试直接哈希比较
          const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex')

          // 去掉可能的前缀
          const receivedHash = signature.replace('sha256=', '').replace('h1=', '')

          if (expectedSignature !== receivedHash) {
            console.error('Direct signature verification failed')
            console.log('Expected:', expectedSignature.substring(0, 10) + '...')
            console.log('Received:', receivedHash.substring(0, 10) + '...')
            // 在开发环境中继续执行，生产环境中返回错误
            if (process.env.NODE_ENV === 'production') {
              return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
            } else {
              console.log('⚠️ Signature mismatch in development - continuing anyway')
            }
          } else {
            console.log('✅ Direct signature verification successful')
          }
        } else {
          // 使用 timestamp + body 验证
          const signedPayload = `${timestamp}:${body}`
          const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(signedPayload)
            .digest('hex')

          if (expectedSignature !== hash) {
            console.error('Timestamped signature verification failed')
            console.log('Expected:', expectedSignature.substring(0, 10) + '...')
            console.log('Received:', hash.substring(0, 10) + '...')
            // 在开发环境中继续执行
            if (process.env.NODE_ENV === 'production') {
              return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
            } else {
              console.log('⚠️ Signature mismatch in development - continuing anyway')
            }
          } else {
            console.log('✅ Timestamped signature verification successful')
          }
        }
      } catch (sigError) {
        console.error('Signature verification error:', sigError)
        // 在开发环境中继续执行，生产环境中返回错误
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 })
        } else {
          console.log('⚠️ Signature verification error in development - continuing anyway')
        }
      }
    }

    let event
    try {
      event = JSON.parse(body)
    } catch (parseError) {
      console.error('Failed to parse webhook body:', parseError)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    console.log('Webhook event type:', event.event_type)
    console.log('Event data keys:', Object.keys(event.data || {}))

    try {
      switch (event.event_type) {
        case 'subscription.created':
        case 'subscription.updated':
          await handleSubscriptionEvent(event.data)
          break

        case 'subscription.canceled':
          await handleSubscriptionCanceled(event.data)
          break

        case 'transaction.completed':  // 只在支付完成时处理
          await handleTransactionCompleted(event.data)
          break

        default:
          console.log('Unhandled event type:', event.event_type)
      }
    } catch (handlerError) {
      console.error('Event handler error:', handlerError)
      return NextResponse.json({ error: 'Event processing failed' }, { status: 500 })
    }

    return NextResponse.json({
      received: true,
      event_type: event.event_type,
      signature_verified: !!signature
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSubscriptionEvent(subscription: any) {
  const userId = subscription.custom_data?.user_id
  console.log('Processing subscription event for user:', userId)

  if (!userId) {
    console.error('No user_id in subscription custom_data')
    return
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({
        subscription_id: subscription.id,
        subscription_status: subscription.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating subscription:', error)
    } else {
      console.log('Successfully updated subscription for user:', userId)
    }
  } catch (dbError) {
    console.error('Database error in handleSubscriptionEvent:', dbError)
  }
}

async function handleSubscriptionCanceled(subscription: any) {
  const userId = subscription.custom_data?.user_id
  console.log('Processing subscription cancellation for user:', userId)

  if (!userId) {
    console.error('No user_id in subscription custom_data')
    return
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({
        subscription_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error canceling subscription:', error)
    } else {
      console.log('Successfully canceled subscription for user:', userId)
    }
  } catch (dbError) {
    console.error('Database error in handleSubscriptionCanceled:', dbError)
  }
}

async function handleTransactionCompleted(transaction: any) {
  const userId = transaction.custom_data?.user_id
  console.log('=== PROCESSING TRANSACTION COMPLETED ===')
  console.log('Transaction ID:', transaction.id)
  console.log('User ID:', userId)
  console.log('Transaction status:', transaction.status)
  console.log('Full transaction data:', JSON.stringify(transaction, null, 2))
  
  if (!userId) {
    console.error('No user_id in transaction custom_data')
    console.log('Available custom_data:', transaction.custom_data)
    return
  }

  try {
    // 获取用户当前信息
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single()

    if (fetchError || !user) {
      console.error('Error fetching user:', fetchError)
      return
    }

    console.log('Current user credits:', user.credits)

    // 计算要添加的积分
let creditsToAdd = 0
let subscriptionStatus = 'basic' // 默认状态
const items = transaction.items || []

console.log('Transaction items count:', items.length)

for (const item of items) {
  const priceId = item.price?.id
  console.log('Processing item with price ID:', priceId)

  switch (priceId) {
    // Pro Plan
    case 'pri_01jyftxm20q7yfdag5th7c9kyy': // Pro Monthly
      creditsToAdd += 300
      subscriptionStatus = 'pro'
      break
    case 'pri_01jyfv27cw7fn06j41zzj5t7r0': // Pro Yearly
      creditsToAdd += 3600
      subscriptionStatus = 'pro'
      break

    // Premium Plan
    case 'pri_01jyfvanmgsmzzw0gpcbbvw3h3': // Premium Monthly
      creditsToAdd += 1000
      subscriptionStatus = 'premium'
      break
    case 'pri_01jyfvbkbmwvjr3vphfhg8vx08': // Premium Yearly
      creditsToAdd += 12000
      subscriptionStatus = 'premium'
      break

    default:
      console.warn('Unknown price ID:', priceId)
  }
}

console.log('Credits to add:', creditsToAdd)
console.log('Subscription status to set:', subscriptionStatus)

if (creditsToAdd > 0) {
  console.log(`Adding ${creditsToAdd} credits to user ${userId} and setting subscription to ${subscriptionStatus}`)

  // 更新用户积分和订阅状态
  const { error: updateError } = await supabase
    .from('users')
    .update({
      credits: user.credits + creditsToAdd,
      subscription_status: subscriptionStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

      if (updateError) {
        console.error('Error updating user credits:', updateError)
      } else {
        console.log(`✅ Successfully updated user credits from ${user.credits} to ${user.credits + creditsToAdd}`)

        // 记录积分获得
        const { error: transactionError } = await supabase
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: creditsToAdd,
            type: 'earned',
            description: `Subscription payment - ${creditsToAdd} credits added (Transaction: ${transaction.id})`
          })

        if (transactionError) {
          console.error('Error recording credit transaction:', transactionError)
        } else {
          console.log(`✅ Successfully recorded credit transaction`)
        }
      }
    } else {
      console.log('No credits to add for this transaction')
    }
  } catch (dbError) {
    console.error('Database error in handleTransactionCompleted:', dbError)
  }
}