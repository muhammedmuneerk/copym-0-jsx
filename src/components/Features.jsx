import { Container, Typography, Box, Grid, Button, } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import AnimatedCard from "../ui/AnimatedCard";

// Central element pulsating animation
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

// Subtle orbital rotation animation
const orbitalRotation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ENHANCED: Styled component for the animated card with advanced glassmorphism


// Central hub element
const CentralHub = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "rgba(18, 19, 26, 0.7)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.15)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.5rem",
  boxShadow: "0 0 40px rgba(0, 255, 133, 0.25)",
  zIndex: 10,
  animation: `${pulseAnimation} 4s ease-in-out infinite`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0, 255, 133, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
    zIndex: -1,
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: "150px",
    height: "150px",
    padding: "1rem",
    "& svg": {
      width: "36px",
      height: "36px",
    },
    "& h6": {
      fontSize: "1rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 auto 4rem auto",
  },
}));

// Connector line
const ConnectorLine = styled(Box)(({ angle, theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "calc(var(--orbital-radius) - 60px)",
  height: "2px",
  background: "linear-gradient(to right, rgba(0, 255, 133, 0.7), rgba(0, 255, 133, 0))",
  transformOrigin: "left center",
  transform: `rotate(${angle}deg)`,
  opacity: 0.5,
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

// Orbital container
const OrbitalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "900px",
  margin: "0 auto",
  marginTop: "10rem",
  "--orbital-radius": "380px",
  [theme.breakpoints.between("lg", "xl")]: {
    "--orbital-radius": "320px",
    minHeight: "800px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    "--orbital-radius": "260px",
    minHeight: "650px",
    marginTop: "15rem",
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    minHeight: "auto",
  },
}));

// UPDATED COMPONENT: Modified to handle exact clock positions with tablet support
const OrbitalPosition = styled(Box)(({ position, theme }) => {
  // Define positions for each clock position
  const positions = {
    "12"  : { top: "-10%", left: "50%", transform: "translateX(-50%)" },
    "2:30": { top: "25%", right: "10%", transform: "translate(0, -50%)" },
    "5"   : { top: "70%", right: "10%", transform: "translate(0, -50%)" },
    "7:30": { top: "70%", left: "10%", transform: "translate(0, -50%)" },
    "10"  : { top: "25%", left: "10%", transform: "translate(0, -50%)" },
  };

  // Tablet position adjustments
  const tabletPositions = {
    "12"  : { top: "-25%", left: "50%", transform: "translateX(-50%)" },
    "2:30": { top: "10%", right: "5%", transform: "translate(0, -50%)" },
    "5"   : { top: "70%", right: "5%", transform: "translate(0, -50%)" },
    "7:30": { top: "70%", left: "5%", transform: "translate(0, -50%)" },
    "10"  : { top: "10%", left: "5%", transform: "translate(0, -50%)" },
  };

  const pos = positions[position] || {};
  const tabletPos = tabletPositions[position] || {};

  return {
    position: "absolute",
    ...pos,
    width: "300px",
    zIndex: 5,
    transition: "all 0.5s ease-in-out",
    [theme.breakpoints.between("md", "lg")]: {
      ...tabletPos,
      width: "240px",
    },
    [theme.breakpoints.down("md")]: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      transform: "none",
      margin: "0 auto 2rem auto",
      width: "100%",
      maxWidth: "400px",
    },
  };
});

// Orbital path visualization
const OrbitalPath = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "calc(var(--orbital-radius) * 2)",
  height: "calc(var(--orbital-radius) * 2)",
  borderRadius: "50%",
  border: "1px dashed rgba(0, 255, 133, 0.15)",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

// Modified features array (removed "Developer Toolkit")
const features = [
  {
    title: "Cross-Chain Infrastructure",
    description:
      "Seamlessly bridge assets across all major blockchains through our unified interface.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-gray-400">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  },
  {
    title: "Comprehensive Compliance",
    description:
      "Built-in KYC/AML, regulatory frameworks, and automated compliance across jurisdictions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-gray-400">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    </svg>,
  },
  {
    title: "Fractional Ownership",
    description:
      "Divide assets into tradable fractions, democratizing access to previously exclusive investments.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers text-gray-400">
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
    </svg>,
  },
  {
    title: "Complete Wallet Ecosystem",
    description:
      "Support for custodial, non-custodial, MPC, and hardware wallet solutions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet text-gray-400">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
    </svg>,
  },
  {
    title: "End-to-End Marketplace",
    description:
      "Primary issuance, secondary trading, liquidity pools, and OTC services all in one place.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks text-gray-400">
      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
    </svg>,
  },
];

// Clock positions assigned to each feature
const clockPositions = ["12", "2:30", "5", "7:30", "10"];

// Calculate angles for connector lines based on clock positions
const connectorAngles = {
  "12": 270,
  "2:30": 330,
  "5": 30,
  "7:30": 150,
  "10": 210
};

export default function Features() {
  const [screenSize, setScreenSize] = useState("lg");

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Show orbital layout for medium and large screens
  const showOrbitalLayout = screenSize === "lg" || screenSize === "md";

  return (
    <Box className="py-24 relative overflow-hidden">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography
            variant="overline"
            className="gradient-letter"
          >
            ALL-IN-ONE PLATFORM
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box
              component="div"
              className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto"
            >
              {/* Small & Medium Screens (3 lines) */}
              <Box className="block lg:hidden">
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Everything You").map((char, idx) => (
                    <Box key={`sm-line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Need In").map((char, idx) => (
                    <Box key={`sm-line2-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("One Place").map((char, idx) => (
                    <Box key={`sm-line3-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Large Screens (2 lines) */}
              <Box className="hidden lg:block">
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Everything You Need").map((char, idx) => (
                    <Box key={`lg-line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("In One Place").map((char, idx) => (
                    <Box key={`lg-line2-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            No more juggling multiple services or platforms. Copym provides
            end-to-end solutions for the entire tokenization lifecycle.
          </Typography>
        </motion.div>

        {/* Orbital Layout */}
        <OrbitalContainer>
          {/* Orbital Path Visualization */}
          {showOrbitalLayout && <OrbitalPath />}

          {/* Central Hub/Sun Element */}
          <CentralHub>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 6.34l1.42 1.42" />
              <path d="M16.24 16.24l1.42 1.42" />
              <path d="M6.34 17.66l1.42-1.42" />
              <path d="M16.24 7.76l1.42-1.42" />
            </svg>
            <Typography variant="h6" className="text-white mt-2 text-center">
              Unified Platform
            </Typography>
            <Typography variant="body2" className="text-gray-300 text-center text-sm mt-1">
              All solutions, one ecosystem
            </Typography>
          </CentralHub>

          {/* Connector Lines with named positions */}
          {showOrbitalLayout && clockPositions.map((position) => (
            <ConnectorLine key={`connector-${position}`} angle={connectorAngles[position]} />
          ))}

          {/* Feature Cards in Clock Positions */}
          {features.map((feature, index) => (
            <OrbitalPosition key={feature.title} position={clockPositions[index]}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <AnimatedCard >
                
                    <Box
                      className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl card-icon"
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(5px)",
                        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-text-secondary mb-4"
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForward />}
                      className="text-primary hover:bg-primary/5 px-0"
                    >
                      Learn more
                    </Button>
                </AnimatedCard>
              </motion.div>
            </OrbitalPosition>
          ))}
        </OrbitalContainer>
      </Container>
      
     {/* Enhanced background gradient highlight with Glow Effect */}
     {/* <BackgroundGlowEffect/> */}

    </Box>
  );
}