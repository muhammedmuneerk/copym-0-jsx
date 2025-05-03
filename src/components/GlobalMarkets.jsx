import {
  Container,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { createScope, createDraggable, createSpring } from "animejs";

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

// Styled component for the animated card
const AnimatedCard = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "rgba(15, 16, 22, 0.4)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.07)",
  borderRadius: "2rem",
  padding: "1.5rem",
  height: "100%",
  width: "100%",
  maxWidth: "350px",
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
    maxWidth: "280px",
    "& h5": {
      fontSize: "1.1rem",
    },
    "& .card-icon": {
      width: "2.5rem",
      height: "2.5rem",
    },
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
  const cardRefs = useRef([]);
  const animeScope = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Initialize card refs for each region
  useEffect(() => {
    cardRefs.current = Array(regions.length).fill().map(() => React.createRef());
  }, []);

  // Set up anime.js animations when cards become visible
  useEffect(() => {
    if (!cardVisible || !cardRefs.current.length) return;

    // Create anime.js scope
    animeScope.current = createScope().add(self => {
      // Make each card draggable
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef.current) {
          // Make the card draggable with a spring return effect
          const draggable = createDraggable(cardRef.current, {
            // Define draggable area constraints - adjust based on your layout
            container: [-100, -50, 100, 50],
            // Use spring physics for returning to original position
            releaseEase: createSpring({ 
              stiffness: 150,
              damping: 15
            }),
            // Limit rotation while dragging
            rotationOffset: 5,
          });
        }
      });
    });

    // Clean up anime.js animations
    return () => {
      if (animeScope.current) {
        animeScope.current.revert();
      }
    };
  }, [cardVisible, cardRefs.current]);

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
            className="text-4xl md:text-5xl mb-4 pb-1 text-center"
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
                {/* Added ref to track card for anime.js draggable */}
                <Box ref={cardRefs.current[index]} className="draggable-card">
                  <AnimatedCard>
                    {/* Border animation elements */}
                    <div className="border-right"></div>
                    <div className="border-down"></div>
                    <div className="border-left"></div>
                    <div className="border-up"></div>

                    <div className="glass-reflection"></div>

                    {/* Wrap content in a div for 3D effect */}
                    <div className="card-content">
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
                    </div>
                  </AnimatedCard>
                </Box>
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