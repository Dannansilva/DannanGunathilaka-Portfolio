import ProjectCard, { Project } from './ProjectCard';

// Add your content creation projects here
// You can easily add, remove, or modify projects by editing this array
const contentProjects: Project[] = [
  {
    icon: '🎥',
    title: 'React & Next.js Complete Course',
    category: 'VIDEO COURSE',
    description: 'Comprehensive video course covering React fundamentals, Next.js features, and building production-ready applications from scratch.',
    tags: ['React', 'Next.js', 'Video Tutorial', 'Udemy'],
    link: '#'
  },
  {
    icon: '📝',
    title: 'Tech Blog & Tutorials',
    category: 'BLOG',
    description: 'Technical blog featuring in-depth tutorials, best practices, and insights on modern web development, mobile apps, and software architecture.',
    tags: ['Technical Writing', 'Dev.to', 'Medium', 'SEO'],
    hasDetails: true,
    link: '#'
  },
  {
    icon: '🎙️',
    title: 'Code & Coffee Podcast',
    category: 'PODCAST',
    description: 'Weekly podcast discussing software engineering trends, interviewing industry experts, and sharing practical development tips.',
    tags: ['Podcast', 'Interviews', 'Tech Trends', 'Spotify'],
    link: '#'
  },
  {
    icon: '💻',
    title: 'JavaScript Mastery Series',
    category: 'VIDEO COURSE',
    description: 'Advanced JavaScript course covering ES6+, async patterns, performance optimization, and modern JavaScript ecosystem.',
    tags: ['JavaScript', 'ES6+', 'YouTube', 'Free Course'],
    link: '#'
  },
  {
    icon: '📚',
    title: 'Mobile Development eBook',
    category: 'EBOOK',
    description: 'Comprehensive guide to cross-platform mobile development with React Native and Flutter, including real-world project examples.',
    tags: ['React Native', 'Flutter', 'eBook', 'Self-Published'],
    link: '#'
  },
  {
    icon: '🎬',
    title: 'System Design Explained',
    category: 'VIDEO SERIES',
    description: 'Video series breaking down complex system design concepts, scalability patterns, and architecture decisions for real-world applications.',
    tags: ['System Design', 'Architecture', 'Scalability', 'YouTube'],
    link: '#'
  }
];

export default function ContentProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {contentProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
