export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  monthlyCredits: number
  yearlyCredits: number
  paddleMonthlyPriceId: string
  paddleYearlyPriceId: string
  features: string[]
  popular?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Perfect for getting started',
    monthlyPrice: 0,  // 免费
    yearlyPrice: 0,   // 免费
    monthlyCredits: 20,
    yearlyCredits: 240,
    paddleMonthlyPriceId: '',  // 免费计划无需支付
    paddleYearlyPriceId: '',   // 免费计划无需支付
    features: [
      '20 free credits',
      'Access to abstract artwork generator',
      'Access to surreal text generator'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    description: 'For power users',
    monthlyPrice: 3.99,   // 更新为新价格
    yearlyPrice: 38.99,   // 更新为新价格
    monthlyCredits: 300,  // 保持现有积分数
    yearlyCredits: 300,  // 保持现有积分数
    paddleMonthlyPriceId: 'pri_01jyftxm20q7yfdag5th7c9kyy',  // 保持现有ID
    paddleYearlyPriceId: 'pri_01jyfv27cw7fn06j41zzj5t7r0',   // 保持现有ID
    features: [
      '300 credits every month',
      'Access to all abstract art generators',
      'Priority support',
      'Early access to new entertainment features'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Unlimited creativity',
    monthlyPrice: 9.90,   // 更新为新价格
    yearlyPrice: 98.99,   // 更新为新价格
    monthlyCredits: 1000, // 保持现有积分数
    yearlyCredits: 1000, // 保持现有积分数
    paddleMonthlyPriceId: 'pri_01jyfvanmgsmzzw0gpcbbvw3h3',  // 保持现有ID
    paddleYearlyPriceId: 'pri_01jyfvbkbmwvjr3vphfhg8vx08',   // 保持现有ID
    features: [
      '1000 credits every month',
      'Access to all abstract art generators',
      'Priority support with dedicated assistance',
      'Fastest generation processing speed',
      'Early access to new entertainment features',
    ]
  }
]