
import { Check, ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const ServiceFlow = () => {
  const steps = [
    {
      number: "01",
      title: "データ収集と分析",
      description: "物件情報、予約状況、清掃スケジュール、顧客フィードバックを統合的に収集・分析",
      icon: "📊",
      features: [
        "複数予約サイトからのデータ統合",
        "過去の予約パターン分析",
        "季節変動要因の特定"
      ],
      delay: 100
    },
    {
      number: "02",
      title: "AI最適化エンジン",
      description: "収集したデータをもとに、AI技術で最適な運営戦略を提案",
      icon: "🧠",
      features: [
        "需要予測アルゴリズム",
        "価格最適化モデル",
        "効率的な清掃ルート設計"
      ],
      delay: 200
    },
    {
      number: "03",
      title: "運用自動化",
      description: "手動作業を排除し、重要な業務プロセスを完全自動化",
      icon: "⚙️",
      features: [
        "予約確認の自動送信",
        "チェックイン案内の配信",
        "緊急時対応フロー起動"
      ],
      delay: 300
    },
    {
      number: "04",
      title: "継続的最適化",
      description: "運用結果とフィードバックを分析し、さらなる改善点を特定",
      icon: "📈",
      features: [
        "満足度スコアの追跡",
        "収益性分析レポート",
        "改善ポイントの自動検出"
      ],
      delay: 400
    }
  ];

  const cyclicalProcess = [
    {
      title: "計画策定",
      description: "物件ごとの特性を考慮した最適な運営計画を立案",
      icon: "🗓️"
    },
    {
      title: "実行プロセス",
      description: "AIが最適化した運営計画に基づき、自動的に業務を実行",
      icon: "▶️"
    },
    {
      title: "データ測定",
      description: "運営結果、ゲスト体験、収益性を詳細に計測",
      icon: "📏"
    },
    {
      title: "分析・改善",
      description: "収集データを基に次サイクルの最適化ポイントを特定",
      icon: "🔄"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              サービスの流れ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              StayFlowの革新的プロセス
            </h2>
            <p className="text-lg text-muted-foreground">
              民泊運営における複雑な課題を解決する、StayFlowの先進的な4ステップアプローチ
            </p>
          </div>
        </FadeIn>

        <div className="relative mb-20">
          {/* 接続線 - デスクトップ */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-stayflow-100 via-stayflow-300 to-stayflow-100 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={step.delay} className="h-full">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border h-full relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/3 right-0 -mr-4 z-10 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-stayflow-500 rounded-full items-center justify-center text-white">
                      <ArrowRight size={16} />
                    </div>
                  )}
                  
                  <div className="mb-6 p-4 inline-flex items-center justify-center rounded-xl bg-stayflow-50">
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  
                  <div className="mb-3 flex items-center">
                    <span className="text-xl font-bold text-stayflow-600 mr-2">{step.number}</span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-5">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 text-stayflow-500"><Check size={16} /></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={300}>
          <div className="bg-gradient-to-r from-stayflow-50 to-stayflow-100/30 rounded-2xl p-8 md:p-12 mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">継続的改善サイクル</h3>
              <p className="text-muted-foreground">
                StayFlowは単なるツールではなく、プロセス全体を最適化する継続的なサイクルを実現します。
                データドリブンな意思決定と自動化された改善プロセスにより、常に最高のパフォーマンスを維持します。
              </p>
            </div>
            
            <div className="relative">
              {/* 円形の接続線 */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border-2 border-dashed border-stayflow-300 rounded-full z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {cyclicalProcess.map((phase, index) => (
                  <div key={index} className="relative">
                    <FadeIn delay={index * 100}>
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-white shadow-md rounded-full w-20 h-20 flex items-center justify-center mb-4 border-2 border-stayflow-200">
                          <span className="text-2xl">{phase.icon}</span>
                        </div>
                        <h4 className="font-semibold mb-2">{phase.title}</h4>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                    </FadeIn>
                    
                    {index < cyclicalProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-10 right-0 transform translate-x-1/2">
                        <ArrowRight size={20} className="text-stayflow-500" />
                      </div>
                    )}
                    {index === cyclicalProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-10 right-0 transform translate-x-1/2 rotate-[-135deg]">
                        <ArrowRight size={20} className="text-stayflow-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8 md:p-10">
            <div className="md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">プロセス最適化の具体例</h3>
                <p className="text-muted-foreground mb-4">
                  あるホストの事例：導入前は予約管理と清掃手配に1日2時間費やしていましたが、StayFlow導入後は
                  わずか15分に短縮。年間で約600時間の時間削減を実現し、その時間で物件数を2倍に増やすことができました。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-stayflow-500"><Check size={18} /></span>
                    <span>予約処理時間: 75%削減</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-stayflow-500"><Check size={18} /></span>
                    <span>ゲスト満足度: 23%向上</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-stayflow-500"><Check size={18} /></span>
                    <span>物件収益: 平均32%増加</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3">
                <div className="bg-stayflow-50 p-6 rounded-xl">
                  <h4 className="font-semibold mb-3 text-center">効率化の成果</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>時間削減</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-stayflow-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>収益向上</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-stayflow-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>顧客満足度</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-stayflow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServiceFlow;
