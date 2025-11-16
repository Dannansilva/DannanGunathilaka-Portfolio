import ProjectCard, { Project } from './ProjectCard';

// Add your software engineering projects here
// You can easily add, remove, or modify projects by editing this array
const softwareProjects: Project[] = [
  {
    icon: '🚢',
    title: 'OMC Colombo',
    category: 'Static Website',
    description: 'Develeoped a stattic website for Ocean marine Consultants (PVT) Ltd (OMC Colombo) using Node.js and Tailwind CSS,delivering a responsive,visual appealing,and fast-loading design to effectively showcase the client\'s services ',
    tags: ['Node.js', 'Tailwind CSS'],
    link: 'https://www.omccolombo.org.lk/'
  },
  {
    icon: '📱',
    title: 'SpotOn-Smart Event Booking App',
    category: 'Mobile Application',
    description: 'Developed SpotOn, a modern Android app for event discovery and ticket booking with features like real-time bookings, QR codecheck-ins, Google Maps, calendar syncing, and event analytics',
    tags: ['Flutter', 'Firebase', 'Google maps', 'OpenWeatherMap API'],
    hasDetails: true,
    link: 'https://github.com/Dannansilva/SpotOn-'
  },
  {
    icon: '👥',
    title: 'ERP And Booking system',
    category: 'WEB APPLICATION',
    description: ' Developed a wellness retreat ERP system with advanced 15-minute booking calendar, VIP memberships, therapistscheduling, real-time discount approvals, finance dashboards, role-based access,and live notifications',
    tags: ['React', 'Tailwind', 'WebSockets', 'MongoDB'],
    link: '#'
  },
  {
    icon: '⛅',
    title: 'Weather App',
    category: 'mobile application',
    description: ' created using bloc and weather api to get real weather conditions',
    tags: ['Flutter', 'Openweather api','bloc'],
    link: 'https://github.com/Dannansilva/weatherapp'
  },
  {
    icon: '🪪',
    title: ' GatePass',
    category: 'mobile application',
    description: ' GatePass is a mobile application that streamlines visitor management for a compoany, allowing employees to easily register and track visitors.',
    tags: ['Flutter', 'bloc'],
    link: '#'
  },
  {
    icon: '🚚',
    title: ' Mass Packing List',
    category: 'mobile application',
    description: ' app is use to scan productes by using their barcode',
    tags: ['Flutter', 'bloc'],
    link: '#'
  },
  {
    icon: '👥',
    title: ' Leave Management System ',
    category: 'Web Application',
    description: ' A web application that allows employees to apply for leaves and managers to approve or reject them, with features like leave balance tracking and notifications.',
    tags: ['Angular 18', 'Tailwind CSS'],
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
