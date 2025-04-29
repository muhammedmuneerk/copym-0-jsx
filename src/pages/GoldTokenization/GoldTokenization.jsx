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

// Market Data Visualization Component
const ContinentalGoldMap = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');
  const [activeView, setActiveView] = useState('map');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const mapRef = useRef(null);
  
  // Map Reset Control Component
  const MapResetControl = ({ resetMapView }) => {
    const map = useMap();
    
    const handleReset = () => {
      map.setView([20, 0], 2);
      resetMapView();
    };
    
    return (
      <div className="leaflet-top leaflet-right" style={{ marginTop: '50px' }}>
        <div className="leaflet-control leaflet-bar">
          <button 
            className="bg-gray-800/80 hover:bg-gray-700/80 p-1 rounded-full"
            onClick={handleReset}
            title="Reset Map View"
          >
            <RefreshCw size={16} className="text-yellow-500" />
          </button>
        </div>
      </div>
    );
  };
  
  // Accurate gold data by region with ISO country codes
  const goldData = {
    "North America": {
      code: "NA",
      // color: "#FFD700",
      // fillColor: "#FFD700",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      reserves: 11400,  // in metric tons
      production: 330,  // annual production in metric tons
      countries: ["United States", "Canada", "Mexico"],
      majorMines: [
        { name: "Nevada Gold Mines", coordinates: [40.8, -116.5], production: 115 },
        { name: "Peñasquito", coordinates: [24.1, -101.9], production: 34 },
        { name: "Canadian Malartic", coordinates: [48.1, -78.1], production: 25 }
      ],
      priceData: generatePriceData(1880, 0.05)
    },
    "South America": {
      code: "SA",
      // color: "#FFA500",
      // fillColor: "#FFA500",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      reserves: 8700,
      production: 520,
      countries: ["Peru", "Brazil", "Chile", "Colombia", "Argentina"],
      majorMines: [
        { name: "Yanacocha", coordinates: [-6.9, -78.5], production: 28 },
        { name: "Cerro Vanguardia", coordinates: [-48.3, -68.2], production: 16 },
        { name: "Pueblo Viejo", coordinates: [18.9, -70.2], production: 48 }
      ],
      priceData: generatePriceData(1875, 0.06)
    },
    "Europe": {
      code: "EU",
      // color: "#4169E1",
      // fillColor: "#4169E1",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      reserves: 2400,
      production: 140,
      countries: ["Russia", "Finland", "Sweden", "Turkey"],
      majorMines: [
        { name: "Kupol", coordinates: [66.6, 169.1], production: 21 },
        { name: "Kittila", coordinates: [67.9, 25.4], production: 14 },
        { name: "Olimpiada", coordinates: [59.2, 92.9], production: 32 }
      ],
      priceData: generatePriceData(1890, 0.04)
    },
    "Africa": {
      code: "AF",
      // color: "#32CD32",
      // fillColor: "#32CD32",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      reserves: 19800,
      production: 870,
      countries: ["South Africa", "Ghana", "Sudan", "Mali", "Tanzania"],
      majorMines: [
        { name: "Tarkwa", coordinates: [5.3, -1.9], production: 42 },
        { name: "Kibali", coordinates: [3.1, 29.6], production: 31 },
        { name: "Loulo-Gounkoto", coordinates: [13.0, -11.5], production: 27 }
      ],
      priceData: generatePriceData(1860, 0.07)
    },
    "Asia": {
      code: "AS",
      // color: "#9932CC",
      // fillColor: "#9932CC",
      borders: [
        [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
      ],
      reserves: 23500,
      production: 930,
      countries: ["China", "Indonesia", "Kazakhstan", "Uzbekistan", "Philippines"],
      majorMines: [
        { name: "Muruntau", coordinates: [41.5, 64.6], production: 66 },
        { name: "Grasberg", coordinates: [-4.1, 137.1], production: 49 },
        { name: "Telfer", coordinates: [-21.7, 122.2], production: 18 }
      ],
      priceData: generatePriceData(1870, 0.08)
    },
    "Oceania": {
      code: "OC",
      // color: "#FF4500",
      // fillColor: "#FF4500",
      borders: [
        [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
      ],
      reserves: 10100,
      production: 380,
      countries: ["Australia", "Papua New Guinea"],
      majorMines: [
        { name: "Cadia Valley", coordinates: [-33.4, 149.0], production: 38 },
        { name: "Boddington", coordinates: [-32.7, 116.3], production: 27 },
        { name: "Tanami", coordinates: [-19.9, 129.7], production: 16 }
      ],
      priceData: generatePriceData(1865, 0.05)
    }
  };
  
  // Generate realistic price data with trends and volatility
  function generatePriceData(basePrice, volatilityFactor) {
    const trendFactors = {
      '1D': { points: 24, trend: 0.02, cycle: 6 },
      '1W': { points: 7, trend: 0.1, cycle: 3 },
      '1M': { points: 30, trend: 0.4, cycle: 10 },
      '1Y': { points: 12, trend: 1.2, cycle: 4 }
    };
    
    const result = {};
    
    Object.keys(trendFactors).forEach(timeframe => {
      const { points, trend, cycle } = trendFactors[timeframe];
      const data = [];
      let price = basePrice;
      
      // Add general trend
      const trendDirection = Math.random() > 0.5 ? 1 : -1;
      
      for (let i = 0; i < points; i++) {
        // Add cyclical component
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * basePrice * volatilityFactor;
        
        // Add random walk
        const random = (Math.random() - 0.5) * basePrice * volatilityFactor;
        
        // Add trend
        const trendComponent = (i / points) * trend * basePrice * trendDirection;
        
        price = basePrice + cyclical + random + trendComponent;
        
        // Calculate daily high/low/open/close
        const dailyVolatility = basePrice * volatilityFactor * 0.2;
        const open = price - (Math.random() - 0.5) * dailyVolatility;
        const close = price;
        const high = Math.max(open, close) + Math.random() * dailyVolatility;
        const low = Math.min(open, close) - Math.random() * dailyVolatility;
        const volume = (Math.random() * 0.5 + 0.75) * (basePrice / 1000);
        
        data.push({
          date: i,
          price,
          open,
          high,
          low,
          close,
          volume
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }
  
  // Global averages
  const getGlobalData = () => {
    const regions = Object.keys(goldData);
    const globalPriceData = {};
    
    // Calculate global price data
    Object.keys(goldData[regions[0]].priceData).forEach(timeframe => {
      const points = goldData[regions[0]].priceData[timeframe].length;
      const globalData = [];
      
      for (let i = 0; i < points; i++) {
        const globalPoint = {
          date: i,
          price: 0,
          open: 0,
          high: 0,
          low: Number.MAX_VALUE,
          close: 0,
          volume: 0
        };
        
        regions.forEach(region => {
          const regionData = goldData[region].priceData[timeframe][i];
          globalPoint.price += regionData.price;
          globalPoint.open += regionData.open;
          globalPoint.close += regionData.close;
          globalPoint.high = Math.max(globalPoint.high, regionData.high);
          globalPoint.low = Math.min(globalPoint.low, regionData.low);
          globalPoint.volume += regionData.volume;
        });
        
        // Calculate averages
        globalPoint.price /= regions.length;
        globalPoint.open /= regions.length;
        globalPoint.close /= regions.length;
        
        globalData.push(globalPoint);
      }
      
      globalPriceData[timeframe] = globalData;
    });
    
    const totalReserves = regions.reduce((sum, region) => 
      sum + goldData[region].reserves, 0);
      
    const totalProduction = regions.reduce((sum, region) => 
      sum + goldData[region].production, 0);
      
    const allMines = regions.flatMap(region => 
      goldData[region].majorMines.map(mine => ({
        ...mine,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#FFD700",
      reserves: totalReserves,
      production: totalProduction,
      majorMines: allMines,
      priceData: globalPriceData
    };
  };
  
  const globalData = getGlobalData();
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };
  
  // Format date based on timeframe
  const formatDate = (timeframe, index) => {
    const now = new Date();
    let date;
    
    switch (timeframe) {
      case '1D':
        date = new Date(now);
        date.setHours(Math.floor(index * (24 / 23)));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '1W':
        date = new Date(now);
        date.setDate(now.getDate() - 6 + index);
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      case '1M':
        date = new Date(now);
        date.setDate(now.getDate() - 29 + index);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case '1Y':
        date = new Date(now);
        date.setMonth(now.getMonth() - 11 + index);
        return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
      default:
        return `Day ${index}`;
    }
  };
  
  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    
    // If in map view, change to chart view
    if (activeView === 'map') {
      setActiveView('chart');
    } else {
      renderCharts(region);
    }
  };
  
  // Reset map view and selection
  const handleResetMapView = () => {
    setSelectedRegion(null);
  };
  
  // Reset selection
  const handleResetSelection = () => {
    setSelectedRegion(null);
    setActiveView('map');
    if (mapRef.current) {
      mapRef.current.setView([20, 0], 2);
    }
  };
  
  // Render price charts
  const renderCharts = (region = selectedRegion) => {
    if (!chartRef.current) return;
    
    const chartSvg = d3.select(chartRef.current);
    chartSvg.selectAll("*").remove();
    
    const width = chartRef.current.clientWidth;
    const height = 350;
    const margin = { top: 30, right: 60, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    chartSvg.attr("width", width)
      .attr("height", height);
      
    const chartGroup = chartSvg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Get data for selected region or global
    const chartData = region 
      ? goldData[region].priceData[activeTimeframe]
      : globalData.priceData[activeTimeframe];
      
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, innerWidth]);
      
    const y = d3.scaleLinear()
      .domain([
        d3.min(chartData, d => d.low) * 0.998,
        d3.max(chartData, d => d.high) * 1.002
      ])
      .range([innerHeight, 0]);
      
    const volumeScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.volume)])
      .range([innerHeight, innerHeight * 0.8]);
      
    // Create axes
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickFormat(d => formatDate(activeTimeframe, d));
      
    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d => formatCurrency(d));
      
    chartGroup.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .style("font-size", "10px");
      
    chartGroup.append("g")
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .style("font-size", "10px");
      
    // Add grid lines
    chartGroup.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .selectAll("line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "#fff");
      
    // Add volume bars
    chartGroup.selectAll(".volume-bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "volume-bar")
      .attr("x", (d, i) => x(i) - innerWidth / chartData.length / 2 * 0.8)
      .attr("y", d => volumeScale(d.volume))
      .attr("width", innerWidth / chartData.length * 0.8)
      .attr("height", d => innerHeight - volumeScale(d.volume))
      .attr("fill", (d, i) => {
        return i > 0 && chartData[i].close > chartData[i-1].close
          ? "rgba(50, 205, 50, 0.3)"
          : "rgba(255, 69, 0, 0.3)";
      });
      
    // Add candles
    const candleWidth = Math.max(2, Math.min(15, innerWidth / chartData.length / 2));
    
    // Add stems (high-low lines)
    chartGroup.selectAll(".stem")
      .data(chartData)
      .enter()
      .append("line")
      .attr("class", "stem")
      .attr("x1", (d, i) => x(i))
      .attr("x2", (d, i) => x(i))
      .attr("y1", d => y(d.high))
      .attr("y2", d => y(d.low))
      .attr("stroke", d => d.open > d.close ? "#FF4500" : "#32CD32")
      .attr("stroke-width", 1);
      
    // Add candle bodies
    chartGroup.selectAll(".candle")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d, i) => x(i) - candleWidth / 2)
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", candleWidth)
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", d => d.open > d.close ? "#FF4500" : "#32CD32");
      
    // Add tooltip interaction area
    chartGroup.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      .on("mousemove", function(event) {
        const mouseX = d3.pointer(event)[0];
        const i = Math.min(
          chartData.length - 1,
          Math.max(0, Math.round(x.invert(mouseX)))
        );
        
        const item = chartData[i];
        if (!item) return;
        
        // Show tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("visibility", "visible")
          .style("opacity", 1)
          .html(`
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-yellow-500/30">
              <div class="text-yellow-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">Open:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.open)}</div>
                <div class="text-xs text-gray-300">High:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.high)}</div>
                <div class="text-xs text-gray-300">Low:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.low)}</div>
                <div class="text-xs text-gray-300">Close:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.close)}</div>
                <div class="text-xs text-gray-300">Volume:</div>
                <div class="text-xs text-yellow-100">${formatNumber(item.volume.toFixed(1))} tons</div>
              </div>
            </div>
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
          
        // Show crosshair
        chartGroup.selectAll(".crosshair-x").remove();
        chartGroup.selectAll(".crosshair-y").remove();
        chartGroup.selectAll(".crosshair-label").remove();
        
        // Vertical line
        chartGroup.append("line")
          .attr("class", "crosshair-x")
          .attr("x1", x(i))
          .attr("x2", x(i))
          .attr("y1", 0)
          .attr("y2", innerHeight)
          .attr("stroke", "#FFD700")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Horizontal line
        chartGroup.append("line")
          .attr("class", "crosshair-y")
          .attr("x1", 0)
          .attr("x2", innerWidth)
          .attr("y1", y(item.close))
          .attr("y2", y(item.close))
          .attr("stroke", "#FFD700")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Price label
        chartGroup.append("text")
          .attr("class", "crosshair-label")
          .attr("x", innerWidth + 5)
          .attr("y", y(item.close) + 4)
          .attr("fill", "#FFD700")
          .attr("font-size", "10px")
          .text(formatCurrency(item.close));
      })
      .on("mouseleave", function() {
        d3.select(tooltipRef.current).style("visibility", "hidden");
        chartGroup.selectAll(".crosshair-x").remove();
        chartGroup.selectAll(".crosshair-y").remove();
        chartGroup.selectAll(".crosshair-label").remove();
      });
      
    // Add chart title
    chartGroup.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "#FFD700")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} Gold Price - ${activeTimeframe} View`);
      
    // Add axes labels
    chartGroup.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "12px")
      .text("Time Period");
      
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "12px")
      .text("Gold Price (USD/oz)");
  };
  
  // Effect to update charts when timeframe or view changes
  useEffect(() => {
    if (activeView === 'chart') {
      renderCharts();
    }
  }, [activeTimeframe, activeView]);
  
  // Load initial data for legend
  useEffect(() => {
    // Generate legend data
    const legend = d3.select(legendRef.current);
    legend.selectAll("*").remove();
    
    const legendContainer = legend.append("div")
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-yellow-500/20");
      
    // Production legend
    const productionItems = Object.entries(goldData)
      .sort((a, b) => b[1].production - a[1].production)
      .map(([region, data]) => ({
        name: region,
        value: data.production,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-yellow-500 mb-1">Annual Gold Production (tons)</div>`);
      
    productionItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full" style="background-color: ${item.color}"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-yellow-200">${formatNumber(item.value)}</div>`);
    });
    
    // Add global total
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Total:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-yellow-300">${formatNumber(globalData.production)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = goldData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-yellow-500/20 p-3 mt-4">
        <h4 className="font-bold text-yellow-500 mb-2">{selectedRegion} Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Gold Reserves:</p>
            <p className="text-lg font-semibold text-yellow-300">{formatNumber(regionData.reserves)} tons</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Annual Production:</p>
            <p className="text-lg font-semibold text-yellow-300">{formatNumber(regionData.production)} tons</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Major Producers:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.countries.map(country => (
                <span key={country} className="bg-yellow-500/10 text-yellow-200 text-xs px-2 py-1 rounded">
                  {country}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Top Mines:</p>
            <div className="grid grid-cols-2 gap-2">
              {regionData.majorMines.slice(0, 4).map(mine => (
                <div key={mine.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{mine.name}</div>
                  <div className="text-xs text-yellow-200">{mine.production} tons/year</div>
                  <div className="text-xs text-gray-400">({mine.coordinates[0].toFixed(1)}°, {mine.coordinates[1].toFixed(1)}°)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-yellow-500/20">
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-yellow-500">Global Gold Data</h3>
          {selectedRegion && (
            <span className="ml-2 text-sm bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
              {selectedRegion}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '1Y'].map((timeframe) => (
            <button 
              key={timeframe}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeTimeframe === timeframe 
                  ? 'bg-yellow-500/20 text-yellow-500' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center p-2 px-4 border-b border-yellow-500/10">
        <div className="text-sm text-gray-400">
          {hoveredRegion ? `Exploring: ${hoveredRegion}` : 'Hover over regions to explore'}
        </div>
        <div className="flex space-x-2">
          <button 
            className={`p-1 rounded flex items-center space-x-1 ${activeView === 'map' ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setActiveView('map')}
            title="Map View"
          >
            <Globe size={16} />
            <span className="text-xs">Map</span>
          </button>
          <button 
            className={`p-1 rounded flex items-center space-x-1 ${activeView === 'chart' ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setActiveView('chart')}
            title="Chart View"
          >
            <LineChart size={16} />
            <span className="text-xs">Chart</span>
          </button>
          {selectedRegion && (
            <button 
              className="px-2 py-1 text-xs rounded bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 flex items-center"
              onClick={handleResetSelection}
            >
              <Globe size={12} className="mr-1" />
              Global View
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className={`relative md:col-span-2 ${isLoading ? 'opacity-50' : ''}`}>
          {activeView === 'map' ? (
            <div className="relative h-[400px] bg-gray-900/30 rounded-lg overflow-hidden">
              <MapContainer 
                center={[20, 0]} 
                zoom={2} 
                style={{ height: '100%', width: '100%', background: '#0a1428' }}
                zoomControl={false}
                maxBounds={[[90, -180], [-90, 180]]} // Restrict the map to a single world view
                maxBoundsViscosity={1.0} // Prevents panning outside the bounds
                whenCreated={mapInstance => {
                  mapRef.current = mapInstance;
                }}
              >
                {/* Dark-themed map tiles */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  noWrap={true} // Prevents the map from repeating horizontally
                />
                
                {/* Add region polygons */}
                {Object.entries(goldData).map(([region, data]) => (
                  data.borders.map((border, i) => (
                    <Polygon
                      key={`${region}-border-${i}`}
                      positions={border}
                      pathOptions={{
                        fillColor: data.color,
                        fillOpacity: selectedRegion === region ? 0.0 : 0.0,
                        weight: 0.1,
                        color: '#555',
                        opacity: 0.1
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          setHoveredRegion(region);
                          e.target.setStyle({
                            fillOpacity: 0.0
                          });
                        },
                        mouseout: (e) => {
                          setHoveredRegion(null);
                          e.target.setStyle({
                            fillOpacity: selectedRegion === region ? 0.0 : 0.0
                          });
                        },
                        click: () => {
                          handleRegionSelect(region);
                        }
                      }}
                    >
                      {/* <Tooltip direction="center" permanent>
                        <div className="font-bold text-xs">{region}</div>
                      </Tooltip> */}
                    </Polygon>
                  ))
                ))}
                
                {/* Add gold mines */}
                {Object.entries(goldData).map(([region, data]) =>
                  data.majorMines.map((mine, i) => (
                    <CircleMarker
                      key={`${region}-mine-${i}`}
                      center={mine.coordinates}
                      radius={Math.log(mine.production) * 1.2}
                      pathOptions={{
                        // fillColor: '#FFD700',
                        // fillOpacity: 0.8,
                        // color: '#222',
                        // weight: 1
                      }}
                    >
                      <Tooltip>
                        <div className="p-1">
                          <div className="font-bold text-yellow-500">{mine.name}</div>
                          <div className="text-sm">Production: {mine.production} tons/year</div>
                          <div className="text-sm">Region: {region}</div>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  ))
                )}
                
                {/* Custom controls */}
                <ZoomControl position="topright" />
                <MapResetControl resetMapView={handleResetMapView} />
              </MapContainer>
            </div>
          ) : (
            <div>
              <svg ref={chartRef} width="100%" height="350" className="bg-gray-900/30 rounded-lg"></svg>
              {selectedRegion && <RegionDetails />}
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-yellow-500 font-bold">Gold Market Overview</h4>
            <Search size={16} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1">Global Gold Production</h5>
              <div className="text-2xl font-bold text-yellow-300">{formatNumber(globalData.production)} tons <span className="text-xs text-green-400">/ year</span></div>
              <div className="text-xs text-gray-400">Based on latest World Gold Council data</div>
            </div>
            
            <div>
              <h5 className="text-sm text-gray-300 mb-1">Known Reserves</h5>
              <div className="text-2xl font-bold text-yellow-300">{formatNumber(globalData.reserves)} tons</div>
              <div className="text-xs text-gray-400">Economically viable at current prices</div>
            </div>
            
            <div>
              <h5 className="text-sm text-gray-300 mb-1">Current Price Trends</h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(goldData)
                  .slice(0, 4)
                  .map(([region, data]) => {
                    const currentPrice = data.priceData[activeTimeframe][data.priceData[activeTimeframe].length - 1].price;
                    const previousPrice = data.priceData[activeTimeframe][0].price;
                    const change = ((currentPrice - previousPrice) / previousPrice) * 100;
                    
                    return (
                      <div key={region} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }}></div>
                        <div className="text-xs text-gray-300">{region}</div>
                        <div className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            
            <div ref={legendRef} className="mt-4"></div>
            
            <div className="text-center mt-4">
              <button className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-lg text-xs flex items-center mx-auto">
                <Download size={12} className="mr-1" />
                Download Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-yellow-500/10 flex justify-between items-center text-xs text-gray-400">
        <div>Last updated: April 25, 2025 09:30 AM EST</div>
        <div>© 2025 World Gold Council</div>
      </div>
      
      <div ref={tooltipRef} className="fixed pointer-events-none transition-all duration-100 opacity-0 z-50"></div>
    </div>
  );
};
// Procedural Gold Bar SVG Generator
const GoldBarPattern = ({ historyData = [] }) => {
  // Use history data to modulate the pattern
  const patternData = useMemo(() => {
    // Default volatility if no history data
    const points = historyData.length > 0 
      ? historyData.map(point => point * 0.5 + 0.5) // Normalize to 0-1 range
      : Array.from({ length: 10 }, () => Math.random() * 0.3 + 0.7); // Random pattern if no data
      
    return points;
  }, [historyData]);
  
  // Advanced Voronoi tessellation for gold texturing
  const generateVoronoiPoints = (width, height, points = 15) => {
    const seeds = [];
    for (let i = 0; i < points; i++) {
      seeds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Add color variation based on market data
        brightness: historyData[i % historyData.length] 
          ? 45 + historyData[i % historyData.length] * 50 
          : 55 + Math.random() * 20
      });
    }
    return seeds;
  };
  
  // Create refined noise pattern
  const smoothStep = (t) => {
    return t * t * (3 - 2 * t);
  };
  
  const perlinInspiredNoise = (x, y, frequency = 0.1, seed = 42) => {
    // Pseudorandom function with seed
    const pseudoRandom = (ix, iy) => {
      const a = ix * 1664525 + iy * 1013904223 + seed;
      return ((a * 1664525) % 1013904223) / 1013904223;
    };
    
    // Get corner coordinates
    const x0 = Math.floor(x * frequency);
    const y0 = Math.floor(y * frequency);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    
    // Get interpolation factors
    const sx = smoothStep((x * frequency) - x0);
    const sy = smoothStep((y * frequency) - y0);
    
    // Interpolate between corners
    const n00 = pseudoRandom(x0, y0);
    const n10 = pseudoRandom(x1, y0);
    const n01 = pseudoRandom(x0, y1);
    const n11 = pseudoRandom(x1, y1);
    
    const nx0 = n00 * (1 - sx) + n10 * sx;
    const nx1 = n01 * (1 - sx) + n11 * sx;
    
    return nx0 * (1 - sy) + nx1 * sy;
  };
  
  // Generate path for the top surface texture
  const generateTexturePattern = () => {
    const patternWidth = 300;
    const patternHeight = 150;
    const cellSize = 15;
    const paths = [];
    
    for (let y = 0; y < patternHeight; y += cellSize) {
      for (let x = 0; x < patternWidth; x += cellSize) {
        const brightness = patternData[Math.floor((x / patternWidth) * patternData.length)] || 0.5;
        const intensity = Math.min(1, brightness * (0.7 + Math.random() * 0.3));
        const size = cellSize * intensity * 0.7;
        
        // Skip some cells for more realistic texture
        if (Math.random() > 0.7) continue;
        
        const centerX = x + cellSize / 2 + (Math.random() - 0.5) * cellSize * 0.5;
        const centerY = y + cellSize / 2 + (Math.random() - 0.5) * cellSize * 0.5;
        
        // Create either small circle or polygon for texture
        if (Math.random() > 0.7) {
          paths.push(
            <circle 
              key={`circle-${x}-${y}`}
              cx={centerX} 
              cy={centerY} 
              r={size / 4} 
              fill={`rgb(${220 + Math.round(intensity * 35)}, ${160 + Math.round(intensity * 30)}, ${20 + Math.round(intensity * 40)})`}
              opacity={0.4 + intensity * 0.6}
            />
          );
        } else {
          // Random polygon
          const sides = Math.floor(Math.random() * 3) + 3; // 3-5 sides
          const points = [];
          for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const radius = size / 3 * (0.7 + Math.random() * 0.3);
            points.push(`${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`);
          }
          
          paths.push(
            <polygon 
              key={`poly-${x}-${y}`}
              points={points.join(' ')} 
              fill={`rgb(${220 + Math.round(intensity * 35)}, ${160 + Math.round(intensity * 30)}, ${20 + Math.round(intensity * 40)})`}
              opacity={0.3 + intensity * 0.7}
            />
          );
        }
      }
    }
    
    return paths;
  };
  
  // Generate edge highlights and shadows
  const generateEdgeEffects = () => {
    const patternWidth = 300;
    const patternHeight = 150;
    
    // Edge highlights
    const topHighlight = <rect key="top-highlight" x="5" y="5" width={patternWidth - 10} height="3" rx="1" fill="rgba(255, 240, 180, 0.8)" />;
    const leftHighlight = <rect key="left-highlight" x="5" y="5" width="3" height={patternHeight - 10} rx="1" fill="rgba(255, 240, 180, 0.6)" />;
    
    // Edge shadows
    const bottomShadow = (
      <linearGradient key="bottom-grad" id="bottomShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(100, 70, 0, 0.7)" />
        <stop offset="100%" stopColor="rgba(100, 70, 0, 0)" />
      </linearGradient>
    );
    
    const rightShadow = (
      <linearGradient key="right-grad" id="rightShadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(100, 70, 0, 0.7)" />
        <stop offset="100%" stopColor="rgba(100, 70, 0, 0)" />
      </linearGradient>
    );
    
    const bottomShadowRect = <rect key="bottom-shadow" x="5" y={patternHeight - 12} width={patternWidth - 10} height="7" fill="url(#bottomShadowGrad)" />;
    const rightShadowRect = <rect key="right-shadow" x={patternWidth - 12} y="5" width="7" height={patternHeight - 10} fill="url(#rightShadowGrad)" />;
    
    return [topHighlight, leftHighlight, bottomShadow, rightShadow, bottomShadowRect, rightShadowRect];
  };
  
  // Generate stamp/seal on the gold bar
  const generateStamp = () => {
    const centerX = 150;
    const centerY = 75;
    const radius = 25;
    
    return (
      <g key="stamp">
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#8B6914" strokeWidth="2" />
        <text x={centerX} y={centerY - 5} textAnchor="middle" fill="#8B6914" fontWeight="bold" fontSize="12">GOLD</text>
        <text x={centerX} y={centerY + 10} textAnchor="middle" fill="#8B6914" fontSize="10">99.99%</text>
        <text x={centerX} y={centerY + 25} textAnchor="middle" fill="#704214" fontSize="8">1 KG</text>
      </g>
    );
  };
  
  // Create reflection effect
  const generateReflection = () => {
    return (
      <g key="reflection">
        <defs>
          <linearGradient id="reflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="20%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="80%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <mask id="reflectionMask">
            <rect x="0" y="0" width="300" height="150" fill="white" />
          </mask>
        </defs>
        <rect 
          x="-50" 
          y="0" 
          width="400" 
          height="20" 
          fill="url(#reflection)" 
          mask="url(#reflectionMask)"
          transform="rotate(25, 150, 75)"
          opacity="0.4"
        />
      </g>
    );
  };
  
  return (
    <svg 
      viewBox="0 0 300 150" 
      className="w-full h-auto drop-shadow-lg"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC636" />
          <stop offset="25%" stopColor="#FDD017" />
          <stop offset="50%" stopColor="#EAC117" />
          <stop offset="75%" stopColor="#F2BB66" />
          <stop offset="100%" stopColor="#E8A317" />
        </linearGradient>
        <filter id="goldShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Base gold bar shape */}
      <rect 
        x="5" 
        y="5" 
        width="290" 
        height="140" 
        rx="5" 
        fill="url(#goldGradient)" 
        filter="url(#goldShadow)" 
      />
      
      {/* Detailed texture pattern */}
      {generateTexturePattern()}
      
      {/* Edge effects */}
      {generateEdgeEffects()}
      
      {/* Gold stamp/seal */}
      {generateStamp()}
      
      {/* Reflection effect */}
      {generateReflection()}
    </svg>
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

// WebAssembly Investment Calculator (Simulated)
const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState(10000);
  const [years, setYears] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [taxRate, setTaxRate] = useState(20);
  const [country, setCountry] = useState('United States');
  const [compounding, setCompounding] = useState(1); // 1 = annual, 12 = monthly
  
  // Calculate investment projections
  const calculateProjections = () => {
    // Simulate a complex calculation that would be done in WebAssembly
    const results = [];
    let principal = investment;
    let totalInterest = 0;
    let totalTax = 0;
    
    // Apply different tax treatments based on selected country
    const taxModifier = country === 'Switzerland' ? 0.8 : 
                         country === 'Singapore' ? 0.5 : 
                         country === 'United Arab Emirates' ? 0.1 : 1.0;
    
    const effectiveTaxRate = taxRate * taxModifier;
    
    for (let i = 1; i <= years; i++) {
      // Calculate compound interest
      const interestForYear = principal * (Math.pow(1 + (annualReturn / 100) / compounding, compounding) - 1);
      const taxForYear = interestForYear * (effectiveTaxRate / 100);
      
      totalInterest += interestForYear;
      totalTax += taxForYear;
      
      // Reinvest after tax
      principal += interestForYear - taxForYear;
      
      results.push({
        year: i,
        principal: principal,
        interestForYear: interestForYear,
        taxForYear: taxForYear,
        totalInterest: totalInterest,
        totalTax: totalTax
      });
    }
    
    return results;
  };
  
  const projections = calculateProjections();
  const finalValue = projections.length > 0 ? projections[projections.length - 1].principal : 0;
  
  // Generate chart data for visualization
  const generateChartData = () => {
    const chartData = [];
    let runningValue = investment;
    
    // Initial value
    chartData.push({
      year: 0,
      value: runningValue,
      principal: runningValue,
      interest: 0
    });
    
    // Calculate for each year
    for (let i = 1; i <= years; i++) {
      const projection = projections[i-1];
      const principalDisplay = investment;
      const interestDisplay = projection.principal - investment;
      
      chartData.push({
        year: i,
        value: projection.principal,
        principal: principalDisplay,
        interest: interestDisplay
      });
    }
    
    return chartData;
  };
  
  const chartData = generateChartData();
  
  // Generate the bar chart for the visualization
  const generateBarChart = () => {
    const maxValue = Math.max(...chartData.map(d => d.value)) * 1.1; // 10% headroom
    const chartWidth = 300;
    const chartHeight = 150;
    const barWidth = (chartWidth - 40) / chartData.length;
    const barSpacing = barWidth * 0.2;
    
    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
        {/* Axes */}
        <line 
          x1="40" 
          y1={chartHeight - 20} 
          x2={chartWidth - 10} 
          y2={chartHeight - 20} 
          stroke="#555" 
          strokeWidth="1" 
        />
        
        <line 
          x1="40" 
          y1="10" 
          x2="40" 
          y2={chartHeight - 20} 
          stroke="#555" 
          strokeWidth="1" 
        />
        
        {/* Y axis labels */}
        <text 
          x="35" 
          y="15" 
          textAnchor="end" 
          fill="#999" 
          fontSize="8"
        >
          {formatCurrency(maxValue)}
        </text>
        
        <text 
          x="35" 
          y={chartHeight - 25} 
          textAnchor="end" 
          fill="#999" 
          fontSize="8"
        >
          $0
        </text>
        
        {/* X axis labels */}
        {chartData.map((d, i) => (
          <text 
            key={`x-label-${i}`}
            x={40 + i * barWidth + barWidth / 2} 
            y={chartHeight - 8} 
            textAnchor="middle" 
            fill="#999" 
            fontSize="7"
          >
            {d.year}
          </text>
        ))}
        
        {/* Stacked bars */}
        {chartData.map((d, i) => {
          const barHeight = ((chartHeight - 30) * d.value) / maxValue;
          const principalHeight = ((chartHeight - 30) * d.principal) / maxValue;
          const interestHeight = ((chartHeight - 30) * d.interest) / maxValue;
          
          return (
            <g key={`bar-${i}`}>
              {/* Principal part */}
              <rect 
                x={40 + i * barWidth + barSpacing / 2} 
                y={chartHeight - 20 - principalHeight} 
                width={barWidth - barSpacing} 
                height={principalHeight} 
                fill="#B8860B" 
                opacity="0.7" 
              />
              
              {/* Interest part */}
              {interestHeight > 0 && (
                <rect 
                  x={40 + i * barWidth + barSpacing / 2} 
                  y={chartHeight - 20 - principalHeight - interestHeight} 
                  width={barWidth - barSpacing} 
                  height={interestHeight} 
                  fill="#FFD700" 
                  opacity="0.7" 
                />
              )}
            </g>
          );
        })}
        
        {/* Title */}
        <text 
          x={chartWidth / 2} 
          y="10" 
          textAnchor="middle" 
          fill="#FFD700" 
          fontSize="9" 
          fontWeight="bold"
        >
          Investment Growth Projection
        </text>
      </svg>
    );
  };
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-yellow-500/20 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-yellow-500">Gold Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Project returns with multi-jurisdictional tax implications</p>
        </div>
        <div className="rounded-full bg-yellow-500/20 p-2">
          <DollarSign size={20} className="text-yellow-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          {/* Investment Amount */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Initial Investment</label>
              <span className="text-yellow-500 font-medium">{formatCurrency(investment)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={investment}
              onChange={(e) => setInvestment(parseInt(e.target.value))}
              className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
            />
          </div>
          
          {/* Time Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Investment Period</label>
              <span className="text-yellow-500 font-medium">{years} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
            />
          </div>
          
          {/* Annual Return */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Expected Annual Return</label>
              <span className="text-yellow-500 font-medium">{annualReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(parseInt(e.target.value))}
              className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
            />
          </div>
          
          {/* Tax Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Tax Rate</label>
              <span className="text-yellow-500 font-medium">{taxRate}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={taxRate}
              onChange={(e) => setTaxRate(parseInt(e.target.value))}
              className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
            />
          </div>
          
          {/* Jurisdiction Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Jurisdiction</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
            >
              <option value="United States">United States</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Singapore">Singapore</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          
          {/* Compounding Frequency */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Compounding Frequency</label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(parseInt(e.target.value))}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
            >
              <option value={1}>Annual</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
            <h4 className="text-yellow-500 font-medium mb-3">Investment Projection</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Initial Investment:</span>
                <span className="text-white">{formatCurrency(investment)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Final Value:</span>
                <span className="text-yellow-500 font-medium">{formatCurrency(finalValue)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Growth:</span>
                <span className="text-green-400">+{formatCurrency(finalValue - investment)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Growth Percentage:</span>
                <span className="text-green-400">
                  {((finalValue / investment - 1) * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax Paid:</span>
                <span className="text-red-400">
                  {formatCurrency(projections[projections.length - 1].totalTax)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
            {generateBarChart()}
            
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#B8860B] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Principal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#FFD700] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Growth</span>
              </div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
            <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
            
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-start gap-1">
                <TrendingUp size={12} className="text-yellow-500 mt-0.5" />
                <span>Gold has historically grown at an average rate of 7.5% annually since 2000.</span>
              </li>
              <li className="flex items-start gap-1">
                <Globe size={12} className="text-yellow-500 mt-0.5" />
                <span>Tax treatment for gold investments varies significantly by jurisdiction.</span>
              </li>
              <li className="flex items-start gap-1">
                <Shield size={12} className="text-yellow-500 mt-0.5" />
                <span>Physical gold may be subject to additional storage and insurance costs.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
              <GoldBarPattern historyData={[0.7, 0.8, 0.75, 0.9, 0.85, 0.95, 0.9]} />
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