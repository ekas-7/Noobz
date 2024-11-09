import { useState } from "react";
import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-charcoal">Aurea</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-charcoal hover:text-peach transition-colors duration-100">Features</a>
              <a href="#how-it-works" className="text-charcoal hover:text-peach transition-colors duration-100">How it Works</a>
              <a href="#benefits" className="text-charcoal hover:text-peach transition-colors duration-100">Benefits</a>
              <button className="bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium">
                Get Started
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6 text-charcoal" /> : <Menu className="h-6 w-6 text-charcoal" />}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-charcoal hover:text-melon">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-charcoal hover:text-melon">How it Works</a>
              <a href="#benefits" className="block px-3 py-2 text-charcoal hover:text-melon">Benefits</a>
              <button className="w-full text-center bg-peach font-medium text-black px-6 py-2 rounded-lg hover:bg-opacity-90">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  };

  export default Navbar;