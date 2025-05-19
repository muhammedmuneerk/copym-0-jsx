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

export default BackgroundPattern;