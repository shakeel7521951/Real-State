import React from 'react';
import { FiHome, FiAward, FiUsers, FiMapPin } from 'react-icons/fi';

const AboutUs = () => {
  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '2,500+', label: 'Properties Sold' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '$4.2B', label: 'Total Value Sold' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'With over 20 years in luxury real estate, Sarah leads our team with unmatched market expertise.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Director of Sales',
      bio: 'Michael specializes in commercial properties and investment portfolios with a 98% success rate.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#f9f7f5] py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#947054] mb-4">Our Story</h1>
            <p className="text-xl text-black/80 leading-relaxed">
              For over 15 years, we've been transforming real estate dreams into reality with integrity, expertise, and personalized service.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Luxury Home" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-medium text-[#947054] mb-6">Our Mission</h2>
              <p className="text-black/80 mb-6 leading-relaxed">
                At Prime Estates, we believe finding your perfect property should be an exciting journey, not a stressful transaction. We combine cutting-edge market analysis with old-fashioned personal service to deliver exceptional results.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#947054] p-2 rounded-full mr-4 mt-1">
                    <FiHome className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">Property Excellence</h3>
                    <p className="text-black/70">We curate only the finest properties that meet our rigorous standards.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#947054] p-2 rounded-full mr-4 mt-1">
                    <FiUsers className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">Client-Centric Approach</h3>
                    <p className="text-black/70">Your goals become our roadmap to success.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#947054] p-2 rounded-full mr-4 mt-1">
                    <FiAward className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">Award-Winning Service</h3>
                    <p className="text-black/70">Recognized as industry leaders for 5 consecutive years.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-[#f9f7f5]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-serif font-medium text-[#947054] mb-2">{stat.value}</p>
                <p className="text-black/80 uppercase text-sm tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-[#947054] mb-4">Meet Our Leadership</h2>
            <p className="text-black/80 max-w-2xl mx-auto">
              Our executive team brings decades of combined experience in all facets of real estate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-[#f9f7f5] rounded-lg overflow-hidden shadow-sm">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-medium text-black">{member.name}</h3>
                  <p className="text-[#947054] mb-3">{member.role}</p>
                  <p className="text-black/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-[#f9f7f5]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-[#947054] mb-4">Our Core Values</h2>
            <p className="text-black/80">
              These principles guide every decision we make and every client relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#947054] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-black mb-3">Market Mastery</h3>
              <p className="text-black/70">
                We maintain unparalleled knowledge of local markets and emerging trends.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#947054] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-black mb-3">Client Advocacy</h3>
              <p className="text-black/70">
                Your best interests always come first - we're your trusted advisors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#947054] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-black mb-3">Excellence</h3>
              <p className="text-black/70">
                We settle for nothing less than exceptional service and results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;