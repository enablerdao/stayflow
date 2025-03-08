
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
      role: "民泊オーナー, Tokyo Stay Properties",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "StayFlowの導入で運営の手間が劇的に減りました。特に清掃管理の自動化は素晴らしく、ゲストからの評価も上がっています。"
    },
    {
      name: "田中 美咲",
      role: "運営管理者, Osaka Guest Houses",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "複数サイトの予約を一元管理できる点が非常に便利です。収支分析機能も経営の改善に役立っています。"
    },
    {
      name: "山本 博",
      role: "ブティックホテルオーナー, Kyoto Accommodations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "StayFlowを導入してから、業務効率が40%向上しました。ゲスト対応システムにより、パーソナライゼーションを維持しながら対応時間が大幅に短縮されました。"
    },
    {
      name: "中村 優希",
      role: "不動産投資家, Hokkaido Properties",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "複数の地域にまたがる民泊物件の管理は、StayFlowを見つけるまで課題でした。今では、どこからでもパフォーマンス指標を監視し、ゲストとのやり取りを処理できます。"
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
              <h2 className="text-3xl md:text-4xl font-bold">お客様からのご感想</h2>
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
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
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
