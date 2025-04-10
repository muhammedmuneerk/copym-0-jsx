import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LaserLines from "./Laserline";

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

  const logo = "copym";
  const tagline = "Welcome to the future of tokenization.";
  const taglineTextSize = isMobile ? "text-4xl" : isTablet ? "text-xl" : "text-xl";

  return (
    <Box className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white font-orbitron">
      <LaserLines />

      {/* Static Logo */}
      <div className="fixed top-16  z-10 text-6xl ">
        <span style={{ color: "#fff" }}>copy</span>
        <span style={{ color: "#00ff99" }}>m</span>
      </div>

      {/* Tagline (Animated) */}
      <div className="z-10 text-3xl flex items-center justify-center flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-medium flex flex-wrap justify-center"
          >
            {tagline.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{
                  background:
                    "linear-gradient(135deg,rgb(8, 125, 76), #00ff99)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Box>
  );
};

export default SplashScreen;

