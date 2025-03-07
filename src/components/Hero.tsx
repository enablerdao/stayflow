
import { ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-72 h-72 bg-stayflow-100 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-stayflow-200 rounded-full filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn direction="up" delay={100}>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-6">
                Vacation Rental Management Simplified
              </span>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Streamline Your <span className="text-stayflow-600">Rental Property</span> Management
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                All-in-one platform for vacation rental hosts. Manage bookings, cleaning, guest communication and more in one place.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#features" 
                  className="btn-primary"
                >
                  Explore Features
                </a>
                <a 
                  href="#pricing" 
                  className="btn-outline flex items-center justify-center gap-2"
                >
                  View Pricing <ArrowRight size={16} />
                </a>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={500}>
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-stayflow-200 border-2 border-white flex items-center justify-center text-stayflow-800 font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">300+</span> properties managed with StayFlow
                </p>
              </div>
            </FadeIn>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <FadeIn direction="left" delay={300} className="relative z-10">
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl glass-card p-2">
                <div className="absolute inset-0 bg-gradient-radial from-stayflow-100/50 to-transparent rounded-2xl"></div>
                <div className="relative h-full w-full rounded-xl overflow-hidden bg-stayflow-50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-stayflow-500"></div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">StayFlow Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Streamlined management at your fingertips</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <div className="absolute top-1/2 -right-14 transform -translate-y-1/2 w-28 h-28 rounded-full bg-stayflow-100 animate-pulse-subtle hidden lg:block"></div>
            <div className="absolute bottom-10 -left-10 w-20 h-20 rounded-full bg-stayflow-200 animate-float hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
