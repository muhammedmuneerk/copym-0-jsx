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
  return Array.from(text).map((char, idx) => (
    <Box
      key={`${keyPrefix}-${idx}`}
      component="span"
      className="gradient-letter"
    >
      {char === " " ? "\u00A0" : char}
    </Box>
  ));
};

export default GradientLetters;