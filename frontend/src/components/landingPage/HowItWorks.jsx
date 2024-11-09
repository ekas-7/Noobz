import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const HowItWorks = () => (
    <div id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          How Aurea Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-melon bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-melon">1</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              Take a Photo
            </h3>
            <p className="text-gray-600">
              Upload a clear photo of your skin condition
            </p>
          </div>
          <div className="text-center">
            <div className="bg-melon bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-melon">2</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              AI Analysis
            </h3>
            <p className="text-gray-600">
              Our AI analyzes the image for accurate detection
            </p>
          </div>
          <div className="text-center">
            <div className="bg-melon bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-melon">3</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              Get Results
            </h3>
            <p className="text-gray-600">
              Receive detailed analysis and recommended next steps
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  export default HowItWorks;