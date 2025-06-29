import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  
  console.log('Auth callback - Code:', code, 'Error:', error)

  // 如果有错误，直接重定向到首页并显示错误
  if (error) {
    console.error('Auth callback error:', error, error_description)
    return NextResponse.redirect(`${requestUrl.origin}?auth_error=${error}`)
  }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      
      // 交换代码获取会话
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('Session exchange result:', { 
        user: data?.user?.email, 
        session: !!data?.session,
        error: exchangeError 
      })
      
      if (exchangeError) {
        console.error('Auth callback error:', exchangeError)
        return NextResponse.redirect(`${requestUrl.origin}?auth_error=${exchangeError.message}`)
      }

      if (data.user) {
        console.log('User authenticated successfully:', data.user.email)
        
        // 确保用户在数据库中存在
        let isNewUser = false
        try {
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          if (fetchError && fetchError.code === 'PGRST116') {
            // 用户不存在，创建新用户
            isNewUser = true
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email!,
                credits: 10,
                subscription_status: 'basic'
              })

            if (!insertError) {
              // 记录注册奖励
              await supabase.from('credit_transactions').insert({
                user_id: data.user.id,
                amount: 10,
                type: 'earned',
                description: 'Registration bonus'
              })
            }
          }
        } catch (dbError) {
          console.error('Database operation error:', dbError)
          // 数据库错误不影响登录流程
        }

        // 成功认证后重定向到首页，并添加成功提示
        const redirectUrl = isNewUser 
          ? `${requestUrl.origin}?auth_success=welcome` 
          : `${requestUrl.origin}?auth_success=signin`
        
        const response = NextResponse.redirect(redirectUrl)
        
        // 添加缓存控制头，确保不缓存认证回调
        response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        
        return response
      }

    } catch (error) {
      console.error('Auth callback exception:', error)
      return NextResponse.redirect(`${requestUrl.origin}?auth_error=exchange_failed`)
    }
  }

  // 默认重定向到首页
  const response = NextResponse.redirect(requestUrl.origin)
  
  // 添加缓存控制头，确保不缓存认证回调
  response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  return response
}