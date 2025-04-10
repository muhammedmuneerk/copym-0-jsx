import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SectionImage from "./SectionImages";

const blockchains = [
  {
    name: "Solana",
    logo: (
      <svg viewBox="0 0 397.7 311.7" className="w-full h-full">
        <linearGradient id="solanaGradient" gradientUnits="userSpaceOnUse" x1="360.879" y1="351.455" x2="141.213" y2="-69.294" gradientTransform="matrix(1 0 0 -1 0 314)">
          <stop offset="0" stopColor="#00FFA3"/>
          <stop offset="1" stopColor="#DC1FFF"/>
        </linearGradient>
        <path fill="url(#solanaGradient)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
        <path fill="url(#solanaGradient)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
        <path fill="url(#solanaGradient)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
      </svg>
    ),
  },
  {
    name: "Polygon",
    logo: (
      <svg viewBox="0 0 38.4 33.5" className="w-full h-full">
        <path fill="#8247E5" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
      </svg>
    ),
  },
  {
    name: "Binance",
    logo: <img src="/assets/icons/binance-bgremoved.png" alt="Binance" className="w-full h-full object-contain" />,
  },
  {
    name: "Cardano",
    logo: <img src="/assets/icons/cardano-removebg-circle.png" alt="Cardano" className="w-full h-full object-contain" />,
  },
  {
    name: "Optimism",
    logo: <img src="/assets/icons/optimism-removebg.png" alt="Optimism" className="w-full h-full object-contain" />,
  },
];

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger reload animation by changing key
          setKey(prevKey => prevKey + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Target element to observe
    const section = document.getElementById('blockchains-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Shuffle blockchains for reload effect
  const [shuffledBlockchains, setShuffledBlockchains] = useState([...blockchains]);

  useEffect(() => {
    if (!isMobile && isVisible) {
      // Shuffle the array for visual reload effect
      const shuffled = [...blockchains].sort(() => Math.random() - 0.5);
      setShuffledBlockchains(shuffled);
    }
  }, [key, isMobile, isVisible]);

  return (
    <Box id="blockchains-section" className="py-12 md:py-16 relative overflow-hidden" sx={{ background: "#0a0a0a" }}>
      {/* Restructured section with the banner image placed next to the text on desktop */}
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
          {/* Text section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6 md:mb-0"
            >
              <Typography variant="h2" className="font-orbitron text-4xl md:text-5xl mb-4 text-primary">
                Unified Access to All Major Blockchains
              </Typography>
              <Typography
                variant="body1"
                className="text-text-secondary max-w-2xl"
              >
                Tokenize assets on your preferred blockchain. Copym provides
                seamless integration with all major networks through a single,
                unified platform.
              </Typography>
            </motion.div>
          </Grid>

          {/* Banner image section - only visible on desktop */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <SectionImage
                src="/assets/sections/blockchain-removebg-preview.png"
                alt="Blockchains Banner"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Banner image - only visible on mobile, positioned at top */}
        {isMobile && (
          <Box sx={{ position: "relative", width: "100%", mb: 4 }}>
            <SectionImage
              src="/assets/sections/blockchain-removebg-preview.png"
              alt="Blockchains Banner"
            />
          </Box>
        )}

        {isMobile ? (
          // Mobile view remains unchanged
          <Box sx={{ position: "relative", width: "100%", overflow: "hidden", mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                width: "fit-content",
                animation: "scrollLeft 20s linear infinite",
                "@keyframes scrollLeft": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(calc(-100% / 2))" }
                },
                "&:hover": { animationPlayState: "paused" },
                "@media (hover: none)": {
                  "&:active": { animationPlayState: "paused" }
                }
              }}
            >
              {[...blockchains, ...blockchains].map((blockchain, index) => (
                <Box
                  key={`${blockchain.name}-${index}`}
                  sx={{
                    width: "32.5vw",
                    padding: 2,
                    flexShrink: 0
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center h-full flex flex-col items-center justify-center p-3"
                  >
                    <Box className="w-14 h-14 mb-3 rounded-full flex items-center justify-center" sx={{ background: "rgba(255, 255, 255, 0.07)" }}>
                      <Box className="w-8 h-8">
                        {blockchain.logo}
                      </Box>
                    </Box>
                    <Typography variant="h6" className="text-sm font-medium text-white">
                      {blockchain.name}
                    </Typography>
                  </motion.div>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          // Enhanced desktop view with reload animation
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <Box 
                sx={{ 
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: { sm: 2, md: 4, lg: 6 }
                }}
              >
                {shuffledBlockchains.map((blockchain, index) => (
                  <motion.div
                    key={`${blockchain.name}-${key}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    viewport={{ once: false }}
                    className="flex flex-col items-center mb-2"
                    sx={{ 
                      minWidth: { sm: "80px", md: "90px" },
                      textAlign: "center"
                    }}
                  >
                    <Box 
                      className="w-16 h-16 mb-3 flex items-center justify-center"
                      sx={{ 
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "50%",
                        padding: "12px",
                        boxShadow: "0 4px 12px rgba(0, 255, 133, 0.1)",
                        opacity: 0.95,
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 16px rgba(0, 255, 133, 0.2)",
                          background: "rgba(255, 255, 255, 0.08)"
                        }
                      }}
                    >
                      <Box className="w-10 h-10">
                        {blockchain.logo}
                      </Box>
                    </Box>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.95 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      <Typography 
                        variant="body1" 
                        className="text-white font-medium"
                        sx={{ opacity: 0.9 }}
                      >
                        {blockchain.name}
                      </Typography>
                    </motion.div>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
        )}
      </Container>

      {/* Enhanced gradient highlight with pulse animation */}
      <Box
        className="absolute inset-0 pointer-events-none"
        sx={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 133, 0.04) 0%, rgba(10, 11, 13, 0) 70%)",
          animation: !isMobile && isVisible ? "pulse 4s infinite alternate" : "none",
          "@keyframes pulse": {
            "0%": { opacity: 0.5 },
            "100%": { opacity: 1 }
          }
        }}
      />
    </Box>
  );
}