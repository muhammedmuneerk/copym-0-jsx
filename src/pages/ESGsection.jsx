import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const esgData = [
  {
    title: "Environmental",
    points: [
      "We prioritize sustainably sourced commodities, especially metals like gold, copper, and silver that power renewable energy and eco-innovation.",
      "Our digital infrastructure reduces carbon emissions by removing the need for excessive physical logistics and paper-based processes.",
      "Recycling and circular economy practices are encouraged in the sourcing of tokenized assets.",
    ],
  },
  {
    title: "Social",
    points: [
      "We democratize investing through fractional ownership, enabling broader access across all income levels.",
      "The platform supports ethical sourcing and fair labor in mining, construction, and the arts.",
      "Community development initiatives are woven into our tokenized asset offerings.",
    ],
  },
  {
    title: "Governance",
    points: [
      "Using blockchain, we ensure transparent, immutable records for every transaction.",
      "Smart contracts enforce compliance and streamline ESG-aligned governance.",
      "Our systems align with global ESG frameworks, including ISSB and other reporting standards.",
    ],
  },
];

const ESGBox = ({ title, points }) => {
  const [pointIndex, setPointIndex] = useState(0);

  const nextPoint = () => {
    setPointIndex((pointIndex + 1) % points.length);
  };

  const prevPoint = () => {
    setPointIndex((pointIndex - 1 + points.length) % points.length);
  };

  return (
    <div className="relative bg-gray-900/30 border border-green-400/10 rounded-xl p-6 backdrop-blur-sm w-full max-w-md text-center flex flex-col items-center transition-shadow duration-300">
      <h2 className="text-2xl text-green-400 font-bold mb-4 font-futuristic">
        {title}
      </h2>
      <div className="h-32 flex items-center justify-center px-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={pointIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-text-secondary font-futuristic"
          >
            {points[pointIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={prevPoint}
          className="bg-green-500/10 hover:bg-green-400/20 p-2 rounded-full border border-green-400/20 transition"
        >
          <ArrowLeft size={20} className="text-green-300" />
        </button>
        <button
          onClick={nextPoint}
          className="bg-green-500/10 hover:bg-green-400/20 p-2 rounded-full border border-green-400/20 transition"
        >
          <ArrowRight size={20} className="text-green-300" />
        </button>
      </div>
    </div>
  );
};

const ESGsection = () => {
  return (
    <section className="relative pt-24 px-4 pb-20 bg-background text-text-primary overflow-hidden">
      {/* Minimal gridlines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute bottom-1/4 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute inset-y-0 left-1/3 w-[2px] bg-green-500/10" />
        <div className="absolute inset-y-0 right-1/3 w-[2px] bg-green-500/10" />
      </div>

      {/* ESG Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-400 font-futuristic z-10 relative">
        Our ESG Commitments
      </h1>

      {/* ESG Sections */}
      <div className="z-10 relative flex flex-col md:flex-row gap-8 justify-center items-center mb-16">
        {esgData.map((section, idx) => (
          <ESGBox key={idx} title={section.title} points={section.points} />
        ))}
      </div>

      {/* Final Section */}
      <div className="z-10 relative max-w-4xl mx-auto text-center bg-gray-900/30 p-6 rounded-2xl border border-green-400/10 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl text-green-300 font-bold mb-4 font-futuristic">
          Pioneering Role in Green Finance
        </h2>
        <p className="text-lg md:text-xl text-text-secondary font-futuristic leading-relaxed">
          We are proud to be the first platform to offer green tokenization of metals, setting a new standard for sustainable commodity investments. This groundbreaking step underscores our leadership in merging traditional assets with cutting-edge blockchain infrastructure for a cleaner, more transparent financial future.
        </p>
      </div>
    </section>
  );
};

export default ESGsection;

