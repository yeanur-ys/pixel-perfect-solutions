
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create a soft, glowing material
    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      color: 0x3b82f6, // Primary color (blue)
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 500;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.5;
      mouseY = (event.clientY - windowHalfY) * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth camera movement
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      
      // Smooth camera rotation
      camera.rotation.x += (targetY - camera.rotation.x) * 0.05;
      camera.rotation.y += (targetX - camera.rotation.y) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="hero-gradient" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
          >
            Digital Excellence
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            Transform Your <span className="text-primary">Digital Presence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            We craft cutting-edge solutions to elevate your business in the digital world, 
            from stunning websites to AI innovations and captivating graphics.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#web-development" className="button-primary">
              Explore Services
            </a>
            <a href="#contact" className="button-secondary">
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-foreground/60 mb-2">Scroll to explore</span>
        <div className="w-[30px] h-[50px] rounded-full border-2 border-foreground/20 flex justify-center p-2">
          <motion.div 
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
