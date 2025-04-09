import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

const regions = [
  {
    name: "Middle East",
    tokenizedValue: "$2.3B",
    growth: "+67%",
    topAssets: ["Real Estate", "Energy", "Infrastructure"],
    position: [2.5, 0.9, 0.8], 
  },
  {
    name: "Europe",
    tokenizedValue: "$1.8B",
    growth: "+45%",
    topAssets: ["Real Estate", "Private Equity", "Art"],
    position: [0.8, 0.9, 0.5], 
  },
  {
    name: "Asia Pacific",
    tokenizedValue: "$3.1B",
    growth: "+82%",
    topAssets: ["Real Estate", "Infrastructure", "Commodities"],
    position: [-0.8, 0.9, 0.5],
  },
  {
    name: "Americas",
    tokenizedValue: "$4.2B",
    growth: "+58%",
    topAssets: ["Real Estate", "Private Equity", "Venture Capital"],
    position: [-2.5, 0.9, 0.8],
  },
];

// Connection lines data - represents connections between regions
const connectionLines = [
  
];

export default function GlobalMarkets() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  const globeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const labelRendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionLinesRef = useRef([]);
  const cardObjectsRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isViewedOnce, setIsViewedOnce] = useState(false);

  useEffect(() => {
    if (!globeContainerRef.current) return;
    
    const container = globeContainerRef.current;
    const width = container.clientWidth;
    const height = width * 0.5; // Keep aspect ratio 2:1

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // CSS 2D Renderer for labels/cards (only on large screens)
    if (isLargeScreen) {
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(width, height);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0';
      labelRenderer.domElement.style.left = '0'; // Ensure correct positioning
      labelRenderer.domElement.style.pointerEvents = 'none';
      labelRenderer.domElement.style.zIndex = '10'; // Make sure it's above the WebGL canvas
      container.appendChild(labelRenderer.domElement);
      labelRendererRef.current = labelRenderer;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add colorful point lights to enhance the hologram effect
    const blueLight = new THREE.PointLight(0x00aaff, 1.5, 10);
    blueLight.position.set(0, 2, 3);
    scene.add(blueLight);

    const tealLight = new THREE.PointLight(0x00ffaa, 1.5, 10);
    tealLight.position.set(-2, -1, 2);
    scene.add(tealLight);

    const purpleLight = new THREE.PointLight(0x9900ff, 0.8, 8);
    purpleLight.position.set(2, -2, 1);
    scene.add(purpleLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false; // Disable zooming for this display
    controls.autoRotate = true; // Auto-rotate for better visual effect
    controls.autoRotateSpeed = .01; // Slow rotation speed
    controlsRef.current = controls;

    // Create connection lines between regions
    const createConnectionLines = () => {
      // Only create connection lines if we have a model
      if (!modelRef.current) return;

      // Remove existing connection lines
      connectionLinesRef.current.forEach(line => {
        scene.remove(line);
        if (line.geometry) line.geometry.dispose();
        if (line.material) line.material.dispose();
      });
      connectionLinesRef.current = [];

      // Calculate globe radius from model bounding box
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z) / 2;

      // Create new connection lines
      connectionLines.forEach((connection, index) => {
        // Calculate start and end points on globe surface
        const startPosition = new THREE.Vector3(
          connection.from[0] * radius,
          connection.from[1] * radius,
          Math.sqrt(radius * radius - connection.from[0] * radius * connection.from[0] * radius - connection.from[1] * radius * connection.from[1] * radius)
        );
        
        const endPosition = new THREE.Vector3(
          connection.to[0] * radius,
          connection.to[1] * radius,
          Math.sqrt(radius * radius - connection.to[0] * radius * connection.to[0] * radius - connection.to[1] * radius * connection.to[1] * radius)
        );

        // Create curve for attractive arc
        const midPoint = new THREE.Vector3().addVectors(startPosition, endPosition).multiplyScalar(0.5);
        midPoint.normalize().multiplyScalar(radius * 1.4); // Bulge outward from globe center
        
        const curve = new THREE.QuadraticBezierCurve3(
          startPosition,
          midPoint,
          endPosition
        );

        // Create geometry for the curve
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Create pulsing, glowing material
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(0x00ffaa),
          transparent: true,
          opacity: 0.7,
          linewidth: 1
        });

        // Create the line and add to scene
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        connectionLinesRef.current.push(line);

        // Optional: Add small glowing spheres at connection points
        const sphereGeometry = new THREE.SphereGeometry(radius * 0.03, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffaa,
          transparent: true,
          opacity: 0.8
        });

        const startSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        startSphere.position.copy(startPosition);
        scene.add(startSphere);
        connectionLinesRef.current.push(startSphere);

        const endSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        endSphere.position.copy(endPosition);
        scene.add(endSphere);
        connectionLinesRef.current.push(endSphere);
      });
    };

