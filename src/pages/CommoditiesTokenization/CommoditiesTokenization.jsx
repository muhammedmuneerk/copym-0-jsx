/* Remove blue/teal imports and only keep relevant ones */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* Custom animation keyframes - defined within the component */
const animationStyles = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes slow-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CommoditiesTokenization = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTokenType, setActiveTokenType] = useState("precious-metals");
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalValue: 0,
    totalTokens: 0,
    investors: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const cardRef = useRef(null);

  // Animation for the 3D card rotation effect
  const [{ rotateX, rotateY }, setRotation] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  // Handle card hover effect
  const handleCardMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (limit to max 10 degrees)
    const rotX = (mouseY / (rect.height / 2)) * 4;
    const rotY = (mouseX / (rect.width / 2)) * -4;

    setRotation({ rotateX: rotX, rotateY: rotY });
  };

  const handleCardLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  // Animation for counting up metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(animatedMetrics, {
        totalValue: 15.6,
        totalTokens: 156000,
        investors: 520,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          setAnimatedMetrics({
            totalValue: parseFloat(animatedMetrics.totalValue.toFixed(1)),
            totalTokens: Math.round(animatedMetrics.totalTokens),
            investors: Math.round(animatedMetrics.investors),
          });
        },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll events
  useEffect(() => {
    // Scroll progress tracking
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateScrollProgress);

    // Scroll-triggered animations
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll("h1, h2, p, div"),
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  // Toggle details expansion
  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative overflow-hidden">
      {/* Inject CSS animations */}
      <style>{animationStyles}</style>
      
      {/* Background grain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
          backgroundSize: "120px",
        }}
      />
      
      {/* Glassmorphism effect layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 backdrop-blur-sm pointer-events-none"></div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="px-8 py-24 md:px-16 lg:px-24 relative overflow-hidden bg-black"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
                  <h1 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold mb-2 tracking-tight text-white">
            Commodities{" "}
            <span className="text-emerald-500">
              Tokenization
            </span>
          </h1>
          <h2 className="font-['Inter'] text-xl md:text-2xl text-gray-300 mb-6 tracking-wide">
            Transforming Physical Assets into Digital Investments
          </h2>
          <p className="font-['Inter'] text-gray-400 mb-12 max-w-2xl text-lg">
            Unlock new investment opportunities in global commodity markets
            through secure blockchain technology and fractional ownership
          </p>

          <div className="flex flex-wrap gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-8 py-4 rounded-lg font-medium text-white"
              >
                <div className="absolute inset-0 bg-emerald-500" />
                <div className="absolute inset-0 bg-emerald-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  Start Tokenizing Commodities
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg font-medium text-white border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 shadow-lg hover:bg-black/60"
              >
                Explore Market Insights
              </motion.button>
          </div>

          {/* 3D Visual Elements */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10 md:opacity-20 pointer-events-none hidden md:block">
            <svg
              width="600"
              height="600"
              viewBox="0 0 100 100"
              style={{ animation: "slow-spin 30s linear infinite" }}
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#10B981" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#10B981" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#10B981" strokeWidth="0.1" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#10B981" strokeWidth="0.1" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#10B981" strokeWidth="0.1" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Redefine Commodity Investment - Fixed Section */}
      <section className="px-8 py-16 md:px-16 lg:px-24 flex flex-col md:flex-row md:gap-16 relative bg-black">
        <div className="md:w-5/12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-200">
              Redefine Commodity Investment
            </h2>
            <p className="font-['Inter'] text-gray-400 mb-12 text-lg">
              Leverage blockchain technology to transform traditional commodity
              investing through fractional ownership and global access
            </p>

            {/* Feature Boxes Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Commodity Liquidity */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl overflow-hidden group shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="text-emerald-500 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                    <path d="M3 9H21" />
                    <path d="M3 15H21" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-200 font-['Space_Grotesk']">
                  Commodity Liquidity
                </h3>
                <p className="text-gray-400 font-['Inter']">
                  Transform physical commodities into tradable digital assets
                </p>
              </motion.div>

              {/* Risk Mitigation */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="text-emerald-500 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-200 font-['Space_Grotesk']">
                  Risk Mitigation
                </h3>
                <p className="text-gray-400 font-['Inter']">
                  Diversify investment portfolios across commodity markets
                </p>
              </motion.div>

              {/* Global Access */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="text-emerald-500 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-200 font-['Space_Grotesk']">
                  Global Access
                </h3>
                <p className="text-gray-400 font-['Inter']">
                  Invest in commodities from around the world without barriers
                </p>
              </motion.div>

              {/* Real-time Tracking */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="text-emerald-500 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-200 font-['Space_Grotesk']">
                  Real-time Tracking
                </h3>
                <p className="text-gray-400 font-['Inter']">
                  Monitor performance and transaction history with blockchain transparency
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Featured Tokenized Commodity Card */}
        <div className="md:w-7/12 mt-24 md:mt-0">
          <animated.div
            ref={cardRef}
            style={{
              transform: "perspective(1000px)",
              rotateX,
              rotateY,
            }}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            className="w-full h-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl relative"
            >
              {/* Card inner glow effect */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Green Header with Logo */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 relative">
                <div className="flex justify-between items-center">
                  <button className="absolute left-4 bg-black/20 hover:bg-black/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="ml-14">
                    <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight">
                      Golden Reserves
                    </h3>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
                      <p className="text-emerald-50 tracking-wide font-['Inter']">Precious Metals</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-8">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        className="text-white/80"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="24"
                          height="6"
                          fill="currentColor"
                          opacity="0.7"
                        />
                        <rect
                          x="8"
                          y="17"
                          width="24"
                          height="6"
                          fill="currentColor"
                          opacity="0.8"
                        />
                        <rect
                          x="8"
                          y="26"
                          width="24"
                          height="6"
                          fill="currentColor"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                  <button className="absolute right-4 bg-black/20 hover:bg-black/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-white p-8">
                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-lg">
                    <p className="text-gray-300 text-sm mb-1 font-['Inter']">Total Value</p>
                    <p className="text-2xl font-semibold flex items-center font-['JetBrains_Mono']">
                      <span className="inline-block w-6 h-6 mr-2 rounded-full bg-emerald-500 flex items-center justify-center text-xs">
                        $
                      </span>
                      {animatedMetrics.totalValue}M
                    </p>
                  </div>
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-lg">
                    <p className="text-gray-300 text-sm mb-1 font-['Inter']">Total Tokens</p>
                    <p className="text-2xl font-semibold flex items-center font-['JetBrains_Mono']">
                      <span className="inline-block w-6 h-6 mr-2 rounded-full bg-emerald-500 flex items-center justify-center text-xs">
                        ↗
                      </span>
                      {animatedMetrics.totalTokens.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-lg">
                    <p className="text-gray-300 text-sm mb-1 font-['Inter']">Investors</p>
                    <p className="text-2xl font-semibold flex items-center font-['JetBrains_Mono']">
                      <span className="inline-block w-6 h-6 mr-2 rounded-full bg-emerald-500 flex items-center justify-center text-xs">
                        ★
                      </span>
                      {animatedMetrics.investors}
                    </p>
                  </div>
                </div>

                {/* Token Distribution */}
                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="font-['Space_Grotesk'] text-lg">Token Distribution</span>
                    <span className="text-right">
                      <span className="text-gray-400 text-sm font-['Inter']">Token Price</span>
                      <br />
                      <span className="font-semibold font-['JetBrains_Mono']">$100</span>
                    </span>
                  </div>

                  {/* Token Distribution Visualization */}
                  <div className="relative h-16 rounded-lg overflow-hidden mb-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
                    {/* Nodes and connections */}
                    <div className="absolute inset-0 flex items-center">
                      {Array(20)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={`node-${i}`}
                            className={`h-2 w-2 rounded-full ${
                              i < 15 ? "bg-emerald-500" : "bg-gray-700"
                            } relative mx-1`}
                            style={{
                              animation: i < 15 ? `pulse 1.5s infinite ${i * 0.1}s` : "none",
                            }}
                          >
                            {i < 15 && (
                              <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping" 
                                style={{ animationDuration: "3s", animationDelay: `${i * 0.05}s` }}
                              />
                            )}
                          </div>
                        ))}
                    </div>

                    <div className="absolute inset-0 flex">
                  <div className="w-8/12 h-full bg-emerald-500/10" />
                      <div className="w-4/12 h-full bg-transparent" />
                    </div>
                    
                    {/* Percentage indicators */}
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                      <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-emerald-500 text-sm font-['JetBrains_Mono']">68% Sold</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-gray-400 text-sm font-['JetBrains_Mono']">32% Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-8/12 bg-gradient-to-r from-emerald-600 to-emerald-400 relative">
                      <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Investment Details */}
                <div className="border-t border-white/10 pt-6">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleDetails}
                  >
                    <h4 className="font-semibold font-['Space_Grotesk'] text-lg">Investment Details</h4>
                    <button className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-emerald-500/20 transition-colors duration-300 backdrop-blur-md border border-white/10">
                      {detailsOpen ? (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {detailsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="py-6 space-y-6">
                          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800/50">
                            <p className="text-gray-400 text-sm font-['Inter']">Expected Returns</p>
                            <p className="font-semibold text-xl font-['JetBrains_Mono'] text-emerald-400">6.7% annual</p>
                          </div>

                          <div>
                            <p className="text-gray-400 text-sm mb-3 font-['Inter']">
                              Tokenization Benefits
                            </p>
                            <ul className="space-y-3">
                              {[
                                "Fractional ownership starting from $100",
                                "Global market access",
                                "Transparent trading",
                                "Diversification opportunities",
                              ].map((benefit, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-center bg-gray-800/30 backdrop-blur-sm p-3 rounded-lg border border-gray-700/30"
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  <span className="text-emerald-500 mr-3">
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-['Inter']">{benefit}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 py-4 px-6 flex items-center justify-center font-medium text-white">
                      <span className="mr-2">View Investment Opportunity</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </animated.div>
        </div>
      </section>

      {/* Tokenizable Commodity Types */}
      <section className="px-8 py-24 md:px-16 lg:px-24 text-center relative bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Tokenizable{" "}
            <span className="text-emerald-500">
              Commodity Types
            </span>
          </h2>
          <p className="font-['Inter'] text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
            Explore a diverse range of commodity assets ready for fractional
            ownership and global trading
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { 
                name: "Precious Metals", 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3L4 9v6l8 6 8-6V9l-8-6z" />
                    <path d="M12 3v6" />
                    <path d="M4 9h16" />
                    <path d="M12 15l4-3" />
                    <path d="M8 12l4 3" />
                  </svg>
                )
              },
              { 
                name: "Energy Resources", 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                )
              },
              { 
                name: "Agricultural Products", 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l0 3h-8l0-3c-3-1.5-5-4.5-5-8a9 9 0 0 1 9-9z" />
                    <path d="M8 21h8" />
                    <path d="M12 9v3" />
                    <path d="M9 12h6" />
                  </svg>
                )
              },
              { 
                name: "Industrial Metals", 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                    <path d="M8.5 8.5l7 7" />
                    <path d="M15.5 8.5l-7 7" />
                  </svg>
                )
              },
              { 
                name: "Rare Earth Elements", 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3l12 18h-3M6 3h3m-3 0l6 9m6 9l-6-9m6 9h-3" />
                    <path d="M6 3l3 4.5M18 21l-3-4.5" />
                  </svg>
                )
              },
            ].map((commodity, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full px-6 py-3 backdrop-blur-sm border border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 transition-colors duration-300 flex items-center"
              >
                <span className="mr-2 text-emerald-500">{commodity.icon}</span>
                <span className="font-['Inter']">{commodity.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Interactive commodities showcase */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Gold",
                type: "Precious Metals",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3L4 9v6l8 6 8-6V9l-8-6z" />
                    <path d="M12 3v6" />
                    <path d="M4 9h16" />
                  </svg>
                ),
                price: "$1,980/oz",
                change: "+2.4%",
              },
              {
                name: "Natural Gas",
                type: "Energy Resources",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                price: "$3.21/MMBtu",
                change: "-0.8%",
              },
              {
                name: "Copper",
                type: "Industrial Metals",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 8.5l7 7" />
                    <path d="M15.5 8.5l-7 7" />
                  </svg>
                ),
                price: "$4.12/lb",
                change: "+1.5%",
              },
            ].map((commodity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 group"
              >
                <div className="h-3 bg-emerald-500" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="mr-3 text-emerald-500">{commodity.icon}</span>
                      <div className="text-left">
                        <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white">
                          {commodity.name}
                        </h3>
                        <p className="text-gray-400 text-sm font-['Inter']">{commodity.type}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-black/20 backdrop-blur-md group-hover:border-emerald-500 transition-colors duration-300 shadow-lg">
                      <svg
                        className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="font-['JetBrains_Mono']">
                      <p className="text-gray-400 text-sm">Current Price</p>
                      <p className="text-xl font-semibold">{commodity.price}</p>
                    </div>
                    <div className="font-['JetBrains_Mono']">
                      <p className="text-gray-400 text-sm">24h Change</p>
                      <p className={`text-xl font-semibold ${
                        commodity.change.startsWith("+") ? "text-emerald-500" : "text-gray-500"
                      }`}>
                        {commodity.change}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="px-8 py-24 md:px-16 lg:px-24 text-center relative bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Benefits of{" "}
            <span className="text-emerald-500">
              Commodity Tokenization
            </span>
          </h2>
          <p className="font-['Inter'] text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
            Unlock new investment possibilities with blockchain-powered commodity
            assets and fractional ownership
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-2xl text-emerald-500 font-semibold mb-8 text-left font-['Space_Grotesk']">
                For Investors
              </h3>
              <ul className="space-y-6 text-left">
                {[
                  "Low minimum investment",
                  "Enhanced market liquidity",
                  "Diversification across commodity classes",
                  "Transparent and secure transactions",
                ].map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 mr-4">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="font-['Inter'] text-gray-200">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-2xl text-emerald-500 font-semibold mb-8 text-left font-['Space_Grotesk']">
                For Commodity Owners
              </h3>
              <ul className="space-y-6 text-left">
                {[
                  "Fractional asset monetization",
                  "Global investor access",
                  "Reduced liquidity constraints",
                  "Efficient capital management",
                ].map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-black/30 backdrop-blur-lg p-4 rounded-lg border border-white/10 shadow-lg"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 mr-4 shadow-lg shadow-emerald-500/20">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="font-['Inter'] text-gray-200">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-24 md:px-16 lg:px-24 text-center relative bg-black">
                  <div className="max-w-5xl mx-auto relative">
          {/* Background effects */}
          <div className="absolute inset-0 bg-black/30 rounded-3xl transform -rotate-1 backdrop-blur-md border border-white/5" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl" />
          
          <div className="relative py-16 px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to Revolutionize Your{" "}
                <span className="text-emerald-500">
                  Commodity Investments?
                </span>
              </h2>
              <p className="font-['Inter'] text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Join the future of commodity investing with our blockchain-powered
                tokenization platform
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-10 py-5 rounded-lg font-medium text-white group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center font-['Inter']">
                    Start Investing
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-lg font-medium text-white border border-white/10 bg-black/30 backdrop-blur-md transition-colors duration-300 shadow-lg hover:bg-black/50 font-['Inter']"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-md h-4 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 blur-xl" />
      </section>

      {/* Custom cursor effect - can be enabled if desired */}
      {/* <div className="fixed w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-emerald-500 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out opacity-70" style={{ left: cursorPos.x, top: cursorPos.y }} /> */}
    </div>
  );
};

export default CommoditiesTokenization;

/* Custom animation keyframes applied within component */