import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Variants for staggered word animation
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.6,
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

    const logoSize = isMobile
        ? "w-40 h-20"
        : isTablet
            ? "w-52 h-28"
            : "w-72 h-36";

    const titleSize = isMobile
        ? "text-4xl"
        : isTablet
            ? "text-5xl"
            : "text-6xl";

    const subtitleSize = isMobile ? "text-base" : "text-lg";

    const tagline = "Welcome to The future of tokenization.";

    // Adjust the vertical shift amount based on device size
    const verticalShift = isMobile
        ? "-mt-20 mb-18" // More shift on mobile
        : isTablet
            ? "-mt-12" // Medium shift on tablet
            : "-mt-8"; // Small shift on desktop

    return (
        <Box className="h-screen w-full text-text-primary flex flex-col items-center justify-center bg-gradient-to-r from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] animate-gradient bg-[length:300%_300%]">
            <div className={`flex items-center justify-center ${verticalShift}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* Logo reveal */}
                    <motion.img
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        src="/assets/icons/logo-svg.svg"
                        alt="COPYM"
                        className={`mx-auto ${logoSize}`}
                    />

                    {/* Word-by-word reveal */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className={`mt-4 flex flex-wrap justify-center gap-2 text-white font-semibold ${isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"} font-[Playfair_Display]`}
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