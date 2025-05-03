import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Building, BarChart, ShieldCheck, Globe, Landmark, FileCheck, Coins, Repeat } from "lucide-react";

// Custom components to replace MUI
const Card = ({ children, className, as3D = false }) => {
  return (
    <motion.div
      whileHover={as3D ? { translateY: -10 } : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#121212] relative rounded-xl border border-gray-700 ${
        as3D 
          ? "shadow-[0_20px_25px_-5px_rgba(16,185,129,0.15),0_10px_10px_-5px_rgba(16,185,129,0.08)]" 
          : "shadow-md"
      } backdrop-filter backdrop-blur-sm bg-opacity-80 ${className}`}
    >
      {/* Enhanced gradient border glow effect */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      {children}
    </motion.div>
  );
};

// Custom particle background component with enhanced visibility
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base grid pattern - increased opacity and stroke width */}
      <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMC40Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjA2Ii8+PC9zdmc+')]"></div>
      
      {/* Diagonal grid overlay - increased opacity */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIwLjciLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiLz48L3N2Zz4=')]"></div>
      
      {/* Moving gradient overlay - increased color intensity */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-blue-900/10 mix-blend-screen"
        animate={{ 
          background: [
            "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, transparent 25%, rgba(6,78,59,0.07) 50%, transparent 75%, rgba(16,185,129,0.07) 100%)",
            "linear-gradient(135deg, rgba(6,78,59,0.07) 0%, transparent 25%, rgba(16,185,129,0.07) 50%, transparent 75%, rgba(6,78,59,0.07) 100%)",
            "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, transparent 25%, rgba(6,78,59,0.07) 50%, transparent 75%, rgba(16,185,129,0.07) 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Advanced particles - increased opacity and size */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${i % 5 === 0 ? 'bg-emerald-400' : i % 3 === 0 ? 'bg-emerald-500' : 'bg-emerald-600'}`}
          initial={{
            opacity: Math.random() * 0.4 + 0.1,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.6 + 0.2,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [Math.random() * 0.3, Math.random() * 0.5, Math.random() * 0.3],
          }}
          transition={{
            duration: Math.random() * 30 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 5 + 1.5,
            height: Math.random() * 5 + 1.5,
            filter: `blur(${Math.random() < 0.3 ? '1px' : '0px'})`,
          }}
        />
      ))}
      
      {/* Larger glowing orbs - increased opacity */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-emerald-500/15"
          initial={{
            opacity: Math.random() * 0.15 + 0.1,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [Math.random() * 0.15, Math.random() * 0.25, Math.random() * 0.15],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 100 + 60,
            height: Math.random() * 100 + 60,
            filter: 'blur(35px)',
          }}
        />
      ))}
      
      {/* Constellation line effects - increased opacity and stroke width */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]">
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = x1 + (Math.random() * 20 - 10);
            const y2 = y1 + (Math.random() * 20 - 10);
            
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#10b981"
                strokeWidth="0.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.4, 0.4, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.3, 0.7, 1]
                }}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};

