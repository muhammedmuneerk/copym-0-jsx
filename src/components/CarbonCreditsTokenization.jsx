import React from "react";
import {
  ArrowOutward,
  CheckCircleOutline,
  GpsFixed,
  Public,
  Security,
  Spa,
} from "@mui/icons-material";

const CarbonCreditsTokenization = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-white">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-8 flex items-center gap-4 mt-20">
        <div className="bg-green-900/50 p-3 rounded-lg">
          <Spa className="text-green-400" fontSize="large" />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl font-bold tracking-wider font-tech">
            Carbon Credits Tokenization
          </h1>
          <p className="text-gray-400 mt-1">
            Democratize Environmental Investment
          </p>
        </div>
        {/* <div className="bg-gray-800/50 p-2 rounded-full">
          <GpsFixed className="text-gray-300" />
        </div> */}
      </div>

      {/* Divider Line */}
      <div className="h-px w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <h2 className="text-4xl font-bold text-green-400 mb-16 font-tech">
          Revolutionize Environmental Investment
        </h2>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Side with 3 Cards */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-800">
              <div className="mb-4">
                <Spa className="text-green-400" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Environmental Impact</h3>
              <p className="text-gray-400">
                Direct investment in carbon offset and sustainability projects
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-800">
              <div className="mb-4">
                <Public className="text-green-400" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Marketplace</h3>
              <p className="text-gray-400">
                Trade carbon credits across international markets
              </p>
            </div>

            {/* Card 3 - Takes full width in smaller screens, half width in md screens */}
            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 md:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Security className="text-green-400" fontSize="large" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Compliance</h3>
              <p className="text-gray-400">
                Blockchain-verified carbon credit authenticity and tracking
              </p>
            </div>
          </div>

          {/* Right Side - Tokenizable Carbon Credit Types */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-gradient-to-br from-teal-900 to-green-900 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-teal-300 mb-6 font-tech">
                Tokenizable Carbon Credit Types
              </h3>

              <div className="flex flex-wrap gap-3">
                <button className="bg-teal-700 hover:bg-teal-600 transition-all rounded-full px-5 py-2 text-sm">
                  Voluntary Carbon Offsets
                </button>
                <button className="bg-teal-700 hover:bg-teal-600 transition-all rounded-full px-5 py-2 text-sm">
                  Compliance Carbon Credits
                </button>
                <button className="bg-teal-700 hover:bg-teal-600 transition-all rounded-full px-5 py-2 text-sm">
                  Renewable Energy Certificates
                </button>
                <button className="bg-teal-700 hover:bg-teal-600 transition-all rounded-full px-5 py-2 text-sm">
                  Forestry Conservation
                </button>
                <button className="bg-teal-700 hover:bg-teal-600 transition-all rounded-full px-5 py-2 text-sm">
                  Clean Technology Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-green-900 to-teal-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-4 font-tech">
            Key Benefits of Carbon Credit Tokenization
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            Unlock the potential of sustainable investments through blockchain
            technology
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircleOutline className="text-green-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-left">
                Transparent and verifiable carbon credit tracking
              </p>
            </div>

            <div className="flex items-start">
              <CheckCircleOutline className="text-green-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-left">
                Real-time market pricing and liquidity
              </p>
            </div>

            <div className="flex items-start">
              <CheckCircleOutline className="text-green-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-left">
                Fractional ownership of environmental projects
              </p>
            </div>

            <div className="flex items-start">
              <CheckCircleOutline className="text-green-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-left">Automated compliance and reporting</p>
            </div>

            <div className="flex items-start">
              <CheckCircleOutline className="text-green-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-left">
                Democratized access to sustainability investments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 font-tech">
            Ready to Make a Sustainable Impact?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Join the future of environmental investment by tokenizing carbon
            credits and supporting global sustainability efforts.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-200 text-green-800 hover:bg-green-300 transition-all font-medium py-3 px-6 rounded-md flex items-center">
              Start Your Green Investment Journey
              <ArrowOutward className="ml-2" fontSize="small" />
            </button>
            <button className="border border-white hover:bg-white hover:text-black transition-all py-3 px-6 rounded-md">
              Speak with Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsTokenization;
