
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SectionAnimationProps {
  id: string;
  color?: string;
  particleCount?: number;
}

const SectionAnimation = ({ id, color = '#1e40af', particleCount = 100 }: SectionAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesPositions = new Float32Array(particleCount * 3);
    const particlesVelocities = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions within a sphere
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      
      particlesPositions[i * 3] = x;
      particlesPositions[i * 3 + 1] = y;
      particlesPositions[i * 3 + 2] = z;
      
      // Random velocities
      particlesVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
      });
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add torus as a central element
    const torusGeometry = new THREE.TorusGeometry(5, 1, 16, 50);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate torus
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.01;
      
      // Update particles positions
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particlesVelocities[i].x;
        positions[i * 3 + 1] += particlesVelocities[i].y;
        positions[i * 3 + 2] += particlesVelocities[i].z;
        
        // Bounce at boundaries
        if (Math.abs(positions[i * 3]) > 15) particlesVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 15) particlesVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 15) particlesVelocities[i].z *= -1;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(particles);
      scene.remove(torus);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      renderer.dispose();
    };
  }, [color, particleCount]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-50 pointer-events-none" 
      aria-hidden="true"
      id={`section-animation-${id}`}
    ></div>
  );
};

export default SectionAnimation;
