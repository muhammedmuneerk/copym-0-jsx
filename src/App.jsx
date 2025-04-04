import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Blockchains from './components/Blockchains';
import Features from './components/Features';
import GlobalMarkets from './components/GlobalMarkets';
import Metrics from './components/Metrics';
import Footer from './components/Footer';
import Marketplace from './components/Marketplace';
import TokenizationHub from './components/TokenizationHub';
import GoldTokenization from './components/GoldTokenization';
import RealEstateTokenization from './components/RealEstateTokenization';
import ArtTokenization from './components/ArtTokenization';
import CommoditiesTokenization from './components/CommoditiesTokenization';
import CarbonCreditsTokenization from './components/CarbonCreditsTokenization';
import PrivateEquityTokenization from './components/PrivateEquityTokenization';
import DiverseAssetTokenization from './components/DiverseAssetTokenization';

function HomePage() {
  return (
    <>
      <Hero />
      <Blockchains/>
      <Features />
      <GlobalMarkets />
      <Metrics />
    </>
  );
}

function App() {
  return (
    <Box className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/tokenization" element={<TokenizationHub />} />
          <Route path="/tokenization/gold/" element={<GoldTokenization />} />
          <Route path="/tokenization/real-estate/" element={<RealEstateTokenization />} />
          <Route path="/tokenization/art" element={< ArtTokenization />} />
          <Route path="/tokenization/Commodities" element={< CommoditiesTokenization />} />
          <Route path="/tokenization/carbon-credits" element={< CarbonCreditsTokenization />} />
          <Route path="/tokenization/private-equity" element={< PrivateEquityTokenization />} />
          <Route path="/tokenization/other-assets" element={< DiverseAssetTokenization />} />
        </Routes>
      </main>
      <Footer />
    </Box>
  );
}

export default App; 