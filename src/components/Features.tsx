
import { Bookmark, Calendar, MessageCircle, BarChart3 } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Features = () => {
  const features = [
    {
      icon: <Calendar size={32} className="text-stayflow-600" />,
      title: "Reservation Management",
      description: "Centralize bookings from Airbnb and other platforms. Automatic schedule coordination.",
      delay: 100
    },
    {
      icon: <Bookmark size={32} className="text-stayflow-600" />,
      title: "Cleaning Management",
      description: "Automatically schedule cleaning services after checkout. Thorough quality assurance.",
      delay: 200
    },
    {
      icon: <MessageCircle size={32} className="text-stayflow-600" />,
      title: "Guest Communication",
      description: "Multilingual chatbot for 24/7 automated responses. Specialist support for emergencies.",
      delay: 300
    },
    {
      icon: <BarChart3 size={32} className="text-stayflow-600" />,
      title: "Financial Analysis",
      description: "Analyze income, occupancy rates, and guest satisfaction. Get tailored improvement suggestions.",
      delay: 400
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              Key Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simplify Your Rental Management
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive platform provides all the tools you need to streamline your vacation rental business
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to streamline your property management?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of successful hosts who have simplified their rental business with StayFlow
              </p>
              <a href="#pricing" className="btn-primary inline-flex">
                Get Started Today
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;
