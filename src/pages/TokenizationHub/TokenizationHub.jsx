import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TokenizationJourney from "./TokenizationJourney";
import { 
  GlassMorphismCard, 
  MorphingButton, 
  GradientText
  // HorizontalScrollContainer removed from import
} from "./UIComponents";
import "./TokenizationHub.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Asset categories data
const assetCategories = [
  {
    title: "Real Estate",
    description: "Tokenize commercial and residential properties, REITs, and development projects",
    marketSize: "280B+",
    keyBenefits: [
      "Fractional ownership of premium properties",
      "Enhanced liquidity for real estate assets",
      "Access to global real estate markets",
    ],
    color: "#00ff85",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Art & Collectibles",
    description: "Digital ownership of fine art, collections, and cultural assets",
    marketSize: "65B+",
    keyBenefits: [
      "Fractional ownership of high-value art",
      "Digital provenance on the blockchain",
      "Access to exclusive art collections",
    ],
    color: "#00e676",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 11a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Commodities",
    description: "Tokenize physical commodities including precious metals and agriculture",
    marketSize: "120B+",
    keyBenefits: [
      "Fractional ownership of commodity supplies",
      "Simplified trading and settlement",
      "Reduced custody costs",
    ],
    color: "#00ff85",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9l-7 4-7-4m14 0l-7-4-7 4m14 0v6l-7 4m-7-10v6l7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Carbon Credits",
    description: "Digital trading of carbon offset credits and environmental assets",
    marketSize: "45B+",
    keyBenefits: [
      "Transparent carbon offset certificates",
      "Streamlined carbon credit trading",
      "Enhanced environmental impact tracking",
    ],
    color: "#00cc66",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 22l6-6M17 8l4-4M12 12l4-4M7 7l4-4M22 22l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 16l-4 4M8 12l4 4M12 3c.661.087 3.76.792 4 3 .284 2.578-4 6-4 6s-4.284-3.422-4-6c.24-2.208 3.339-2.913 4-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Private Equity",
    description: "Tokenize private equity funds, venture capital, and business shares",
    marketSize: "175B+",
    keyBenefits: [
      "Access to previously illiquid investments",
      "Reduced minimum investment thresholds",
      "Enhanced secondary market trading",
    ],
    color: "#00e676",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Other Asset Classes",
    description: "Explore additional assets like infrastructure, IP, and more",
    marketSize: "90B+",
    keyBenefits: [
      "Tokenize virtually any asset with value",
      "Custom tokenization frameworks",
      "Innovative asset structures",
    ],
    color: "#00ff85",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

// Comparison data
const comparisonData = [
  {
    feature: "Multi-Chain Support",
    copym: { value: "Comprehensive", status: "success", detail: "Support for 20+ blockchain networks with cross-chain capabilities" },
    competitorA: { value: "Limited", status: "warning", detail: "Only 3 major blockchains supported" },
    competitorB: { value: "Single-chain", status: "error", detail: "Ethereum-only solution" },
  },
  {
    feature: "Compliance Framework",
    copym: { value: "Enterprise-grade", status: "success", detail: "Supports 40+ jurisdictions with automated compliance monitoring" },
    competitorA: { value: "Moderate", status: "warning", detail: "Manual compliance checks for major markets" },
    competitorB: { value: "Basic", status: "error", detail: "Limited to a single jurisdiction" },
  },
  {
    feature: "Asset Types",
    copym: { value: "Unlimited", status: "success", detail: "Any asset class with configurable parameters" },
    competitorA: { value: "Several", status: "warning", detail: "Limited to 4 predefined asset classes" },
    competitorB: { value: "Single focus", status: "error", detail: "Specialized for real estate only" },
  },
  {
    feature: "Token Standards",
    copym: { value: "Multiple", status: "success", detail: "ERC-20, ERC-721, ERC-1155, and custom standards" },
    competitorA: { value: "Basic", status: "warning", detail: "Only ERC-20 and ERC-721 support" },
    competitorB: { value: "Proprietary", status: "error", detail: "Non-standard token implementation" },
  },
  {
    feature: "Tokenization Speed",
    copym: { value: "Rapid", status: "success", detail: "48-hour average deployment time" },
    competitorA: { value: "Standard", status: "warning", detail: "2-week process" },
    competitorB: { value: "Lengthy", status: "error", detail: "4+ week implementation" },
  },
];

// Background patterns
const BackgroundPattern = () => (
  <svg 
    style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      opacity: 0.15,
      pointerEvents: "none"
    }}
    width="100%" 
    height="100%" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern 
        id="smallGrid" 
        width="20" 
        height="20" 
        patternUnits="userSpaceOnUse"
      >
        <path 
          d="M 20 0 L 0 0 0 20" 
          fill="none" 
          stroke="rgba(0, 255, 133, 0.3)" 
          strokeWidth="0.5"
        />
      </pattern>
      <pattern 
        id="grid" 
        width="100" 
        height="100" 
        patternUnits="userSpaceOnUse"
      >
        <rect 
          width="100" 
          height="100" 
          fill="url(#smallGrid)" 
        />
        <path 
          d="M 100 0 L 0 0 0 100" 
          fill="none" 
          stroke="rgba(0, 255, 133, 0.5)" 
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect 
      width="100%" 
      height="100%" 
      fill="url(#grid)" 
    />
  </svg>
);

