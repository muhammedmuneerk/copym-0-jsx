import React from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";
import BlockchainNetworkVisualization from './BlockchainNetworkVisualization';

export default function Hero() {
  return (
    <Box className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050f05] to-[#0a1f0a]">
      {/* Three.js visualization */}
      {/* <BlockchainNetworkVisualization /> */}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050f05]/70 z-10"></div>
      
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
              className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              The Complete Ecosystem for{" "}
              <Box component="span" className="block">
                <Box component="span" className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#00ff80] to-[#10e060]">
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
                variant="contained"
                size="large"
                className="text-background font-semibold px-8 py-3 bg-gradient-to-r from-[#00ff80] to-[#10e060] hover:shadow-[0_0_15px_rgba(16,224,96,0.5)]"
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
            onClick={() => window.scrollTo({
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
    </Box>
    
  );
}