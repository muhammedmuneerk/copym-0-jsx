import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  
  useEffect(() => {
    // Check device type on mount and window resize
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  useEffect(() => {
    // Initialize 3D scene
    if (!mountRef.current || !mountRef.current.parentElement) return;
    
    // Clear any existing canvas first
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene, camera, and renderer setup with better performance settings
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Add fog for depth effect
    scene.fog = new THREE.FogExp2(0x050b1f, 0.02);
    
    // Use perspective camera with dynamic settings
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 65 : 75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    
    // Configure renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: "high-performance"
    });
    
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050b1f, 0.9);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Limit pixel ratio
    
    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add directional light for shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0x3a86ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for dynamic glow effects
    const pointLight1 = new THREE.PointLight(0x3a86ff, 1, 50);
    pointLight1.position.set(0, 10, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x4cc9f0, 1, 50);
    pointLight2.position.set(-15, -10, -10);
    scene.add(pointLight2);
    
    // Append renderer to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Calculate node count based on device
    const getNodeCount = () => {
      if (isMobile) return 20;
      if (isTablet) return 35;
      return 60;
    };
    
    const nodeCount = getNodeCount();
    const blockCount = Math.floor(nodeCount / 4);
    
    // Array to hold all scene objects
    const nodes = [];
    const nodeConnections = [];
    const blocks = [];
    
    // Create advanced material for nodes with pulsing effect
    const createNodeMaterial = (color = 0x3a86ff, intensity = 1) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          baseColor: { value: new THREE.Color(color) },
          intensity: { value: intensity }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 baseColor;
          uniform float intensity;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          vec3 pulse(vec3 color, float rate) {
            float pulseVal = (sin(time * rate) * 0.15 + 0.85) * intensity;
            return color * pulseVal;
          }
          
          void main() {
            float distFromCenter = length(vUv - vec2(0.5));
            float glow = 0.3 / (distFromCenter * 2.0);
            vec3 finalColor = pulse(baseColor, 2.0);
            
            // Add subtle rainbow effect on edges
            if (distFromCenter > 0.4) {
              float rainbowFactor = sin(time + vPosition.x * 0.5) * 0.1;
              finalColor.r += rainbowFactor;
              finalColor.g += sin(time * 1.2 + vPosition.y * 0.5) * 0.1;
              finalColor.b += sin(time * 0.8 + vPosition.z * 0.5) * 0.1;
            }
            
            gl_FragColor = vec4(finalColor, glow * intensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
    };
    
    // Create material for connections with animated flow effect
    const createLineMaterial = (color = 0x3a86ff, opacity = 0.4) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(color) },
          opacity: { value: opacity }
        },
        vertexShader: `
          uniform float time;
          attribute float linePosition;
          varying float vLinePosition;
          
          void main() {
            vLinePosition = linePosition;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform float opacity;
          varying float vLinePosition;
          
          void main() {
            float flow = fract(vLinePosition - time * 0.2);
            float intensity = smoothstep(0.0, 0.1, flow) * smoothstep(0.35, 0.25, flow);
            vec3 finalColor = color * (0.5 + intensity * 0.5);
            gl_FragColor = vec4(finalColor, opacity * (0.6 + intensity * 0.4));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
    };
    
    // Create blockchain cube material
    const createBlockMaterial = () => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x3a86ff) },
          secondaryColor: { value: new THREE.Color(0x4cc9f0) }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            vPosition = position;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform vec3 secondaryColor;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Grid pattern
            float gridX = step(0.98, mod(vUv.x * 10.0, 1.0));
            float gridY = step(0.98, mod(vUv.y * 10.0, 1.0));
            float grid = max(gridX, gridY) * 0.4;
            
            // Edge glow
            float edgeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
            float edgeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
            float edge = edgeX * edgeY;
            
            // Pulse and color blend
            float pulse = sin(time * 1.5) * 0.15 + 0.85;
            vec3 baseColor = mix(color, secondaryColor, sin(time * 0.5) * 0.5 + 0.5);
            vec3 finalColor = mix(baseColor * pulse, vec3(1.0), grid);
            
            float alpha = edge * (0.3 + grid * 0.7);
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        wireframe: false,
        side: THREE.DoubleSide
      });
    };
    
    // Create node distribution patterns
    const nodePatterns = {
      sphere: () => {
        const phi = Math.random() * Math.PI * 2;
        const costheta = Math.random() * 2 - 1;
        const theta = Math.acos(costheta);
        const radius = 15 + Math.random() * 10;
        
        return new THREE.Vector3(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta)
        );
      },
      cube: () => {
        const spread = 18;
        return new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        );
      },
      plane: () => {
        const spread = 25;
        return new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.5,
          (Math.random() - 0.5) * spread
        );
      }
    };
    
    // Choose pattern based on device for optimal visual effect
    const distributionPattern = isMobile ? nodePatterns.plane : nodePatterns.sphere;
    
    // Generate nodes 
    for (let i = 0; i < nodeCount; i++) {
      // Use different sizes for visual variety
      const size = 0.15 + Math.random() * 0.2;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      
      // Create node with one of three colors for variety
      const colorChoice = Math.random();
      let nodeMaterial;
      
      if (colorChoice < 0.6) {
        nodeMaterial = createNodeMaterial(0x3a86ff, 1.0);
      } else if (colorChoice < 0.9) {
        nodeMaterial = createNodeMaterial(0x4cc9f0, 0.8);
      } else {
        nodeMaterial = createNodeMaterial(0xf72585, 0.7);
      }
      
      const node = new THREE.Mesh(geometry, nodeMaterial);
      
      // Position based on selected pattern
      const position = distributionPattern();
      node.position.copy(position);
      
      // Add dynamics to each node
      node.userData = {
        initialPosition: position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        amplitude: 0.5 + Math.random() * 0.5,
        connectionCount: 0,
        size
      };
      
      scene.add(node);
      nodes.push(node);
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      const maxConnections = isMobile ? 2 : 3;
      
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        const maxDistance = isMobile ? 8 : 12;
        
        if (distance < maxDistance && 
            nodes[i].userData.connectionCount < maxConnections && 
            nodes[j].userData.connectionCount < maxConnections) {
          
          // Create a curved path for more organic look
          const midPoint = new THREE.Vector3().addVectors(nodes[i].position, nodes[j].position).multiplyScalar(0.5);
          
          // Add slight random deviation to midpoint
          midPoint.x += (Math.random() - 0.5) * 2;
          midPoint.y += (Math.random() - 0.5) * 2;
          midPoint.z += (Math.random() - 0.5) * 2;
          
          // Create curve
          const curve = new THREE.QuadraticBezierCurve3(
            nodes[i].position,
            midPoint,
            nodes[j].position
          );
          
          // Generate points along curve
          const points = curve.getPoints(20);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          // Add line position attribute for animation
          const linePositions = new Float32Array(points.length);
          for (let k = 0; k < points.length; k++) {
            linePositions[k] = k / (points.length - 1);
          }
          geometry.setAttribute('linePosition', new THREE.BufferAttribute(linePositions, 1));
          
          // Colorize lines based on node colors
          const nodeAColor = nodes[i].material.uniforms.baseColor.value;
          const nodeBColor = nodes[j].material.uniforms.baseColor.value;
          const lineColor = new THREE.Color()
            .addColors(nodeAColor, nodeBColor)
            .multiplyScalar(0.5);
          
          const lineMaterial = createLineMaterial(lineColor, 0.4);
          const line = new THREE.Line(geometry, lineMaterial);
          
          scene.add(line);
          nodeConnections.push({
            line,
            curve,
            nodeA: nodes[i],
            nodeB: nodes[j],
            midPoint
          });
          
          nodes[i].userData.connectionCount++;
          nodes[j].userData.connectionCount++;
        }
      }
    }
    
    // Create blockchain cubes
    if (!isMobile) {
      for (let i = 0; i < blockCount; i++) {
        const size = 1.5 + Math.random() * 1.0;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = createBlockMaterial();
        
        const block = new THREE.Mesh(geometry, material);
        
        // Position blocks
        const position = nodePatterns.cube();
        position.multiplyScalar(1.5); // Spread blocks out more
        block.position.copy(position);
        
        // Rotate blocks randomly
        block.rotation.x = Math.random() * Math.PI * 2;
        block.rotation.y = Math.random() * Math.PI * 2;
        block.rotation.z = Math.random() * Math.PI * 2;
        
        block.userData = {
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          ),
          initialPosition: position.clone(),
          size
        };
        
        scene.add(block);
        blocks.push(block);
      }
    }
    
    // Add particle system for background atmosphere
    const particleCount = isMobile ? 200 : 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread particles in a large sphere
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3+2] = radius * Math.cos(phi);
      
      particleSizes[i] = 0.05 + Math.random() * 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x4cc9f0) }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        uniform float time;
        
        void main() {
          vSize = size;
          // Slight movement
          vec3 pos = position;
          pos.x += sin(time * 0.2 + position.z * 0.05) * 0.2;
          pos.y += cos(time * 0.15 + position.x * 0.05) * 0.2;
          pos.z += sin(time * 0.1 + position.y * 0.05) * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / length(mvPosition.xyz));
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying float vSize;
        
        void main() {
          // Calculate distance from center of point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Discard pixels outside of circle
          if (dist > 0.5) discard;
          
          // Glow effect with pulse
          float pulse = sin(time + vSize * 10.0) * 0.15 + 0.85;
          float alpha = smoothstep(0.5, 0.0, dist) * 0.5 * pulse;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = isMobile ? 30 : 25;
    
    // Animation loop with performance optimization
    const clock = new THREE.Clock();
    let lastTime = 0;
    const animationSpeed = isMobile ? 0.8 : 1.0; // Slow down animations on mobile
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Throttle animations on mobile
      const currentTime = clock.getElapsedTime();
      const deltaTime = currentTime - lastTime;
      
      // Only update on appropriate intervals (mobile gets fewer updates)
      if (isMobile && deltaTime < 0.03) return;
      lastTime = currentTime;
      
      const time = currentTime * animationSpeed;
      
      // Update particle system
      particleSystem.material.uniforms.time.value = time;
      
      // Update node positions and materials with complex motion
      nodes.forEach(node => {
        const userData = node.userData;
        
        // Complex orbital motion
        node.position.x = userData.initialPosition.x + 
                          Math.sin(time * userData.speed + userData.phase) * userData.amplitude;
        node.position.y = userData.initialPosition.y + 
                          Math.cos(time * userData.speed + userData.phase) * userData.amplitude;
        node.position.z = userData.initialPosition.z + 
                          Math.sin(time * userData.speed * 0.5 + userData.phase) * userData.amplitude * 0.5;
        
        // Update shader uniforms
        node.material.uniforms.time.value = time;
      });
      
      // Update connection curves
      nodeConnections.forEach(connection => {
        // Update midpoint for dynamic connections
        connection.midPoint.x += Math.sin(time * 0.3) * 0.01;
        connection.midPoint.y += Math.cos(time * 0.4) * 0.01;
        
        // Update curve
        connection.curve = new THREE.QuadraticBezierCurve3(
          connection.nodeA.position,
          connection.midPoint,
          connection.nodeB.position
        );
        
        // Update line geometry
        const points = connection.curve.getPoints(20);
        connection.line.geometry.setFromPoints(points);
        
        // Update shader uniforms
        connection.line.material.uniforms.time.value = time;
      });
      
      // Update blockchain blocks
      blocks.forEach(block => {
        // Rotate blocks
        block.rotation.x += block.userData.rotationSpeed.x;
        block.rotation.y += block.userData.rotationSpeed.y;
        block.rotation.z += block.userData.rotationSpeed.z;
        
        // Add slight positional movement
        block.position.x = block.userData.initialPosition.x + Math.sin(time * 0.2) * 0.3;
        block.position.y = block.userData.initialPosition.y + Math.cos(time * 0.3) * 0.3;
        
        // Update shader uniforms
        block.material.uniforms.time.value = time;
      });
      
      // Update point lights for dynamic lighting
      pointLight1.position.x = Math.sin(time * 0.2) * 15;
      pointLight1.position.z = Math.cos(time * 0.2) * 15;
      
      pointLight2.position.x = Math.sin(time * 0.1 + Math.PI) * 15;
      pointLight2.position.z = Math.cos(time * 0.1 + Math.PI) * 15;
      
      // Orbit camera slightly
      if (!isMobile) {
        camera.position.x = Math.sin(time * 0.05) * 5;
        camera.position.y = Math.sin(time * 0.04) * 3;
        camera.lookAt(0, 0, 0);
      }
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        
        // Adjust camera for different screen sizes
        if (width < 768) {
          camera.position.z = 30;
        } else {
          camera.position.z = 25;
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add interaction on mouse move for desktop
    const handleMouseMove = (event) => {
      if (isMobile) return;
      
      // Convert mouse coordinates to normalized device coordinates
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle tilting of the scene based on mouse position
      scene.rotation.y = mouseX * 0.1;
      scene.rotation.x = mouseY * 0.1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add device orientation for mobile tilt effect
    const handleDeviceOrientation = (event) => {
      if (!isMobile || !event.beta || !event.gamma) return;
      
      // Get device orientation angles
      const betaConstrained = Math.max(-20, Math.min(20, event.beta - 40)) / 20;
      const gammaConstrained = Math.max(-20, Math.min(20, event.gamma)) / 20;
      
      // Apply subtle tilt to scene
      scene.rotation.x = betaConstrained * 0.1;
      scene.rotation.y = gammaConstrained * 0.1;
    };
    
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      
      // Check if the component is still mounted before cleaning up
      if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (error) {
          console.log("Error removing renderer: ", error);
        }
      }
      
      // Dispose all resources
      if (nodes) {
        nodes.forEach(node => {
          if (node.geometry) node.geometry.dispose();
          if (node.material) node.material.dispose();
        });
      }
      
      if (nodeConnections) {
        nodeConnections.forEach(connection => {
          if (connection.line && connection.line.geometry) connection.line.geometry.dispose();
          if (connection.line && connection.line.material) connection.line.material.dispose();
        });
      }
      
      if (blocks) {
        blocks.forEach(block => {
          if (block.geometry) block.geometry.dispose();
          if (block.material) block.material.dispose();
        });
      }
      
      if (particlesGeometry) particlesGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
    };
  }, [isMobile, isTablet]); // Removed isRendered from dependencies

  return (
    <Box className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050b1f] to-[#0a1938]">
      {/* Three.js container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050b1f]/70 z-10"></div>
      
      <Container maxWidth="xl" className="relative z-20">
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              className=" font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              The Complete Ecosystem for{" "}
              <Box component="span" className="block">
                <Box component="span" className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#3a86ff] to-[#4cc9f0]">
                  Real World Asset
                </Box>{" "}
                Tokenization
              </Box>
            </Typography>

            <Typography
              variant="body1"
              className="text-text-secondary mb-12 max-w-3xl mx-auto text-lg text-white/80"
            >
              One unified platform for tokenizing, managing, and trading any
              real-world asset class. Access all the tools, networks, and
              liquidity you need in a single ecosystem.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="contained"
                size="large"
                className="text-background font-semibold px-8 py-3 bg-gradient-to-r from-[#3a86ff] to-[#4cc9f0] hover:shadow-[0_0_15px_rgba(76,201,240,0.5)]"
              >
                Explore Asset Tokenization
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="font-semibold px-8 py-3 border-white text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                Start Tokenizing Now
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Typography
            variant="button"
            className="text-white flex flex-col items-center cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            Discover More
            <KeyboardArrowDown className="mt-2" />
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}