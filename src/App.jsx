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
        </Routes>
      </main>
      <Footer />
    </Box>
  );
}

export default App; 