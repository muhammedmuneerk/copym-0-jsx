import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NeonTunnelSplash from "./NeonTunnel";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 2, // 2-second delay before the tagline starts animating
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
    <Box className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white font-orbitron">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-green-900 opacity-20 z-0 pointer-events-none" />

      {/* Blockchain Background */}
      <div className="fixed inset-0 z-0 flex pointer-events-none w-full h-full">
        <NeonTunnelSplash />
      </div>

      {/* Centered Logo and Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Tagline */}
        <motion.div
          className="text-base md:text-lg font-medium bg-gradient-to-r from-white via-green-300 to-green-500 bg-clip-text text-transparent"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {tagline.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Box>
  );
};

export default SplashScreen;
