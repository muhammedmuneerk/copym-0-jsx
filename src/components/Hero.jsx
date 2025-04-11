import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";
import BlockchainNetworkVisualization from "./BlockchainNetworkVisualization";

export default function Hero() {
  return (
    <Box className="min-h-screen relative overflow-hidden ">
      {/* Three.js visualization */}
      {/* <BlockchainNetworkVisualization /> */}

      {/* Overlay gradient for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050f05]/70 z-10"></div> */}

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
              className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-[linear-gradient(183deg,_rgba(19,225,0,1)_0%,_rgba(0,0,0,1)_0%,_rgba(6,75,0,1)_9%,_rgba(18,240,0,1)_62%,_rgba(0,0,0,1)_100%)] bg-clip-text text-transparent"
            >
              The Complete Ecosystem for{" "}
              <Box component="span" className="block">
                <Box
                  component="span"
                  className="bg-[linear-gradient(180deg,_rgba(19,255,0,1)_6%,_rgba(0,0,0,1)_14%,_rgba(18,240,0,1)_62%,_rgba(0,0,0,1)_100%)] bg-clip-text text-transparent"
                >
                  Real World Asset
                </Box>{" "}
                Tokenization
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
              <Button
                variant="text"
                size="large"
                className="bg-[linear-gradient(183deg,_rgba(19,225,0,1)_0%,_rgba(0,0,0,1)_0%,_rgba(6,75,0,1)_9%,_rgba(18,240,0,1)_62%,_rgba(0,0,0,1)_100%)] text-black font-semibold px-8 py-3 rounded-md shadow-md hover:shadow-[0_0_15px_rgba(16,224,96,0.5)]"
              >
                Explore Asset Tokenization
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="font-semibold px-8 py-3 border-white text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                Start Tokenizing Now
              </Button>
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
      {/* Enhanced gradient highlight with pulse animation */}
      <Box
        className="absolute inset-0 pointer-events-none"
        sx={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
        }}
      />
    </Box>
  );
}
