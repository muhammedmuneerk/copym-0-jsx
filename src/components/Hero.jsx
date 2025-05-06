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
        <Container maxWidth="xl" className="relative z-20">
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
            >

              <Typography
                variant="h1"
                className="mt-20 text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-snug text-center"
                sx={{ wordBreak: "break-word" }}
              >
                {/* Large Screens: First line whole */}
                <Box component="div" className="hidden sm:block">
                  <GradientLetters text="The Complete Ecosystem" keyPrefix="line1-lg" />
                </Box>

                {/* Line 2 (unchanged) for medium+ screens */}
                <Box component="div" className="block mt-1 hidden sm:block">
                  <GradientLetters 
                    text="for Real World Asset Tokenization" 
                    keyPrefix="line2-char" 
                  />
                </Box>


                 {/* Small Screens: First line split */}
                 <Box component="div" className="block sm:hidden">
                  <GradientLetters text="The Complete" keyPrefix="line1-sm-1" />
                </Box>
                <Box component="div" className="block sm:hidden">
                  <GradientLetters text="Ecosystem" keyPrefix="line1-sm-2" />
                </Box>

                {/* Line 2 split for small screens */}
                <Box component="div" className="block mt-1 sm:hidden">
                  <GradientLetters text="for Real World" keyPrefix="line2-sm-1" />
                </Box>
                <Box component="div" className="block mt-1 sm:hidden">
                  <GradientLetters text="Asset Tokenization" keyPrefix="line2-sm-2" />
                </Box>
                
              </Typography>

              <Typography
                variant="body1"
                className="text-text-secondary mb-12 max-w-3xl mx-auto text-lg text-white/80"
              >
                One unified platform for tokenizing, managing, and trading any
                real-world asset class. Access all the tools, networks, and
                liquidity you need in a single ecosystem.
              </Typography>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {["Explore Asset Tokenization", "Start Tokenizing Now"].map((label, index) => (
                  <div
                    key={index}
                    className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]"
                  >
                    <div className="bg-black rounded-full w-full h-full">
                      <Button
                        variant="text"
                        size="large"
                        className="rounded-full px-8 py-3 font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10"
                      >
                        {label}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
              className="text-white flex flex-col items-center cursor-pointer"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              Discover More
              <KeyboardArrowDown className="mt-2" />
            </Typography>
          </motion.div>
        </Container>

      {/* Enhanced background gradient highlight with Glow Effect */}
     {/* <BackgroundGlowEffect/> */}
      </div>
    </Box>
  );
}
