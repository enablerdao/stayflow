
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, delay }: FAQItemProps) => {
  return (
    <FadeIn delay={delay}>
      <div className="border-b border-border py-6 last:border-0">
        <button
          className="flex w-full items-center justify-between text-left focus:outline-none"
          onClick={onClick}
        >
          <h3 className="text-lg font-medium">{question}</h3>
          <ChevronDown
            size={20}
            className={cn("transform transition-transform duration-200", isOpen ? "rotate-180" : "")}
          />
        </button>
        <div
          className={cn(
            "mt-2 overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <p className="py-3 text-muted-foreground">{answer}</p>
        </div>
      </div>
    </FadeIn>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Who is this service for?",
      answer: "StayFlow is designed for vacation rental hosts, property managers, and anyone managing short-term rental properties. Whether you have a single property or manage hundreds, our platform scales to meet your needs and helps streamline operations."
    },
    {
      question: "How long does it take to get started?",
      answer: "You can sign up and start using StayFlow within minutes. Simply enter the necessary information, and you'll have immediate access to all the platform's features. Our intuitive interface ensures a smooth onboarding experience."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with no credit card required. You can experience all features of our platform to determine if it's the right fit for your vacation rental business before making a commitment."
    },
    {
      question: "Can I integrate with my existing booking platforms?",
      answer: "Absolutely! StayFlow seamlessly integrates with major booking platforms like Airbnb, Booking.com, VRBO, and others. All your reservations will be automatically synchronized in one centralized calendar."
    },
    {
      question: "How does the cleaning service integration work?",
      answer: "Our platform automatically schedules cleaning services after guest checkout based on your preferences. You can work with your existing cleaning providers or connect with our network of verified cleaning services in your area."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about StayFlow
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  delay={100 * index}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={300} className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">Still have questions?</p>
            <a
              href="#contact"
              className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Contact our support team for assistance →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
