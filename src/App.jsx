import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Blockchains from "./components/Blockchains";
import GlobalMarkets from "./components/GlobalMarkets";
import Metrics from "./components/Metrics";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import Marketplace from "./pages/Marketplace/Marketplace";
import TokenizationHub from "./pages/TokenizationHub/TokenizationHub";
import GoldTokenization from "./pages/GoldTokenization/GoldTokenization";
import RealEstateTokenization from "./pages/RealEstateTokenization/RealEstateTokenization";
import ArtTokenization from "./pages/ArtTokenization/ArtTokenization";
import CommoditiesTokenization from "./pages/CommoditiesTokenization/CommoditiesTokenization";
import CarbonCreditsTokenization from "./pages/CarbonCreditsTokenization/CarbonCreditsTokenization";
import PrivateEquityTokenization from "./pages/PrivateEquityTokenization/PrivateEquityTokenization";
import DiverseAssetTokenization from "./pages/DiverseAssetTokenization/DiverseAssetTokenization";
import GreenTokenization from "./pages/GreenTokenization/GreenTokenization";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import SpinningBlockchain from "./components/SpinningBlockchain";
import GreenTokenizationPopup from "./components/GreenTokenizationPopup";

function HomePage() {
  return (
    <>
      <Hero />
      <GreenTokenizationPopup />
      <div style={{ position: 'relative' }}>
        <SpinningBlockchain />
        <Blockchains />
        <Features />
        <GlobalMarkets />
        <Metrics />
        <CTA />
      </div>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Box className="min-h-screen bg-background text-text-primary">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/tokenization" element={<TokenizationHub />} />
          <Route path="/green-tokenization" element={<GreenTokenization />} />
          <Route path="/tokenization/gold/" element={<GoldTokenization />} />
          <Route path="/tokenization/real-estate/" element={<RealEstateTokenization />} />
          <Route path="/tokenization/art" element={<ArtTokenization />} />
          <Route path="/tokenization/Commodities" element={<CommoditiesTokenization />} />
          <Route path="/tokenization/carbon-credits" element={<CarbonCreditsTokenization />} />
          <Route path="/tokenization/private-equity" element={<PrivateEquityTokenization />} />
          <Route path="/tokenization/other-assets" element={<DiverseAssetTokenization />} />
        </Routes>
      </main>
      <Footer />
    </Box>
  );
}

export default App;
