import {
  Container,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  Slider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import Sliders from "./Sliders";
import AnimatedCard from "../ui/AnimatedCard";
import AnimatedCounter from "../ui/AnimatedCounter";

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
          <Typography variant="overline" className="gradient-letter">
            GLOBAL REACH
          </Typography>
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box component="div" className="flex flex-wrap justify-center">
              {Array.from("Connecting Global Markets").map((char, idx) => (
                <Box
                  key={`connecting-${idx}`}
                  component="span"
                  className="gradient-letter"
                >
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
          {/* LEFT: Regional Cards (6 columns) */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {regions.map((region, index) => (
                <Grid item xs={12} sm={6} key={region.name}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate={cardVisible ? "visible" : "hidden"}
                    variants={cardVariants}
                    className="h-full"
                  >
                    <AnimatedCard>
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
          </Grid>

          {/* RIGHT: Slider (4 columns) */}
          <Grid item xs={12} md={6}>
            <Sliders />
          </Grid>
        </Grid>
      </Container>

      {/* Enhanced background gradient highlight with Glow Effect */}
      {/* <BackgroundGlowEffect/> */}
    </Box>
  );
}
