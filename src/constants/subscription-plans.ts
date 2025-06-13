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
      '20 free credits for abstract content generation',
      'Access to abstract artwork generator',
      'Access to surreal text generator',
      'Access to entertainment voice synthesis',
      'No human face or character generation'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    description: 'For power users',
    monthlyPrice: 3.99,   // 更新为新价格
    yearlyPrice: 38.99,   // 更新为新价格
    monthlyCredits: 300,  // 保持现有积分数
    yearlyCredits: 3600,  // 保持现有积分数
    paddleMonthlyPriceId: 'pri_01jxf820hwcqfwj2tda66jdj6b',  // 保持现有ID
    paddleYearlyPriceId: 'pri_01jxf82kt83527z1bvcs8mvtwq',   // 保持现有ID
    features: [
      '300 credits per month for content generation',
      'Access to all abstract art generators',
      'Access to surreal text and voice tools',
      'Priority support',
      'Early access to new entertainment features',
      'Faster generation processing'
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
    yearlyCredits: 12000, // 保持现有积分数
    paddleMonthlyPriceId: 'pri_01jxf83w0mst0z40ve94c3dhxv',  // 保持现有ID
    paddleYearlyPriceId: 'pri_01jxf84azfh6xm8yf9rcv75jjd',   // 保持现有ID
    features: [
      '1000 credits per month for content generation',
      'Access to all abstract art generators',
      'Access to premium text and voice tools',
      'Priority support with dedicated assistance',
      'Fastest generation processing speed',
      'Early access to new entertainment features',
      'Advanced customization options'
    ]
  }
]