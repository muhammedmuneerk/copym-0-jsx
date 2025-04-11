import React from "react";
import ESGSection from "./ESGsection";
import ESGFocusSection from "./ESGfocussection";
import GreenGlobe from "../components/GreenGlobe"

const GreenTokenization = () => {
  return (
    <div className="relative min-h-screen bg-white text-[#333333] flex flex-col items-center justify-center overflow-hidden px-4 py-24 space-y-16">
      {/* Subtle Animated Lines (updated to work on white) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Horizontal lines */}
        <div className="animate-line-horizontal absolute top-[5%] left-1/4 w-[180px] sm:w-[260px] md:w-[320px] h-[4px] bg-[#00A86B]/30 rounded-full" />
        <div className="animate-line-horizontal2 absolute top-[15%] right-1/3 w-[200px] sm:w-[280px] md:w-[380px] h-[4px] bg-[#00A86B]/25 rounded-full" />
        <div className="animate-line-horizontal3 absolute top-[25%] left-1/5 w-[180px] sm:w-[240px] md:w-[340px] h-[4px] bg-[#00A86B]/20 rounded-full" />

        {/* Vertical lines */}
        <div className="animate-line-vertical-down absolute top-0 left-[10%] h-[200px] w-[4px] bg-[#00A86B]/25 rounded-full" />
        <div className="animate-line-vertical-down2 absolute top-0 left-[30%] h-[200px] w-[4px] bg-[#00A86B]/20 rounded-full" />
        <div className="animate-line-vertical-down3 absolute top-0 left-[50%] h-[180px] w-[4px] bg-[#00A86B]/15 rounded-full" />
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

