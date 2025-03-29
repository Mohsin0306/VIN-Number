import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className="bg-[#1f2937] text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white z-50">
          <span className="text-white">Carvin</span>
          <span className="text-blue-400">.info</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/faqs" className="hover:text-blue-400 transition-colors">FAQ's</Link>
          <Link to="/calculator" className="hover:text-blue-400 transition-colors">Loan Calculator</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About us</Link>
          <Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          <Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/dashboard" className="text-white hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/add-listing" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Add Listing
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden menu-button z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#1f2937] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden sidebar
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col pt-20 px-6">
            <Link to="/" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/faqs" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              FAQ's
            </Link>
            <Link to="/calculator" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              Loan Calculator
            </Link>
            <Link to="/about" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              About us
            </Link>
            <Link to="/blog" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link to="/contact" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/pricing" 
              className="py-3 border-b border-gray-700 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}>
              Pricing Plans
            </Link>
            
            <div className="mt-6 flex flex-col space-y-4">
              <Link to="/dashboard" 
                className="text-center py-2 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link to="/add-listing" 
                className="text-center bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}>
                Add Listing
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden
          ${isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsOpen(false)}
        ></div>
      </div>
    </nav>
  );
}

export default Navbar; 