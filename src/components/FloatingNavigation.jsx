import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * FloatingNavigation - A reusable floating navigation component
 * 
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects with id and title
 * @param {number} props.activeSection - Index of the currently active section
 * @param {function} props.onSectionChange - Optional callback when section changes
 * @param {boolean} props.hideOnMobile - Whether to hide on mobile devices (default: true)
 * @param {Object} props.style - Optional additional styles for the container
 */
const FloatingNavigation = ({
  sections,
  activeSection,
  onSectionChange,
  hideOnMobile = true,
  style = {}
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (isMobile && hideOnMobile) return null;
  
  const handleClick = (index, id) => {
    if (onSectionChange) {
      onSectionChange(index);
    }
  };
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
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
        zIndex: 100,
        ...style
      }}
    >
      {sections.map((section, index) => (
        <motion.a
          key={section.id}
          href={`#${section.id}`}
          onClick={() => handleClick(index, section.id)}
          whileHover={{ scale: 1.1 }}
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

export default FloatingNavigation;