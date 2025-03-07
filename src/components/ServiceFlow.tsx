
import { ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const ServiceFlow = () => {
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Securely gather user data",
      icon: "📊",
      delay: 100
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Advanced algorithm processing",
      icon: "🧠",
      delay: 200
    },
    {
      number: "03",
      title: "Personalization",
      description: "Individually optimized solutions",
      icon: "✨",
      delay: 300
    },
    {
      number: "04",
      title: "Value Delivery",
      description: "Achieving concrete results",
      icon: "🚀",
      delay: 400
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How StayFlow Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined approach ensures maximum value for your vacation rental business
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={step.delay} className="h-full">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border h-full relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 -mr-4 z-10 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight size={24} className="text-stayflow-300" />
                  </div>
                )}
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-stayflow-600">{step.number}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300} className="mt-20">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Continuous Improvement Cycle</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {["Plan", "Execute", "Measure", "Improve"].map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="bg-stayflow-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                      <span className="text-stayflow-700 font-bold">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold">{phase}</h4>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                        <ArrowRight size={20} className="text-stayflow-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-muted-foreground">
                StayFlow emphasizes continuous improvement. Based on user feedback, we constantly enhance service quality and develop new features to consistently deliver the best experience.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServiceFlow;
