import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const word = {
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

  const logoSize = isMobile ? "w-60 h-28" : isTablet ? "w-80 h-36" : "w-[28rem] h-[12rem]";
  const tagline = "Welcome to the future of tokenization.";
  const taglineTextSize = isMobile ? "text-2xl" : isTablet ? "text-2xl" : "text-2xl";

  return (
    <Box className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white font-orbitron">
      {/* Glowing Radial Pulse Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#00FF7F33_0%,_transparent_70%)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo & Tagline */}
      <div className={`z-10 flex items-center justify-center flex-col gap-10`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            src="/assets/icons/logo-svg-transparent.svg"
            alt="COPYM"
            className={`mx-auto ${logoSize}`}
          />

          {/* Green Tagline with animation */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`mt-8 flex flex-wrap justify-center gap-3 font-futuristic ${taglineTextSize} text-white`}
          >
            {tagline.split(" ").map((wordText, index) => (
              <motion.span key={index} variants={word}>
                {wordText}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Box>
  );
};

export default SplashScreen;

