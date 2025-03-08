
import { Check } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Pricing = () => {
  const plans = [
    {
      name: "ライト",
      price: "19,800",
      period: "月",
      description: "少数の物件で始めるホストに最適",
      features: [
        "3物件まで登録可能",
        "予約管理基本機能",
        "清掃スケジュール管理",
        "基本的なゲスト対応機能",
        "メールサポート"
      ],
      highlighted: false,
      delay: 100
    },
    {
      name: "スタンダード",
      price: "39,800",
      period: "月",
      description: "成長中の民泊ビジネス向け人気プラン",
      features: [
        "10物件まで登録可能",
        "予約一元管理（複数サイト対応）",
        "清掃サービス連携",
        "AIチャットボット対応",
        "収支レポート機能",
        "24時間サポート"
      ],
      highlighted: true,
      delay: 200
    },
    {
      name: "プロフェッショナル",
      price: "99,800",
      period: "月",
      description: "プロパティ管理ビジネス向けエンタープライズ級ソリューション",
      features: [
        "物件数無制限",
        "カスタムAPI連携",
        "専属アカウントマネージャー",
        "収益最適化AI",
        "完全自動化運用",
        "ブランドカスタマイズ",
        "優先サポート"
      ],
      highlighted: false,
      delay: 300
    }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-stayflow-50 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-stayflow-100 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              料金プラン
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              あなたのビジネスに最適なプランを選択
            </h2>
            <p className="text-lg text-muted-foreground">
              明瞭な料金設定で隠れた料金はありません。すべてのプランに基本機能が含まれています。
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={plan.delay} className="h-full">
              <div 
                className={`rounded-2xl h-full flex flex-col transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-stayflow-600 to-stayflow-700 text-white shadow-xl ring-2 ring-stayflow-400 scale-105' 
                    : 'bg-white border border-border'
                }`}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}プラン</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-3xl font-bold">¥{plan.price}</span>
                      <span className={`ml-2 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>/{plan.period}</span>
                    </div>
                    <p className={plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className={`flex-shrink-0 mr-3 p-0.5 rounded-full ${plan.highlighted ? 'bg-white/20' : 'bg-stayflow-100'}`}>
                          <Check size={16} className={plan.highlighted ? 'text-white' : 'text-stayflow-600'} />
                        </div>
                        <span className={plan.highlighted ? 'text-white/90' : ''}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contact" 
                    className={`w-full py-3 px-6 rounded-lg text-center transition-all font-medium ${
                      plan.highlighted
                        ? 'bg-white text-stayflow-700 hover:bg-white/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {plan.highlighted ? 'はじめる' : '申し込む'}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              特定の要件に合わせたカスタムソリューションが必要ですか？
            </p>
            <a 
              href="#contact" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              法人向けカスタム料金についてお問い合わせください →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;
