import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ChevronsRight, Check, Globe, Shield, BarChart, TrendingUp, Users, DollarSign } from "lucide-react";

// Custom hook for scroll-triggered animations
const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold]);
  
  return [ref, controls];
};

// Custom hook for mouse parallax effect
const useMouseParallax = (strength = 0.1) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) * strength;
      const y = (window.innerHeight / 2 - e.clientY) * strength;
      setPosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [strength]);
  
  return position;
};

// CountUp animation component
const CountUp = ({ end, duration = 2, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = end / (duration * 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 1000 / 60);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration]);
  
  return (
    <span ref={countRef}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
    </span>
  );
};

// Noise/grain overlay component
const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// GlowButton component
const GlowButton = ({ children, primary = false, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-8 py-3 rounded-full font-medium overflow-hidden ${
      primary 
        ? "text-white bg-gradient-to-r from-emerald-600 to-teal-500" 
        : "text-white border border-gray-700 hover:border-emerald-500/50"
    } ${className}`}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    {primary && (
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-teal-500/80 blur-xl" 
        initial={{ opacity: 0 }} 
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
    )}
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  </motion.button>
);

// Card3D component
const Card3D = ({ children, className = "" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu transition-transform duration-200 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Feature card with icon
const FeatureCard = ({ icon: Icon, title, description }) => {
  const [ref, controls] = useScrollAnimation(0.2);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-black/30 backdrop-blur-md border border-gray-700/50 p-6 rounded-xl overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className="text-emerald-500 mb-6"
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
      >
        <Icon className="h-8 w-8" />
      </motion.div>
      
      <h3 className="text-xl font-medium mb-2 text-white">
        {title}
      </h3>
      
      <p className="text-gray-400">
        {description}
      </p>
      
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-emerald-500/50 to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

// Token distribution grid
const TokenDistributionGrid = ({ percentageSold = 68 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const gridCells = 100;
  const soldCells = Math.round(gridCells * (percentageSold / 100));
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-10 gap-1 mb-3">
        {[...Array(gridCells)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-4 rounded-sm ${
              i < soldCells ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gray-700/50"
            }`}
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: isHovered && i === soldCells - 1 ? [1, 1.2, 1] : 1,
              transition: { 
                duration: 0.3, 
                delay: i * 0.002,
                repeat: isHovered && i === soldCells - 1 ? Infinity : 0,
                repeatDelay: 2
              }
            }}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-emerald-500">{percentageSold}% Sold</span>
        <span className="text-gray-400">{100 - percentageSold}% Available</span>
      </div>
    </div>
  );
};

