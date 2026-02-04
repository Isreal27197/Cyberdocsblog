
import React from 'react';
import { Link } from 'react-router-dom';
import { ResearchProject } from '../types';

interface ProjectCardProps {
  project: ResearchProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusColors = {
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Archived': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="group bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-sky-500/30 transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusColors[project.status]}`}>
          {project.status}
        </div>
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a href={project.githubUrl} className="text-slate-500 hover:text-white transition-colors" title="View Source">
              <i className="fab fa-github text-lg"></i>
            </a>
          )}
        </div>
      </div>
      
      <Link to={`/project/${project.id}`}>
        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h4>
      </Link>
      
      <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow">
        {project.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-[10px] rounded border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/project/${project.id}`} className="text-sky-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center">
          Full Report <i className="fas fa-chevron-right ml-2 text-[10px]"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
