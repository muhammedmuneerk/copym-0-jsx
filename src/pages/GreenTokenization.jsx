// src/components/GreenTokenization.jsx
import React from "react";
import ESGSection from "./ESGSection";

const GreenTokenization = () => {
  return (
    <div className="relative min-h-screen bg-background text-text-primary flex flex-col items-center justify-center overflow-hidden px-4 py-24 space-y-16">
      {/* Animated green lines background */}
      <div className="absolute inset-0 z-0">
        <div className="animate-line-horizontal absolute top-1/4 left-1/4 w-[600px] h-[6px] bg-green-400 opacity-50 rounded-full drop-shadow-[0_0_6px_#22c55e]" />
        <div className="animate-line-horizontal2 absolute top-1/3 right-1/3 w-[600px] h-[6px] bg-green-400 opacity-50 rounded-full drop-shadow-[0_0_6px_#22c55e]" />
        <div className="animate-line-horizontal absolute top-3/4 left-1/3 w-[600px] h-[6px] bg-green-400 opacity-50 rounded-full drop-shadow-[0_0_6px_#22c55e]" />
      </div>

      {/* Text Content inside glass card */}
      <div className="z-10 max-w-3xl w-full">
        <div className="bg-gray-800 bg-opacity-20 p-8 rounded-xl shadow-[0_0_15px_#00FF7F20] backdrop-blur-md border border-green-400/30">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400 text-center font-futuristic drop-shadow-[0_0_2px_#00FF7F]">
            Green Tokenization & ESG Integration
          </h1>
          <p className="text-lg md:text-xl text-[#A0FFA0] text-center font-futuristic leading-relaxed drop-shadow-[0_0_1px_#00FF7F]">
            Copym revolutionizes sustainable investing by converting real-world
            assets into secure digital tokens. From metals to ESG-aligned funds,
            our blockchain-powered approach ensures transparency, access, and
            lasting impact — aligning your values with futuristic finance.
          </p>
        </div>
      </div>

      {/* ESG Section */}
      <ESGSection />
    </div>
  );
};

export default GreenTokenization;

