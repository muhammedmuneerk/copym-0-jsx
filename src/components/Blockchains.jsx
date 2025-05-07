import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import SectionImage from "./SectionImages";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters"; // Import the GradientLetters component

// Model component
function EarthGlobeModel() {
  const { scene } = useGLTF("/models/earth_globe_hologram_2mb_looping_animation.gltf");
  
  return <primitive object={scene} position={[0, 0, 0]} />;
}

const blockchains = [
  {
    name: "Solana",
    logo: <img src="/assets/blockchains-logos/solana-logo-white-removebg-preview.png" alt="Solana" className="w-full h-full object-contain" />,
  },
  {
    name: "Polygon",
    logo: <img src="/assets/blockchains-logos/Polygon-removebg-preview.png" alt="Polygon" className="w-full h-full object-contain" />,
  },
  {
    name: "Binance",
    logo: <img src="/assets/blockchains-logos/binance-removebg-preview.png" alt="Binance" className="w-full h-full object-contain" />,
  },
  {
    name: "Cardano",
    logo: <img src="/assets/blockchains-logos/Cardano-Logo.png" alt="Cardano" className="w-full h-full object-contain" />,
  },
  {
    name: "Optimism",
    logo: <img src="/assets/blockchains-logos/Optimism-removebg-preview.png" alt="Optimism" className="w-full h-full object-contain" />,
  },
];

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slot1Icon, setSlot1Icon] = useState(0);
  const [slot2Icon, setSlot2Icon] = useState(1);
  const [slot3Icon, setSlot3Icon] = useState(2);

  // Function to handle visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger reload animation by changing key
          setKey(prevKey => prevKey + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Target element to observe
    const section = document.getElementById('blockchains-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Handle icon rotation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSlot1Icon(prev => (prev + 1) % blockchains.length);
        
        // Add a slight delay for the second slot
        setTimeout(() => {
          setSlot2Icon(prev => (prev + 1) % blockchains.length);
        }, 700);
        
        // Add more delay for the third slot
        setTimeout(() => {
          setSlot3Icon(prev => (prev + 1) % blockchains.length);
        }, 1400);
        
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <Box
      id="blockchains-section"
      className="py-12 md:py-16 relative overflow-hidden"
    >
      {/* 3D Model Background Canvas - positioned absolutely to cover the entire section */}
      <Box sx={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 0, 
        opacity: 0.5, 
        width: "100%",
         height: "600px",
         marginTop:"350px"
      }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 10], fov: 8 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <EarthGlobeModel />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </Box>

      {/* Existing content - now positioned on top of the 3D background */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Text section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6 md:mb-0"
            >
              <Typography
                variant="h2"
                className=" text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                {/* First Line using GradientLetters component */}
                <Box component="div" className="flex flex-wrap justify-center">
                  <GradientLetters text="Unified Access to All" keyPrefix="line1" />
                </Box>

                {/* Second Line using GradientLetters component */}
                <Box
                  component="div"
                  className="flex flex-wrap justify-center mt-1"
                >
                  <GradientLetters text="Major Blockchains" keyPrefix="line2" />
                </Box>
              </Typography>

              <Typography
                variant="body1"
                className="text-text-secondary max-w-2xl text-center"
              >
                Tokenize assets on your preferred blockchain. Copym provides
                seamless integration with all major networks through a single,
                unified platform.
              </Typography>
            </motion.div>
          </Grid>

          {/* Banner image section - only visible on desktop */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "block" },
              opacity: "10",
              marginBottom: "-50px",
            }}
          >
            {" "}
            {/* didn't remove the image, jsut decreased the opacity */}
            <Box sx={{ position: "relative", width: "100%", height: "700px" }}>
              {/* Removed Canvas from here as it's now in the background */}
              {/* <SectionImage
                src="/assets/sections/hero-graphic.png"
                alt="Blockchains Banner"
              /> */}
            </Box>
          </Grid>
        </Grid>

        {/* Banner image - only visible on mobile, positioned at top */}
        {isMobile && (
          <Box sx={{ position: "relative", width: "100%", mb: 4 }}>
            {/* <SectionImage
              src="/assets/sections/blockchain-removebg-preview.png"
              alt="Blockchains Banner"
            /> */}
          </Box>
        )}

        {/* New 3-slot blockchain icons display */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            mt: 5,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {/* Slot 1 */}
          <Box
            sx={{
              width: isMobile ? "30%" : "25%",
              position: "relative",
              height: isMobile ? "120px" : "180px",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot1-${slot1Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={isMobile ? "w-20 h-20" : "w-40 h-40"}>
                  {blockchains[slot1Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          
          {/* Slot 2 */}
          <Box
            sx={{
              width: isMobile ? "30%" : "25%",
              position: "relative",
              height: isMobile ? "120px" : "180px",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot2-${slot2Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={isMobile ? "w-20 h-20" : "w-40 h-40"}>
                  {blockchains[slot2Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          
          {/* Slot 3 */}
          <Box
            sx={{
              width: isMobile ? "30%" : "25%",
              position: "relative",
              height: isMobile ? "120px" : "180px",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot3-${slot3Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={isMobile ? "w-20 h-20" : "w-40 h-40"}>
                  {blockchains[slot3Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>

      {/* Enhanced background gradient highlight with Glow Effect */}
     {/* <BackgroundGlowEffect/> */}

    </Box>
  );
}