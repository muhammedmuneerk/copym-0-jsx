import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "./SectionImages";

const blockchains = [
  {
    name: "Solana",
    // description: "Full support for Solana ecosystem",
    logo: (
      <svg viewBox="0 0 397.7 311.7" className="w-8 h-8">
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
    // description: "Full support for Polygon ecosystem",
    logo: (
      <svg viewBox="0 0 38.4 33.5" className="w-8 h-8">
        <path fill="#8247E5" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
      </svg>
    ),
  },
  {
    name: "Binance",
    // description: "Full support for Binance ecosystem",
    logo: (
      <img src="/assets/icons/binance-bgremoved.png" alt="Binance" className="w-8 h-8" />

    ),
  },
  {
    name: "Cardano",
    // description: "Full support for Cardano ecosystem",
    logo: (
      <img src="/assets/icons/cardano-removebg-circle.png" alt="Cardano" className="w-10 h-10" />
    ),
  },
  {
    name: "Optimism",
    // description: "Full support for Optimism ecosystem",
    logo: (
      <img src="/assets/icons/optimism-removebg.png" alt="Optimism" className="w-9 h-9" />
    ),
  },
];

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box className="py-24 relative overflow-hidden">
       <SectionImage
                src="/assets/sections/blockchain-removebg-preview.png"
                alt="Blockchains Banner"
              />
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-4xl md:text-5xl mb-4">
            Unified Access to{" "}
            <span className="text-primary">All Major Blockchains</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tokenize assets on your preferred blockchain. Copym provides
            seamless integration with all major networks through a single,
            unified platform.
          </Typography>
        </motion.div>

        <Grid
          container
          justifyContent="center"
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%"
          }}
        >
          {/* Seamless infinite scroll container */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden"
            }}
          >
            {/* Scrolling content wrapper */}
            <Box
              sx={{
                display: "flex",
                width: "fit-content", // Allow the content to determine width
                animation: "scrollLeft 20s linear infinite",
                "@keyframes scrollLeft": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(calc(-100% / 2))" } // Move exactly half the total width
                },
                "&:hover, &:active, &:focus": {
                  animationPlayState: "paused"
                },
                // Touch devices support
                "@media (hover: none)": {
                  "&:active": {
                    animationPlayState: "paused"
                  }
                }
              }}
            >
              {/* First set of items */}
              {blockchains.map((blockchain, index) => (
                <Box
                  key={`original-${blockchain.name}`}
                  sx={{
                    // Fixed width based on screen size to ensure exactly 5 items on large screens
                    width: { 
                      xs: "32.5vw", // 1+ visible on mobile
                      sm: "32.5vw", // 2 visible on small screens
                      md: "32.5vw", // 3 visible on medium screens
                      lg: "20vw" // 5 visible on large screens
                    },
                    padding: 2,
                    flexShrink: 0
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`text-center h-full flex flex-col items-center justify-center ${!isMobile ? "bg-background-paper rounded-lg p-6" : "p-3"}`}
                    style={{
                      background: isMobile ? "transparent" : "rgba(18, 19, 26, 0.5)",
                      backdropFilter: isMobile ? "none" : "blur(10px)",
                      border: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Box
                      className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {blockchain.logo}
                    </Box>
                    <Typography variant="h6" className="mb-2">
                      {blockchain.name}
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      {blockchain.description}
                    </Typography>
                  </motion.div>
                </Box>
              ))}

              {/* Duplicate set of items to create seamless loop */}
              {blockchains.map((blockchain, index) => (
                <Box
                  key={`duplicate-${blockchain.name}`}
                  sx={{
                    // Maintain identical sizing as the original set
                    width: { 
                      xs: "32.5vw",
                      sm: "32.5vw",
                      md: "32.5vw",
                      lg: "20vw"
                    },
                    padding: 2,
                    flexShrink: 0
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`text-center h-full flex flex-col items-center justify-center ${!isMobile ? "bg-background-paper rounded-lg p-6" : "p-3"}`}
                    style={{
                      background: isMobile ? "transparent" : "rgba(18, 19, 26, 0.5)",
                      backdropFilter: isMobile ? "none" : "blur(10px)",
                      border: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Box
                      className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {blockchain.logo}
                    </Box>
                    <Typography variant="h6" className="mb-2">
                      {blockchain.name}
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      {blockchain.description}
                    </Typography>
                  </motion.div>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Background Glow Effect */}
        <Box
          className="absolute inset-0 pointer-events-none"
          sx={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
          }}
        />
      </Container>
    </Box>
  );
}