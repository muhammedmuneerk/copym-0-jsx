import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GreenGlobe from "./GreenGlobe";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SplashScreen = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  const tagline = "Welcome to the future of tokenization.";

  return (
    <Box className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white font-orbitron">
      <div className="absolute inset-0 bg-green-900 opacity-20 z-0 pointer-events-none" />
      <GreenGlobe />

      {/* Static Logo */}
      <div className="fixed top-16 z-10 text-6xl">
        <span style={{ color: "#fff" }}>copy</span>
        <span style={{ color: "#00ff99" }}>m</span>
      </div>
    </Box>
  );
};

export default SplashScreen;