// CommoditiesTokenization component
const CommoditiesTokenization = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("all");
  const mouseParallax = useMouseParallax(0.02);
  
  // Animation for background gradient movement
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  // Feature data
  const features = [
    {
      icon: BarChart,
      title: "Commodity Liquidity",
      description: "Transform physical commodities into tradable digital assets"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Diversify investment portfolios across commodity markets"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Invest in commodities from around the world without barriers"
    }
  ];
  
  // Metrics data for animation
  const metrics = [
    { icon: DollarSign, label: "Total Value", value: "15.6M", prefix: "$" },
    { icon: TrendingUp, label: "Total Tokens", value: "156,000" },
    { icon: Users, label: "Investors", value: "520" }
  ];
  
  // Toggle details function
  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };
  
  // Filter commodity types
  const filterCommodities = (type) => {
    setActiveSection(type);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 overflow-hidden relative">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 z-0 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 30% 10%, rgba(5, 90, 70, 0.6) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(4, 60, 110, 0.5) 0%, transparent 40%)",
          transform: `translateY(${backgroundY}px)`
        }}
      />
      
      {/* Grain overlay */}
      <NoiseOverlay />
      
      {/* Hero Section */}
      <motion.section 
        className="px-8 py-16 md:px-16 lg:px-24 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="font-orbitron text-4xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300"
            variants={itemVariants}
          >
            Commodities Tokenization
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            variants={itemVariants}
          >
            Transforming Physical Assets into Digital Investments
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl"
            variants={itemVariants}
          >
            Unlock new investment opportunities in global commodity markets
            through blockchain technology
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <GlowButton primary>
              Start Tokenizing Commodities
              <ChevronsRight className="h-4 w-4" />
            </GlowButton>
            
            <GlowButton>
              Explore Market Insights
            </GlowButton>
          </motion.div>
        </div>
        
        {/* Floating abstract shapes */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 bg-gradient-to-tr from-emerald-600 to-teal-300 blur-2xl"
          animate={{ 
            x: mouseParallax.x * -1, 
            y: mouseParallax.y * -1,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10 bg-gradient-to-bl from-blue-400 to-teal-600 blur-xl"
          animate={{ 
            x: mouseParallax.x * 0.5, 
            y: mouseParallax.y * 0.5,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
      </motion.section>

      {/* Redefine Commodity Investment Section */}
      <section className="px-8 py-16 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:pr-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2 
                className="font-orbitron text-3xl md:text-4xl font-bold mb-4 relative"
                variants={itemVariants}
              >
                Redefine{" "}
                <span className="relative">
                  Commodity Investment
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-400 mb-8"
                variants={itemVariants}
              >
                Leverage blockchain technology to transform traditional commodity
                investing through advanced tokenization strategies
              </motion.p>
              
              {/* Feature Boxes Layout */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Featured Tokenized Commodity Card */}
          <div className="relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10"
            >
              <Card3D className="w-full">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-800/40 relative">
                  {/* Green Header with Logo */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 relative">
                    <div className="flex justify-between items-center">
                      <motion.button
                        className="text-white flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </motion.button>

                      <div className="ml-10">
                        <h3 className="text-2xl font-bold text-white">
                          Golden Reserves
                        </h3>
                        <p className="text-emerald-100 opacity-90">Precious Metals</p>
                      </div>

                      <div className="flex items-center">
                        <div className="mr-8">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            className="text-white/80"
                          >
                            <motion.rect
                              x="8"
                              y="8"
                              width="24"
                              height="6"
                              fill="currentColor"
                              opacity="0.7"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              style={{ transformOrigin: "left" }}
                            />
                            <motion.rect
                              x="8"
                              y="17"
                              width="24"
                              height="6"
                              fill="currentColor"
                              opacity="0.8"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              style={{ transformOrigin: "left" }}
                            />
                            <motion.rect
                              x="8"
                              y="26"
                              width="24"
                              height="6"
                              fill="currentColor"
                              opacity="0.9"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.8, delay: 0.6 }}
                              style={{ transformOrigin: "left" }}
                            />
                          </svg>
                        </div>
                        <motion.button
                          className="text-white flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="text-white p-6">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <p className="text-gray-400 text-sm">{metric.label}</p>
                          <p className="text-xl font-semibold flex items-center">
                            <span className="inline-block w-5 h-5 mr-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-xs">
                              <metric.icon className="h-3 w-3" />
                            </span>
                            {metric.prefix && metric.prefix}
                            <CountUp end={parseInt(metric.value.replace(/[^\d]/g, ""))} />
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Token Distribution */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-1">
                        <span>Token Distribution</span>
                        <span className="text-right">
                          <span className="text-gray-400 text-sm">Token Price</span>
                          <br />
                          <motion.span 
                            className="font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            $100
                          </motion.span>
                        </span>
                      </div>

                      <TokenDistributionGrid percentageSold={68} />
                    </div>

                    {/* Investment Details */}
                    <div className="border-t border-gray-700/50 pt-4">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDetails}
                      >
                        <h4 className="font-semibold">Investment Details</h4>
                        <motion.button 
                          className="text-white p-1 rounded-full hover:bg-white/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {detailsOpen ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </motion.button>
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
                            <div className="py-4">
                              <div className="mb-4">
                                <p className="text-gray-400 text-sm">Expected Returns</p>
                                <p className="font-semibold">6.7% annual</p>
                              </div>

                              <div>
                                <p className="text-gray-400 text-sm mb-2">
                                  Tokenization Benefits
                                </p>
                                <ul className="space-y-2">
                                  {[
                                    "Fractional ownership starting from $100",
                                    "Global market access",
                                    "Transparent trading",
                                    "Diversification opportunities",
                                  ].map((benefit, idx) => (
                                    <motion.li 
                                      key={idx} 
                                      className="flex items-center"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                    >
                                      <span className="text-emerald-500 mr-2">
                                        <ChevronsRight className="h-4 w-4" />
                                      </span>
                                      <span>{benefit}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <GlowButton 
                        primary 
                        className="mt-4 w-full"
                      >
                        View Investment Opportunity
                        <ChevronsRight className="h-4 w-4" />
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-teal-500/5 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Tokenizable Commodity Types */}
      <section className="px-8 py-16 md:px-16 lg:px-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-3">
            Tokenizable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Commodity Types
            </span>
          </h2>
          
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
            Explore a diverse range of commodity assets ready for fractional ownership
          </p>
        </motion.div>

        <motion.div 
          className="overflow-x-auto pb-4 -mx-4 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex space-x-4 justify-center min-w-max">
            {["Precious Metals", "Energy Resources", "Agricultural Products", "Industrial Metals", "Rare Earth Elements"].map((type, index) => (
              <motion.button
                key={index}
                className={`rounded-full px-6 py-2 ${
                  activeSection === type || activeSection === "all"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                    : "border border-gray-700 text-gray-300 hover:border-emerald-500/50"
                } transition-all duration-300 ease-out`}
                onClick={() => filterCommodities(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="px-8 py-16 md:px-16 lg:px-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-3">
            Benefits of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Commodity Tokenization
            </span>
          </h2>
          
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
            Unlock new investment possibilities with blockchain-powered commodity assets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800/40 rounded-lg p-8 relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-semibold mb-6 text-left relative z-10">
              For Investors
            </h3>
            
            <ul className="space-y-4 text-left relative z-10">
              {[
                "Low minimum investment",
                "Enhanced market liquidity",
                "Diversification across commodity classes",
                "Transparent and secure transactions"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-emerald-500 mr-3 flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/40 to-transparent transition-all duration-1000" />
          </motion.div>

          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800/40 rounded-lg p-8 relative overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-teal-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-semibold mb-6 text-left relative z-10">
              For Commodity Owners
            </h3>
            
            <ul className="space-y-4 text-left relative z-10">
              {[
                "Fractional asset monetization",
                "Global investor access",
                "Reduced liquidity constraints",
                "Efficient capital management"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-emerald-500 mr-3 flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-500/40 to-transparent transition-all duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section 
        className="px-8 py-16 md:px-16 lg:px-24 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-b from-black/0 to-black/40 backdrop-blur-sm p-12 rounded-2xl border border-gray-800/30 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
          
          <motion.h2 
            className="font-orbitron text-3xl md:text-4xl font-bold mb-4 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to Revolutionize Your Commodity Investments?
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-8 max-w-3xl mx-auto relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the future of commodity investing with our blockchain-powered
            tokenization platform
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GlowButton primary className="px-8 py-4">
              Start Investing
              <ChevronsRight className="h-5 w-5" />
            </GlowButton>
            
            <GlowButton className="px-8 py-4">
              Learn More
            </GlowButton>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default CommoditiesTokenization;