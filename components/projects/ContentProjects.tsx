import ProjectCard, { Project } from './ProjectCard';


const contentProjects: Project[] = [
  {
    videoUrl: 'https://www.instagram.com/reel/DOFmWFkDLRZ/?igsh=ZHZqbXA2Y3puczR3',
    client: 'D blaq',
    link: 'https://www.instagram.com/reel/DOFmWFkDLRZ/?igsh=ZHZqbXA2Y3puczR3'
  },
  {
    videoUrl: 'https://www.instagram.com/reel/DJ1ascWo0CC/?igsh=MTR6MmNsMjdrOGtxcw==',
    client: 'Fitness Kingdom & Balayaft',
    link: 'https://www.instagram.com/reel/DJ1ascWo0CC/?igsh=MTR6MmNsMjdrOGtxcw=='
  },
  {
    videoUrl: 'https://www.instagram.com/reel/DDrew5XIYLC/?igsh=MTA5NTIzZXQ5OWhiZg==',
    client: 'T-Lounge by Dilmah',
    link: 'https://www.instagram.com/reel/DDrew5XIYLC/?igsh=MTA5NTIzZXQ5OWhiZg=='
  },
  {
    videoUrl: 'https://www.instagram.com/reel/C9Hwa0cJMM_/?igsh=cnd4MHE3NjZxc2Fr',
    client: 'Isso',
    link: 'https://www.instagram.com/reel/C9Hwa0cJMM_/?igsh=cnd4MHE3NjZxc2Fr'
  },
  {
    videoUrl: 'https://www.instagram.com/reel/C61Bh7uJwkF/?igsh=Ynp1NDF4ZXVhMWFz',
    client: 'cinnachunk',
    link: 'https://www.instagram.com/reel/C61Bh7uJwkF/?igsh=Ynp1NDF4ZXVhMWFz'
  },
  {
    videoUrl: 'https://www.instagram.com/reel/C3O70nFITNh/?igsh=MXdlYTRncDJjY2R1Yg==',
    client: 'Nutrimax.iso',
    link: 'https://www.instagram.com/reel/C3O70nFITNh/?igsh=MXdlYTRncDJjY2R1Yg=='
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
