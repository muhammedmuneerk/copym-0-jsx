import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Blockchains from './components/Blockchains';
import Features from './components/Features';
import GlobalMarkets from './components/GlobalMarkets';
import Metrics from './components/Metrics';
import Footer from './components/Footer';

function App() {
  return (
    <Box className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Blockchains/>
        <Features />
        <GlobalMarkets />
        <Metrics />
      </main>
      <Footer />
    </Box>
  );
}

export default App; 