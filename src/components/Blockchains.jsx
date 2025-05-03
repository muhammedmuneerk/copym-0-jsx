import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SectionImage from "./SectionImages";

const blockchains = [
  {
    name: "Solana",
    logo: <img src="/assets/blockchains-logos/solana-logo-white-removebg-preview.png" alt="Solana" className="w-full h-full object-contain" />,
  },
  {
    name: "Polygon",
    logo: <img src="/assets/blockchains-logos/Polygon-removebg-preview.png" alt="Polygon" className="w-full h-full object-contain" />,
  },
  {
    name: "Binance",
    logo: <img src="/assets/blockchains-logos/binance-removebg-preview.png" alt="Binance" className="w-full h-full object-contain" />,
  },
  {
    name: "Cardano",
    logo: <img src="/assets/blockchains-logos/Cardano-Logo.png" alt="Cardano" className="w-full h-full object-contain" />,
  },
  {
    name: "Optimism",
    logo: <img src="/assets/blockchains-logos/Optimism-removebg-preview.png" alt="Optimism" className="w-full h-full object-contain" />,
  },
];

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isVisible, setIsVisible] = useState(false);
  const [displayedBlockchains, setDisplayedBlockchains] = useState([]);

  // Function to handle visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Function to get 3 random blockchains
  const getRandomBlockchains = () => {
    const shuffled = [...blockchains].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  // Initialize with 3 random blockchains
  useEffect(() => {
    setDisplayedBlockchains(getRandomBlockchains());
  }, []);

  // Change displayed blockchains every 3-5 seconds
  useEffect(() => {
    if (isVisible) {
      const changeInterval = setInterval(() => {
        // Create a random delay between 3-5 seconds
        const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
        
        // Update the blockchains
        setDisplayedBlockchains(getRandomBlockchains());
        
        // Clear and set new interval with random delay
        clearInterval(changeInterval);
        setTimeout(() => {
          setDisplayedBlockchains(getRandomBlockchains());
        }, delay);
      }, 4000); // Initial delay of 4 seconds

      return () => clearInterval(changeInterval);
    }
  }, [isVisible, displayedBlockchains]);

  return (
    <Box
      id="blockchains-section"
      className="py-12 md:py-16 relative overflow-hidden"
    >
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
              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                {/* First Line */}
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Unified Access to All").map((char, idx) => (
                    <Box key={`line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>

                {/* Second Line */}
                <Box component="div" className="flex flex-wrap justify-center mt-1">
                  {Array.from("Major Blockchains").map((char, idx) => (
                    <Box key={`line2-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
              </Typography>

              <Typography
                variant="body1"
                className="text-text-secondary max-w-2xl mx-auto text-center"
              >
                Tokenize assets on your preferred blockchain. Copym provides
                seamless integration with all major networks through a single,
                unified platform.
              </Typography>
            </motion.div>
          </Grid>

          {/* Banner image section - only visible on desktop */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" }, opacity: "10", marginBottom: "-350px" }}
          >
            <Box sx={{ position: "relative", width: "100%" }}>
              <SectionImage
                src="/assets/sections/hero-graphic.png"
                alt="Blockchains Banner"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Banner image - only visible on mobile, positioned at top */}
        {isMobile && (
          <Box sx={{ position: "relative", width: "100%", mb: 4 }}>
            {/* Mobile banner image removed as in original */}
          </Box>
        )}

        {/* New blockchain icons display - 3 at a time with random changes */}
        <Box
          sx={{
            mt: 8,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid 
            container 
            justifyContent="center" 
            spacing={isMobile ? 2 : 4}
            sx={{ maxWidth: isMobile ? "100%" : "80%", mx: "auto" }}
          >
            <AnimatePresence mode="wait">
              {displayedBlockchains.map((blockchain, index) => (
                <Grid item xs={4} sm={4} md={4} key={`${blockchain.name}-${index}`}>
                  <motion.div
                    key={`${blockchain.name}-${Date.now()}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -100 }}
                    transition={{ duration: 0.5 }}
                    className="text-center h-full flex flex-col items-center justify-center p-2"
                  >
                    <Box
                      className={isMobile ? "w-20 h-20" : "w-48 h-48"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: "0.5",
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      {blockchain.logo}
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </Box>
      </Container>

      {/* Enhanced gradient highlight with pulse animation */}
      <Box
        className="absolute pointer-events-none"
        sx={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
        }}
      />
    </Box>
  );
}