/**
 * ComparisonVisualization component
 * Creates a visual comparison chart
 */
const ComparisonVisualization = ({ data }) => {
  const features = data.map(item => item.feature);
  const copymValues = data.map(item => {
    switch (item.copym.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const compAValues = data.map(item => {
    switch (item.competitorA.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const compBValues = data.map(item => {
    switch (item.competitorB.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, [touchTimeout]);
  
  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFeatureInteraction = (index) => {
    if (isMobile) {
      // For mobile/tablet, toggle on touch
      setSelectedFeature(selectedFeature === index ? null : index);
    } else {
      // For desktop, show on hover
      setSelectedFeature(index);
    }
  };
  
  const handleFeatureLeave = () => {
    if (!isMobile) {
      setSelectedFeature(null);
    }
  };
  
  return (
    <div className="comparison-visualization" style={{ position: "relative", height: isMobile ? "600px" : "480px", width: "100%" }}>
      <div className="comparison-legend" style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "20px",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? "12px" : "0"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: isMobile ? "0" : "20px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#00ff85", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>CopyM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginRight: isMobile ? "0" : "20px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#a2a9b0", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>Competitor A</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#6a6a6a", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>Competitor B</span>
        </div>
      </div>
      
      <div className="chart-container" style={{ 
        height: isMobile ? "400px" : "300px", 
        display: "flex", 
        alignItems: "flex-end", 
        justifyContent: "space-around", 
        padding: "0 20px",
        overflowX: isMobile ? "auto" : "visible",
        scrollSnapType: isMobile ? "x mandatory" : "none",
        WebkitOverflowScrolling: "touch"
      }}>
        {features.map((feature, index) => (
          <div 
            key={feature}
            className="feature-group"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: isMobile ? "200px" : `${100 / features.length}%`,
              minWidth: isMobile ? "200px" : "auto",
              scrollSnapAlign: isMobile ? "center" : "none",
              padding: isMobile ? "0 10px" : "0",
              cursor: isMobile ? "pointer" : "default"
            }}
            onMouseEnter={() => !isMobile && handleFeatureInteraction(index)}
            onMouseLeave={handleFeatureLeave}
            onClick={() => isMobile && handleFeatureInteraction(index)}
            onTouchStart={(e) => {
              e.preventDefault(); // Prevent double-tap zoom
              if (isMobile) {
                if (touchTimeout) clearTimeout(touchTimeout);
                const timeout = setTimeout(() => {
                  handleFeatureInteraction(index);
                }, 100);
                setTouchTimeout(timeout);
              }
            }}
          >
            <div style={{ display: "flex", height: "220px", alignItems: "flex-end", marginBottom: "16px" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${copymValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#00ff85",
                  marginRight: "8px",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(0, 255, 133, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${compAValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#a2a9b0",
                  marginRight: "8px",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(162, 169, 176, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${compBValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#6a6a6a",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(106, 106, 106, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
            </div>
            <div style={{ textAlign: "center", height: "40px" }}>
              <p style={{ 
                fontSize: isMobile ? "0.7rem" : "0.75rem", 
                color: selectedFeature === index ? "#fff" : "rgba(255, 255, 255, 0.7)",
                fontWeight: selectedFeature === index ? 600 : 400,
                transition: "all 0.3s ease"
              }}>
                {feature}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="feature-detail"
            style={{
              position: "absolute",
              top: isMobile ? "450px" : "350px",
              left: isMobile ? "10%" : "20%",
              transform: "translateX(0)",
              width: isMobile ? "80%" : "100%",
              maxWidth: "600px",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "rgba(18, 19, 26, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              pointerEvents: "auto"
            }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, auto)",
              columnGap: "20px",
              rowGap: "10px",
              marginBottom: "8px"
            }}>
              <span style={{ color: "#00ff85", fontWeight: 600 }}>
                CopyM: {data[selectedFeature].copym.value}
              </span>
              <span style={{ color: "#a2a9b0" }}>
                Competitor A: {data[selectedFeature].competitorA.value}
              </span>
              <span style={{ color: "#6a6a6a" }}>
                Competitor B: {data[selectedFeature].competitorB.value}
              </span>
            </div>
            <p style={{ 
              color: "rgba(255, 255, 255, 0.8)", 
              fontSize: isMobile ? "0.8rem" : "0.85rem", 
              margin: 0,
              lineHeight: "1.4"
            }}>
              {data[selectedFeature].copym.detail}
            </p>
            {isMobile && (
              <button
                onClick={() => setSelectedFeature(null)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                ×
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FloatingNavigation component
 * Creates a floating navigation bar
 */
const FloatingNavigation = ({ sections, activeSection }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (isMobile) return null; // Hide on mobile
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="floating-navigation"
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        padding: "8px",
        borderRadius: "16px",
        backgroundColor: "rgba(18, 19, 26, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 100
      }}
    >
      {sections.map((section, index) => (
        <motion.a
          key={section.id}
          href={`#${section.id}`}
          whileHover={{ scale: 1.1 }}
          className="nav-item"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: "8px",
            margin: "0 4px",
            backgroundColor: activeSection === index ? "rgba(0, 255, 133, 0.2)" : "transparent",
            transition: "background-color 0.3s ease",
            textDecoration: "none"
          }}
        >
          <span style={{
            fontSize: "0.75rem",
            fontWeight: activeSection === index ? 600 : 400,
            color: activeSection === index ? "#00ff85" : "rgba(255, 255, 255, 0.7)",
            transition: "color 0.3s ease",
            fontFamily: "'Orbitron', sans-serif",
          }}>
            {section.title}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

// Main TokenizationHub component
export default function TokenizationHub() {
  const [activeSection, setActiveSection] = useState(0);
  
  // Define sections for navigation
  const sections = [
    { id: "intro", title: "Intro" },
    { id: "assets", title: "Asset Classes" },
    { id: "journey", title: "Tokenization Journey" },
    { id: "comparison", title: "Platform Comparison" },
    { id: "cta", title: "Get Started" }
  ];
  
  useEffect(() => {
    // Initialize section observation
    const sectionElements = sections.map(section => document.getElementById(section.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionElements.findIndex(
              element => element === entry.target
            );
            if (sectionIndex !== -1) {
              setActiveSection(sectionIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe all section elements
    sectionElements.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      sectionElements.forEach(element => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
    
  return (
    <div className="tokenization-hub">
      {/* Background pattern */}
      <BackgroundPattern />
      
      {/* Background radial gradient */}
      <div className="background-gradient" />
      
      {/* Background grain texture */}
      <div className="background-grain" />
      
      {/* Main content */}
      <div className="main-content">
        {/* Header Section */}
        <section id="intro" className="section intro-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="intro-content"
          >
            <div className="icon-container">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <motion.div
                className="icon-ring"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <h1 className="main-title">
              Complete Asset
              <br />
              Tokenization Hub
            </h1>
            
            <p className="main-description">
              Transform any real-world asset into digital tokens with CopyM's 
              comprehensive tokenization platform.
            </p>
            
            <div className="button-group">
              <MorphingButton primary>
                Explore Platform
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MorphingButton>
              
              <MorphingButton>
                Watch Demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MorphingButton>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="scroll-indicator"
          >
            <p>Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Asset Categories Section */}
        <section id="assets" className="section assets-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <h2 className="section-title">
              Tokenize Any <GradientText>Asset Class</GradientText>
            </h2>
            
            <p className="section-description">
              Our unified platform supports the complete tokenization lifecycle
              for all major asset classes
            </p>
          </motion.div>
          
          {/* Asset Grid - NEW STRUCTURE */}
          <div className="asset-grid">
            {assetCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="asset-card-grid-item"
              >
                <GlassMorphismCard className="h-full" color={`rgba(0, 255, 133, ${index % 2 === 0 ? '0.1' : '0.05'})`}>
                  <div className="asset-card-content">
                    <motion.div 
                      className="asset-icon"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    
                    <div className="asset-details">
                      <h3 className="asset-title">
                        {category.title}
                      </h3>
                      
                      <p className="asset-description">
                        {category.description}
                      </p>
                      
                      <div className="market-size">
                        <h4 className="market-value">
                          ${category.marketSize}
                        </h4>
                        <span className="market-label">
                          Market Size
                        </span>
                      </div>
                      
                      <h5 className="benefits-title">
                        Key Benefits:
                      </h5>
                      
                      <ul className="benefits-list">
                        {category.keyBenefits.map((benefit, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="benefit-item"
                          >
                            <span className="benefit-icon" style={{ color: category.color }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <div className="asset-actions">
                        <MorphingButton>
                          View Examples
                        </MorphingButton>
                        <MorphingButton>
                          Learn More
                        </MorphingButton>
                      </div>
                    </div>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Tokenization Journey Section */}
        <TokenizationJourney id="journey" />
        
        {/* Comparison Section */}
        <section id="comparison" className="section comparison-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <h2 className="section-title">
              How CopyM <GradientText>Compares</GradientText>
            </h2>
            
            <p className="section-description">
              See why leading organizations choose CopyM for their tokenization needs
            </p>
          </motion.div>
          
          <div className="comparison-container">
            <GlassMorphismCard>
              <ComparisonVisualization data={comparisonData} />
            </GlassMorphismCard>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="comparison-feature"
            >
              <GlassMorphismCard color="rgba(0, 255, 133, 0.1)">
                <div className="feature-content">
                  <div className="feature-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="feature-details">
                    <h3 className="feature-title">
                      Complete All-in-One Solution
                    </h3>
                    
                    <p className="feature-description">
                      CopyM provides end-to-end tokenization infrastructure in one platform, eliminating 
                      the need to piece together multiple services. From legal structure to token 
                      distribution and management, all aspects of tokenization are covered.
                    </p>
                  </div>
                </div>
              </GlassMorphismCard>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="section cta-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="cta-content"
          >
            <div className="icon-container">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <motion.div
                className="icon-ring"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <h2 className="section-title">
              Ready to <GradientText>Tokenize Your Assets?</GradientText>
            </h2>
            
            <p className="section-description">
              Join thousands of businesses and investors already transforming
              their assets on the CopyM platform.
            </p>
            
            <div style={{ marginTop: "32px" }}>
              <MorphingButton primary>
                Contact Our Team
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MorphingButton>
            </div>
          </motion.div>
        </section>
        
        {/* Floating Navigation */}
        <FloatingNavigation sections={sections} activeSection={activeSection} />
      </div>
    </div>
  );
}