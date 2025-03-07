
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
                  Service Information
                </span>
                <h2 className="text-3xl font-bold mb-6">About StayFlow</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">Service Name</div>
                  <div className="col-span-2">{serviceInfo.name}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">Japanese Name</div>
                  <div className="col-span-2">{serviceInfo.japaneseName}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">Rank</div>
                  <div className="col-span-2">Rank {serviceInfo.rank}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">Market Size</div>
                  <div className="col-span-2">{serviceInfo.marketSize}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="col-span-1 font-medium">Goal</div>
                  <div className="col-span-2">{serviceInfo.goal}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 font-medium">Domain</div>
                  <div className="col-span-2">{serviceInfo.domain}</div>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Visit Service Website</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left">
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
                  Our Philosophy
                </span>
                <h2 className="text-3xl font-bold mb-6">Mission & Vision</h2>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-lg">
                    "To transform property management through technology, making hosting effortless and rewarding while creating exceptional experiences for guests worldwide."
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-lg">
                    "To become the global standard for vacation rental management, empowering hosts to succeed while fostering authentic, memorable travel experiences."
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
