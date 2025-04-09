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
    <div className="bg-gray-800/30 border border-green-400/20 rounded-xl p-6 backdrop-blur-md shadow-lg w-full max-w-md text-center flex flex-col items-center">
      <h2 className="text-2xl text-green-400 font-bold mb-4 font-futuristic">{title}</h2>
      <div className="h-32 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={pointIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-text-secondary font-futuristic px-2"
          >
            {points[pointIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={prevPoint} className="bg-green-500/20 hover:bg-green-400/30 p-2 rounded-full">
          <ArrowLeft size={20} className="text-green-400" />
        </button>
        <button onClick={nextPoint} className="bg-green-500/20 hover:bg-green-400/30 p-2 rounded-full">
          <ArrowRight size={20} className="text-green-400" />
        </button>
      </div>
    </div>
  );
};

const ESGsection = () => {
  return (
    <section className="pt-24 px-4 pb-16 bg-background text-text-primary">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-400 font-futuristic drop-shadow-[0_0_2px_#00FF7F]">
        Our ESG Commitment
      </h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {esgData.map((section, idx) => (
          <ESGBox key={idx} title={section.title} points={section.points} />
        ))}
      </div>
    </section>
  );
};

export default ESGsection;

