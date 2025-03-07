
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
      name: "Kenichi Suzuki",
      role: "Vacation Rental Owner, Tokyo Stay Properties",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "StayFlow has dramatically reduced my management workload. The automated cleaning scheduling is excellent, and guest ratings have improved significantly."
    },
    {
      name: "Misaki Tanaka",
      role: "Property Manager, Osaka Guest Houses",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "The ability to manage reservations from multiple platforms in one place is incredibly convenient. The financial analysis features have been instrumental in improving our business strategy."
    },
    {
      name: "Hiroshi Yamamoto",
      role: "Boutique Hotel Owner, Kyoto Accommodations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "Since implementing StayFlow, our operational efficiency has increased by 40%. The guest communication system has significantly reduced our response time while maintaining personalization."
    },
    {
      name: "Yuki Nakamura",
      role: "Real Estate Investor, Hokkaido Properties",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      quote: "Managing multiple vacation properties across different locations was a challenge until I found StayFlow. Now I can monitor performance metrics and handle guest interactions from anywhere."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
            </div>
            
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Scroll right"
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
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
