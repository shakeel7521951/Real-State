import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const OurAgents = () => {
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      experience: "10+ years",
      specialty: "Luxury Homes",
      phone: "+1 (555) 123-4567",
      email: "sarah@primeestates.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Commercial Property Specialist",
      experience: "8 years",
      specialty: "Commercial Real Estate",
      phone: "+1 (555) 987-6543",
      email: "michael@primeestates.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-Time Home Buyer Expert",
      experience: "6 years",
      specialty: "Residential Properties",
      phone: "+1 (555) 456-7890",
      email: "emily@primeestates.com",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <section className="pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#7A5C43] mb-4">Meet Our Agents</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Our experienced real estate professionals are dedicated to helping you find your perfect property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{agent.name}</h3>
                  <p className="text-white/90">{agent.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{agent.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Specialty</p>
                    <p className="font-medium">{agent.specialty}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center mb-2">
                    <FaPhone className="text-[#7A5C43] mr-2" />
                    <a href={`tel:${agent.phone}`} className="hover:text-[#7A5C43] transition-colors">{agent.phone}</a>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[#7A5C43] mr-2" />
                    <a href={`mailto:${agent.email}`} className="hover:text-[#7A5C43] transition-colors">{agent.email}</a>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-600 hover:text-[#7A5C43] transition-colors">
                    <FaFacebook size={18} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#7A5C43] transition-colors">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#7A5C43] transition-colors">
                    <FaLinkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAgents;