import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Info } from 'lucide-react';
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

// Enhanced card data with additional fields
const cardData = [
  {
    id: 'gold',
    image: '/assets/images/img1.png',
    title: 'Gold Tokenization',
    description: 'Tokenized Gold for the Digital Age',
    detailText: 'Access fractional ownership of gold assets with blockchain security and liquidity.',
    buttonText: 'View Details',
    link: '/tokenization/gold/',
    color: 'from-amber-400 to-yellow-600',
    bgColor: 'from-amber-900/20 to-yellow-900/20',
    borderColor: '#FFD700'
  },
  {
    id: 'green',
    image: '/assets/images/img2.png',
    title: 'Green Tokenization',
    description: 'Sustainable ESG Integration',
    detailText: 'Invest in green projects with transparent impact tracking and reporting.',
    buttonText: 'View Details',
    link: '/green-tokenization',
    color: 'from-emerald-400 to-green-600',
    bgColor: 'from-emerald-900/20 to-green-900/20',
    borderColor: '#00FF85'
  },
  {
    id: 'realestate',
    image: '/assets/images/img3.png',
    title: 'Real Estate',
    description: 'Real Estate Tokenization',
    detailText: 'Fractional ownership of premium properties with global market access.',
    buttonText: 'Explore',
    link: '/tokenization/real-estate/',
    color: 'from-blue-400 to-indigo-600',
    bgColor: 'from-blue-900/20 to-indigo-900/20',
    borderColor: '#4169E1'
  },
  {
    id: 'art',
    image: '/assets/images/img4.png',
    title: 'Art & Collectibles',
    description: 'Art & Collectibles Tokenization',
    detailText: 'Own fractions of museum-quality art and rare collectibles with provenance.',
    buttonText: 'View Details',
    link: '/tokenization/art',
    color: 'from-purple-400 to-pink-600',
    bgColor: 'from-purple-900/20 to-pink-900/20',
    borderColor: '#8A2BE2'
  },
  {
    id: 'commodities',
    image: '/assets/images/img5.png',
    title: 'Commodities',
    description: 'Commodities Tokenization',
    detailText: 'Trade tokenized commodities with higher liquidity and lower fees.',
    buttonText: 'View Details',
    link: '/tokenization/Commodities',
    color: 'from-orange-400 to-red-600',
    bgColor: 'from-orange-900/20 to-red-900/20',
    borderColor: '#FF4500'
  },
  {
    id: 'carbon',
    image: '/assets/images/img6.png',
    title: 'Carbon Credits',
    description: 'Carbon Credits Tokenization',
    detailText: 'Trade verified carbon offsets with transparent impact metrics.',
    buttonText: 'View Details',
    link: '/tokenization/carbon-credits',
    color: 'from-teal-400 to-cyan-600',
    bgColor: 'from-teal-900/20 to-cyan-900/20',
    borderColor: '#00CED1'
  },
  {
    id: 'equity',
    image: '/assets/images/img7.png',
    title: 'Private Equity',
    description: 'Private Equity Tokenization',
    detailText: 'Access institutional-grade private equity investments with lower minimums.',
    buttonText: 'View Details',
    link: '/tokenization/private-equity',
    color: 'from-gray-500 to-slate-700',
    bgColor: 'from-gray-900/20 to-slate-900/20',
    borderColor: '#708090'
  },
  {
    id: 'diverse',
    image: '/assets/images/img8.png',
    title: 'Alternative Assets',
    description: 'Diverse Asset Tokenization',
    detailText: 'Explore unique alternative assets with blockchain-powered ownership.',
    buttonText: 'View Details',
    link: '/tokenization/other-assets',
    color: 'from-violet-400 to-purple-600',
    bgColor: 'from-violet-900/20 to-purple-900/20',
    borderColor: '#9400D3'
  },
];

const TokenizationSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const navigate = useNavigate();
  const autoplayRef = useRef(null);

  // Handle autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Calculate positions for each card
  const getCardStyle = (index) => {
    const diff = (index - currentIndex + cardData.length) % cardData.length;
    
    // Main card (current)
    if (diff === 0) {
      return {
        zIndex: 30,
        scale: 1,
        opacity: 1,
        x: 0,
        rotateY: 0,
      };
    }
    // Card immediately to the right
    else if (diff === 1) {
      return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.7,
        x: '40%',
        rotateY: 15,
      };
    }
    // Card two positions to the right
    else if (diff === 2) {
      return {
        zIndex: 10,
        scale: 0.7,
        opacity: 0.5,
        x: '70%',
        rotateY: 30,
      };
    }
    // Card immediately to the left
    else if (diff === cardData.length - 1) {
      return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.7,
        x: '-40%',
        rotateY: -15,
      };
    }
    // Card two positions to the left
    else if (diff === cardData.length - 2) {
      return {
        zIndex: 10,
        scale: 0.7,
        opacity: 0.5,
        x: '-70%',
        rotateY: -30,
      };
    }
    // Other cards (hidden)
    else {
      return {
        zIndex: 5,
        scale: 0.5,
        opacity: 0,
        x: diff < cardData.length / 2 ? '100%' : '-100%',
        rotateY: diff < cardData.length / 2 ? 45 : -45,
      };
    }
  };

  // Calculate indicator positions
  const getIndicatorStyle = (index) => {
    const isActive = index === currentIndex;
    return {
      scale: isActive ? 1.5 : 1,
      opacity: isActive ? 1 : 0.5,
      backgroundColor: isActive ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)',
    };
  };

  return (
    <AnimatedCardWrapper
      sx={{
        maxWidth: '100%',
        height: '100%',
        py: 2,
        px: 4,
        overflow: 'hidden',
        borderRadius: '2rem',
        background: 'rgba(15, 16, 22, 0.7)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Border animation elements for outer container */}
      <div className="border-right"></div>
      <div className="border-down"></div>
      <div className="border-left"></div>
      <div className="border-up"></div>
      
      {/* Glass reflection effect */}
      <div className="glass-reflection"></div>
      
      {/* Content wrapper */}
      <div className="card-content relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mt-4 mb-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            Tokenization Ecosystem
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover our premium tokenization solutions across diverse asset classes
          </p>
        </motion.div>

        {/* Main slider area */}
        <div className="relative h-[550px] perspective-1000">
          {/* Cards container */}
          <div className="relative h-full flex items-center justify-center">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute w-full max-w-lg h-[480px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={getCardStyle(index)}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 1
                }}
                onClick={() => {
                  if (index === currentIndex) {
                    navigate(card.link);
                  } else {
                    // If clicking a side card, make it the active card
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }
                }}
              >
                {/* Replace the original card with our InnerCardWrapper */}
                <InnerCardWrapper color={card.borderColor}>
                  {/* Glass reflection effect */}
                  <div className="glass-reflection"></div>
                  
                  {/* Card content */}
                  <div className="card-content">
                    {/* Card header/image section */}
                    <div className="relative h-60 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 mix-blend-overlay`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
                      
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      
                      {/* Label badge */}
                      <div className={`absolute top-6 left-6 py-1.5 px-4 rounded-full bg-gradient-to-r ${card.color} text-white text-sm font-medium z-20 shadow-lg`}>
                        {card.title}
                      </div>
                      
                      {/* Card Title */}
                      <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-md z-20">
                        {card.description}
                      </h3>
                    </div>
                    
                    {/* Card content */}
                    <div className="flex flex-col flex-grow p-6 space-y-6">
                      <p className="text-gray-200 text-base flex-grow leading-relaxed">
                        {card.detailText}
                      </p>
                      
                      {/* Features list */}
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></span>
                          <span>Fractional ownership</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></span>
                          <span>Blockchain secured</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></span>
                          <span>Instant liquidity</span>
                        </li>
                      </ul>
                      
                      {/* CTA Button */}
                      <motion.button 
                        className={`w-full bg-gradient-to-r ${card.color} text-white py-3 px-6 rounded-xl font-medium text-base flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(card.link);
                        }}
                      >
                        {card.buttonText}
                        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.button>
                    </div>
                    
                    {/* Card background accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}></div>
                  </div>
                </InnerCardWrapper>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <motion.button
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center items-center gap-1 mt-1">
          {cardData.map((_, index) => (
            <motion.button
              key={index}
              className="w-3 h-3 rounded-full bg-white/50"
              animate={getIndicatorStyle(index)}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Card counter */}
        <div className="text-center mt-1 text-white/70 font-medium">
          <span className="text-white">{currentIndex + 1}</span> / {cardData.length}
        </div>
      </div>
    </AnimatedCardWrapper>
  );
};

export default TokenizationSlider;