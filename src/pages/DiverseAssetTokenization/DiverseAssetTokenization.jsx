import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons instead of Material UI
const TokenizationIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16667 15.8333L15.8333 4.16667M15.8333 4.16667H7.5M15.8333 4.16667V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Particle properties
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Draw particle
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Custom Button Component with animations
const AnimatedButton = ({ children, className, primary }) => {
  return (
    <motion.button
      className={`relative overflow-hidden group ${
        primary 
          ? "bg-gradient-to-r from-green-800 to-green-900 text-white" 
          : "border border-green-500 text-green-400 hover:text-white"
      } rounded-md px-6 py-3 font-sans font-medium tracking-wide ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span 
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500/20 to-green-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      />
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
        className="bg-gradient-to-r from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 border border-green-500/30 transition-all duration-300 rounded-full px-5 py-2 text-sm relative overflow-hidden group flex items-center gap-1"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 1 }}
      >
        <motion.span 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-500/10 to-green-600/20"
          animate={{ 
            x: isTooltipVisible ? ['0%', '100%'] : '0%' 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "linear" 
          }}
        />
        <span className="relative z-10">{label}</span>
      </motion.button>
      
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-3 bg-gradient-to-br from-black to-green-950 backdrop-blur-lg rounded-lg border border-green-500/20 shadow-xl text-gray-300 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-green-950 border-r border-b border-green-500/20"></div>
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Section Header with animation
const SectionHeader = ({ children, accent }) => {
  return (
    <motion.h2 
      className={`font-sans font-bold text-4xl mb-16 tracking-tight ${
        accent ? "text-gradient bg-gradient-to-r from-green-400 to-green-200" : "text-white"
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

// Feature Card with hover effects
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-black to-gray-900 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <motion.div 
        className="mb-4 relative z-10 p-3 bg-green-900/20 rounded-lg inline-block"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-sans font-semibold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">{title}</h3>
      
      <p className="font-serif text-gray-400 leading-relaxed">
        {description}
      </p>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-700/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

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
  
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }} 
      />
      
      {/* Custom Cursor (optional) */}
      <div className="custom-cursor"></div>
      
      {/* Header Section with Parallax */}
      <div ref={headerRef} className="relative overflow-hidden pt-10">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)",
            y: isHeaderVisible ? 0 : -50,
            opacity: isHeaderVisible ? 1 : 0,
            transition: "all 1s ease-out"
          }}
        />
        
        <div className="container mx-auto px-6 py-12 mt-16 relative z-10">
          <motion.div 
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-green-800/50 to-green-900/50 backdrop-blur-sm p-4 rounded-lg border border-green-500/20"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <DiversityIcon />
            </motion.div>
            
            <div className="flex-grow">
              <motion.h1 
                className="font-sans text-5xl font-bold tracking-tight text-gradient bg-gradient-to-r from-green-300 to-green-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Diverse Asset Tokenization
              </motion.h1>
              
              <motion.p 
                className="text-green-300/80 mt-2 font-serif text-lg tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Tokenize Beyond Traditional Boundaries
              </motion.p>
            </div>
          </motion.div>
          
          {/* Divider Line with Animation */}
          <motion.div 
            className="h-px w-full bg-gradient-to-r from-green-500 via-green-300 to-green-500"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </div>
      </div>

      {/* Main Content with Staggered Animations */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <SectionHeader accent>Unlimited Tokenization Possibilities</SectionHeader>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Side with 3 Cards - Staggered Animation */}
          <motion.div 
            className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
          >
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
          </motion.div>

          {/* Right Side - Asset Types with Interactive Elements */}
          <motion.div 
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-gradient-to-br from-black to-green-950 backdrop-blur-sm rounded-xl p-8 border border-green-500/20 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-700/10 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-700/10 rounded-tr-full" />
              
              <h3 className="text-2xl font-sans font-bold mb-8 relative z-10 text-gradient bg-gradient-to-r from-green-300 to-green-100">
                Innovative Asset Types
              </h3>

              <div className="flex flex-wrap gap-3 relative z-10">
                <AssetTypeButton label="Intellectual Property" />
                <AssetTypeButton label="Infrastructure Projects" />
                <AssetTypeButton label="Revenue Streams" />
                <AssetTypeButton label="Supply Chain Assets" />
                <AssetTypeButton label="Digital Rights" />
                <AssetTypeButton label="Creative Works" />
                <AssetTypeButton label="Specialized Equipment" />
                <AssetTypeButton label="Government Contracts" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section with Parallax */}
      <motion.div 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Background Decorative Element */}
        <div className="absolute inset-0 z-0" style={{ 
          backgroundImage: "radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.1), transparent 60%)"
        }} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            className="font-sans text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-green-300 to-green-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Can't find your asset type?
          </motion.h2>
          
          <motion.p 
            className="text-green-300/80 max-w-2xl mx-auto mb-12 font-serif text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our team can create a custom tokenization solution tailored to your unique needs.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatedButton primary>
              Explore Custom Solutions <ArrowIcon />
            </AnimatedButton>
            
            <AnimatedButton>
              Speak with Experts <ArrowIcon />
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Add custom style tag for special effects and fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        :root {
          --cursor-size: 20px;
        }
        
        * {
          cursor: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%2310B981' stroke-width='1.5'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%2310B981' fill-opacity='0.3'/%3E%3C/svg%3E") 12 12, auto;
        }
        
        html, body {
          scroll-behavior: smooth;
        }
        
        .font-sans {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-serif {
          font-family: 'Newsreader', serif;
        }
        
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .custom-cursor {
          position: fixed;
          width: var(--cursor-size);
          height: var(--cursor-size);
          border-radius: 50%;
          border: 1.5px solid rgba(16, 185, 129, 0.5);
          pointer-events: none;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          z-index: 9999;
          transition: all 0.1s ease;
        }
      `}</style>
    </div>
  );
};

export default DiverseAssetTokenization;