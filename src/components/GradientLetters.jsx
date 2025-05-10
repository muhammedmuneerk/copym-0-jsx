import React from "react";
import { Box } from "@mui/material";

/**
 * GradientLetters component for character-by-character text rendering with gradient effect
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The text to render with gradient effect
 * @param {string} props.keyPrefix - Unique prefix for React keys
 * @return {React.ReactElement} - Array of styled letter spans
 */
const GradientLetters = ({ text, keyPrefix }) => {
  // Define characters with descenders that need special handling
  // const specialDescenders = ['g', 'j', 'y', 'p', 'q'];
   const specialDescenders = ['y',];
  
  return Array.from(text).map((char, idx) => (
    <Box
      key={`${keyPrefix}-${idx}`}
      component="span"
      className="gradient-letter"
      sx={{ 
        display: 'inline-block',         // Make each character a block element
        lineHeight: 1.2,                 // Increased line height for vertical space
        //paddingBottom: '0.1em',          // Add padding at bottom for descenders
        // paddingRight: specialDescenders.includes(char.toLowerCase()) ? '0.05em' : '0',  // Extra space for side-extending descenders
         paddingLeft: specialDescenders.includes(char.toLowerCase()) ? '0.05em' : '0',   // Extra space on both sides to be safe
        // position: 'relative',            // For potential absolute positioning adjustments
        // letterSpacing: '0.01em',         // Slight letter spacing for all characters
      }}
    >
      {char === " " ? "\u00A0" : char}
    </Box>
  ));
};

export default GradientLetters;