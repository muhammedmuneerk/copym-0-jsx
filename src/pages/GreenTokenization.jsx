import React from "react";
import ESGSection from "./ESGsection";
import ESGFocusSection from "./ESGfocussection";

const GreenTokenization = () => {
  return (
    <div className="relative min-h-screen bg-background text-text-primary flex flex-col items-center justify-center overflow-hidden px-4 py-24 space-y-16">
      {/* Animated Lines in Top Section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Horizontal lines */}
        <div className="animate-line-horizontal absolute top-[5%] left-1/4 w-[180px] sm:w-[260px] md:w-[320px] h-[6px] bg-green-400 opacity-100 rounded-full drop-shadow-[0_0_10px_#22c55e]" />
        <div className="animate-line-horizontal2 absolute top-[15%] right-1/3 w-[200px] sm:w-[280px] md:w-[380px] h-[6px] bg-green-400 opacity-80 rounded-full drop-shadow-[0_0_10px_#22c55e]" />
        <div className="animate-line-horizontal3 absolute top-[25%] left-1/5 w-[180px] sm:w-[240px] md:w-[340px] h-[6px] bg-green-400 opacity-65 rounded-full drop-shadow-[0_0_10px_#22c55e]" />

        {/* Vertical lines (top to bottom) */}
        <div className="animate-line-vertical-down absolute top-0 left-[10%] h-[160px] sm:h-[240px] md:h-[400px] w-[6px] bg-green-400 opacity-100 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-vertical-down2 absolute top-0 left-[30%] h-[160px] sm:h-[240px] md:h-[400px] w-[6px] bg-green-400 opacity-80 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-vertical-down3 absolute top-0 left-[50%] h-[120px] sm:h-[160px] md:h-[240px] w-[6px] bg-green-400 opacity-65 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
      </div>

      {/* Intro Text Content */}
      <div className="z-10 max-w-3xl w-full">
        <div className="bg-gray-800 bg-opacity-20 p-6 sm:p-8 rounded-xl shadow-[0_0_15px_#00FF7F20] backdrop-blur-md border border-green-400/30">
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-green-400 text-center drop-shadow-[0_0_2px_#00FF7F]">
            Green Tokenization & ESG Integration
          </h1>
          <p className=" text-base sm:text-lg md:text-xl text-[#A0FFA0] text-center leading-relaxed drop-shadow-[0_0_1px_#00FF7F]">
            Copym revolutionizes sustainable investing by converting real-world
            assets into secure digital tokens. From metals to ESG-aligned funds,
            our blockchain-powered approach ensures transparency, access, and
            lasting impact — aligning your values with futuristic finance.
          </p>
        </div>
      </div>

      {/* ESG Section */}
      <ESGSection />

      {/* Animated Lines in Final Section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Horizontal lines */}
        <div className="animate-line-horizontal absolute bottom-[25%] left-1/4 w-[180px] sm:w-[260px] md:w-[320px] h-[6px] bg-green-400 opacity-100 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-horizontal2 absolute bottom-[15%] right-1/3 w-[200px] sm:w-[240px] md:w-[280px] h-[6px] bg-green-400 opacity-80 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-horizontal3 absolute bottom-[5%] left-1/5 w-[160px] sm:w-[200px] md:w-[240px] h-[6px] bg-green-400 opacity-60 rounded-full drop-shadow-[0_0_10px_#22c55e] " />

        {/* Vertical lines (bottom to top) */}
        <div className="animate-line-vertical-up absolute bottom-0 right-[10%] h-[160px] sm:h-[240px] md:h-[400px] w-[6px] bg-green-400 opacity-100 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-vertical-up2 absolute bottom-0 right-[30%] h-[160px] sm:h-[240px] md:h-[400px] w-[6px] bg-green-400 opacity-80 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
        <div className="animate-line-vertical-up3 absolute bottom-0 right-[50%] h-[120px] sm:h-[160px] md:h-[240px] w-[6px] bg-green-400 opacity-65 rounded-full drop-shadow-[0_0_10px_#22c55e] " />
      </div>

      {/* ESG Focus Section */}
      <ESGFocusSection />
    </div>
  );
};

export default GreenTokenization;