// Main component
const RealEstateTokenization = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [animateTokens, setAnimateTokens] = useState(false);

  // Properties data
  const properties = [
    {
      name: "Skyline Tower",
      location: "New York, USA",
      type: "Commercial",
      value: "28.5M",
      tokens: "285,000",
      investors: "1,240",
      soldPercentage: 92,
      expectedReturns: "8.2% annual",
    },
    {
      name: "Marina Heights",
      location: "Dubai, UAE",
      type: "Mixed-Use",
      value: "42.1M",
      tokens: "421,000",
      investors: "1,890",
      soldPercentage: 85,
      expectedReturns: "9.4% annual",
    },
  ];

  // Trigger token animation on first render
  useEffect(() => {
    setTimeout(() => setAnimateTokens(true), 500);
  }, []);

  // Function to render an advanced token distribution chart
  const renderTokenDistributionChart = () => {
    const totalColumns = 10;
    const totalRows = 10;
    const soldPercentage = properties[currentProperty].soldPercentage;
    const totalCells = totalColumns * totalRows;
    const filledCells = Math.round((soldPercentage / 100) * totalCells);
    const cells = [];
    let cellCounter = 0;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalColumns; col++) {
        cellCounter++;
        cells.push(
          <motion.div
            key={`${row}-${col}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              backgroundColor: cellCounter <= filledCells 
                ? "#10b981" 
                : "rgba(107, 114, 128, 0.3)" 
            }}
            transition={{ 
              duration: 0.5, 
              delay: cellCounter * 0.004 * (animateTokens ? 1 : 0) 
            }}
            className="h-4 rounded-sm backdrop-blur-sm"
          />
        );
      }
    }
    return cells;
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-white min-h-screen relative overflow-hidden font-sans">
    {/* Enhanced Layered Background Elements - DECREASED OPACITY BY 1/4 */}
    
    {/* Grid Background - Decreased opacity from 0.2 to 0.15 and stroke width from 0.8 to 0.6 */}
    <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMC42Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')]"></div>
    
    {/* Hexagonal pattern overlay - Decreased opacity from 0.25 to 0.1875 and stroke width from 2.4 to 1.8 */}
    <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg0IDQ4Ij48ZGVmcz48cGF0dGVybiBpZD0iaGV4IiB3aWR0aD0iODQiIGhlaWdodD0iNDgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InNjYWxlKDAuMTYpIj48cGF0aCBkPSJNNDIgMTIgNzMuODIzIDMxIDczLjgyMyA2OSA0MiA4OCAxMC4xNzcgNjkgMTAuMTc3IDMxeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4KSIgb3BhY2l0eT0iMC4xODc1IiAvPjwvc3ZnPg==')] opacity-60"></div>

    {/* Diagonal grid overlay - Fixed with enhanced visibility */}
    {/* <div className="fixed inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiLz48L3N2Zz4=')]"></div> */}
    
    {/* Diagonal grid overlay - Balanced opacity consistent with other layers */}
    <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]"></div>

    {/* Animated gradient overlay - Decreased color intensity from 0.2 to 0.15 */}
    <motion.div 
      className="fixed inset-0 bg-gradient-to-tr from-emerald-900/[0.1875] via-transparent to-blue-900/[0.1875]"
      animate={{
        background: [
          "linear-gradient(135deg, rgba(6,78,59,0.15) 0%, rgba(0,0,0,0) 50%, rgba(12,74,110,0.15) 100%)",
          "linear-gradient(135deg, rgba(12,74,110,0.15) 0%, rgba(0,0,0,0) 50%, rgba(6,78,59,0.15) 100%)",
          "linear-gradient(135deg, rgba(6,78,59,0.15) 0%, rgba(0,0,0,0) 50%, rgba(12,74,110,0.15) 100%)"
        ]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />
    
    {/* Sophisticated noise texture overlay - Decreased opacity from 0.12 to 0.09 */}
    <div className="fixed inset-0 opacity-[0.09] mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuMDEiIG51bU9jdGF2ZXM9IjUiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"></div>
    
    {/* Circuit board pattern overlay - Decreased opacity from 0.3 to 0.225 and stroke width from 1.8 to 1.35 */}
    <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJjaXJjdWl0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTEwIDEwIEw1MCAxMCBMNTAgNTAgTDkwIDUwIEw5MCA5MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuMzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik05MCAxMCBMNTAgMTAgTDUwIDUwIEwxMCA1MCBMMTAgOTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjM1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSIxMCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSI1MCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjkwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')]"></div>
    
    {/* Vignette shadow overlay - Decreased opacity from 0.3 to 0.225 */}
    <div className="fixed inset-0 pointer-events-none bg-radial-gradient opacity-[0.225] z-[1]" 
      style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.375) 100%)" }}>
    </div>
    
    {/* Optional color tint - Decreased opacity from 0.05 to 0.0375 */}
    <div className="fixed inset-0 bg-emerald-500/[0.0375] mix-blend-overlay"></div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-24">
        {/* <ParticleBackground /> */}

        <motion.div
          className="max-w-4xl mt-20 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-4 left-0"
          />
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "30%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-8 left-0"
          />

          <motion.h1
            className="font-['Orbitron'] text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Real Estate <span className="text-emerald-400">Tokenization</span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl font-medium mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform Property Investment with Blockchain Technology
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Democratize real estate investment through fractional ownership,
            enhanced liquidity, and global accessibility. The future of property
            investment is here.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              onClick={() => {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105 group"
            >
              <span className="flex items-center">
                Start Tokenizing
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.span>
              </span>
            </motion.button>
            <motion.button
              onClick={() => {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Revolutionize Section */}
      <motion.section
        className="container mx-auto px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <div className="relative mb-8">
              <div className="absolute left-0 top-0 h-12 w-1 bg-emerald-500 opacity-80" />
              <h2 className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-6 pl-6">
                Revolutionalize
                <span className="block text-emerald-400">
                  Real Estate Investment
                </span>
              </h2>
            </div>

            <p className="text-gray-300 mb-10 text-lg">
              Copym enables investors to tokenize and trade real estate assets
              with unprecedented ease, transparency, and efficiency.
            </p>

            {/* Feature Cards with Fixed Border Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Building className="h-6 w-6 text-emerald-400" />,
                  title: "Fractional Property Ownership",
                  desc: "Invest in premium real estate with lower entry barriers and increased liquidity.",
                },
                {
                  icon: <BarChart className="h-6 w-6 text-emerald-400" />,
                  title: "Dynamic Valuation",
                  desc: "Real-time market pricing and transparent asset valuation through blockchain.",
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
                  title: "Comprehensive Compliance",
                  desc: "Automated regulatory checks and investor verification for seamless transactions.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-emerald-400" />,
                  title: "Global Accessibility",
                  desc: "Trade and invest in international real estate markets without geographical limitations.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:border-emerald-900 transition-all duration-500 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                  {/* Border animation now positioned inside the card boundaries */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:w-full transition-all duration-700" />
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Property Card */}
          <motion.div variants={itemVariants} className="lg:w-full">
            <Card as3D={true} className="group overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {properties[currentProperty].name}
                      </h3>
                      <p className="text-emerald-100">
                        {properties[currentProperty].location} •{" "}
                        {properties[currentProperty].type}
                      </p>
                    </div>
                    <div className="flex">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-black bg-opacity-30 p-2 rounded-full mr-2 hover:bg-opacity-50 transition-all duration-300"
                        onClick={() =>
                          setCurrentProperty(
                            currentProperty === 0
                              ? properties.length - 1
                              : currentProperty - 1
                          )
                        }
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all duration-300"
                        onClick={() =>
                          setCurrentProperty(
                            (currentProperty + 1) % properties.length
                          )
                        }
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div>
                      <p className="text-gray-500 text-sm">Property Value</p>
                      <p className="text-lg flex items-center text-white">
                        <span className="text-emerald-500 mr-1">$</span>
                        {properties[currentProperty].value}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Tokens</p>
                      <p className="text-lg text-white">
                        {properties[currentProperty].tokens}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Investors</p>
                      <p className="text-lg flex items-center text-white">
                        <span className="text-emerald-500 mr-1">👤</span>
                        {properties[currentProperty].investors}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-400">Token Distribution</p>
                      <p className="text-white">
                        Token Price{" "}
                        <span className="text-emerald-500">$100</span>
                      </p>
                    </div>

                    {/* Enhanced Token Distribution Chart */}
                    <div className="grid grid-cols-10 gap-1 mb-2 p-1 rounded-md bg-black bg-opacity-40">
                      {renderTokenDistributionChart()}
                    </div>

                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-emerald-500">
                        {properties[currentProperty].soldPercentage}% Sold
                      </p>
                      <p className="text-sm text-gray-400">
                        {100 - properties[currentProperty].soldPercentage}%
                        Available
                      </p>
                    </div>
                  </div>

                  <motion.button
                    className="flex justify-between items-center w-full bg-[#1a1a1a] hover:bg-[#222] p-4 rounded-md mb-4 transition-all duration-300"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    whileHover={{ backgroundColor: "rgba(40, 40, 40, 0.8)" }}
                  >
                    <span className="font-medium">Property Details</span>
                    <motion.div
                      animate={{ rotate: isDetailsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </motion.button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isDetailsOpen ? "auto" : 0,
                      opacity: isDetailsOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#1a1a1a] -mt-4 mb-4 p-5 rounded-b-md">
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm">
                          Expected Returns
                        </p>
                        <p className="text-white">
                          {properties[currentProperty].expectedReturns}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-3">
                          Tokenization Benefits
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Fractional ownership starting from $100",
                            "Secondary market trading for liquidity",
                            "Automated dividend distributions",
                            "Transparent ownership records",
                          ].map((benefit, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start"
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <span className="text-emerald-500 mr-2">→</span>
                              <span className="text-gray-300">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  <button 
                    className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 w-full group"
                  >
                    <span className="flex items-center justify-center">
                      View Investment Opportunity
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Tokenization Process Section */}
      <motion.section
        className="container mx-auto px-6 py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="text-center mb-16 relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-24 h-24 rounded-full bg-emerald-500 filter blur-[80px] opacity-30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.h2
            className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Real Estate{" "}
            <span className="text-emerald-400">Tokenization Process</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our streamlined process makes tokenizing real estate assets simple
            and efficient
          </motion.p>
        </div>

        {/* Process Steps with connecting lines */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute hidden md:block top-1/2 left-[10%] right-[10%] h-1 bg-gray-800 -translate-y-1/2 z-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              {
                step: 1,
                icon: <Building className="h-6 w-6 text-emerald-400" />,
                title: "Property Onboarding",
                desc: "Register property details, documentation, and ownership verification.",
              },
              {
                step: 2,
                icon: <FileCheck className="h-6 w-6 text-emerald-400" />,
                title: "Legal Structure",
                desc: "Set up the appropriate legal framework based on jurisdiction and property type.",
              },
              {
                step: 3,
                icon: <Coins className="h-6 w-6 text-emerald-400" />,
                title: "Token Issuance",
                desc: "Create property tokens with compliance and regulatory parameters built-in.",
              },
              {
                step: 4,
                icon: <Repeat className="h-6 w-6 text-emerald-400" />,
                title: "Investment & Trading",
                desc: "Enable primary offering and secondary market trading for property tokens.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="flex justify-center"
              >
                <Card className="relative w-full">
                  <motion.div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border-4 border-emerald-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/20"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {process.step}
                  </motion.div>

                  <div className="pt-12 p-6">
                    <div className="mb-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-md bg-emerald-900 bg-opacity-20 flex items-center justify-center mb-6">
                        {process.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {process.title}
                      </h3>
                      <p className="text-gray-400">{process.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="container mx-auto px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Benefits of{" "}
            <span className="text-emerald-400">Real Estate Tokenization</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "For Property Owners",
              benefits: [
                "Unlock liquidity without full property sale",
                "Access global investor capital",
                "Streamlined property management",
                "Reduced transaction costs",
              ],
            },
            {
              title: "For Investors",
              benefits: [
                "Lower investment minimums",
                "Portfolio diversification",
                "Secondary market liquidity",
                "Automated income distributions",
              ],
            },
          ].map((benefitGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={itemVariants}
              custom={groupIndex}
            >
              <Card className="h-full backdrop-blur-sm group">
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-8 text-emerald-400">
                    {benefitGroup.title}
                  </h3>

                  <ul className="space-y-6">
                    {benefitGroup.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="rounded-full p-1 bg-emerald-500 bg-opacity-20 mr-4">
                          <Check className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="text-white text-lg">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section with enhanced background */}
      <motion.section
        className="container mx-auto px-6 py-20 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Advanced background glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 filter blur-[100px] opacity-15"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Animated network lines in background */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const y1 = 20 + i * 10;
              const y2 = 25 + i * 8;
              return (
                <motion.path
                  key={`line-${i}`}
                  d={`M0 ${y1} Q 50 ${y1 < 50 ? y1 + 20 : y1 - 20}, 100 ${y2}`}
                  stroke="#10b981"
                  strokeWidth="0.4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

          <motion.h2
            className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            variants={itemVariants}
          >
            Ready to Transform Your Real Estate Portfolio?
          </motion.h2>

          <motion.p
            className="text-gray-300 mb-10 text-xl"
            variants={itemVariants}
          >
            Join thousands of property owners and investors already tokenizing
            real estate on the Copym platform.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={itemVariants}
          >
            <button
              className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-4 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105 text-lg group"
            >
              <span className="flex items-center">
                Start Tokenizing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button 
              className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-4 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 text-lg"
            >
              Schedule Consultation
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default RealEstateTokenization;