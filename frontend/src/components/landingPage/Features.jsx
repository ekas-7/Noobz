import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const Features = () => (
    <div id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          Advanced Features for Accurate Diagnosis
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Camera className="h-12 w-12 text-melon mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              High-Resolution Analysis
            </h3>
            <p className="text-gray-600">
              Our AI processes images in high detail for the most accurate results
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Upload className="h-12 w-12 text-melon mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              Instant Processing
            </h3>
            <p className="text-gray-600">
              Get results within seconds of uploading your photo
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-12 w-12 text-melon mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your data is encrypted and protected with military-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
 export default Features  