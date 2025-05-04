import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { animate, onScroll } from 'animejs';
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
import GoldTokenizationPopup from "./components/GoldTokenizatinPopup";
import BorderImages from "./components/BorderImages";

// ScrollObserver wrapper component to handle animations on scroll
const ScrollAnimationWrapper = ({ children }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get all section elements inside the container
    const sections = containerRef.current.querySelectorAll('section');
    
    // Store animation instances for proper management
    const animations = [];
    
    sections.forEach((section, index) => {
      // Elements to animate within each section
      const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const paragraphs = section.querySelectorAll('p');
      const buttons = section.querySelectorAll('button');
      const images = section.querySelectorAll('img');
      const cards = section.querySelectorAll('.card, .MuiCard-root');
      
      // Common ScrollObserver configuration to ensure repeating animations
      const scrollOptions = {
        target: section,
        enter: 'bottom-=100 top+=150',
        leave: 'top bottom',  // Leave when section top passes viewport bottom
        sync: true,           // Sync with scroll position
        repeat: true,         // Animation repeats on every scroll pass
        debug: false
      };
      
      // Animate headings from bottom with fade
      if (headings.length) {
        const headingAnimation = animate(headings, {
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: (el, i) => 100 + (i * 100),
          easing: 'easeOutQuad',
          autoplay: false // Will be controlled by ScrollObserver
        });
        
        animations.push(headingAnimation);
        
        // Create scroll observer for this animation
        onScroll({
          ...scrollOptions,
          onEnter: () => {
            headingAnimation.restart();
            headingAnimation.play();
          },
          onLeave: () => {
            headingAnimation.pause();
            headingAnimation.seek(0);
          }
        });
      }
      
      // Animate paragraphs with fade in
      if (paragraphs.length) {
        const paragraphAnimation = animate(paragraphs, {
          opacity: [0, 1],
          duration: 1000,
          delay: (el, i) => 300 + (i * 100),
          easing: 'easeInOutQuad',
          autoplay: false
        });
        
        animations.push(paragraphAnimation);
        
        onScroll({
          ...scrollOptions,
          onEnter: () => {
            paragraphAnimation.restart();
            paragraphAnimation.play();
          },
          onLeave: () => {
            paragraphAnimation.pause();
            paragraphAnimation.seek(0);
          }
        });
      }
      
      // Animate buttons with bounce effect
      if (buttons.length) {
        const buttonAnimation = animate(buttons, {
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 800,
          delay: (el, i) => 500 + (i * 100),
          easing: 'spring(1, 80, 10, 0)',
          autoplay: false
        });
        
        animations.push(buttonAnimation);
        
        onScroll({
          ...scrollOptions,
          onEnter: () => {
            buttonAnimation.restart();
            buttonAnimation.play();
          },
          onLeave: () => {
            buttonAnimation.pause();
            buttonAnimation.seek(0);
          }
        });
      }
      
      // Animate images with slide in from right or left
      if (images.length) {
        const imageAnimation = animate(images, {
          translateX: [(index % 2 === 0) ? ['5vw', 0] : ['-5vw', 0]], // Using relative units instead of fixed pixels
          opacity: [0, 1],
          duration: 1500,
          delay: (el, i) => 200 + (i * 150),
          easing: 'easeOutExpo',
          autoplay: false
        });
        
        animations.push(imageAnimation);
        
        onScroll({
          ...scrollOptions,
          onEnter: () => {
            imageAnimation.restart();
            imageAnimation.play();
          },
          onLeave: () => {
            imageAnimation.pause();
            imageAnimation.seek(0);
          }
        });
      }
      
      // Animate cards with staggered appearance
      if (cards.length) {
        const cardAnimation = animate(cards, {
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 1200,
          delay: (el, i) => 150 * i,
          easing: 'easeOutElastic(1, .6)',
          autoplay: false
        });
        
        animations.push(cardAnimation);
        
        onScroll({
          ...scrollOptions,
          onEnter: () => {
            cardAnimation.restart();
            cardAnimation.play();
          },
          onLeave: () => {
            cardAnimation.pause();
            cardAnimation.seek(0);
          }
        });
      }
      
      // Special animation for alternating sections (even/odd) using viewport width units
      const sectionAnimation = {
        even: {
          translateX: ['-3vw', 0], // Changed from fixed pixels to relative units
          opacity: [0, 1]
        },
        odd: {
          translateX: ['3vw', 0], // Changed from fixed pixels to relative units
          opacity: [0, 1]
        }
      };
      
      // Apply to the section itself for a subtle shift
      const sectionAnimationInstance = animate(section, {
        ...(index % 2 === 0 ? sectionAnimation.even : sectionAnimation.odd),
        duration: 1000,
        easing: 'easeOutQuint',
        autoplay: false
      });
      
      animations.push(sectionAnimationInstance);
      
      onScroll({
        ...scrollOptions,
        onEnter: () => {
          sectionAnimationInstance.restart();
          sectionAnimationInstance.play();
        },
        onLeave: () => {
          sectionAnimationInstance.pause();
          sectionAnimationInstance.seek(0);
        }
      });
    });
    
    // Animate parallax background effects
    const backgroundElements = document.querySelectorAll('.bg-element, .bg-pattern, .bg-decoration');
    if (backgroundElements.length) {
      const parallaxAnimation = animate(backgroundElements, {
        translateY: (el, i) => [(i + 1) * 50, 0],
        opacity: [0.5, 1],
        duration: 2000,
        easing: 'easeOutSine',
        autoplay: false
      });
      
      animations.push(parallaxAnimation);
      
      onScroll({
        container: document,
        axis: 'y',
        enter: 'center bottom',
        leave: 'top bottom',
        repeat: true,
        sync: true,
        debug: false,
        onEnter: () => {
          parallaxAnimation.restart();
          parallaxAnimation.play();
        },
        onLeave: () => {
          parallaxAnimation.pause();
          parallaxAnimation.seek(0);
        }
      });
    }
    
    // Cleanup function to stop all animations when component unmounts
    return () => {
      animations.forEach(anim => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause();
        }
      });
    };
  }, []);
  
  return (
    <div ref={containerRef} className="scroll-container overflow-x-hidden">
      {children}
    </div>
  );
};

// Add section wrappers to each component for better animation targeting
function HomePage() {
  return (
    <ScrollAnimationWrapper>
      <section className="hero-section">
        <Hero />
      </section>
      
      <GreenTokenizationPopup />
      <GoldTokenizationPopup/>
      
      <div style={{ position: 'relative' }}>
        <section className="blockchains-section">
          <Blockchains />
        </section>
        
        <section className="features-section">
          <Features />
        </section>
        
        <section className="global-markets-section">
          <GlobalMarkets />
        </section>
        
        <section className="metrics-section">
          <Metrics />
        </section>
        
        <section className="cta-section">
          <CTA />
        </section>
        
        {/* <BorderImages
          src="/assets/sections/grid-bg-bottom.png"
          alt="Blockchains Banner"
        /> */}
      </div>
    </ScrollAnimationWrapper>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      // Initial page load animation after splash screen
      if (appRef.current) {
        animate('.bg-background', {
          opacity: [0, 1],
          duration: 800,
          easing: 'easeInOutQuad'
        });
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  // Additional animation for navbar
  useEffect(() => {
    if (!showSplash) {
      animate('nav', {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Box ref={appRef} className="min-h-screen bg-custom-gradient text-text-primary overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="overflow-x-hidden">
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