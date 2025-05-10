import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons - Keeping original icons
const TokenizationIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <path d="M20 5L26.7942 8.2918L33.5885 11.5836L33.5885 18.1672L33.5885 24.7508L26.7942 28.0426L20 31.3344L13.2058 28.0426L6.41154 24.7508L6.41154 18.1672L6.41154 11.5836L13.2058 8.2918L20 5Z" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <circle cx="20" cy="18" r="6" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6.41154" y1="5" x2="33.5885" y2="31.3344" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="14" y1="12" x2="26" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);

const GlobalIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <circle cx="20" cy="20" r="14" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <path d="M20 6C20 6 10 14.5 10 20C10 25.5 10 34 10 34M20 6C20 6 30 14.5 30 20C30 25.5 30 34 30 34M20 6V34M7 20H33" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="7" y1="6" x2="33" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
    </defs>
  </svg>
);

const SecurityIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <path d="M20 5L32 9V17C32 24.1797 27.2157 30.4545 20 32C12.7843 30.4545 8 24.1797 8 17V9L20 5Z" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <path d="M15 19L18 22L25 15" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear" x1="8" y1="5" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="15" y1="15" x2="25" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);

const DiversityIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <circle cx="15" cy="12" r="4" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <circle cx="25" cy="12" r="4" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <path d="M11 21C11 19.3431 12.3431 18 14 18H16C17.6569 18 19 19.3431 19 21V32H11V21Z" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <path d="M21 21C21 19.3431 22.3431 18 24 18H26C27.6569 18 29 19.3431 29 21V32H21V21Z" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="11" y1="18" x2="29" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
    </defs>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
    <path d="M4.16667 15.8333L15.8333 4.16667M15.8333 4.16667H7.5M15.8333 4.16667V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Animated Button Component adapted to match Real Estate theme
