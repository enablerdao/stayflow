
import FadeIn from './animations/FadeIn';

const Roadmap = () => {
  const milestones = [
    {
      title: "Short-term Goals",
      description: "Reach 100 registered hosts and 300 managed properties",
      timeframe: "Next 6 months",
      color: "bg-stayflow-100",
      borderColor: "border-stayflow-300",
      textColor: "text-stayflow-800",
      delay: 100
    },
    {
      title: "Mid-term Goals",
      description: "Expand market share and establish a solid user base",
      timeframe: "1-2 years",
      color: "bg-stayflow-200",
      borderColor: "border-stayflow-400",
      textColor: "text-stayflow-800",
      delay: 200
    },
    {
      title: "Long-term Vision",
      description: "Establish industry leadership and expand internationally",
      timeframe: "3-5 years",
      color: "bg-stayflow-300",
      borderColor: "border-stayflow-500",
      textColor: "text-stayflow-900",
      delay: 300
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-stayflow-100 text-stayflow-800 mb-4">
              Development Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-lg text-muted-foreground">
              See how we're planning to evolve and improve StayFlow over time
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <FadeIn key={index} delay={milestone.delay} className="h-full">
              <div className={`h-full rounded-2xl border-2 ${milestone.borderColor} p-8 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${milestone.color} opacity-20 -mr-10 -mt-10`}></div>
                
                <div className="relative z-10">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${milestone.color} ${milestone.textColor} mb-4`}>
                    {milestone.timeframe}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
                  <p className="text-muted-foreground mb-4">{milestone.description}</p>
                  
                  <ul className="space-y-2">
                    {index === 0 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Enhance the user interface based on feedback</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Add integration with more booking platforms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-100 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Expand cleaning service partnerships</span>
                        </li>
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Launch mobile application</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Implement advanced AI recommendations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-200 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Develop comprehensive analytics dashboard</span>
                        </li>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Expand to international markets</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Create an ecosystem of rental management tools</span>
                        </li>
                        <li className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-stayflow-300 flex-shrink-0 mr-2 mt-0.5"></span>
                          <span>Develop industry-leading AI capabilities</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
