
import React, { useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ResearchProject } from '../types';

interface ProjectsPageProps {
  searchQuery: string;
  projects: ResearchProject[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ searchQuery, projects }) => {
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery, projects]);

  return (
    <div className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-mono">
            Research & <span className="text-sky-500">Projects</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
            A comprehensive list of my technical experiments, open-source security tools, and documented lab environments. Each project includes key takeaways and status updates.
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {!searchQuery && (
              <div className="bg-slate-800/20 p-8 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-sky-500/50 transition-colors">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-plus text-slate-500 group-hover:text-sky-400 text-2xl"></i>
                </div>
                <h4 className="text-white font-bold mb-2">Ongoing Lab Work</h4>
                <p className="text-slate-500 text-sm">
                  New documentation for Kernel-level debugging is currently in progress.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl text-slate-400">No projects found for "{searchQuery}"</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
