import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Polygon, Tooltip, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Globe,
  Shield,
  Building,
  Search,
  Moon,
  Sun,
  Fingerprint,
  Lock,
  TrendingUp,
  BarChart,
  LineChart,
  DollarSign,
  PieChart
} from "lucide-react";
import { Download, RefreshCw } from 'react-feather';
import ContinentalGoldMap from "../../components/ContinentalGoldMap";
import InvestmentCalculator from "../../components/InvestmentCalculator";

// WebGL Gold Particle Flow Component
const GoldParticleFlow = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Try to get WebGL context with error handling
    let gl;
    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
      console.error("WebGL initialization error:", e);
      return;
    }
    
    if (!gl) {
      console.error("WebGL not supported in this browser");
      return;
    }
    
    // Resize canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX / canvas.width,
        y: 1 - e.clientY / canvas.height
      };
    };
    
    // Handle scroll
    const handleScroll = () => {
      scrollPos.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Simplified vertex shader for better compatibility
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      uniform float uTime;
      
      varying highp vec2 vTextureCoord;
      varying highp float vTime;
      
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
        vTime = uTime;
      }
    `;
    
    // Simplified fragment shader for better compatibility
    const fsSource = `
      precision mediump float;
      varying highp vec2 vTextureCoord;
      varying highp float vTime;
      
      uniform vec2 uResolution;
      uniform float uTime;
      
      void main(void) {
        vec2 uv = vTextureCoord;
        
        // Simple gold color with time-based animation
        float t = uTime * 0.5;
        vec3 gold = vec3(0.8 + 0.2 * sin(t), 0.6 + 0.1 * sin(t + 1.0), 0.2);
        
        // Simple pattern
        float pattern = sin(uv.x * 20.0 + t) * sin(uv.y * 20.0 + t);
        pattern = 0.5 + 0.5 * pattern;
        
        // Final color
        vec3 color = gold * pattern;
        float alpha = 0.3;  // Semi-transparent
        
        gl_FragColor = vec4(color, alpha);
      }
    `;
    
    // Helper function to compile shader with better error handling
    function loadShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        console.error(`Could not compile WebGL shader: ${info}`);
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }
    
    // Initialize shaders with proper error handling
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error("Shader compilation failed - can't continue WebGL setup");
      return; // Exit without trying to use invalid shaders
    }
    
    // Create shader program with error checking
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(`Unable to initialize shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
      return;
    }
    
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        time: gl.getUniformLocation(shaderProgram, 'uTime'),
        resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
      },
    };
    
    // Create buffers for positions and texture coordinates
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Create a unit quad
    const positions = [
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0,
       1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    
    const textureCoordinates = [
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    const indices = [
      0, 1, 2,    0, 2, 3,
    ];
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    const buffers = {
      position: positionBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
    
    let startTime = Date.now();
    
    // Simple matrix creation function
    const mat4 = {
      create: function() {
        return new Float32Array([
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ]);
      },
      perspective: function(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = (far + near) / (near - far);
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (2 * far * near) / (near - far);
        out[15] = 0;
        return out;
      }
    };
    
    // Render function
    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001; // time in seconds
      
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      // Create projection matrix
      const fieldOfView = (45 * Math.PI) / 180;
      const aspect = canvas.clientWidth / canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projectionMatrix = mat4.create();
      
      mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
      );
      
      // Set position to identity - drawing a full-screen quad
      const modelViewMatrix = mat4.create();
      
      // Bind position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        3,          // numComponents
        gl.FLOAT,   // type
        false,      // normalize
        0,          // stride
        0           // offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      
      // Bind texture coordinate buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        2,          // numComponents
        gl.FLOAT,   // type
        false,      // normalize
        0,          // stride
        0           // offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
      
      // Bind index buffer
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
      
      // Use shader program
      gl.useProgram(programInfo.program);
      
      // Set uniforms
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);
      gl.uniform2f(
        programInfo.uniformLocations.resolution, 
        canvas.width, 
        canvas.height
      );
      
      // Draw
      gl.drawElements(
        gl.TRIANGLES,
        6,
        gl.UNSIGNED_SHORT,
        0
      );
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Start rendering with try-catch for safety
    try {
      render();
    } catch (e) {
      console.error("WebGL rendering error:", e);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
};




// Portfolio Allocation System
const GoldPortfolioAllocation = () => {
  const [allocation, setAllocation] = useState({
    bullionBars: 40,
    coins: 20,
    etf: 15,
    mining: 15,
    futures: 10
  });
  
  const [riskLevel, setRiskLevel] = useState(3); // 1-5 scale
  
  const handleAllocationChange = (type, value) => {
    // Calculate remaining allocation space
    const currentTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    const currentTypeValue = allocation[type];
    const remaining = 100 - currentTotal + currentTypeValue;
    
    // Make sure new value doesn't exceed 100% total
    const newValue = Math.min(value, remaining);
    
    setAllocation({
      ...allocation,
      [type]: newValue
    });
    
    // Recalculate risk based on allocation
    calculateRiskMetrics();
  };
  
  // Calculate risk metrics based on allocation
  const calculateRiskMetrics = () => {
    // Risk factors for each type (scale of 1-10)
    const riskFactors = {
      bullionBars: 2,
      coins: 3,
      etf: 4,
      mining: 7,
      futures: 9
    };
    
    // Calculate weighted risk
    let weightedRisk = 0;
    Object.keys(allocation).forEach(type => {
      weightedRisk += (allocation[type] / 100) * riskFactors[type];
    });
    
    // Scale to 1-5
    setRiskLevel(Math.max(1, Math.min(5, Math.round(weightedRisk / 2))));
  };
  
  // Potential returns based on allocation and risk
  const getProjectedReturns = () => {
    const baseReturns = {
      bullionBars: { low: 2, avg: 4, high: 6 },
      coins: { low: 3, avg: 5, high: 8 },
      etf: { low: 3, avg: 6, high: 9 },
      mining: { low: -5, avg: 8, high: 20 },
      futures: { low: -10, avg: 9, high: 25 }
    };
    
    let lowReturn = 0;
    let avgReturn = 0;
    let highReturn = 0;
    
    Object.keys(allocation).forEach(type => {
      lowReturn += (allocation[type] / 100) * baseReturns[type].low;
      avgReturn += (allocation[type] / 100) * baseReturns[type].avg;
      highReturn += (allocation[type] / 100) * baseReturns[type].high;
    });
    
    return {
      low: lowReturn.toFixed(1),
      avg: avgReturn.toFixed(1),
      high: highReturn.toFixed(1)
    };
  };
  
  const returns = getProjectedReturns();
  
  // Chart data for allocation
  const pieChartData = [
    { name: "Gold Bullion", value: allocation.bullionBars, color: "#FFD700" },
    { name: "Gold Coins", value: allocation.coins, color: "#DAA520" },
    { name: "Gold ETFs", value: allocation.etf, color: "#B8860B" },
    { name: "Mining Stocks", value: allocation.mining, color: "#CD853F" },
    { name: "Gold Futures", value: allocation.futures, color: "#D2B48C" }
  ];
  
  // Generate segments for pie chart
  const generatePieChart = () => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    let startAngle = 0;
    const segments = [];
    
    pieChartData.forEach((segment, index) => {
      if (segment.value === 0) return;
      
      const angle = (segment.value / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate coordinates
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Flag for large arc
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Path for segment
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
      
      // Slightly pull out the segment for hover effect
      const midRad = (startRad + endRad) / 2;
      const pullOut = 0;
      
      segments.push(
        <path
          key={`segment-${index}`}
          d={pathData}
          fill={segment.color}
          stroke="#333"
          strokeWidth="1"
          transform={`translate(${Math.cos(midRad) * pullOut} ${Math.sin(midRad) * pullOut})`}
          className="transition-all hover:brightness-110 hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-lg"
        >
          <title>{segment.name}: {segment.value}%</title>
        </path>
      );
      
      // Add labels
      if (segment.value >= 5) {
        const labelRad = (startRad + endRad) / 2;
        const labelDist = radius * 0.7;
        const labelX = centerX + labelDist * Math.cos(labelRad);
        const labelY = centerY + labelDist * Math.sin(labelRad);
        
        segments.push(
          <text
            key={`label-${index}`}
            x={labelX}
            y={labelY}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="bold"
          >
            {segment.value}%
          </text>
        );
      }
      
      startAngle = endAngle;
    });
    
    return segments;
  };
  
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-yellow-500/20">
        <h3 className="text-xl font-bold text-yellow-500">Gold Portfolio Allocation</h3>
        <p className="text-gray-300 text-sm">Customize your gold asset allocation strategy</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div>
          {/* Allocation Controls */}
          <div className="space-y-4">
            {Object.entries({
              bullionBars: "Physical Gold Bullion",
              coins: "Numismatic Gold Coins",
              etf: "Gold ETFs & Funds",
              mining: "Gold Mining Stocks",
              futures: "Gold Futures & Options"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">{label}</span>
                  <span className="text-yellow-500">{allocation[key]}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocation[key]}
                    onChange={(e) => handleAllocationChange(key, parseInt(e.target.value))}
                    className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Risk Metrics */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-yellow-500/10">
            <h4 className="text-gray-300 font-medium mb-2">Risk Analysis</h4>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Risk Level</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`w-5 h-5 rounded-full ${
                      level <= riskLevel 
                        ? level < 3 
                          ? 'bg-green-500' 
                          : level === 3 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Conservative Projection</span>
                <span className={`text-sm font-medium ${returns.low < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {returns.low > 0 ? '+' : ''}{returns.low}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Average Projection</span>
                <span className={`text-sm font-medium ${returns.avg < 0 ? 'text-red-400' : 'text-yellow-500'}`}>
                  {returns.avg > 0 ? '+' : ''}{returns.avg}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Optimistic Projection</span>
                <span className={`text-sm font-medium ${returns.high < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {returns.high > 0 ? '+' : ''}{returns.high}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Pie Chart Visualization */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" width="200" height="200">
              {generatePieChart()}
            </svg>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
              {pieChartData.map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-yellow-500/10">
            <h4 className="text-gray-300 font-medium mb-2">Asset Class Characteristics</h4>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-gray-400">Asset Type</div>
              <div className="text-gray-400">Liquidity</div>
              <div className="text-gray-400">Volatility</div>
              
              <div className="text-gray-300">Bullion</div>
              <div className="text-yellow-500">●●●○○</div>
              <div className="text-green-500">●○○○○</div>
              
              <div className="text-gray-300">Coins</div>
              <div className="text-yellow-500">●●○○○</div>
              <div className="text-green-500">●●○○○</div>
              
              <div className="text-gray-300">ETFs</div>
              <div className="text-yellow-500">●●●●●</div>
              <div className="text-yellow-500">●●●○○</div>
              
              <div className="text-gray-300">Mining</div>
              <div className="text-yellow-500">●●●●○</div>
              <div className="text-red-500">●●●●○</div>
              
              <div className="text-gray-300">Futures</div>
              <div className="text-yellow-500">●●●●○</div>
              <div className="text-red-500">●●●●●</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-yellow-500/20 bg-gray-900/30 flex justify-between">
        <button className="bg-[#001a12]/10 backdrop-blur-lg px-4 py-2 rounded-full border border-[#FFD700]/30 hover:bg-[#001a12]/20 text-gray-300 transition-all hover:text-white text-sm">
          Reset Allocation
        </button>
        <button className="bg-[#B8860B]/10 backdrop-blur-lg px-4 py-2 rounded-full border border-[#FFD700]/50 hover:bg-[#B8860B]/20 text-[#FFD700] transition-all text-sm">
          Save Portfolio Strategy
        </button>
      </div>
    </div>
  );
};

// Advanced Search Component
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  // Sample suggestion data
  const sampleSuggestions = [
    "gold bars with highest purity",
    "tokenized gold with lowest fees",
    "gold mining companies by market cap",
    "physical gold delivery options",
    "gold backed securities performance",
    "gold ETFs with lowest expense ratio",
    "gold versus inflation hedge historical",
    "gold bars vaulted in switzerland"
  ];
  
  // Sample search results
  const generateSearchResults = (query) => {
    if (!query.trim()) return [];
    
    const baseResults = [
      {
        title: "99.99% Pure Gold Bullion Bars",
        description: "Premium LBMA certified gold bars with highest purity rating, professionally vaulted and fully insured.",
        type: "Product",
        metrics: { purity: "99.99%", premium: "3.2%", liquidity: "High" }
      },
      {
        title: "Swiss Gold Vault Holdings",
        description: "Allocated gold holdings in our secure Swiss vault facilities with 24/7 monitoring and quarterly audits.",
        type: "Service",
        metrics: { storage: "0.12%/year", insurance: "Full", accessibility: "24/7" }
      },
      {
        title: "Gold Mining Company Index Fund",
        description: "Diversified exposure to top gold mining companies with global operations and proven reserves.",
        type: "Investment",
        metrics: { returns: "+8.4% YTD", risk: "Moderate", expense: "0.35%" }
      },
      {
        title: "Fractional Gold Tokens - GLD Series",
        description: "Blockchain-secured tokens representing fractional ownership in physical gold reserves.",
        type: "Digital Asset",
        metrics: { marketCap: "$285M", volume: "$3.2M/day", spread: "0.1%" }
      }
    ];
    
    // Simulate relevance ranking
    return baseResults
      .map(result => {
        // Calculate simple relevance score
        const queryWords = query.toLowerCase().split(' ');
        let relevance = 0;
        
        queryWords.forEach(word => {
          if (result.title.toLowerCase().includes(word)) relevance += 2;
          if (result.description.toLowerCase().includes(word)) relevance += 1;
          if (result.type.toLowerCase().includes(word)) relevance += 1;
        });
        
        return { ...result, relevance };
      })
      .sort((a, b) => b.relevance - a.relevance)
      .filter(result => result.relevance > 0);
  };
  
  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const results = generateSearchResults(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 600);
  };
  
  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    
    // Trigger search with selected suggestion
    setIsSearching(true);
    setTimeout(() => {
      const results = generateSearchResults(suggestion);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  // Generate suggestions based on input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    
    // Filter suggestions based on input
    const filtered = sampleSuggestions.filter(
      suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5));
  }, [searchQuery]);
  
  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setSuggestions([]);
    }
  };
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-yellow-500/20">
        <h3 className="text-xl font-bold text-yellow-500">Gold Investment Search</h3>
        <p className="text-gray-400 text-sm mt-1">Search for gold investment opportunities, market data, and analytics</p>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
              placeholder="Search for gold investment types, metrics, or attributes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={18} />
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={`suggestion-${index}`}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors border-b border-gray-700 last:border-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <Search size={14} className="text-gray-500 mr-2" />
                      <span>{suggestion}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Search Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Asset Type ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Purity ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Storage Location ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Min. Investment ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Advanced Filters ▾
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-t border-yellow-500/10">
          <div className="text-sm text-gray-400 mb-3">
            Found {searchResults.length} results for "{searchQuery}"
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div 
                key={`result-${index}`}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-yellow-500 font-medium">{result.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{result.description}</p>
                  </div>
                  <span className="bg-gray-900/50 text-xs text-gray-400 px-2 py-1 rounded">
                    {result.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {Object.entries(result.metrics).map(([key, value], i) => (
                    <div 
                      key={`metric-${index}-${i}`}
                      className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center"
                    >
                      <span className="text-gray-500 mr-1">{key}:</span>
                      <span className="text-yellow-500">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// The main Gold Tokenization component
const GoldTokenization = () => {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Use spring for smooth scrollbar
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Fixed progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Animated background particle effect */}
      <GoldParticleFlow />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-yellow-500">Tokenized Gold</span><br />
                for the Digital Age
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Secure, divisible, and globally accessible gold tokens backed by 
                physical gold reserves. Trade, invest, and protect your wealth with 
                the timeless stability of gold in a modern digital format.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-yellow-400 transition-all flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </button>
                <button className="bg-transparent border border-yellow-500 text-yellow-500 px-8 py-3 rounded-full text-lg font-medium hover:bg-yellow-500/10 transition-all">
                  Learn More
                </button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center"
            >
              <img
                src="/assets/sections/3d-illustration-bitcoin-bank-storage-bgremoved-4.png"
                alt="Bitcoin gold Bank Storage"
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Scrolldown indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
          <ChevronDown size={24} className="text-yellow-500" />
        </motion.div>
      </section>
      
      {/* Market Data Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Real-Time <span className="text-yellow-500">Gold Market</span> Analytics
            </h2>
            <p className="text-gray-400">
              Stay informed with up-to-date market data, charts, and trends to optimize your gold investment strategy.
            </p>
          </div>
          
          <ContinentalGoldMap  />
        </div>
      </section>
      
      {/* Portfolio Allocation Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Optimize Your <span className="text-yellow-500">Gold Portfolio</span>
            </h2>
            <p className="text-gray-400">
              Design a balanced gold investment strategy tailored to your risk tolerance and financial goals.
            </p>
          </div>
          
          <GoldPortfolioAllocation />
        </div>
      </section>
      
      {/* Investment Calculator Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Advanced <span className="text-yellow-500">Gold Investment</span> Calculator
            </h2>
            <p className="text-gray-400">
              Project your returns with tax-optimized, jurisdiction-specific gold investment simulations.
            </p>
          </div>
          
          <InvestmentCalculator />
        </div>
      </section>
      
      {/* Search Interface Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-yellow-500">Discover</span> Gold Investment Opportunities
            </h2>
            <p className="text-gray-400">
              Explore and analyze a wide range of gold investment vehicles, from physical bullion to tokenized assets.
            </p>
          </div>
          
          <AdvancedSearch />
        </div>
      </section>
    
    </div>
  );
};

export default GoldTokenization;