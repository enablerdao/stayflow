
import { Check } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Pricing = () => {
  const plans = [
    {
      name: "Light",
      price: "19,800",
      period: "month",
      description: "Perfect for hosts just starting with a few properties",
      features: [
        "Up to 3 properties",
        "Basic reservation management",
        "Cleaning schedule management",
        "Basic guest communication",
        "Email support"
      ],
      highlighted: false,
      delay: 100
    },
    {
      name: "Standard",
      price: "39,800",
      period: "month",
      description: "Our most popular plan for growing rental businesses",
      features: [
        "Up to 10 properties",
        "Multi-platform reservation management",
        "Cleaning service integration",
        "AI chatbot for guest communication",
        "Financial reporting",
        "24/7 support access"
      ],
      highlighted: true,
      delay: 200
    },
    {
      name: "Professional",
      price: "99,800",
      period: "month",
      description: "Enterprise-grade solution for property management businesses",
      features: [
        "Unlimited properties",
        "Custom API integration",
        "Dedicated account manager",
        "AI revenue optimization",
        "Fully automated operations",
        "Custom branding options",
        "Priority support"
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
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Choose the Perfect Plan for Your Business
            </h2>
            <p className="text-lg text-muted-foreground">
              Transparent pricing with no hidden fees. All plans include our core platform features.
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
                    <h3 className="text-xl font-bold mb-2">{plan.name} Plan</h3>
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
                    {plan.highlighted ? 'Get Started' : 'Subscribe'}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution for your specific requirements?
            </p>
            <a 
              href="#contact" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Contact us for custom enterprise pricing →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;
