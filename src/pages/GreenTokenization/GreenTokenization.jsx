import React from "react";
import ESGSection from "../../components/ESGsection";
import ESGFocusSection from "../../components/ESGfocussection";
import GreenGlobe from "../../components/GreenGlobe"
import BlockChain from "../../components/BlockChainNetwork";


const GreenTokenization = () => {
  return (
    <div className="relative min-h-screen bg-white text-[#333333] flex flex-col items-center justify-center overflow-hidden px-4 py-24 space-y-16">
      {/* Subtle Animated Lines (updated to work on white) */}
      <div className="fixed inset-0 z-0 flex pointer-events-none w-full h-full ">
        <BlockChain
          nodeColor="#00A86B"
          nodeEmissive="#00A86B"
          connectionColor="#00A86B"
        />
      </div>


      {/* Hero Text Section */}


      <div className="z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text Box */}
        <div className="w-full md:w-[60%] bg-white bg-opacity-60 p-8 sm:p-10 rounded-xl shadow-2xl shadow-gray-400/50 border border-[#00A86B]/30 backdrop-blur-md">
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00A86B] via-[#4B5563] to-[#00A86B] text-left">
            Green Tokenization & ESG Integration
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#333333] text-justify leading-relaxed">
            <span className="text-[#00A86B] font-semibold">Copym</span> revolutionizes sustainable investing by converting real-world
            assets into secure digital tokens. From{" "}
            <span className="text-[#00A86B] font-medium">metals</span> to ESG-aligned funds,
            our blockchain-powered approach ensures transparency, access, and
            lasting impact — aligning your values with{" "}
            <span className="text-[#00A86B] font-semibold">futuristic finance</span>.
          </p>
        </div>

        {/* Right: Green Globe */}
        <div className="w-full md:w-[40%] flex items-center justify-center md:ml-6">
          <GreenGlobe size={1.3} />
        </div>
      </div>
      {/* ESG Content Sections */}
      <ESGSection />
      {/* ESG Focus Section */}
      <ESGFocusSection />
    </div>
  );
};

export default GreenTokenization;

