import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { priceId, userId, userEmail } = await request.json()

    console.log('Creating transaction for:', { priceId, userId, userEmail })

    // 使用正确的Paddle API格式，强制指定http://localhost:3000
    const paddleResponse = await fetch('https://sandbox-api.paddle.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
        'Paddle-Version': '1'
      },
      body: JSON.stringify({
        items: [
          {
            price_id: priceId,
            quantity: 1
          }
        ],
        customer_email: userEmail,
        collection_mode: 'automatic',
        custom_data: {
          user_id: userId
        },
        checkout: {
          url: null  // 强制使用 Paddle 内置支付页面
        }
      })
    })

    const responseText = await paddleResponse.text()
    console.log('Paddle API response status:', paddleResponse.status)
    console.log('Paddle API response:', responseText)

    let transactionData
    try {
      transactionData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse Paddle response:', parseError)
      throw new Error('Invalid response from Paddle API')
    }

    if (!paddleResponse.ok) {
      console.error('Paddle API error:', transactionData)
      throw new Error(transactionData.error?.detail || transactionData.error?.message || 'Failed to create transaction')
    }

    console.log('Transaction created successfully:', transactionData.data)

    // 直接使用Paddle返回的checkout URL
    return NextResponse.json({
      transactionId: transactionData.data.id,
      checkoutUrl: transactionData.data.checkout?.url,
      transactionData: transactionData.data
    })
  } catch (error: any) {
    console.error('Transaction creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create transaction' },
      { status: 500 }
    )
  }
}