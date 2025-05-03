import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRightAlt,
  CheckCircleOutline,
  Security,
} from "@mui/icons-material";
import { Leaf, Globe2, Shield, Users } from "lucide-react";

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

const CarbonCreditsTokenization = () => {
  return (
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
      <div className="fixed inset-0 pointer-events-none bg-radial-gradient opacity-[0.225] z-[1]" 
        style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.375) 100%)" }}>
      </div>

      {/* Optional color tint */}
      <div className="fixed inset-0 bg-emerald-500/[0.0375] mix-blend-overlay"></div>

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
                    {"Carbon".split("").map((char, i) => (
                      <span key={`sm-line1-${i}`} className="gradient-letter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}{" "}
                    {"Credits".split("").map((char, i) => (
                      <span key={`sm-line1b-${i}`} className="gradient-letter">{char}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start">
                    {"Tokenization".split("").map((char, i) => (
                      <span key={`sm-line3-${i}`} className="gradient-letter">{char}</span>
                    ))}
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden lg:block space-y-1">
                  <div className="flex flex-wrap justify-start">
                    {"Carbon Credits".split("").map((char, i) => (
                      <span key={`lg-line1-${i}`} className="gradient-letter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-start">
                    {"Tokenization".split("").map((char, i) => (
                      <span key={`lg-line2-${i}`} className="gradient-letter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                <span className="text-[#00A86B] font-semibold">Revolutionize</span> environmental 
                investment through blockchain technology, making <span className="text-[#00A86B] font-medium">carbon offset</span> projects accessible
                to global investors for <span className="text-[#00A86B] font-semibold">positive climate impact</span>.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <button className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105">
                  Start Green Investment
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105">
                  Speak with Experts
                </button>
              </div>
            </div>

            {/* Leaf Icon - Right */}
            <div className="relative w-full md:w-1/2 flex items-start justify-center md:justify-start md:-mt-20">
              <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] md:ml-0 flex items-center justify-center">
                <Leaf className="w-48 h-48 text-[#00A86B]/50 animate-pulse" />
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Feature Cards Section */}
      <section className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-12 text-center">
                {["Revolutionize", "Environmental", "Investment"].map((word, wordIndex) => (
                  <span key={`word-${wordIndex}`} className="flex flex-wrap justify-center inline-flex mr-2">
                    {word.split("").map((char, i) => (
                      <span
                        key={`char-${i}`}
                        className="gradient-letter"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-[#001a12]/30 backdrop-blur-md border border-[#00A86B]/20 p-6 rounded-2xl transition-all hover:bg-[#001a12]/40">
                  <div className="text-[#00A86B] mb-4">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Environmental Impact</h3>
                  <p className="text-[#CCCCCC]">
                    Direct investment in carbon offset and sustainability projects
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#001a12]/30 backdrop-blur-md border border-[#00A86B]/20 p-6 rounded-2xl transition-all hover:bg-[#001a12]/40">
                  <div className="text-[#00A86B] mb-4">
                    <Globe2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Global Marketplace</h3>
                  <p className="text-[#CCCCCC]">
                Trade carbon credits across international markets
              </p>
            </div>

                {/* Card 3 */}
                <div className="bg-[#001a12]/30 backdrop-blur-md border border-[#00A86B]/20 p-6 rounded-2xl transition-all hover:bg-[#001a12]/40">
                  <div className="text-[#00A86B] mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Verified Compliance</h3>
                  <p className="text-[#CCCCCC]">
                    Blockchain-verified carbon credit authenticity and tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Tokenizable Carbon Credit Types */}
      <section className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto px-4 md:px-12 text-center">
              <h2 className="font-orbitron text-xl sm:text-3xl md:text-4xl font-bold mb-6">
                <div className="flex flex-wrap justify-center gap-1">
                  {"Tokenizable Carbon Credit Types".split(" ").map((word, wordIndex) => (
                    <span key={`types-word-${wordIndex}`} className="flex">
                      {word.split("").map((char, i) => (
                        <span
                          key={`types-letter-${wordIndex}-${i}`}
                          className="gradient-letter"
                        >
                          {char}
                        </span>
                      ))}
                      <span className="w-1" />
                    </span>
                  ))}
                </div>
              </h2>
              <p className="text-[#CCCCCC] mb-10 max-w-2xl mx-auto">
                Explore the diverse range of carbon credit assets available for tokenization
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Voluntary Carbon Offsets
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Compliance Carbon Credits
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Renewable Energy Certificates
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Forestry Conservation
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Clean Technology Projects
                </button>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Benefits Section */}
      <section className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="max-w-6xl mx-auto bg-[#001a12]/30 backdrop-blur-x4 border border-[#00A86B]/20 p-4 sm:p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
                <Users className="w-8 h-8 text-[#00A86B]" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-orbitron font-bold flex flex-wrap justify-center sm:justify-start gap-1">
                  {"Key Benefits of Carbon Credit Tokenization".split(" ").map((word, wordIndex) => (
                    <span key={`benefits-word-${wordIndex}`} className="flex">
                      {word.split("").map((char, i) => (
                        <span key={`benefits-letter-${wordIndex}-${i}`} className="gradient-letter">
                          {char}
                        </span>
                      ))}
                      <span className="w-1" />
                    </span>
                  ))}
          </h2>
              </div>
              <p className="text-[#CCCCCC] text-center mb-8 max-w-3xl mx-auto">
                Unlock the potential of sustainable investments through blockchain technology
              </p>
              <ul className="text-sm sm:text-base font-futuristic text-left space-y-4 max-w-3xl mx-auto leading-normal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Transparent and verifiable carbon credit tracking</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Real-time market pricing and liquidity</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Fractional ownership of environmental projects</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Automated compliance and reporting</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Democratized access to sustainability investments</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Direct positive impact on climate change</span>
            </div>
                </li>
              </ul>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto px-4 md:px-12 text-center">
              <h2 className="font-orbitron text-xl sm:text-3xl md:text-4xl font-bold mb-6">
                <div className="flex flex-wrap justify-center gap-1">
                  {"Ready to Make a".split(" ").map((word, wordIndex) => (
                    <span key={`cta-word-1-${wordIndex}`} className="flex">
                      {word.split("").map((char, i) => (
                        <span
                          key={`cta-letter-1-${wordIndex}-${i}`}
                          className="gradient-letter"
                        >
                          {char}
                        </span>
                      ))}
                      <span className="w-1" />
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {"Sustainable Impact?".split(" ").map((word, wordIndex) => (
                    <span key={`cta-word-2-${wordIndex}`} className="flex">
                      {word.split("").map((char, i) => (
                        <span
                          key={`cta-letter-2-${wordIndex}-${i}`}
                          className="gradient-letter"
                        >
                          {char}
                        </span>
                      ))}
                      <span className="w-1" />
                    </span>
                  ))}
                </div>
          </h2>
              <p className="text-[#CCCCCC] mb-8 max-w-2xl mx-auto">
                Join the future of environmental investment by tokenizing carbon credits 
                and supporting global sustainability efforts.
              </p>
          <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#00A86B]/10 backdrop-blur-lg text-[#00A86B] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105 flex items-center">
                  <span>Start Your Green Investment Journey</span>
                  <ArrowRightAlt className="ml-2 text-[#00A86B]" />
            </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105">
              Speak with Experts
            </button>
          </div>
        </div>
      </div>
        </FadeSection>
      </section>
      
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
    </div>
  );
};

export default CarbonCreditsTokenization;