const AnimatedButton = ({ children, className, primary }) => {
  return (
    <motion.button
      className={`relative overflow-hidden group ${
        primary 
          ? "bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] border border-[#00A86B]/50" 
          : "bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] border border-[#00A86B]/30"
      } rounded-full px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wide ${className}`}
      style={{
        boxShadow: primary ? 
          '0 0 15px rgba(0,168,107,0.2)' : 
          '0 0 15px rgba(0,168,107,0.1)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

// Asset Type Button with tooltip
const AssetTypeButton = ({ label }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  
  // Define tooltip content based on label
  const tooltipContent = {
    "Intellectual Property": "Tokenize patents, trademarks, and copyrights for fractional ownership",
    "Infrastructure Projects": "Transform large-scale projects into liquid investment opportunities",
    "Revenue Streams": "Convert predictable future income into tradable digital assets",
    "Supply Chain Assets": "Tokenize inventory, warehousing and logistics resources",
    "Digital Rights": "Create verifiable ownership for digital content and services",
    "Creative Works": "Enable fractional ownership of art, music, and entertainment",
    "Specialized Equipment": "Tokenize industrial machinery and specialized tools",
    "Government Contracts": "Transform government agreements into investable assets"
  }[label] || "Explore innovative tokenization opportunities";
  
  return (
    <div className="relative">
      <motion.button
        className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-2 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm relative overflow-hidden group flex items-center gap-1 border border-[#00A86B]/30 rounded-full"
        style={{
          boxShadow: '0 0 15px rgba(0,168,107,0.1)'
        }}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 1 }}
      >
        <span className="relative z-10">{label}</span>
      </motion.button>
      
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 sm:w-60 p-2 sm:p-3 backdrop-blur-lg bg-[#121212] rounded-lg border border-gray-700 shadow-md text-gray-300 text-xs sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 backdrop-blur-lg bg-[#121212] border-r border-b border-gray-700"></div>
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Section Header with animation - adapted to match Real Estate theme
const SectionHeader = ({ children, accent }) => {
  return (
    <motion.h2 
      className={`font-['Orbitron'] font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-4 xs:mb-6 md:mb-12 tracking-tight ${
        accent ? "text-emerald-400" : "text-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.h2>
  );
};

// Feature Card with hover effects - adapted to match Real Estate theme
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-[#121212] relative rounded-xl border border-gray-700 shadow-md backdrop-filter backdrop-blur-sm bg-opacity-80 p-3 xs:p-4 md:p-6 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      <motion.div 
        className="mb-3 xs:mb-4 relative z-10"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-400">
        {description}
      </p>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

// Card component from Real Estate page
const Card = ({ children, className, as3D = false }) => {
  return (
    <motion.div
      whileHover={as3D ? { translateY: -10 } : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#121212] relative rounded-xl border border-gray-700 ${
        as3D 
          ? "shadow-[0_20px_25px_-5px_rgba(16,185,129,0.15),0_10px_10px_-5px_rgba(16,185,129,0.08)]" 
          : "shadow-md"
      } backdrop-filter backdrop-blur-sm bg-opacity-80 ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      {children}
    </motion.div>
  );
};

// Main component
const DiverseAssetTokenization = () => {
  // Intersection observer for scroll animations
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div className="text-white min-h-screen relative overflow-hidden font-sans">
      
      {/* Header Section with Parallax */}
      <div ref={headerRef} className="relative overflow-hidden">
        <section className="relative container mx-auto px-6 py-24">
          <motion.div
            className="max-w-4xl mt-20 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-4 left-0"
            />
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "30%" }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-8 left-0"
            />

            <motion.div 
              className="flex items-center gap-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-700 shadow-md relative overflow-hidden">
                <DiversityIcon />
              </div>
              
              <motion.h1
                className="font-['Orbitron'] text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Diverse Asset <span className="text-emerald-400">Tokenization</span>
              </motion.h1>
            </motion.div>

            <motion.h2
              className="text-xl md:text-2xl font-medium mb-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Tokenize Beyond Traditional Boundaries
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Democratize asset ownership through fractional tokenization,
              enhanced liquidity, and global accessibility. The future of diversified investment is here.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105 group"
              >
                <span className="flex items-center">
                  Explore Solutions
                  <ArrowIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Main Content with Staggered Animations */}
      <motion.section
        className="container mx-auto px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <div className="relative mb-8">
              <div className="absolute left-0 top-0 h-12 w-1 bg-emerald-500 opacity-80" />
              <h2 className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-6 pl-6">
                Unlimited
                <span className="block text-emerald-400">
                  Tokenization Possibilities
                </span>
              </h2>
            </div>

            <p className="text-gray-300 mb-10 text-lg">
              Our platform enables investors to tokenize and trade a diverse range of assets with unprecedented ease, transparency, and efficiency.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<TokenizationIcon />}
                title="Flexible Tokenization"
                description="Tokenize virtually any asset with unique blockchain solutions tailored to your specific requirements"
              />

              <FeatureCard 
                icon={<GlobalIcon />}
                title="Global Accessibility"
                description="Open up new investment opportunities across diverse asset types with worldwide accessibility"
              />

              <FeatureCard 
                icon={<SecurityIcon />}
                title="Comprehensive Compliance"
                description="Robust legal and regulatory frameworks for diverse asset types with built-in verification systems"
              />
            </div>
          </motion.div>

          {/* Right Side - Asset Types with Interactive Elements */}
          <motion.div variants={itemVariants} className="lg:w-full">
            <Card as3D={true} className="group overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-6">
                  <h3 className="text-2xl font-bold">
                    Innovative Asset Types
                  </h3>
                  <p className="text-emerald-100">
                    Transform unique assets into tradable tokens
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                  <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-3 relative z-10 mb-6">
                    <AssetTypeButton label="Intellectual Property" />
                    <AssetTypeButton label="Infrastructure Projects" />
                    <AssetTypeButton label="Revenue Streams" />
                    <AssetTypeButton label="Supply Chain Assets" />
                    <AssetTypeButton label="Digital Rights" />
                    <AssetTypeButton label="Creative Works" />
                    <AssetTypeButton label="Specialized Equipment" />
                    <AssetTypeButton label="Government Contracts" />
                  </div>
                  
                  <button 
                    className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 w-full group"
                  >
                    <span className="flex items-center justify-center">
                      Explore Asset Types
                      <ArrowIcon className="ml-2" />
                    </span>
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with Parallax */}
      <motion.section
        className="container mx-auto px-6 py-20 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Advanced background glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 filter blur-[100px] opacity-15"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Animated network lines in background */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const y1 = 20 + i * 10;
              const y2 = 25 + i * 8;
              return (
                <motion.path
                  key={`line-${i}`}
                  d={`M0 ${y1} Q 50 ${y1 < 50 ? y1 + 20 : y1 - 20}, 100 ${y2}`}
                  stroke="#10b981"
                  strokeWidth="0.4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

          <motion.h2
            className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            variants={itemVariants}
          >
            Can't find your <span className="text-emerald-400">asset type</span>?
          </motion.h2>

          <motion.p
            className="text-gray-300 mb-10 text-xl"
            variants={itemVariants}
          >
            Our team can create a custom tokenization solution tailored to your unique needs.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={itemVariants}
          >
            <button
              className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-4 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105 text-lg group"
            >
              <span className="flex items-center">
                Explore Custom Solutions
                <ArrowIcon className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button 
              className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-4 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 text-lg"
            >
              Speak with Experts
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Add custom style tag for fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        
        .xs\\:text-base {
          font-size: 1rem; /* 16px */
          line-height: 1.5rem; /* 24px */
        }
        .xs\\:text-sm {
          font-size: 0.875rem; /* 14px */
          line-height: 1.25rem; /* 20px */
        }
        .xs\\:text-xs {
          font-size: 0.75rem; /* 12px */
          line-height: 1rem; /* 16px */
        }
        .xs\\:text-lg {
          font-size: 1.125rem; /* 18px */
          line-height: 1.75rem; /* 28px */
        }
        .xs\\:text-xl {
          font-size: 1.25rem; /* 20px */
          line-height: 1.75rem; /* 28px */
        }
        .xs\\:text-2xl {
          font-size: 1.5rem; /* 24px */
          line-height: 2rem; /* 32px */
        }
        .xs\\:text-3xl {
          font-size: 1.875rem; /* 30px */
          line-height: 2.25rem; /* 36px */
        }
        .xs\\:text-4xl {
          font-size: 2.25rem; /* 36px */
          line-height: 2.5rem; /* 40px */
        }
        .xs\\:p-2 {
          padding: 0.5rem; /* 8px */
        }
        .xs\\:p-3 {
          padding: 0.75rem; /* 12px */
        }
        .xs\\:p-4 {
          padding: 1rem; /* 16px */
        }
        .xs\\:px-3 {
          padding-left: 0.75rem; /* 12px */
          padding-right: 0.75rem; /* 12px */
        }
        .xs\\:py-1\\.5 {
          padding-top: 0.375rem; /* 6px */
          padding-bottom: 0.375rem; /* 6px */
        }
        .xs\\:py-1 {
          padding-top: 0.25rem; /* 4px */
          padding-bottom: 0.25rem; /* 4px */
        }
        .xs\\:mb-2 {
          margin-bottom: 0.5rem; /* 8px */
        }
        .xs\\:mb-4 {
          margin-bottom: 1rem; /* 16px */
        }
        .xs\\:mb-6 {
          margin-bottom: 1.5rem; /* 24px */
        }
        .xs\\:gap-2 {
          gap: 0.5rem; /* 8px */
        }
        .xs\\:rounded-xl {
          border-radius: 0.75rem; /* 12px */
        }
      `}</style>
    </div>
  );
};

export default DiverseAssetTokenization;