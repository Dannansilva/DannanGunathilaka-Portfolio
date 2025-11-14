'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        animate={
          isGlitching
            ? {
                x: [0, -2, 2, -2, 0],
                y: [0, 2, -2, 2, 0]
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        {text}
      </motion.span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], x: [-2, 2, -2] }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 text-cyan-500"
            style={{ textShadow: '2px 0 #00ffff' }}
          >
            {text}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], x: [2, -2, 2] }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 text-pink-500"
            style={{ textShadow: '-2px 0 #ff00ff' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
}
