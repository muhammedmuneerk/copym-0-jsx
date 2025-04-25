import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
const MarketDataVisualization = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candle');
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // Sample data for different timeframes
  const generateMarketData = (timeframe) => {
    const data = [];
    let basePrice = 1850; // Gold price in USD
    let volatility = 0;
    let dataPoints = 0;
    
    switch(timeframe) {
      case '1D':
        dataPoints = 24;
        volatility = 5;
        break;
      case '1W':
        dataPoints = 7;
        volatility = 15;
        break;
      case '1M':
        dataPoints = 30;
        volatility = 30;
        break;
      case '1Y':
        dataPoints = 12;
        volatility = 100;
        break;
      default:
        dataPoints = 24;
        volatility = 5;
    }
    
    for (let i = 0; i < dataPoints; i++) {
      const randomChange = (Math.random() - 0.5) * volatility;
      const open = basePrice;
      basePrice += randomChange;
      const close = basePrice;
      const high = Math.max(open, close) + Math.random() * volatility / 2;
      const low = Math.min(open, close) - Math.random() * volatility / 2;
      const volume = Math.random() * 1000 + 500;
      
      data.push({
        date: i,
        open,
        high,
        low,
        close,
        volume
      });
    }
    
    return data;
  };
  
  // Calculate RSI
  const calculateRSI = (data, periods = 14) => {
    if (data.length < periods + 1) {
      return Array(data.length).fill(50);
    }
    
    const changes = [];
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i].close - data[i-1].close);
    }
    
    const rsiData = [];
    for (let i = 0; i < periods; i++) {
      rsiData.push(50); // Neutral RSI for initial periods
    }
    
    for (let i = periods; i < changes.length + 1; i++) {
      const windowChanges = changes.slice(i - periods, i);
      const gains = windowChanges.filter(c => c > 0).reduce((sum, c) => sum + c, 0) / periods;
      const losses = Math.abs(windowChanges.filter(c => c < 0).reduce((sum, c) => sum + c, 0)) / periods;
      
      const relativeStrength = gains / (losses === 0 ? 1 : losses);
      const rsi = 100 - (100 / (1 + relativeStrength));
      
      rsiData.push(rsi);
    }
    
    return rsiData;
  };
  
  useEffect(() => {
    const data = generateMarketData(activeTimeframe);
    const rsiData = calculateRSI(data);
    
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const volumeHeight = 80;
    const rsiHeight = 80;
    const totalHeight = height + volumeHeight + rsiHeight + margin.top + margin.bottom + 40;
    
    // Set SVG height
    svg.attr("height", totalHeight);
    
    const mainChart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      
    const volumeChart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + height + 20})`);
      
    const rsiChart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + height + volumeHeight + 40})`);
    
    // X scale
    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    
    // Y scales
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.low) * 0.998, d3.max(data, d => d.high) * 1.002])
      .range([height, 0]);
      
    const yVolume = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.volume)])
      .range([volumeHeight, 0]);
      
    const yRSI = d3.scaleLinear()
      .domain([0, 100])
      .range([rsiHeight, 0]);
    
    // Add X axis
    mainChart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "11px");
    
    // Add Y axis
    mainChart.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "11px");
      
    // Add Volume Y axis
    volumeChart.append("g")
      .call(d3.axisLeft(yVolume).ticks(3))
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "10px");
      
    // Add RSI Y axis
    rsiChart.append("g")
      .call(d3.axisLeft(yRSI).ticks(3))
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "10px");
      
    // Add horizontal lines for RSI
    rsiChart.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", yRSI(30))
      .attr("y2", yRSI(30))
      .attr("stroke", "#FF4500")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "3,3");
      
    rsiChart.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", yRSI(70))
      .attr("y2", yRSI(70))
      .attr("stroke", "#32CD32")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "3,3");
    
    // Add title
    mainChart.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", "#FFD700")
      .text("Gold Price (USD)");
      
    volumeChart.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", "#FFD700")
      .attr("font-size", "11px")
      .text("Volume");
      
    rsiChart.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", "#FFD700")
      .attr("font-size", "11px")
      .text("RSI (14)");
    
    if (chartType === 'candle') {
      // Candle width
      const candleWidth = Math.max(5, Math.min(15, width / data.length / 2));
      
      // Draw candles
      mainChart.selectAll("line.stem")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "stem")
        .attr("x1", (d, i) => x(i))
        .attr("x2", (d, i) => x(i))
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ? "#FF4500" : "#32CD32")
        .attr("stroke-width", 1);
      
      mainChart.selectAll("rect.candle")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "candle")
        .attr("x", (d, i) => x(i) - candleWidth / 2)
        .attr("y", d => y(Math.max(d.open, d.close)))
        .attr("width", candleWidth)
        .attr("height", d => Math.abs(y(d.open) - y(d.close)))
        .attr("fill", d => d.open > d.close ? "#FF4500" : "#32CD32");
    } else {
      // Line chart
      const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d.close))
        .curve(d3.curveMonotoneX);
        
      mainChart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FFD700")
        .attr("stroke-width", 2)
        .attr("d", line);
        
      // Add gradient area
      const area = d3.area()
        .x((d, i) => x(i))
        .y0(height)
        .y1(d => y(d.close))
        .curve(d3.curveMonotoneX);
        
      const gradient = mainChart.append("defs")
        .append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");
        
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#FFD700")
        .attr("stop-opacity", 0.5);
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#FFD700")
        .attr("stop-opacity", 0);
        
      mainChart.append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area);
    }
    
    // Draw volume bars
    volumeChart.selectAll("rect.volume")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "volume")
      .attr("x", (d, i) => x(i) - width / data.length / 2 * 0.8)
      .attr("y", d => yVolume(d.volume))
      .attr("width", width / data.length * 0.8)
      .attr("height", d => volumeHeight - yVolume(d.volume))
      .attr("fill", (d, i) => i > 0 ? (data[i].close > data[i-1].close ? "#32CD3280" : "#FF450080") : "#FFD70080");
      
    // Draw RSI line
    const rsiLine = d3.line()
      .x((d, i) => x(i))
      .y(d => yRSI(d))
      .curve(d3.curveMonotoneX);
      
    rsiChart.append("path")
      .datum(rsiData)
      .attr("fill", "none")
      .attr("stroke", "#FFD700")
      .attr("stroke-width", 1.5)
      .attr("d", rsiLine);
      
    // Add tooltip
    const tooltip = d3.select(tooltipRef.current);
    
    const mouseover = function(event, d) {
      tooltip.style("opacity", 1);
    };
    
    const mousemove = function(event, d) {
      const i = Math.floor(x.invert(d3.pointer(event)[0]));
      if (i >= 0 && i < data.length) {
        const item = data[i];
        tooltip.html(`
          <div class="bg-black/80 backdrop-blur-md p-2 rounded border border-yellow-500/20">
            <div class="text-yellow-500 font-semibold">Price: $${item.close.toFixed(2)}</div>
            <div class="text-xs text-gray-300">O: $${item.open.toFixed(2)} H: $${item.high.toFixed(2)}</div>
            <div class="text-xs text-gray-300">L: $${item.low.toFixed(2)} C: $${item.close.toFixed(2)}</div>
            <div class="text-xs text-yellow-300">Vol: ${Math.round(item.volume)}</div>
            <div class="text-xs ${rsiData[i] > 70 ? "text-red-400" : rsiData[i] < 30 ? "text-green-400" : "text-gray-300"}">
              RSI: ${rsiData[i].toFixed(1)}
            </div>
          </div>
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      }
    };
    
    const mouseleave = function(event, d) {
      tooltip.style("opacity", 0);
    };
    
    // Add interaction rect
    mainChart.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }, [activeTimeframe, chartType]);
  
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-yellow-500/20">
        <h3 className="text-xl font-bold text-yellow-500">Gold Market Data</h3>
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
        <div className="text-sm text-gray-400">Last updated: April 25, 2025 09:30 AM EST</div>
        <div className="flex space-x-2">
          <button 
            className={`p-1 rounded ${chartType === 'candle' ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setChartType('candle')}
            title="Candlestick Chart"
          >
            <BarChart size={16} />
          </button>
          <button 
            className={`p-1 rounded ${chartType === 'line' ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            <LineChart size={16} />
          </button>
        </div>
      </div>
      <div className="relative p-2">
        <svg ref={svgRef} width="100%" height="460"></svg>
        <div ref={tooltipRef} className="absolute pointer-events-none transition-opacity duration-100 opacity-0 z-10"></div>
      </div>
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

// Authentication Portal Component
const AuthenticationPortal = () => {
  const [step, setStep] = useState(1);
  const [fingerprintScanned, setFingerprintScanned] = useState(false);
  const [fingerprintProgress, setFingerprintProgress] = useState(0);
  const [passwordValue, setPasswordValue] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [biometricData, setBiometricData] = useState({
    confidenceScore: 0,
    verificationStatus: 'pending',
    fingerprintFeatures: [],
    scanQuality: 0
  });
  
  // Background pattern for security visualization
  const [securityPattern, setSecurityPattern] = useState([]);
  const canvasRef = useRef(null);
  
  // Generate a unique security pattern based on biometric data
  useEffect(() => {
    if (step === 2 && fingerprintScanned) {
      const features = [];
      for (let i = 0; i < 12; i++) {
        features.push({
          angle: Math.random() * 360,
          distance: Math.random() * 0.5 + 0.2,
          strength: Math.random() * 0.8 + 0.2
        });
      }
      
      setBiometricData(prev => ({
        ...prev,
        confidenceScore: 0.92 + Math.random() * 0.08,
        verificationStatus: 'verified',
        fingerprintFeatures: features,
        scanQuality: 0.85 + Math.random() * 0.15
      }));
      
      // Generate security pattern
      const newPattern = [];
      for (let i = 0; i < 20; i++) {
        newPattern.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 0.04 + 0.01,
          opacity: Math.random() * 0.5 + 0.2,
          angle: Math.random() * 360
        });
      }
      setSecurityPattern(newPattern);
    }
  }, [step, fingerprintScanned]);
  
  // Render the security pattern
  useEffect(() => {
    if (canvasRef.current && securityPattern.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < securityPattern.length; i++) {
        const point1 = securityPattern[i];
        
        for (let j = i + 1; j < securityPattern.length; j++) {
          const point2 = securityPattern[j];
          const distance = Math.hypot(
            point2.x - point1.x, 
            point2.y - point1.y
          );
          
          if (distance < 0.3) {
            ctx.beginPath();
            ctx.moveTo(point1.x * width, point1.y * height);
            ctx.lineTo(point2.x * width, point2.y * height);
            ctx.globalAlpha = (0.3 - distance) / 0.3 * 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw points
      for (const point of securityPattern) {
        ctx.beginPath();
        ctx.arc(
          point.x * width, 
          point.y * height, 
          point.size * width, 
          0, 
          Math.PI * 2
        );
        ctx.globalAlpha = point.opacity;
        ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.fill();
      }
    }
  }, [securityPattern]);
  
  useEffect(() => {
    if (step === 2 && !fingerprintScanned) {
      const interval = setInterval(() => {
        setFingerprintProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setFingerprintScanned(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [step, fingerprintScanned]);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final authentication
      setAuthenticating(true);
      setTimeout(() => {
        setAuthenticating(false);
      }, 2000);
    }
  };
  
  return (
    <div className="relative max-w-md mx-auto">
      {/* Authentication Steps */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-2">
        {[1, 2, 3].map((s) => (
          <div 
            key={`step-${s}`} 
            className="flex flex-col items-center"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s < step 
                  ? 'bg-yellow-500 text-black' 
                  : s === step 
                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500' 
                    : 'bg-gray-800 text-gray-500 border border-gray-700'
              }`}
            >
              {s < step ? (
                <Check size={16} />
              ) : (
                s
              )}
            </div>
            {s < 3 && (
              <div 
                className={`h-0.5 w-24 mt-4 ${
                  s < step ? 'bg-yellow-500' : 'bg-gray-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-gray-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden mt-16 shadow-lg">
        <div className="p-6 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-yellow-500">Secure Investor Portal</h3>
            <p className="text-gray-400 text-sm mt-1">
              {step === 1 ? 'Enter your credentials to access your portfolio' : 
               step === 2 ? 'Biometric verification required' :
               'Multi-factor authorization'}
            </p>
          </div>
          
          {/* Step 1: Username & Password */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Username</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
                    placeholder="Enter your username"
                    defaultValue="investor_hx792"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
                    placeholder="Enter your password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    <Lock size={16} />
                  </div>
                </div>
                
                <div className="flex justify-between text-xs mt-1">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="accent-yellow-500" />
                    <span className="ml-2 text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-yellow-500 hover:underline">Forgot password?</a>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Fingerprint Verification */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="relative mx-auto w-40 h-40 mb-4">
                <div 
                  className={`absolute inset-0 rounded-full flex items-center justify-center transition-all ${
                    fingerprintScanned 
                      ? 'bg-yellow-500/20 border-4 border-yellow-500' 
                      : 'bg-gray-800/70 border-2 border-gray-700'
                  }`}
                >
                  <Fingerprint 
                    size={64} 
                    className={`${
                      fingerprintScanned 
                        ? 'text-yellow-500' 
                        : 'text-gray-500'
                    }`}
                  />
                  
                  {/* Security pattern canvas for verified state */}
                  {fingerprintScanned && (
                    <canvas 
                      ref={canvasRef}
                      width="160"
                      height="160"
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
                
                {!fingerprintScanned && (
                  <>
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        strokeWidth="4"
                        stroke="#FFD700"
                        strokeDasharray={`${fingerprintProgress * 2.9}, 290`}
                        transform="rotate(-90 50 50)"
                      />
                      
                      {/* Scanning effect */}
                      <line
                        x1="10"
                        y1={50 - 40 + (fingerprintProgress * 0.8)}
                        x2="90"
                        y2={50 - 40 + (fingerprintProgress * 0.8)}
                        stroke="#FFD700"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                    </svg>
                    
                    {/* Scanning animation with laser line */}
                    <div 
                      className="absolute inset-x-0" 
                      style={{
                        top: `${(fingerprintProgress * 0.8)}%`,
                        height: '2px',
                        background: 'linear-gradient(to right, transparent, #FFD700, transparent)',
                        boxShadow: '0 0 8px #FFD700'
                      }}
                    />
                  </>
                )}
              </div>
              
              <p className="text-gray-300 mb-2">
                {fingerprintScanned 
                  ? 'Fingerprint scan complete' 
                  : 'Place your finger on the sensor'}
              </p>
              
              {fingerprintScanned ? (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center mx-auto max-w-xs px-4 py-2 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400 text-xs">Confidence Score</span>
                    <span className="text-yellow-500 text-xs font-medium">{(biometricData.confidenceScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center mx-auto max-w-xs px-4 py-2 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400 text-xs">Scan Quality</span>
                    <span className="text-yellow-500 text-xs font-medium">{(biometricData.scanQuality * 100).toFixed(1)}%</span>
                  </div>
                  <div className="mx-auto max-w-xs px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-lg text-green-500 text-xs font-medium mt-2">
                    Identity Verified ✓
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Scanning fingerprint...
                </p>
              )}
            </motion.div>
          )}
          
          {/* Step 3: Multi-factor Code */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mb-2">
                <p className="text-gray-300">Enter the verification code sent to your device</p>
              </div>
              
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map(digit => (
                  <input
                    key={`code-${digit}`}
                    type="text"
                    maxLength="1"
                    className="w-10 h-12 text-center bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all text-lg"
                    defaultValue={digit % 3 === 0 ? Math.floor(Math.random() * 10) : ''}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Didn't receive the code? <a href="#" className="text-yellow-500 hover:underline">Resend</a>
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="p-4 border-t border-yellow-500/10 bg-gray-900/30 flex justify-between">
          {step > 1 && (
            <button 
              className="bg-[#001a12]/10 backdrop-blur-lg px-4 py-2 rounded-full border border-[#FFD700]/30 hover:bg-[#001a12]/20 text-gray-300 transition-all hover:text-white text-sm"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}
          
          <button 
            className={`flex items-center gap-2 bg-[#B8860B]/10 backdrop-blur-lg px-6 py-2 rounded-full border border-[#FFD700]/50 hover:bg-[#B8860B]/20 text-[#FFD700] transition-all text-sm ml-auto ${
              (step === 2 && !fingerprintScanned) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleNext}
            disabled={step === 2 && !fingerprintScanned}
          >
            {authenticating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>{step === 3 ? 'Complete Authentication' : 'Continue'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
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

// Gold Token Purchasing Flow
const TokenPurchaseFlow = () => {
  const [step, setStep] = useState(1);
  const [purchaseAmount, setPurchaseAmount] = useState(2500);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [receiveMethod, setReceiveMethod] = useState('digital');
  const [processing, setProcessing] = useState(false);
  
  // Calculate token qty and fees
  const goldPrice = 1932.50; // USD per oz
  const premium = 0.25; // 0.25% premium
  const tokens = purchaseAmount / goldPrice;
  const fees = purchaseAmount * premium;
  const total = purchaseAmount + fees;
  
  // Handle next step
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      
      // Simulate processing state for confirmation
      if (step === 3) {
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
        }, 2000);
      }
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Create time-based token ID for the purchase
  const generateTokenId = () => {
    const timestamp = Date.now().toString(16);
    const random = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    return `GTN-${timestamp}-${random}`.toUpperCase();
  };
  
  const tokenId = generateTokenId();
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-yellow-500/20">
        <h3 className="text-xl font-bold text-yellow-500">Purchase Gold Tokens</h3>
        <p className="text-gray-400 text-sm mt-1">Acquire tokenized gold backed by physical reserves</p>
      </div>
      
      {/* Progress Steps */}
      <div className="bg-gray-900/30 p-3 border-b border-yellow-500/10">
        <div className="flex justify-between">
          {['Amount', 'Payment', 'Review', 'Confirmation'].map((label, index) => {
            const stepNum = index + 1;
            return (
              <div 
                key={`step-${stepNum}`} 
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                    stepNum < step 
                      ? 'bg-yellow-500 text-black' 
                      : stepNum === step 
                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500' 
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  {stepNum < step ? (
                    <Check size={14} />
                  ) : (
                    stepNum
                  )}
                </div>
                <span 
                  className={`text-xs mt-1 ${
                    stepNum <= step ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
                
                {stepNum < 4 && (
                  <div className="hidden sm:block w-full h-0.5 mt-4 -mx-6">
                    <div 
                      className={`h-full ${
                        stepNum < step ? 'bg-yellow-500' : 'bg-gray-700'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-6">
        {/* Step 1: Purchase Amount */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300">Purchase Amount (USD)</label>
              <div className="relative">
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(100, Math.min(1000000, Number(e.target.value))))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-8 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>Min: $100</span>
                <span>Max: $1,000,000</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2500, 5000].map((amount) => (
                <button
                  key={`amount-${amount}`}
                  className={`py-2 rounded text-center transition-colors text-sm ${
                    purchaseAmount === amount
                      ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                  }`}
                  onClick={() => setPurchaseAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-500/10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Current Gold Price</span>
                <span className="text-yellow-500">${goldPrice.toFixed(2)} / oz</span>
              </div>
              
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Estimated Gold Tokens</span>
                <span className="text-white">{tokens.toFixed(4)} GTN</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Token Exchange Rate</span>
                <span className="text-white">1 GTN = 1 oz of Gold</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield size={14} className="text-yellow-500" />
              <span>All gold tokens are 100% backed by physical gold stored in secure vaults</span>
            </div>
          </div>
        )}
        
        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-gray-300">Choose Payment Method</label>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'bank' 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => setPaymentMethod('bank')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <Building size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Bank Transfer (ACH)</div>
                      <div className="text-xs text-gray-400">2-3 business days processing</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      paymentMethod === 'bank' 
                        ? 'bg-yellow-500 text-black' 
                        : 'border border-gray-600'
                    }`}
                  >
                    {paymentMethod === 'bank' && <Check size={12} />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'crypto' 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => setPaymentMethod('crypto')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <div className="text-purple-400 font-bold">₿</div>
                    </div>
                    <div>
                      <div className="font-medium text-white">Cryptocurrency</div>
                      <div className="text-xs text-gray-400">Instant processing (BTC, ETH, USDC)</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      paymentMethod === 'crypto' 
                        ? 'bg-yellow-500 text-black' 
                        : 'border border-gray-600'
                    }`}
                  >
                    {paymentMethod === 'crypto' && <Check size={12} />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'card' 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                      <div className="text-green-400 text-sm">💳</div>
                    </div>
                    <div>
                      <div className="font-medium text-white">Credit/Debit Card</div>
                      <div className="text-xs text-gray-400">Instant processing (3% fee)</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      paymentMethod === 'card' 
                        ? 'bg-yellow-500 text-black' 
                        : 'border border-gray-600'
                    }`}
                  >
                    {paymentMethod === 'card' && <Check size={12} />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <label className="text-gray-300">Token Delivery Method</label>
              
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                    receiveMethod === 'digital' 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                  }`}
                  onClick={() => setReceiveMethod('digital')}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-900/30 flex items-center justify-center mb-2">
                    <div className="text-blue-400">💾</div>
                  </div>
                  <div className="font-medium text-white text-sm">Digital Wallet</div>
                  <div className="text-xs text-gray-400 mt-1">Receive tokens in your gold wallet</div>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                    receiveMethod === 'physical' 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                  }`}
                  onClick={() => setReceiveMethod('physical')}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-900/30 flex items-center justify-center mb-2">
                    <div className="text-amber-400">📦</div>
                  </div>
                  <div className="font-medium text-white text-sm">Physical Delivery</div>
                  <div className="text-xs text-gray-400 mt-1">Receive physical gold (min 1 oz)</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-gray-300 font-medium">Review Your Order</h4>
              
              <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-yellow-500/10">
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Purchase Amount</span>
                  <span className="text-white">${purchaseAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Gold Price</span>
                  <span className="text-yellow-500">${goldPrice.toFixed(2)} / oz</span>
                </div>
                
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Gold Tokens (GTN)</span>
                  <span className="text-white">{tokens.toFixed(4)} GTN</span>
                </div>
                
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Service Fee ({premium * 100}%)</span>
                  <span className="text-gray-300">${fees.toFixed(2)}</span>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Card Processing Fee (3%)</span>
                    <span className="text-gray-300">${(purchaseAmount * 0.03).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-base font-medium pt-1">
                  <span className="text-white">Total</span>
                  <span className="text-yellow-500">
                    ${(total + (paymentMethod === 'card' ? purchaseAmount * 0.03 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white">
                    {paymentMethod === 'bank' && 'Bank Transfer (ACH)'}
                    {paymentMethod === 'crypto' && 'Cryptocurrency'}
                    {paymentMethod === 'card' && 'Credit/Debit Card'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Method</span>
                  <span className="text-white">
                    {receiveMethod === 'digital' && 'Digital Wallet'}
                    {receiveMethod === 'physical' && 'Physical Delivery'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Processing Time</span>
                  <span className="text-white">
                    {paymentMethod === 'bank' && '2-3 business days'}
                    {paymentMethod === 'crypto' && 'Instant (blockchain confirmation)'}
                    {paymentMethod === 'card' && 'Instant'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-500 flex items-start gap-2">
              <Shield size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                All gold tokens are 100% backed by allocated physical gold stored in secure vaults. Your purchase is protected by our Gold Standard Guarantee.
              </div>
            </div>
            
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-500" defaultChecked />
              <span className="text-gray-300 text-sm">
                I agree to the terms and conditions of the token purchase agreement
              </span>
            </label>
          </div>
        )}
        
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border-4 border-green-500">
                <Check size={32} className="text-green-500" />
              </div>
              
              <h3 className="text-xl font-bold text-white">Purchase Successful!</h3>
              <p className="text-gray-400 text-sm mt-1">
                Your gold token purchase has been confirmed
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg border border-yellow-500/10 text-left">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="text-yellow-500 font-mono">{tokenId}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Gold Tokens Purchased</span>
                  <span className="text-white">{tokens.toFixed(4)} GTN</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Purchase Amount</span>
                  <span className="text-white">${purchaseAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-500">Complete</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">
                  Your tokens will be available in:
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="text-yellow-500 text-xs">
                      {receiveMethod === 'digital' ? '💾' : '📦'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-white text-sm font-medium">
                      {receiveMethod === 'digital' ? 'Your Digital Gold Wallet' : 'Physical Delivery'}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {receiveMethod === 'digital' 
                        ? 'Available within 24 hours in your digital wallet' 
                        : 'Shipped via insured courier within 5-7 business days'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm">
                View Transaction Details
              </button>
              
              <button className="text-yellow-500 text-sm hover:underline">
                Download Receipt
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      {step !== 4 && (
        <div className="p-4 border-t border-yellow-500/10 bg-gray-900/30 flex justify-between">
          {step > 1 ? (
            <button 
              className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-700 text-gray-300 transition-all text-sm flex items-center gap-1"
              onClick={handlePrevious}
            >
              <ChevronLeft size={16} />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            className="bg-[#B8860B]/10 backdrop-blur-lg px-6 py-2 rounded-full border border-[#FFD700]/50 hover:bg-[#B8860B]/20 text-[#FFD700] transition-all text-sm flex items-center gap-1"
            onClick={handleNext}
          >
            {step === 3 ? (
              processing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
                  Processing...
                </>
              ) : (
                'Confirm Purchase'
              )
            ) : (
              <>
                Continue
                <ChevronRight size={16} />
              </>
            )}
          </button>
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
          
          <MarketDataVisualization />
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
      
      {/* Secure Access Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-yellow-500">Enterprise-Grade</span> Security
            </h2>
            <p className="text-gray-400">
              Access your gold investments with multi-factor authentication and advanced biometric verification.
            </p>
          </div>
          
          <AuthenticationPortal />
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
      
      {/* Token Purchase Flow Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-yellow-500">Acquire</span> Gold Tokens
            </h2>
            <p className="text-gray-400">
              Purchase tokenized gold with a seamless, secure transaction process that meets your investment needs.
            </p>
          </div>
          
          <TokenPurchaseFlow />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-yellow-500 font-bold text-lg mb-4">Gold Tokenization</h3>
              <p className="text-gray-400 text-sm">
                Revolutionizing gold investments with blockchain technology for a secure, 
                transparent, and accessible precious metals market.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Markets', 'Investments', 'Security', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Whitepaper', 'Documentation', 'API', 'Legal', 'FAQ', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@goldtokenization.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Financial District, New York, NY 10004</li>
              </ul>
              
              <div className="flex gap-4 mt-4">
                {['Twitter', 'LinkedIn', 'Telegram', 'Discord'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-400 hover:text-yellow-500 transition-colors text-xs"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2025 Gold Tokenization Platform. All rights reserved.
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              {['Terms', 'Privacy', 'Cookies', 'Disclosures'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoldTokenization;