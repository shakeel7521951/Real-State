import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

const ContactForm = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#947054] mb-4">Contact Our Team</h1>
        <p className="text-xl text-black max-w-2xl mx-auto">
          Get in touch with our real estate experts for personalized assistance
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Contact Information */}
        <div className="lg:w-2/5">
          <div className="bg-[#f9f7f5] p-8 rounded-xl border border-[#e8e1d9]">
            <h2 className="text-2xl font-semibold text-[#947054] mb-6">Our Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg border border-[#e8e1d9] mr-4 text-[#947054]">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-1">Office Location</h3>
                  <p className="text-black/80">123 Real Estate Avenue<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg border border-[#e8e1d9] mr-4 text-[#947054]">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-1">Phone Numbers</h3>
                  <p className="text-black/80">
                    Main: <a href="tel:+15551234567" className="hover:text-[#947054] transition-colors">(555) 123-4567</a><br />
                    Sales: <a href="tel:+15559876543" className="hover:text-[#947054] transition-colors">(555) 987-6543</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg border border-[#e8e1d9] mr-4 text-[#947054]">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-1">Email Addresses</h3>
                  <p className="text-black/80">
                    <a href="mailto:info@example.com" className="hover:text-[#947054] transition-colors">info@example.com</a><br />
                    <a href="mailto:support@example.com" className="hover:text-[#947054] transition-colors">support@example.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg border border-[#e8e1d9] mr-4 text-[#947054]">
                  <FiClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-1">Business Hours</h3>
                  <p className="text-black/80">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e8e1d9]">
              <h3 className="text-lg font-medium text-[#947054] mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white p-3 rounded-lg border border-[#e8e1d9] text-[#947054] hover:bg-[#f0ebe6] transition-colors">
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white p-3 rounded-lg border border-[#e8e1d9] text-[#947054] hover:bg-[#f0ebe6] transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white p-3 rounded-lg border border-[#e8e1d9] text-[#947054] hover:bg-[#f0ebe6] transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-8 rounded-xl overflow-hidden border border-[#e8e1d9] h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784492423904!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689874326782!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="lg:w-3/5">
          <div className="bg-white p-8 rounded-xl border border-[#e8e1d9]">
            <h2 className="text-2xl font-semibold text-[#947054] mb-2">Send Us a Message</h2>
            <p className="text-black/80 mb-6">Have questions? Fill out the form below and we'll get back to you promptly.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="buying">Buying a Property</option>
                  <option value="selling">Selling a Property</option>
                  <option value="renting">Renting</option>
                  <option value="valuation">Property Valuation</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-[#e8e1d9] rounded-lg focus:ring-2 focus:ring-[#947054] focus:border-[#947054] transition-colors"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#947054] text-white py-3 px-6 rounded-lg hover:bg-[#836449] transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;