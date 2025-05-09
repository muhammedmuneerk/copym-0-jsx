import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";

export default function Hero() {
  return (
    <Box className="min-h-screen relative overflow-hidden">
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0">
        <Container 
          maxWidth="xl" 
          className="relative z-20 px-4 sm:px-6 md:px-8" // Added responsive padding
        >
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full" // Added full width for better mobile alignment
            >
              {/* Improved responsive heading with proper text scaling */}
              <Typography
                variant="h1"
                className="mt-16 sm:mt-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-snug text-center"
                sx={{ wordBreak: "break-word" }}
              >
                {/* Large/Medium Screens: Full lines */}
                <Box component="div" className="hidden md:block">
                  <GradientLetters text="The Complete Ecosystem" keyPrefix="line1-lg" />
                </Box>
                <Box component="div" className="hidden md:block mt-1">
                  <GradientLetters 
                    text="for Real World Asset Tokenization" 
                    keyPrefix="line2-char" 
                  />
                </Box>

                {/* Tablet Screens: Adjusted lines */}
                <Box component="div" className="hidden sm:block md:hidden">
                  <GradientLetters text="The Complete Ecosystem" keyPrefix="line1-md-1" />
                </Box>
                <Box component="div" className="hidden sm:block md:hidden">
                  <GradientLetters text="for Real World" keyPrefix="line1-md-2" />
                </Box>
                <Box component="div" className="hidden sm:block md:hidden mt-1">
                  <GradientLetters text="Asset Tokenization" keyPrefix="line2-md-1" />
                </Box>

                {/* Mobile Screens: More compact lines */}
                <Box component="div" className="block sm:hidden">
                  <GradientLetters text="The Complete Ecosystem for" keyPrefix="line1-sm-1" />
                </Box>
                <Box component="div" className="block sm:hidden">
                  <GradientLetters text="Real World Asset" keyPrefix="line1-sm-2" />
                </Box>
                <Box component="div" className="block sm:hidden">
                  <GradientLetters text="Tokenization" keyPrefix="line1-sm-3" />
                </Box>
              </Typography>

              {/* Improved subtitle with responsive text size and width */}
              <Typography
                variant="body1"
                className="text-text-secondary mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg text-white/80"
              >
                One unified platform for tokenizing, managing, and trading any
                real-world asset class. Access all the tools, networks, and
                liquidity you need in a single ecosystem.
              </Typography>

              {/* Responsive button container with improved spacing */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                {["Explore Asset Tokenization", "Start Tokenizing Now"].map((label, index) => (
                  <div
                    key={index}
                    className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]"
                  >
                    <div className="bg-black rounded-full w-full h-full">
                      <Button
                        variant="text"
                        size="large"
                        className="rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10"
                      >
                        {label}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Improved "Discover More" indicator with better mobile positioning */}
          <motion.div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Typography
              variant="button"
              className="text-white flex flex-col items-center cursor-pointer text-sm sm:text-base"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              Discover More
              <KeyboardArrowDown className="mt-1 sm:mt-2" />
            </Typography>
          </motion.div>
        </Container>

        {/* Background glow effect (commented out in original) */}
        {/* <BackgroundGlowEffect /> */}
      </div>
    </Box>
  );
}