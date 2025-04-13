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

  // Create a duplicate array for infinite scroll
  // Triple the array to ensure smooth infinite animation
  const duplicatedBlockchains = [...blockchains, ...blockchains, ...blockchains];

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
                className="font-orbitron text-4xl md:text-5xl mb-4 pb-1 bg-[linear-gradient(183deg,_rgba(0,255,0,1)_0%,_rgba(0,198,0,1)_0%,_rgba(0,158,0,1)_100%,_rgba(0,0,0,1)_100%)] bg-clip-text text-transparent"
              >
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" }, opacity: "10" }}
          >
            {" "}
            {/* didn't remove the image, jsut decreased the opacity */}
            <Box sx={{ position: "relative", width: "100%" }}>
              <SectionImage
                src="/assets/sections/Blockchain-Cryptocurrency-removebg.png"
                alt="Blockchains Banner"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Banner image - only visible on mobile, positioned at top */}
        {isMobile && (
          <Box sx={{ position: "relative", width: "100%", mb: 4 }}>
            {/* <SectionImage
              src="/assets/sections/blockchain-removebg-preview.png"
              alt="Blockchains Banner"
            /> */}
          </Box>
        )}

        {/* Infinite scroll for both mobile and desktop with decreased spacing */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "fit-content",
              animation: "scrollLeft 35s linear infinite", // Slower animation for smoother effect
              "@keyframes scrollLeft": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(calc(-100% / 3))" }, // Only move by 1/3 since we have 3x the items
              },
              "&:hover": { animationPlayState: "paused" },
              "@media (hover: none)": {
                "&:active": { animationPlayState: "paused" },
              },
            }}
          >
            {duplicatedBlockchains.map((blockchain, index) => (
              <Box
                key={`${blockchain.name}-${index}`}
                sx={{
                  width: isMobile ? "32.5vw" : "20vw", // Decreased width for desktop to reduce spacing
                  padding: isMobile ? 2 : 1, // Reduce padding on desktop
                  flexShrink: 0,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }} // Reduced delay for smoother appearance
                  viewport={{ once: true }}
                  className="text-center h-full flex flex-col items-center justify-center p-2"
                >
                  {/* Made icons bigger, especially for those with text */}
                  <Box
                    className={isMobile ? "w-20 h-20 mb-2" : "w-48 w-48 mb-2 "} // Increased size on both mobile and desktop
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: "0.5",
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        opacity: 1,
                      },
                      // padding:".5rem"
                      // Adjust sizes for specific blockchains with text logos
                    }}
                  >
                    {blockchain.logo}
                  </Box>
                  {/* <Typography 
                    variant="h6" 
                    className={isMobile ? "text-sm font-medium text-white" : "text-base font-medium text-white"}
                    sx={{ opacity: 0.9 }}
                  >
                    {blockchain.name}
                  </Typography> */}
                </motion.div>
              </Box>
            ))}
          </Box>
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