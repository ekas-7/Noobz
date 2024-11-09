import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const FAQs = () => {
    const faqs = [
      {
        question: "How accurate is Aurea's analysis?",
        answer: "Our AI has been trained on millions of images and achieves 98% accuracy in identifying common skin conditions."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we use bank-level encryption and are fully HIPAA compliant. Your photos and data are always protected."
      },
      {
        question: "How quickly do I get results?",
        answer: "Results are typically delivered within seconds of uploading your photo."
      },
    ];
  
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <button className="flex justify-between items-center w-full">
                  <span className="text-lg font-semibold text-charcoal">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-melon" />
                </button>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default FAQs;