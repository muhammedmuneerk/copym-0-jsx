import React, { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Leaf, Users, Shield, Coins, Recycle, LineChart, Globe2, TreePine, Building2, Lock, Sparkles } from "lucide-react";
import GreenGlobe from "../../components/GreenGlobe";
import { useEffect } from "react";
import EarthGlb from "../../components/EarthGlb"
import ComparativeSnapshot from "./ComparisonCard";

const esgData = [
  {
    title: "Environmental",
    icon: <Leaf className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "We champion sustainable innovation by tokenizing responsibly sourced commodities like gold and copper, reducing emissions through digital infrastructure, and promoting circular economy practices in asset creation.",
    ],
  },
  {
    title: "Social",
    icon: <Users className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "Our platform fosters inclusive finance through fractional ownership, supports ethical labor practices, and drives community development by embedding social impact into every tokenized asset.",
    ],
  },
  {
    title: "Governance",
    icon: <Shield className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "With blockchain transparency, smart contract automation, and alignment to global ESG standards, we deliver secure, verifiable governance across all tokenized investments.",
    ],
  },
];

const FadeSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="z-10 relative"
  >
    {children}
  </motion.div>
);

const GreenTokenization = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-white min-h-screen relative overflow-hidden font-sans">
        {/* Enhanced Layered Background Elements */}
        
        {/* Grid Background */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMC42Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')]"></div>
        
        {/* Hexagonal pattern overlay */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg0IDQ4Ij48ZGVmcz48cGF0dGVybiBpZD0iaGV4IiB3aWR0aD0iODQiIGhlaWdodD0iNDgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InNjYWxlKDAuMTYpIj48cGF0aCBkPSJNNDIgMTIgNzMuODIzIDMxIDczLjgyMyA2OSA0MiA4OCAxMC4xNzcgNjkgMTAuMTc3IDMxeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuOCIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4KSIgb3BhY2l0eT0iMC4xODc1IiAvPjwvc3ZnPg==')] opacity-60"></div>

        {/* Diagonal grid overlay */}
        <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsLWdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDAgTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGlhZ29uYWwtZ3JpZCkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]"></div>

        {/* Animated gradient overlay */}
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
        
        {/* Sophisticated noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.09] mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuMDEiIG51bU9jdGF2ZXM9IjUiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"></div>
        
        {/* Circuit board pattern overlay */}
        <div className="fixed inset-0 opacity-[0.225] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJjaXJjdWl0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTEwIDEwIEw1MCAxMCBMNTAgNTAgTDkwIDUwIEw5MCA5MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjEuMzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik05MCAxMCBMNTAgMTAgTDUwIDUwIEwxMCA1MCBMMTAgOTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjM1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSIxMCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSI1MCIgcj0iMi42MjUiIGZpbGw9IiMxMGI5ODEiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjkwIiByPSIyLjYyNSIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjIuNjI1IiBmaWxsPSIjMTBiOTgxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')]"></div>
        
        {/* Vignette shadow overlay */}
        <div className="fixed inset-0 pointer-events-none bg-radial-gradient opacity-[0.225] z-[-1]" 
          style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.375) 100%)" }}>
        </div>
        
        {/* Optional color tint */}
        <div className="fixed inset-0 bg-emerald-500/[0.0375] mix-blend-overlay"></div>

        {/* Content sections continue from here */}
        {/* Hero Section */}
        <section className="relative container mx-auto px-6 py-24">
          <FadeSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-left pt-8">
              {/* Content Section - Left */}
              <div className="relative w-full md:w-1/2 z-10 md:-mt-20">
                <div className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-center md:text-left">
                  {/* Mobile layout */}
                  <div className="block lg:hidden space-y-1">
                    <div className="flex flex-wrap justify-center md:justify-start">
                      {"Green".split("").map((char, i) => (
                        <span key={`sm-line1-${i}`} className="gradient-letter">
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}{" "}
                      {"Tokenization".split("").map((char, i) => (
                        <span key={`sm-line1b-${i}`} className="gradient-letter">{char}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start">
                      {"&".split("").map((char, i) => (
                        <span key={`sm-line2-${i}`} className="gradient-letter">{char}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start">
                      {"ESG Integration".split("").map((char, i) => (
                        <span key={`sm-line3-${i}`} className="gradient-letter">{char}</span>
                      ))}
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden lg:block space-y-1">
                    <div className="flex flex-wrap justify-start">
                      {"Green Tokenization".split("").map((char, i) => (
                        <span key={`lg-line1-${i}`} className="gradient-letter">
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-start">
                      {"& ESG Integration".split("").map((char, i) => (
                        <span key={`lg-line2-${i}`} className="gradient-letter">
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                  <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                  <span className="text-[#00A86B] font-semibold">Copym</span> revolutionizes sustainable investing by converting real-world
                  assets into secure digital tokens. From <span className="text-[#00A86B] font-medium">metals</span> to ESG-aligned funds,
                  our blockchain-powered approach ensures transparency, access, and
                  lasting impact — aligning your values with{" "}
                  <span className="text-[#00A86B] font-semibold">futuristic finance</span>.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                  <button className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105">
                    Start Green Investing
                  </button>
                  <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Earth GLB Section - Right */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-end">
                <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] overflow-visible">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <EarthGlb />
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* ESG Commitment Boxes */}
        <section className="relative container mx-auto px-6 py-20">
          <FadeSection>
            <div className="py-16">
              <div className="container mx-auto px-4 md:px-12 text-center">
                <h2 className="font-orbitron text-xl sm:text-3xl md:text-4xl font-bold mb-6">
                  <div className="flex flex-wrap justify-center gap-1">
                    {"Our ESG Commitments".split(" ").map((word, wordIndex) => (
                      <span key={`esg-word-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`esg-letter-${wordIndex}-${i}`} className="gradient-letter">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </div>
                </h2>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
                  {esgData.map((section, idx) => (
                    <div
                      key={idx}
                      className="flex-1 relative rounded-2xl p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]"
                    >
                      <div className="bg-black/90 backdrop-blur-md rounded-2xl p-6 space-y-4 text-center shadow-lg flex flex-col h-full">
                        <div className="flex flex-col items-center justify-center">
                          {section.icon}
                          <h2 className="text-xl font-bold text-[#00A86B] font-orbitron mt-2">
                            {section.title}
                          </h2>
                        </div>
                        <ul className="text-[#CCCCCC] font-futuristic text-sm space-y-2 flex-grow leading-relaxed">
                          {section.points.map((point, i) => (
                            <li key={i} className="text-left">• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* Other Sections */}
        <FadeSection>
          <section className="space-y-32 text-[#CCCCCC] px-4">
            {/* Metals */}
            <div className="max-w-6xl mx-auto">
              <div className="p-8 grid md:grid-cols-2 gap-8 sm:gap-12">
                <div className="order-2 md:order-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                    <Coins className="w-8 h-8 text-[#00A86B] flex-shrink-0" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {"Focus on Metals:".split(" ").map((word, wordIndex) => (
                          <span key={`metals-word-1-${wordIndex}`} className="flex">
                            {word.split("").map((char, i) => (
                              <span key={`metals-letter-1-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                                {char}
                              </span>
                            ))}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        {"Our Core Offering".split(" ").map((word, wordIndex) => (
                          <span key={`metals-word-2-${wordIndex}`} className="flex">
                            {word.split("").map((char, i) => (
                              <span key={`metals-letter-2-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                                {char}
                              </span>
                            ))}
                          </span>
                        ))}
                      </div>
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg font-futuristic text-left leading-relaxed">
                      <span className="text-[#00A86B] font-semibold">Metals</span> are at the center of our strategy due to their critical role in sustainable technology.
                    </p>
                    <p className="text-base sm:text-lg font-futuristic text-left leading-relaxed">
                      Each tokenized metal is vetted for <span className="text-[#00A86B] font-medium">sustainable sourcing</span>, traceability, and environmental impact, with transparent records across the value chain.
                    </p>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                  <img 
                    src="/images/sustainable-metals.jpg" 
                    alt="Sustainable Metals Mining" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className=" p-8 grid md:grid-cols-2 gap-6">
              <img src="/images/esg-diversified.jpg" alt="Diversified ESG Portfolio" className="rounded-xl shadow-md" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <LineChart className="w-8 h-8 text-[#00A86B]" />
                  <h2 className="text-2xl md:text-4xl font-orbitron font-bold flex flex-wrap gap-1">
                    {"Diversified ESG Commodities Portfolio".split(" ").map((word, wordIndex) => (
                      <span key={`portfolio-word-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`portfolio-letter-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </h2>
                </div>
                <p className="text-base font-futuristic text-left leading-normal">
                  While <span className="text-[#00A86B] font-semibold">metals</span> are our flagship, we are expanding into other ESG-aligned asset categories. This diversified approach ensures investors can build a balanced and impactful <span className="text-[#00A86B] font-medium">ESG portfolio</span>.
                </p>
              </div>
            </div>

            {/* Blockchain Role */}
            <div className=" rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
                <Lock className="w-8 h-8 text-[#00A86B]" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-orbitron font-bold flex flex-wrap justify-center sm:justify-start gap-1">
                  {"The Role of Blockchain".split(" ").map((word, wordIndex) => (
                    <span key={`blockchain-word-${wordIndex}`} className="flex">
                      {word.split("").map((char, i) => (
                        <span key={`blockchain-letter-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                          {char}
                        </span>
                      ))}
                      <span className="w-1" />
                    </span>
                  ))}
                </h2>
              </div>
              <ul className="text-sm sm:text-base font-futuristic text-left space-y-4 max-w-3xl mx-auto leading-normal">
                <li className="flex items-start sm:items-center gap-2">
                  <Recycle className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Traceability:</strong>
                    <span className="block sm:inline sm:ml-1">Every asset's lifecycle is visible, preventing greenwashing.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Coins className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Liquidity:</strong>
                    <span className="block sm:inline sm:ml-1">Tokenized assets are tradable 24/7 with global reach.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Shield className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Security:</strong>
                    <span className="block sm:inline sm:ml-1">Smart contracts ensure direct, tamper-proof ownership and compliance.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Users className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Accessibility:</strong>
                    <span className="block sm:inline sm:ml-1">Lower entry points via fractionalization expand participation in ESG investing.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Comparison */}
            <div className="max-w-6xl mx-auto relative rounded-2xl p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]">
              <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-orbitron font-bold mb-6">
                  <div className="flex flex-wrap justify-center gap-1 px-2">
                    {"Comparative Snapshot:".split(" ").map((word, wordIndex) => (
                      <span key={`compare-word-1-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`compare-letter-1-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 px-2 mt-2">
                    {"Metals vs. Other ESG Assets".split(" ").map((word, wordIndex) => (
                      <span key={`compare-word-2-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`compare-letter-2-${wordIndex}-${i}`} className="ultra-smooth-gradient-text">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </div>
                </h2>
                <div className="overflow-x-auto">
                  <ComparativeSnapshot />
                </div>
                <p className="text-sm sm:text-base font-futuristic text-left mt-4 leading-normal max-w-2xl mx-auto px-2">
                  This clear focus ensures <span className="text-[#00A86B] font-semibold">metals</span> lead our impact, with complementary assets scaling the platform's ESG reach.
                </p>
              </div>
            </div>
          </section>
        </FadeSection>

        {/* Final CTA Section */}
        <section className="relative container mx-auto px-6 py-20">
          <FadeSection>
            <div className="py-16">
              <div className="container mx-auto px-4 md:px-12 text-center">
                <h2 className="font-orbitron text-xl sm:text-3xl md:text-4xl font-bold mb-6">
                  <div className="flex flex-wrap justify-center gap-1">
                    {"Transform Your".split(" ").map((word, wordIndex) => (
                      <span key={`cta-word-1-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`cta-letter-1-${wordIndex}-${i}`} className="gradient-letter">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {"Investment Impact".split(" ").map((word, wordIndex) => (
                      <span key={`cta-word-2-${wordIndex}`} className="flex">
                        {word.split("").map((char, i) => (
                          <span key={`cta-letter-2-${wordIndex}-${i}`} className="gradient-letter">
                            {char}
                          </span>
                        ))}
                        <span className="w-1" />
                      </span>
                    ))}
                  </div>
                </h2>
                <p className="text-[#CCCCCC] mb-8 max-w-2xl mx-auto">
                  Join the sustainable revolution in asset tokenization. Make your investments count for the planet.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105">
                    Start Green Investing
                  </button>
                  <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </FadeSection>
        </section>
      </div>
      <style jsx global>{`
        .gradient-letter {
          @apply text-transparent bg-clip-text inline-block transition-all duration-300 bg-gradient-to-b from-[#00FFAA] via-[#00A86B] to-[#007d4f];
          animation: pulse-green 5s infinite;
        }
        
        @keyframes pulse-green {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default GreenTokenization;
