import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

// Animation keyframes for the border effect
const borderAnimationRight = keyframes`
  0% { width: 0; height: 3px; top: 0; right: 100%; opacity: 1; }
  25% { width: 100%; height: 3px; top: 0; right: 0; opacity: 0.7; }
  100% { width: 100%; height: 3px; top: 0; right: 0; opacity: 0; }
`;

const borderAnimationDown = keyframes`
  0% { width: 3px; height: 0; top: 0; right: 0; opacity: 1; }
  25% { width: 3px; height: 100%; top: 0; right: 0; opacity: 0.7; }
  100% { width: 3px; height: 100%; top: 0; right: 0; opacity: 0; }
`;

const borderAnimationLeft = keyframes`
  0% { width: 0; height: 3px; bottom: 0; right: 0; opacity: 1; }
  25% { width: 100%; height: 3px; bottom: 0; right: 0; opacity: 0.7; }
  100% { width: 100%; height: 3px; bottom: 0; right: 0; opacity: 0; }
`;

const borderAnimationUp = keyframes`
  0% { width: 3px; height: 0; bottom: 0; left: 0; opacity: 1; }
  25% { width: 3px; height: 100%; bottom: 0; left: 0; opacity: 0.7; }
  100% { width: 3px; height: 100%; bottom: 0; left: 0; opacity: 0; }
`;

// Add shimmer effect for glass
const shimmerAnimation = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

// Glass reflection effect
const glassReflection = keyframes`
  0% { opacity: 0.1; transform: translateY(100%) translateX(-100%); }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; transform: translateY(-100%) translateX(100%); }
`;

// Styled component for the animated card with advanced glassmorphism
const AnimatedCard = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "rgba(15, 16, 22, 0.4)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.07)",
  borderRadius: "2rem",
  padding: "1.5rem",
  height: "100%",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "150%",
    background: "linear-gradient(130deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%)",
    transform: "rotate(-45deg) translateY(-50%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
    backgroundSize: "1000px 100%",
    animation: `${shimmerAnimation} 8s linear infinite`,
    pointerEvents: "none",
    zIndex: 1,
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 133, 0.15)",
    borderColor: "rgba(0, 255, 133, 0.2)",
    background: "rgba(18, 19, 26, 0.6)",
    "& .border-right": {
      animation: `${borderAnimationRight} 2.5s linear infinite`,
    },
    "& .border-down": {
      animation: `${borderAnimationDown} 2.5s linear infinite`,
      animationDelay: "1s",
    },
    "& .border-left": {
      animation: `${borderAnimationLeft} 2.5s linear infinite`,
      animationDelay: "1.5s",
    },
    "& .border-up": {
      animation: `${borderAnimationUp} 2.5s linear infinite`,
      animationDelay: "2s",
    },
    "& svg": {
      stroke: "#00FF85", // Turn the icon green on card hover
    },
    "& .glass-reflection": {
      animation: `${glassReflection} 2.5s ease-in-out infinite`,
    },
    "& .card-content": {
      transform: "translateZ(10px)",
    },
  },
  "& .border-right, & .border-down, & .border-left, & .border-up": {
    position: "absolute",
    animation: "none", // No animation by default
    zIndex: 2,
  },
  "& .border-right": {
    top: 0,
    right: "100%",
    height: 3,
    background: "linear-gradient(to right, rgba(0,0,0,0), #00FF85, rgba(0,0,0,0))",
    boxShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
  },
  "& .border-down": {
    top: 0,
    right: 0,
    width: 3,
    background: "linear-gradient(to bottom, rgba(0,0,0,0), #00FF85, rgba(0,0,0,0))",
    boxShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
  },
  "& .border-left": {
    bottom: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(to left, rgba(0,0,0,0), #00FF85, rgba(0,0,0,0))",
    boxShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
  },
  "& .border-up": {
    bottom: 0,
    left: 0,
    width: 3,
    background: "linear-gradient(to top, rgba(0,0,0,0), #00FF85, rgba(0,0,0,0))",
    boxShadow: "0 0 10px rgba(0, 255, 133, 0.5)",
  },
  "& .glass-reflection": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "200%",
    background: "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
    transformOrigin: "0 0",
    animation: "none",
    pointerEvents: "none",
    zIndex: 1,
  },
  "& .card-content": {
    position: "relative",
    zIndex: 5,
    transition: "transform 0.3s ease-out",
  },
  [theme.breakpoints.between("md", "lg")]: {
    padding: "1.25rem",
    "& h5": {
      fontSize: "1.1rem",
    },
    "& .card-icon": {
      width: "2.5rem",
      height: "2.5rem",
    },
  },
}));

// Modified features array
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
                  {Array.from("Everything You Need").map((char, idx) => (
                    <Box key={`sm-line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("In One Place").map((char, idx) => (
                    <Box key={`sm-line2-${idx}`} component="span" className="gradient-letter">
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

        {/* Single Row Layout for Features */}
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <AnimatedCard style={{ perspective: "1000px" }}>
                  {/* Border animation elements */}
                  <div className="border-right"></div>
                  <div className="border-down"></div>
                  <div className="border-left"></div>
                  <div className="border-up"></div>
                  
                  {/* Glass reflection effect */}
                  <div className="glass-reflection"></div>
                  
                  {/* Wrap content in a div for 3D effect */}
                  <div className="card-content">
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
                  </div>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}