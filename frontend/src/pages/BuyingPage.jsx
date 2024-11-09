import React from 'react';
import { Mail, ShoppingCart } from 'lucide-react';

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-charcoal">{patient.name}</h3>
          <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {patient.disease}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-sm text-gray-600">Age: {patient.age}</p>
          <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
          <p className="text-sm text-gray-600">Location: {patient.location}</p>
        </div>
        <p className="text-sm text-gray-700">{patient.description}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Buy Data ($99)
        </button>
        <button className="flex-1 border border-charcoal text-charcoal px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          Contact Patient
        </button>
      </div>
    </div>
  );
};

const BuyingPage = () => {
  const patients = [
    {
      id: "P1001",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      location: "New York, USA",
      disease: "Eczema",
      description: "Chronic eczema case with recent improvements through experimental treatment. Detailed medical history and treatment response data available."
    },
    {
      id: "P1002",
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      location: "Toronto, Canada",
      disease: "Psoriasis",
      description: "Moderate to severe psoriasis with documented response to biological therapy. Includes genetic testing results."
    },
    {
      id: "P1003",
      name: "Emma Wilson",
      age: 28,
      gender: "Female",
      location: "London, UK",
      disease: "Rosacea",
      description: "Early-onset rosacea with unusual presentation. Complete documentation of triggers and treatment efficacy."
    },
    {
      id: "P1004",
      name: "James Martinez",
      age: 52,
      gender: "Male",
      location: "Miami, USA",
      disease: "Melanoma",
      description: "Successfully treated early-stage melanoma. Includes detailed imaging history and post-treatment monitoring data."
    },
    {
      id: "P1005",
      name: "Lisa Taylor",
      age: 41,
      gender: "Female",
      location: "Sydney, Australia",
      disease: "Acne",
      description: "Severe cystic acne case with comprehensive treatment history and hormone level data."
    },
    {
      id: "P1006",
      name: "David Kim",
      age: 37,
      gender: "Male",
      location: "Seoul, South Korea",
      disease: "Vitiligo",
      description: "Progressive vitiligo with documented response to phototherapy. Includes detailed progression photos."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-charcoal mb-4">
            Patient Data Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and purchase anonymized patient data for research purposes. All data is HIPAA compliant and has been properly consented for research use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyingPage;