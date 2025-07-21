import { FaHome, FaHandshake, FaChartLine, FaUsers, FaAward, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHome className="text-[#7A5C43] text-3xl mb-4" />,
      title: "Extensive Property Listings",
      description: "Access to thousands of verified properties across all price ranges and locations."
    },
    {
      icon: <FaHandshake className="text-[#7A5C43] text-3xl mb-4" />,
      title: "Trusted by Home Buyers",
      description: "Over 10,000 successful home purchases facilitated in the last year alone."
    },
    {
      icon: <FaChartLine className="text-[#7A5C43] text-3xl mb-4" />,
      title: "Market Insights",
      description: "Get expert analysis and pricing trends to make informed decisions."
    },
    {
      icon: <FaUsers className="text-[#7A5C43] text-3xl mb-4" />,
      title: "Dedicated Agents",
      description: "Our experienced agents provide personalized service throughout your journey."
    },
    {
      icon: <FaAward className="text-[#7A5C43] text-3xl mb-4" />,
      title: "Award-Winning Service",
      description: "Recognized as the best real estate platform for 3 consecutive years."
    },
    {
      icon: <FaHeadset className="text-[#7A5C43] text-3xl mb-4" />,
      title: "24/7 Support",
      description: "Our customer care team is always available to address your concerns."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#7A5C43] mb-4">Why Choose Our Real Estate Services?</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            We're committed to making your property journey seamless, transparent, and successful. 
            Here's what sets us apart from the competition.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="bg-[#7A5C43] rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Track Record</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <span className="block text-4xl font-bold mb-2">15,000+</span>
              <span className="text-lg">Properties Listed</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold mb-2">98%</span>
              <span className="text-lg">Customer Satisfaction</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold mb-2">200+</span>
              <span className="text-lg">Cities Covered</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold mb-2">10+</span>
              <span className="text-lg">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;