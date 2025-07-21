import React from 'react';

const services = [
  {
    title: "Residential Plots",
    description: "We help you find the perfect residential plots in prime locations to build your dream home.",
  },
  {
    title: "Commercial Shops & Areas",
    description: "Explore a wide range of commercial shops and spaces ideal for your business growth.",
  },
  {
    title: "Constructed Homes",
    description: "Ready-to-move homes with all the amenities, ideal for immediate living or investment.",
  },
  {
    title: "Agriculture Land",
    description: "We offer fertile agriculture land for farming, investment, and future development projects.",
  },
  {
    title: "Property Consultation",
    description: "Expert advice and transparent deals to help you make the right property decisions.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 bg-gray-50" id="services">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600 mb-10">We deal in all kinds of properties, offering trusted and professional real estate services.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
