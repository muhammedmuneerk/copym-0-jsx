import React from 'react';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

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

// Styled AnimatedCard component for the outer container - WITH border animations
const AnimatedCardWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "rgba(15, 16, 22, 0.4)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.07)",
  borderRadius: "2rem",
  height: "100%",
  width: "100%",
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
    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.12)",
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
}));

// Styled Inner Card component - WITH strong border colors, NO animations
const InnerCardWrapper = styled(Box)(({ theme, color }) => ({
  position: "relative",
  background: "rgba(15, 16, 22, 0.4)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.07)", // Default transparent border
  borderRadius: "2rem",
  height: "100%",
  width: "100%",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)", // Default shadow without color
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
    boxShadow: `0 20px 40px -20px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.3), 0 0 20px ${color || "rgba(0, 255, 133, 0.25)"}`,
    borderColor: color || "rgba(0, 255, 133, 0.3)", // Colored border on hover
    background: "rgba(18, 19, 26, 0.6)",
    "& .glass-reflection": {
      animation: `${glassReflection} 2.5s ease-in-out infinite`,
    },
    "& .card-content": {
      transform: "translateZ(10px)",
    },
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
}));

export { AnimatedCardWrapper, InnerCardWrapper, borderAnimationRight, borderAnimationDown, borderAnimationLeft, borderAnimationUp, shimmerAnimation, glassReflection };