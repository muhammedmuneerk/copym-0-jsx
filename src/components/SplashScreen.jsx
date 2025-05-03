import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
  const videoRef = useRef(null);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }

    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  const tagline = "Welcome to the future of tokenization.";

  return (
    <Box className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white font-orbitron">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Replace with your actual video source */}
          <source src="/assets/WelcomeScreen.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to control video brightness/contrast */}
        <div className="absolute inset-0 bg-black opacity-30 z-1"></div>
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
