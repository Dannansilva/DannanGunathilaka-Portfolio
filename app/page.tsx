'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SoftwareProjects from '@/components/projects/SoftwareProjects';
import ContentProjects from '@/components/projects/ContentProjects';
import BootLoader from '@/components/effects/BootLoader';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'software' | 'content'>('software');
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  // Particle Network Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Create particles
    const particleCount = 80;
    const particles: Particle[] = [];
    const maxDistance = 150;
    const mouseRadius = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - repel particles
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <BootLoader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white"
      >
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

          {/* Particle Network Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.6 }}
          />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold group">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:from-cyan-300 group-hover:to-blue-500 transition-all">
                  &lt;DG/&gt;
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
                <Link
                  href="#projects"
                  className={`transition-colors relative group ${
                    activeSection === 'projects' ? 'text-cyan-400' : 'hover:text-cyan-400'
                  }`}
                >
                  Projects
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                    activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                <Link
                  href="#about"
                  className={`transition-colors relative group ${
                    activeSection === 'about' ? 'text-cyan-400' : 'hover:text-cyan-400'
                  }`}
                >
                  About
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                    activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                <Link
                  href="#contact"
                  className={`transition-colors relative group ${
                    activeSection === 'contact' ? 'text-cyan-400' : 'hover:text-cyan-400'
                  }`}
                >
                  Contact
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                    activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-4 space-y-4">
                    <Link
                      href="#projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 px-4 rounded-lg transition-colors ${
                        activeSection === 'projects'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'hover:bg-white/5 hover:text-cyan-400'
                      }`}
                    >
                      Projects
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 px-4 rounded-lg transition-colors ${
                        activeSection === 'about'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'hover:bg-white/5 hover:text-cyan-400'
                      }`}
                    >
                      About
                    </Link>
                    <Link
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 px-4 rounded-lg transition-colors ${
                        activeSection === 'contact'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'hover:bg-white/5 hover:text-cyan-400'
                      }`}
                    >
                      Contact
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm"
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              ></motion.span>
              <span>Available for new opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
            >
              <div className="mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Dannan Gunathilake
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-normal"
              >
                Developer
              </motion.div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl text-zinc-400 mb-6 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              <span className="text-cyan-400 font-semibold">BSc (Hons) Software Engineering</span> graduate from{' '}
              <span className="text-blue-400 font-semibold">Plymouth University</span>
              <br />
              <span className="text-sm sm:text-base">Crafting innovative digital solutions through code</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
            >
              <Link
                href="#projects"
                className="group w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                href="#contact"
                className="group w-full sm:w-auto px-8 py-3 sm:py-4 border border-cyan-500/30 rounded-full font-medium hover:bg-cyan-500/10 hover:border-cyan-500 transition-all text-sm sm:text-base relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
              </Link>
            </motion.div>

          </div>
        </section>

        {/* Category Toggle Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative bg-white/5"
        >
          <div className="max-w-7xl mx-auto">
            {/* Mobile Toggle Switch */}
            <div className="flex sm:hidden items-center justify-center">
              <div className="relative bg-white/10 p-1 rounded-full inline-flex items-center border border-white/10">
                <button
                  onClick={() => setActiveTab('software')}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm relative z-10 ${
                    activeTab === 'software'
                      ? 'text-white'
                      : 'text-zinc-400'
                  }`}
                >
                  Software Engineering
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm relative z-10 ${
                    activeTab === 'content'
                      ? 'text-white'
                      : 'text-zinc-400'
                  }`}
                >
                  Content Creation
                </button>
                {/* Sliding background */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30"
                  initial={false}
                  animate={{
                    left: activeTab === 'software' ? '4px' : '50%',
                    right: activeTab === 'software' ? '50%' : '4px',
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('software')}
                className={`px-8 sm:px-12 py-4 rounded-full font-medium transition-all text-base sm:text-lg w-auto relative overflow-hidden group ${
                  activeTab === 'software'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="relative z-10">Software Engineering</span>
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-8 sm:px-12 py-4 rounded-full font-medium transition-all text-base sm:text-lg w-auto relative overflow-hidden group ${
                  activeTab === 'content'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="relative z-10">Content Creation</span>
              </button>
            </div>
          </div>
        </motion.section>

        <AnimatePresence mode="wait">
          {activeTab === 'software' ? (
            <motion.div
              key="software"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Software Engineering Tech Stack */}
              <motion.section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                      Tech Stack & Tools
                    </h3>
                  </motion.div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Flutter', 'Tailwind CSS', 'Angular','Firebase'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Software Projects */}
              <motion.section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        Software Projects
                      </span>
                    </h2>
                    <p className="text-zinc-400">Explore my software engineering work</p>
                  </motion.div>
                  <SoftwareProjects />
                </div>
              </motion.section>

              {/* Software Engineering About */}
              <motion.section
                id="about"
                className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5 relative"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">About Me</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base"
                  >
                    Software Engineering Graduate | Full-Stack Developer
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4 sm:space-y-6 text-zinc-300 mb-12 sm:mb-16 text-sm sm:text-base leading-relaxed"
                  >
                    <p>
                      I'm Dannan Gunathilake, a passionate software engineer with a <span className="text-cyan-400 font-semibold">BSc (Hons) in Software Engineering from Plymouth University</span>. My journey in technology is driven by a deep fascination for creating innovative digital solutions that make a real impact.
                    </p>
                    <p>
                      With expertise in modern web frameworks, mobile development, and backend systems, I specialize in building scalable, user-centric applications. My education has equipped me with strong foundations in software architecture, algorithms, and best practices in development.
                    </p>
                    <p>
                      I'm committed to continuous learning and staying at the forefront of technology trends. Whether it's exploring new frameworks, contributing to open-source projects, or solving complex problems, I'm always eager to push the boundaries of what's possible with code.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="text-cyan-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">BSc (Hons)</div>
                      <div className="text-sm sm:text-base text-zinc-400">Software Engineering</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all"
                    >
                      <div className="text-blue-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">15+</div>
                      <div className="text-sm sm:text-base text-zinc-400">Projects Completed</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                      <div className="text-purple-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">2+</div>
                      <div className="text-sm sm:text-base text-zinc-400">Years Experience</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              

              {/* Content Creation Projects */}
              <motion.section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        Content Portfolio
                      </span>
                    </h2>
                    <p className="text-zinc-400">Explore my content creation work</p>
                  </motion.div>
                  <ContentProjects />
                </div>
              </motion.section>

              {/* Content Creation About */}
              <motion.section
                id="about"
                className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5 relative"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">About My Content</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base"
                  >
                    UGC Creator | Fitness | Lifestyle | Food
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4 sm:space-y-6 text-zinc-300 mb-12 sm:mb-16 text-sm sm:text-base leading-relaxed"
                  >
                    <p>
                      Hello! I'm <span className="text-cyan-400 font-semibold">Dannan Gunathilake</span>, a UGC creator specializing in <span className="text-blue-400 font-semibold">fitness, lifestyle, and food</span> content. I create authentic, engaging content that resonates with audiences and drives meaningful connections between brands and their communities.
                    </p>
                    <p>
                      As a content creator, I focus on producing <span className="text-cyan-400 font-semibold">high-quality user-generated content</span> that amplifies brand messages while maintaining authenticity. My work spans across various platforms, creating compelling visual stories that engage and inspire audiences.
                    </p>
                    <p>
                      I would love to collaborate with brands looking for genuine, creative content that tells their story. My approach combines creativity with strategic thinking to help brands connect with their target audience and achieve their marketing goals.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="text-cyan-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50K+</div>
                      <div className="text-sm sm:text-base text-zinc-400">Monthly Reach</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all"
                    >
                      <div className="text-blue-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">12.5%</div>
                      <div className="text-sm sm:text-base text-zinc-400">Engagement Rate</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                      <div className="text-purple-400 mb-3 sm:mb-4 flex justify-center">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">2.5K+</div>
                      <div className="text-sm sm:text-base text-zinc-400">Active Followers</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            >
              Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Connect</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base max-w-2xl mx-auto"
            >
              Whether you have a project opportunity, want to collaborate, or just want to say hello, I'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16"
            >
              <Link
                href="mailto:dannangunathilaka@gmail.com"
                className="group w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Send Email</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 mb-12 sm:mb-16"
            >
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="https://github.com/Dannansilva" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-500/50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="https://www.linkedin.com/in/dannan-gunathilake?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all border border-white/10 hover:border-blue-500/50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="https://www.instagram.com/dannan.ze_?igsh=dHhhN3EzeDQ4dHpu&utm_source=qrE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10 hover:border-pink-500/50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="mailto:dannangunathilaka@gmail.com" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-purple-500/20 hover:text-purple-400 transition-all border border-white/10 hover:border-purple-500/50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Dannan Gunathilake
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">Software Engineer building innovative digital solutions.</p>
              </div>
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Projects</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Software Engineering</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Content Creation</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Courses</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                  <li><Link href="https://github.com/Dannansilva" className="hover:text-cyan-400 transition-colors">GitHub</Link></li>
                  <li><Link href="https://www.linkedin.com/in/dannan-gunathilake?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-cyan-400 transition-colors">LinkedIn</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/10 flex items-center justify-center text-xs sm:text-sm text-zinc-400">
              <p>© 2025 Dannan Gunathilake. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
