import {
  Container,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

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

// Styled component for the animated card
const AnimatedCard = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "rgba(18, 19, 26, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "1rem",
  padding: "1.5rem",
  height: "100%",
  transition: "transform 0.2s",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
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
  },
  "& .border-right, & .border-down, & .border-left, & .border-up": {
    position: "absolute",
    animation: "none", // No animation by default
  },
  "& .border-right": {
    top: 0,
    right: "100%",
    height: 3,
    background: "linear-gradient(to right, #000, #00FF85, #000)",
  },
  "& .border-down": {
    top: 0,
    right: 0,
    width: 3,
    background: "linear-gradient(to bottom, #000, #00FF85, #000)",
  },
  "& .border-left": {
    bottom: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(to left, #000, #00FF85, #000)",
  },
  "& .border-up": {
    bottom: 0,
    left: 0,
    width: 3,
    background: "linear-gradient(to top, #000, #00FF85, #000)",
  },
}));

// Animated counter component for numbers
const AnimatedCounter = ({ value, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const animationRef = useRef(null);

  // Handle different formats of values
  const isCurrency = value.startsWith("$");
  const isPercentage = value.includes("%");

  // Extract the numeric part
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  // Extract the prefix and suffix
  const prefix = isCurrency ? "$" : "";
  const suffix = isPercentage ? "%" : "";

  // Reset and restart counter animation when triggerCount changes
  useEffect(() => {
    setCount(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setTimeout(() => {
      const updateCounter = () => {
        const now = Date.now();
        if (now >= endTime) {
          setCount(numericValue);
          return;
        }

        const elapsedTime = now - startTime;
        const progress = elapsedTime / (duration * 1000);
        const currentValue = numericValue * progress;
        setCount(currentValue);

        animationRef.current = requestAnimationFrame(updateCounter);
      };

      // Start the animation
      animationRef.current = requestAnimationFrame(updateCounter);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [numericValue, duration, delay]);

  // Format the display value
  const displayValue = () => {
    // Format based on the type of value
    if (isCurrency) {
      return `${prefix}${count.toFixed(1)}${value.includes("B") ? "B" : ""}`;
    } else if (isPercentage) {
      return `+${count.toFixed(0)}${suffix}`;
    } else {
      return count.toFixed(0);
    }
  };

  return <span ref={countRef}>{displayValue()}</span>;
};

// Region data
const regions = [
  {
    name: "Middle East",
    tokenizedValue: "$2.3B",
    growth: "+67%",
    topAssets: ["Real Estate", "Energy", "Infrastructure"],
  },
  {
    name: "Europe",
    tokenizedValue: "$1.8B",
    growth: "+45%",
    topAssets: ["Real Estate", "Private Equity", "Art"],
  },
  {
    name: "Asia Pacific",
    tokenizedValue: "$3.1B",
    growth: "+82%",
    topAssets: ["Real Estate", "Infrastructure", "Commodities"],
  },
  {
    name: "Americas",
    tokenizedValue: "$4.2B",
    growth: "+58%",
    topAssets: ["Real Estate", "Private Equity", "Venture Capital"],
  },
];

export default function GlobalMarkets() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const sectionRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Set up intersection observer to show/hide cards when section enters/exits viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardVisible(true);
            // Reset and trigger number animations when coming into view
            setAnimationTrigger((prev) => prev + 1);
          } else {
            setCardVisible(false);
          }
        });
      },
      { threshold: 0.2 } // 0.2 means 20% visible
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants for cards
  const cardVariants = {
    hidden: (index) => ({
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  };

  return (
    <Box className="py-24 relative overflow-hidden" ref={sectionRef}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Typography
            variant="overline"
            className="gradient-letter"
          >
            GLOBAL REACH
          </Typography>
          <Typography
            variant="h2"
            className="font-orbitron text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box component="div" className="flex flex-wrap justify-center">
              {Array.from("Connecting Global Markets").map((char, idx) => (
                <Box key={`connecting-${idx}`} component="span" className="gradient-letter">
                  {char === " " ? "\u00A0" : char}
                </Box>
              ))}
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tokenize assets from anywhere in the world and access a global
            network of investors and liquidity providers.
          </Typography>
        </motion.div>

        {/* Regional Cards */}
        <Grid container spacing={4}>
          {regions.map((region, index) => (
            <Grid item xs={12} sm={6} md={3} key={region.name}>
              <motion.div
                custom={index}
                initial="hidden"
                animate={cardVisible ? "visible" : "hidden"}
                variants={cardVariants}
                className="h-full"
              >
                <AnimatedCard>
                  {/* Border animation elements */}
                  <div className="border-right"></div>
                  <div className="border-down"></div>
                  <div className="border-left"></div>
                  <div className="border-up"></div>
                  
                  <Typography variant="h6" className="mb-4">
                    {region.name}
                  </Typography>
                  <Box className="mb-4">
                    <Typography
                      variant="overline"
                      className="text-text-secondary block"
                    >
                      Tokenized Value:
                    </Typography>
                    <Typography variant="h5" className="text-primary">
                      <AnimatedCounter
                        value={region.tokenizedValue}
                        duration={2.5}
                        delay={index * 0.2}
                        key={`value-${region.name}-${animationTrigger}`}
                      />
                    </Typography>
                  </Box>
                  <Box className="mb-4">
                    <Typography
                      variant="overline"
                      className="text-text-secondary block"
                    >
                      YoY Growth:
                    </Typography>
                    <Typography variant="h5" className="text-primary">
                      <AnimatedCounter
                        value={region.growth}
                        duration={2.5}
                        delay={index * 0.2 + 0.5}
                        key={`growth-${region.name}-${animationTrigger}`}
                      />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="overline"
                      className="text-text-secondary block mb-2"
                    >
                      Top Asset Classes:
                    </Typography>
                    {region.topAssets.map((asset, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        className="text-text-secondary"
                      >
                        {asset}
                      </Typography>
                    ))}
                  </Box>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Background Glow Effect */}
      <Box
        className="absolute inset-0 pointer-events-none"
        sx={{
          background:
          "radial-gradient(circle at 50% 75%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
        }}
      />
    </Box>
  );
}