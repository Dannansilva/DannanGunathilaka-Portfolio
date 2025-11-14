import ProjectCard, { Project } from './ProjectCard';

// Add your software engineering projects here
// You can easily add, remove, or modify projects by editing this array
const softwareProjects: Project[] = [
  {
    icon: '📱',
    title: 'E-Commerce Mobile App',
    category: 'MOBILE DEVELOPMENT',
    description: 'A feature-rich mobile application built with React Native and Firebase. Includes real-time inventory, secure payments, and push notifications.',
    tags: ['React Native', 'Firebase', 'Stripe', 'Redux'],
    link: '#'
  },
  {
    icon: '💼',
    title: 'Enterprise Resource Planning System',
    category: 'ERP SOLUTION',
    description: 'A comprehensive ERP system for managing business operations including inventory, HR, finance, and supply chain management.',
    tags: ['Next.js', 'PostgreSQL', 'Node.js', 'TypeScript'],
    hasDetails: true,
    link: '#'
  },
  {
    icon: '👥',
    title: 'Project Management Platform',
    category: 'WEB APPLICATION',
    description: 'Collaborative platform for teams to manage projects, tasks, and timelines. Features real-time collaboration and analytics dashboard.',
    tags: ['React', 'Tailwind', 'WebSockets', 'MongoDB'],
    link: '#'
  },
  {
    icon: '💪',
    title: 'Fitness Tracking App',
    category: 'MOBILE DEVELOPMENT',
    description: 'iOS and Android fitness application with workout tracking, nutrition logging, and AI-powered personalized recommendations.',
    tags: ['Flutter', 'Firebase', 'Machine Learning', 'Provider'],
    link: '#'
  },
  {
    icon: '🏠',
    title: 'Real Estate Management Dashboard',
    category: 'WEB APPLICATION',
    description: 'Comprehensive dashboard for property management with virtual tours, tenant management, and financial analytics.',
    tags: ['Next.js', 'Python', 'PostgreSQL', 'Mapbox'],
    link: '#'
  },
  {
    icon: '📊',
    title: 'Supply Chain Analytics',
    category: 'ERP SOLUTION',
    description: 'Analytics system for supply chain optimization with predictive analytics, demand forecasting, and cost optimization.',
    tags: ['Node.js', 'Python', 'PostgreSQL', 'D3.js'],
    link: '#'
  }
];

export default function SoftwareProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {softwareProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
