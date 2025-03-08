
import FadeIn from './animations/FadeIn';

const Roadmap = () => {
  const milestones = [
    {
      title: "短期目標",
      description: "登録ホスト数100件、管理物件数300件達成",
      timeframe: "今後6ヶ月",
      color: "bg-stayflow-100",
      borderColor: "border-stayflow-300",
      textColor: "text-stayflow-800",
      delay: 100
    },
    {
      title: "中期目標",
      description: "市場シェアの拡大とユーザー基盤の確立",
      timeframe: "1-2年",
      color: "bg-stayflow-200",
      borderColor: "border-stayflow-400",
      textColor: "text-stayflow-800",
      delay: 200
    },
    {
      title: "長期ビジョン",
      description: "業界リーダーとしての地位確立と海外展開",
      timeframe: "3-5年",
      color: "bg-stayflow-300",
      borderColor: "border-stayflow-500",
      textColor: "text-stayflow-900",
      delay: 300
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              開発ロードマップ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              未来への展望
            </h2>
            <p className="text-lg text-muted-foreground">
              StayFlowが今後どのように進化・改善していくかをご紹介します
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <FadeIn key={index} delay={milestone.delay} className="h-full">
              <div className={`h-full rounded-2xl border-2 ${milestone.borderColor} p-8 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${milestone.color} opacity-20 -mr-10 -mt-10`}></div>
                
                <div className="relative z-10">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${milestone.color} ${milestone.textColor} mb-4`}>
                    {milestone.timeframe}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
                  <p className="text-muted-foreground mb-4">{milestone.description}</p>
                  
                  <ul className="space-y-2">
                    {index === 0 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>フィードバックに基づいたUIの改善</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>より多くの予約プラットフォームとの連携追加</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>清掃サービスパートナーシップの拡大</span>
                        </li>
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>モバイルアプリケーションのリリース</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>高度なAIレコメンデーションの実装</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>総合的な分析ダッシュボードの開発</span>
                        </li>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>国際市場への展開</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>民泊管理ツールのエコシステム構築</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>業界最先端のAI機能の開発</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
