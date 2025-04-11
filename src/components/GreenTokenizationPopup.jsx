import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobeAnimation from "./GreenGlobe";

const GreenTokenizationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    setShowPopup(false);
    navigate("/green-tokenization");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <div className="bg-white/5 border border-green-500 shadow-2xl p-8 rounded-2xl max-w-4xl w-full text-white animate-fadeIn backdrop-blur-lg relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-green-400 text-2xl font-bold"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        {/* Responsive content layout */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Text section */}
          <div className="md:w-1/2 space-y-4 text-left">
            <h2 className="font-orbitron text-3xl font-bold bg-gradient-to-r from-green-400 via-white to-green-400 text-transparent bg-clip-text">
              Green Tokenization
            </h2>
            <p className="text-lg text-gray-300">
              Copym is the world’s first platform to introduce green tokenization.
              Empowering sustainability through blockchain. Let's invest for a cleaner,
              greener future.
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold transition"
              onClick={handleExploreClick}
            >
              Explore Green Tokenization
            </button>
          </div>

          {/* Globe animation (on top for mobile) */}
          <div className="md:w-1/2 flex justify-center">
            <GlobeAnimation size={1.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenTokenizationPopup;