// Create region cards in 3D (only on large screens)
const createRegionCards = () => {
  if (!isLargeScreen || !labelRendererRef.current) return;
  
  // Clear existing card objects
  cardObjectsRef.current.forEach(obj => {
    scene.remove(obj);
  });
  cardObjectsRef.current = [];
  
  // Create a card for each region
  regions.forEach((region, index) => {
    // Create HTML element for the card
    const cardElement = document.createElement('div');
    cardElement.className = 'region-card';
    cardElement.style.width = '250px'; // Increased from 200px
    cardElement.style.padding = '24px'; // Increased from 16px
    cardElement.style.backgroundColor = 'rgba(18, 19, 26, 0.8)';
    cardElement.style.borderRadius = '10px'; // Slightly increased from 8px
    cardElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    cardElement.style.backdropFilter = 'blur(10px)';
    cardElement.style.color = 'white';
    cardElement.style.fontSize = '16px'; // Increased from 14px
    cardElement.style.pointerEvents = 'auto';
    
    // Initialize with visible styles, but with transform translate offscreen
    cardElement.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
    cardElement.style.opacity = '0';
    cardElement.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    cardElement.style.transitionDelay = `${index * 0.1}s`;
    
    // Card content with bigger text
    cardElement.innerHTML = `
      <h3 style="margin: 0 0 16px 0; font-size: 22px; font-weight: bold;">${region.name}</h3>
      <div style="margin-bottom: 16px;">
        <small style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase;">Tokenized Value:</small>
        <div style="color: #00ffaa; font-size: 20px; font-weight: bold;">${region.tokenizedValue}</div>
      </div>
      <div style="margin-bottom: 16px;">
        <small style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase;">YoY Growth:</small>
        <div style="color: #00ffaa; font-size: 20px; font-weight: bold;">${region.growth}</div>
      </div>
      <div>
        <small style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; margin-bottom: 8px; display: block;">Top Asset Classes:</small>
        <div style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6;">
          ${region.topAssets.join('<br>')}
        </div>
      </div>
    `;
    
    // Create 2D object and position it
    const cardObject = new CSS2DObject(cardElement);
    cardObject.position.set(
      region.position[0],
      region.position[1],
      region.position[2],
    );
    scene.add(cardObject);
    cardObjectsRef.current.push(cardObject);
    
    // Store the DOM element for later animation
    cardObject.userData = { element: cardElement };
  });
  
  // Show cards after a short delay, regardless of scroll position
  setTimeout(() => {
    showCards();
  }, 1000);
};

    // Function to show cards (will be called automatically and on scroll)
    const showCards = () => {
      if (!isLargeScreen) return;
      
      console.log("Showing cards now...");
      
      cardObjectsRef.current.forEach((obj, index) => {
        if (obj.userData && obj.userData.element) {
          setTimeout(() => {
            obj.userData.element.style.transform = 'translateX(0)';
            obj.userData.element.style.opacity = '1';
          }, index * 150);
        }
      });
      
      setIsViewedOnce(true);
    };

    // Add animated particle effect around the globe
    const createParticleSystem = () => {
      const particleCount = 200;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Create a sphere of particles around the globe
        const radius = 3 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffaa,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      
      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleSystem);
      
      // Animation for particles
      const animateParticles = () => {
        const positions = particleGeometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          // Rotate particles around the y-axis
          const x = positions[i3];
          const z = positions[i3 + 2];
          const angle = 0.001; // Rotation speed
          
          positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
          positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
        }
        
        particleGeometry.attributes.position.needsUpdate = true;
      };
      
      return { particleSystem, animateParticles };
    };
    
    const { particleSystem, animateParticles } = createParticleSystem();

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/models/earth_globe_hologram_2mb_looping_animation.gltf',
      (gltf) => {
        // Scale the model properly
        gltf.scene.scale.set(2.5, 2.5, 2.5);
        scene.add(gltf.scene);
        modelRef.current = gltf.scene;

        // Handle animations if present
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          mixerRef.current = mixer;
        }

        // Now that model is loaded, create connection lines
        createConnectionLines();
        
        // Create the region cards
        createRegionCards();
        
        // Loading complete
        setIsLoading(false);
      },
      // Progress callback
      (xhr) => {
        const progress = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
        setLoadingProgress(progress);
      },
      // Error callback
      (error) => {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Update animations
      if (mixerRef.current) {
        const delta = clockRef.current.getDelta();
        mixerRef.current.update(delta);
      }

      // Slowly rotate the model for better visual effect
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.001;
      }

      // Animate particles
      animateParticles();

      // Pulse effect for connection lines
      if (connectionLinesRef.current.length > 0) {
        connectionLinesRef.current.forEach((object, index) => {
          if (object.material && object.material.opacity) {
            // Only affect line materials, not sphere materials
            if (object instanceof THREE.Line) {
              object.material.opacity = 0.4 + 0.4 * Math.sin(Date.now() * 0.001 + index * 0.5);
            } else if (object instanceof THREE.Mesh) {
              object.material.opacity = 0.5 + 0.3 * Math.sin(Date.now() * 0.002 + index * 0.5);
            }
          }
        });
      }

      // Render the scene
      renderer.render(scene, camera);
      
      // Render label renderer (for cards)
      if (labelRendererRef.current) {
        labelRendererRef.current.render(scene, camera);
      }
    };

    // Start animation loop
    animate();

    // Set up scroll listener for showing cards animation as a backup
    const handleScroll = () => {
      if (isViewedOnce || !globeContainerRef.current) return;
      
      const containerRect = globeContainerRef.current.getBoundingClientRect();
      // If element is in view
      if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
        showCards();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Run it once in case we start with element in view
    setTimeout(handleScroll, 500);

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = newWidth * 0.5; // Maintain aspect ratio
      
      if (cameraRef.current) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(newWidth, newHeight);
      }
      
      if (labelRendererRef.current) {
        labelRendererRef.current.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement) {
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (labelRendererRef.current && labelRendererRef.current.domElement) {
        if (container.contains(labelRendererRef.current.domElement)) {
          container.removeChild(labelRendererRef.current.domElement);
        }
      }
      
      // Dispose of Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (particleSystem) {
        if (particleSystem.geometry) particleSystem.geometry.dispose();
        if (particleSystem.material) particleSystem.material.dispose();
        scene.remove(particleSystem);
      }
      
      if (connectionLinesRef.current.length > 0) {
        connectionLinesRef.current.forEach(object => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
          scene.remove(object);
        });
      }
      
      if (rendererRef.current) rendererRef.current.dispose();
      if (controlsRef.current) controlsRef.current.dispose();
    };
  }, [isLargeScreen]);

  // Animation variants for regular cards
  const cardVariants = {
    offscreen: (index) => ({
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
    }),
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <Box className="py-24 relative overflow-hidden">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography
            variant="overline"
            className="text-primary font-medium tracking-wider block mb-2"
          >
            GLOBAL REACH
          </Typography>
          <Typography variant="h2" className="font-orbitron text-4xl md:text-5xl mb-4">
            Connecting <span className="text-primary">Global Markets</span>
          </Typography>
          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tokenize assets from anywhere in the world and access a global
            network of investors and liquidity providers.
          </Typography>
        </motion.div>

        <Box className="relative mb-16">
          {/* 3D Globe Visualization */}
          <Box
            ref={globeContainerRef}
            className="w-full aspect-[4/1] rounded-xl overflow-hidden hidden sm:block" //hidden the 3D model in small screens --> "hidden sm:block" //
            sx={{
              background: "rgba(18, 19, 26, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
            }}
          >
            {/* Loading overlay */}
            {isLoading && (
              <Box
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                sx={{
                  background: "rgba(18, 19, 26, 0.7)",
                }}
              >
                <Typography variant="h6" className="text-primary mb-2">
                  Loading Globe
                </Typography>
                <Box
                  className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden"
                >
                  <Box
                    className="h-full bg-primary"
                    sx={{
                      width: `${loadingProgress}%`,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  className="text-text-secondary mt-1"
                >
                  {loadingProgress}%
                </Typography>
              </Box>
            )}
            
            {/* Glow effect overlay for the globe */}
            <Box
              className="absolute inset-0 pointer-events-none z-0"
              sx={{
                background:
                  "radial-gradient(circle at center, rgba(0, 255, 133, 0.15) 0%, rgba(10, 11, 13, 0) 70%)",
                zIndex: 1,
              }}
            />
          </Box>
        </Box>

        {/* Only show cards in regular layout on small screens */}
        {!isLargeScreen && (
          <Grid container spacing={4}>
            {regions.map((region, index) => (
              <Grid item xs={12} sm={6} key={region.name}>
                <motion.div
                  custom={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="h-full"
                >
                  <Box
                    className="bg-background-paper rounded-lg p-6 h-full "
                    sx={{
                      background: "rgba(18, 19, 26, 0.5)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Typography variant="h6" className="mb-4">
                      {region.name}
                    </Typography>
                    <Box className="mb-4">
                      <Typography
                        variant="overline"
                        className="text-text-secondary block"
                      >
                        Tokenized Value:
                      </Typography>
                      <Typography variant="h5" className="text-primary">
                        {region.tokenizedValue}
                      </Typography>
                    </Box>
                    <Box className="mb-4">
                      <Typography
                        variant="overline"
                        className="text-text-secondary block"
                      >
                        YoY Growth:
                      </Typography>
                      <Typography variant="h5" className="text-primary">
                        {region.growth}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="overline"
                        className="text-text-secondary block mb-2"
                      >
                        Top Asset Classes:
                      </Typography>
                      {region.topAssets.map((asset, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          className="text-text-secondary"
                        >
                          {asset}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Background Glow Effect */}
        <Box
          className="absolute inset-0 pointer-events-none"
          sx={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 133, 0.1) 0%, rgba(10, 11, 13, 0) 50%)",
          }}
        />
      </Container>
    </Box>
  );
}