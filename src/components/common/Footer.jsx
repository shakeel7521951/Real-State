import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Prime Estates</h3>
            <p className="mb-4">Your trusted partner in finding the perfect home since 2010.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#947054] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Properties</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#947054] transition-colors">Buy Properties</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Sell Properties</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Rent Properties</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Property Valuation</a></li>
              <li><a href="#" className="hover:text-[#947054] transition-colors">Investment Consulting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>123 Estate Avenue, Property District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" />
                <span>info@primeestates.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-3" />
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div><hr />

        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Prime Estates. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#947054] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#947054] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#947054] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;