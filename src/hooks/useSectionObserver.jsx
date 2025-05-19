import { useState, useEffect } from 'react';

/**
 * Custom hook to track active sections based on scroll position
 * 
 * @param {Array} sections - Array of section objects with id property
 * @param {Object} options - IntersectionObserver options
 * @returns {number} - Index of the currently active section
 */
const useSectionObserver = (sections, options = { threshold: 0.5 }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Get section elements from the DOM
    const sectionElements = sections.map(section => 
      document.getElementById(section.id)
    ).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
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
    }, options);
    
    // Observe all section elements
    sectionElements.forEach(element => observer.observe(element));
    
    // Cleanup function
    return () => {
      sectionElements.forEach(element => observer.unobserve(element));
    };
  }, [sections, options.threshold]);

  return activeSection;
};

export default useSectionObserver;