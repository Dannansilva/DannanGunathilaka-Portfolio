'use client';

import { useState } from 'react';
import Link from 'next/link';
import SoftwareProjects from '@/components/projects/SoftwareProjects';
import ContentProjects from '@/components/projects/ContentProjects';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'software' | 'content'>('software');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold">
              <span className="text-blue-500">&lt;/&gt;</span>
              <span>Portfolio</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
              <Link href="#about" className="hover:text-blue-400 transition-colors">About</Link>
              <Link href="#projects" className="hover:text-blue-400 transition-colors">Projects</Link>
              <Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </div>
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs sm:text-sm">
            <span className="text-blue-500">🚀</span>
            <span>Available for new projects</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Building The Future,
            </span>
            <br />
            <span className="text-white">One Line at a Time</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Full-stack software engineer & content creator crafting{' '}
            <span className="text-blue-400 font-semibold">exceptional digital experiences</span>{' '}
            through code and creativity
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <Link
              href="#projects"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Explore My Work
              <span>→</span>
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 mb-12 sm:mb-16">
            <button
              onClick={() => setActiveTab('software')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all text-sm sm:text-base w-full sm:w-auto ${
                activeTab === 'software'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              Software Engineering
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 sm:px-8 py-3 rounded-full font-medium transition-all text-sm sm:text-base w-full sm:w-auto ${
                activeTab === 'content'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              Content Creation
            </button>
          </div>

          {activeTab === 'software' ? <SoftwareProjects /> : <ContentProjects />}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-center text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base">Passionate about building and teaching</p>

          <div className="space-y-4 sm:space-y-6 text-zinc-300 mb-12 sm:mb-16 text-sm sm:text-base leading-relaxed">
            <p>
              I'm a passionate software engineer with 7+ years of experience building mobile applications, web platforms,
              and enterprise resource planning systems. My journey in tech started with a fascination for solving complex
              problems through elegant code.
            </p>
            <p>
              Specializing in mobile development (React Native, Flutter), modern web frameworks (Next.js, React), and
              backend systems (Node.js, Python), I've helped startups and enterprises transform their ideas into scalable
              products.
            </p>
            <p>
              Beyond coding, I'm committed to giving back to the tech community through content creation—whether it's
              comprehensive video courses, thought-provoking blog posts, or engaging podcast discussions. I believe in
              the power of knowledge sharing and mentorship.
            </p>
            <p>
              When I'm not coding or creating content, you'll find me exploring new technologies, contributing to open-source
              projects, or enjoying outdoor adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10">
              <div className="text-blue-400 mb-3 sm:mb-4 flex justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm sm:text-base text-zinc-400">Projects Completed</div>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-white/10">
              <div className="text-purple-400 mb-3 sm:mb-4 flex justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">7+</div>
              <div className="text-sm sm:text-base text-zinc-400">Years Experience</div>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-2xl border border-white/10">
              <div className="text-pink-400 mb-3 sm:mb-4 flex justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-sm sm:text-base text-zinc-400">Followers & Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Let's <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you have a project opportunity, want to collaborate, or just want to say hello, I'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Link
              href="mailto:YOUR_EMAIL@example.com"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
              <span>→</span>
            </Link>
            <Link
              href="#"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Call
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mb-12 sm:mb-16">
            <Link href="https://github.com/Dannansilva" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com/in/dannan-gunathilake?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/dannan.ze_?igsh=dHhhN3EzeDQ4dHpu&utm_source=qrE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </Link>
            <Link href="mailto:YOUR_EMAIL@example.com" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Portfolio</h3>
              <p className="text-xs sm:text-sm text-zinc-400">Building digital excellence through code and creativity.</p>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Projects</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-white transition-colors">Software Engineering</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Content Creation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li><Link href="https://github.com/Dannansilva" className="hover:text-white transition-colors">GitHub</Link></li>
                <li><Link href="https://www.linkedin.com/in/dannan-gunathilake?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-white transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/10 flex items-center justify-center text-xs sm:text-sm text-zinc-400">
            <p>© 2025 Dannan Gunathilake. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
