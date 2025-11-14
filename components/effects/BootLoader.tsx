'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);

  const statuses = [
    'INITIALIZING SYSTEMS...',
    'LOADING COMPONENTS...',
    'ESTABLISHING CONNECTION...',
    'PORTFOLIO.OS READY'
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Status messages
    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev >= statuses.length - 1) {
          clearInterval(statusInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="max-w-2xl w-full px-8">
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              DG
            </span>
          </div>
          <div className="text-sm text-zinc-500 font-mono">
            PORTFOLIO.OS v1.0.0
          </div>
        </motion.div>

        {/* Status Messages */}
        <div className="mb-8 h-20">
          {statuses.map((status, index) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: currentStatus === index ? 1 : 0,
                x: currentStatus === index ? 0 : -20
              }}
              className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2"
            >
              <span className="text-green-400">▸</span>
              {status}
              {currentStatus === index && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500 font-mono">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-3 gap-4 text-xs font-mono"
        >
          <div className="text-center">
            <div className="text-green-400">● ONLINE</div>
            <div className="text-zinc-600">SYSTEM</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400">● ACTIVE</div>
            <div className="text-zinc-600">STATUS</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400">● READY</div>
            <div className="text-zinc-600">STATE</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
