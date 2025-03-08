
import { ExternalLink } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const InfoSection = () => {
  const serviceInfo = {
    name: "StayFlow",
    japaneseName: "ステイフロー - 民泊運営管理",
    rank: "S",
    marketSize: "約3兆円規模",
    goal: "登録ホスト数100件、管理物件数300件達成",
    domain: "stayflowapp.com"
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
                  サービス情報
                </span>
                <h2 className="text-3xl font-bold mb-6">StayFlowについて</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">サービス名</div>
                  <div className="col-span-2">{serviceInfo.name}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">日本語名</div>
                  <div className="col-span-2">{serviceInfo.japaneseName}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">ランク</div>
                  <div className="col-span-2">Rank {serviceInfo.rank}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">市場規模</div>
                  <div className="col-span-2">{serviceInfo.marketSize}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">目標</div>
                  <div className="col-span-2">{serviceInfo.goal}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-medium">ドメイン</div>
                  <div className="col-span-2">{serviceInfo.domain}</div>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span>サービスサイトを見る</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left">
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
                  私たちの理念
                </span>
                <h2 className="text-3xl font-bold mb-6">ミッション & ビジョン</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                  <h3 className="text-xl font-semibold mb-4">ミッション</h3>
                  <p className="text-lg">
                    "ホストの皆様の日々の負担を軽減し、心からのおもてなしができる環境を創造します。テクノロジーを通じて、あなたの大切な時間を解放し、本当に価値あることに集中できるよう支援します。"
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                  <h3 className="text-xl font-semibold mb-4">ビジョン</h3>
                  <p className="text-lg">
                    "すべての民泊ホストが情熱とおもてなしの心だけに集中できる世界を目指します。煩わしい管理業務から解放され、ゲストとの真の交流を育み、旅行者に忘れられない体験を提供できる社会を実現します。"
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
