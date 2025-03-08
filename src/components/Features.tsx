
import { Bookmark, Calendar, MessageCircle, BarChart3 } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Features = () => {
  const features = [
    {
      icon: <Calendar size={32} className="text-stayflow-600" />,
      title: "予約一元管理",
      description: "Airbnbなど複数サイトの予約を一括管理。スケジュール調整も自動化。",
      delay: 100
    },
    {
      icon: <Bookmark size={32} className="text-stayflow-600" />,
      title: "清掃管理システム",
      description: "チェックアウト後の清掃予約を自動で手配。品質チェックも徹底。",
      delay: 200
    },
    {
      icon: <MessageCircle size={32} className="text-stayflow-600" />,
      title: "ゲスト対応機能",
      description: "多言語対応のチャットボットで24時間自動応答。緊急時は専門スタッフが対応。",
      delay: 300
    },
    {
      icon: <BarChart3 size={32} className="text-stayflow-600" />,
      title: "収支分析",
      description: "物件ごとの収支状況、稼働率、顧客満足度などを分析し改善提案。",
      delay: 400
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              主な機能
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              民泊運営管理をシンプルに
            </h2>
            <p className="text-lg text-muted-foreground">
              民泊ビジネスを効率化するために必要なツールを全て提供する包括的なプラットフォーム
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={feature.delay} className="h-full">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-6 p-4 inline-flex items-center justify-center rounded-xl bg-stayflow-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200} className="mt-16">
          <div className="bg-stayflow-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stayflow-100 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">物件管理を効率化する準備はできていますか？</h3>
              <p className="text-lg text-muted-foreground mb-8">
                StayFlowで民泊ビジネスをシンプルにした数百の成功したホストに加わりましょう
              </p>
              <a href="#pricing" className="btn-primary inline-flex">
                今すぐ始める
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;
