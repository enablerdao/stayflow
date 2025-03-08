
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const testimonials = [
    {
      name: "鈴木 健一",
      role: "京都の町家宿泊施設オーナー",
      image: "/images/japanese-tatami-room.jpg", // Using a tatami room image
      quote: "10軒の町家を管理していますが、以前は予約の二重登録や清掃スケジュールの混乱が頻繁でした。StayFlowの導入後、これらの問題が解消され、運営効率が40%も向上しました。特に外国人ゲストへの自動メッセージ機能は非常に助かっています。"
    },
    {
      name: "中村 直子",
      role: "大阪のゲストハウス経営者",
      image: "/images/japanese-chair-modern.jpg", // Using a modern Japanese chair image
      quote: "当初は従来の方法に固執していましたが、StayFlowに切り替えてから予約管理の時間が1日あたり2時間も短縮されました。複数プラットフォームからの予約を一元管理できる点が最大の魅力です。今では友人の民泊オーナーにも薦めています。"
    },
    {
      name: "佐藤 洋介",
      role: "東京の不動産投資家・民泊5物件オーナー",
      image: "/images/traditional-zaisu.jpg", // Using a traditional Japanese floor chair (zaisu) image
      quote: "投資物件を増やすごとに管理の複雑さも増していました。StayFlowのダッシュボードでは各物件の稼働率や収益性を一目で確認でき、データに基づいた意思決定ができるようになりました。清掃スタッフとのコミュニケーションも格段に改善されています。"
    },
    {
      name: "山田 恵子",
      role: "北海道のコテージ運営者",
      image: "/images/ryokan-interior.jpg", // Using a traditional Japanese inn interior image
      quote: "季節によって予約状況が大きく変動する中、StayFlowの需要予測機能は価格設定に非常に役立っています。また、リピーター向けの特別プランの提案も簡単にできるようになり、顧客満足度と利益率の両方が向上しました。導入して本当に良かったです。"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
                お客様の声
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">実際のご利用者様からの感想</h2>
              <p className="text-muted-foreground mt-4">全国各地のさまざまな宿泊施設オーナー様からいただいた貴重なフィードバックです</p>
            </div>
            
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="左にスクロール"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="右にスクロール"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </FadeIn>
        
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={100 * index} className="min-w-[350px] max-w-[350px] flex-shrink-0">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border h-full flex flex-col">
                <div className="mb-6">
                  <Quote size={32} className="text-stayflow-200" />
                </div>
                
                <p className="text-lg mb-8 flex-grow">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                    <div 
                      className="w-full h-full bg-center bg-cover" 
                      style={{ 
                        backgroundImage: `url(${testimonial.image})`,
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <div className="md:hidden flex justify-center mt-6 space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="左にスクロール"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="右にスクロール"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
