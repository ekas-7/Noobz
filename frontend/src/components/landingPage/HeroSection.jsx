import React from 'react'
import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const HeroSection = () => (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Detect Skin Conditions<br />with AI Precision
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload a photo and get instant, accurate skin condition analysis powered by advanced AI
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-melon mr-2" />
              <span className="text-gray-700">98% Accuracy</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-melon mr-2" />
              <span className="text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-melon mr-2" />
              <span className="text-gray-700">Instant Results</span>
            </div>
          </div>
          <button className="text-melon bg-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg">
            Try Aurea Free
          </button>
        </div>
      </div>
    </div>
  );
  

export default HeroSection