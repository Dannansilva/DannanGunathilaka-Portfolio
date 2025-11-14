'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface Project {
  icon?: string;
  title?: string;
  category?: string;
  description?: string;
  tags?: string[];
  link: string;
  hasDetails?: boolean;
  videoUrl?: string; // YouTube or Instagram embed URL
  client?: string; // Client name for brand work
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Convert Instagram regular URLs to embed URLs
  const getEmbedUrl = (url: string) => {
    if (url.includes('instagram.com/reel/')) {
      const reelId = url.match(/reel\/([^/?]+)/)?.[1];
      return reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : url;
    }
    if (url.includes('instagram.com/p/')) {
      const postId = url.match(/p\/([^/?]+)/)?.[1];
      return postId ? `https://www.instagram.com/p/${postId}/embed/` : url;
    }
    return url; // YouTube or other embeds
  };

  // If project has a video, render only the video embed with client name overlay
  if (project.videoUrl) {
    return (
      <div className="group bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '9/16', height: 'clamp(280px, 60vh, 480px)' }}>
          {/* Loading Animation */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 flex items-center justify-center"
            >
              <div className="relative">
                {/* Pulsing circles */}
                <motion.div
                  className="w-20 h-20 rounded-full border-4 border-cyan-500/30 absolute"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="w-20 h-20 rounded-full border-4 border-blue-500/30 absolute"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
                <motion.div
                  className="w-20 h-20 rounded-full border-4 border-purple-500/30 absolute"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                />
                {/* Center icon */}
                <motion.div
                  className="w-20 h-20 flex items-center justify-center relative z-10"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
              </div>
              {/* Loading text */}
              <motion.p
                className="absolute bottom-8 text-cyan-400 text-sm font-medium"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading content...
              </motion.p>
            </motion.div>
          )}

          {/* Video iframe */}
          <motion.iframe
            src={getEmbedUrl(project.videoUrl)}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="absolute border-0"
            style={{
              border: 'none',
              width: '100%',
              height: '800px',
              top: '-70px',
              left: '0',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
            onLoad={() => setIsLoading(false)}
          ></motion.iframe>

          {/* Client name overlay */}
          {project.client && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4"
            >
              <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm sm:text-base font-medium border border-blue-500/20 backdrop-blur-sm">
                {project.client}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // For non-video projects, render the full card with content
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
      {/* Card Content */}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          {project.icon && <div className="text-3xl sm:text-4xl">{project.icon}</div>}
          {project.hasDetails && (
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </div>
        {project.title && <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>}
        {project.client && (
          <p className="text-sm text-cyan-400 font-medium mb-2">Client: {project.client}</p>
        )}
        {project.category && <p className="text-xs sm:text-sm text-blue-400 font-medium mb-3 sm:mb-4">{project.category}</p>}
        {project.description && <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6 line-clamp-3">{project.description}</p>}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm border border-blue-500/20">
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.hasDetails && (
          <Link href={project.link} className="inline-flex items-center gap-2 mt-4 sm:mt-6 text-blue-400 hover:text-blue-300 text-sm sm:text-base">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
