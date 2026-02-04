
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LabTopology from '../components/LabTopology';
import { ResearchProject } from '../types';

interface ProjectDetailProps {
  projects: ResearchProject[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (project?.content) {
      const h: {id: string, text: string, level: number}[] = [];
      const lines = project.content.split('\n');
      lines.forEach(line => {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          h.push({ id, text, level });
        }
      });
      setHeadings(h);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl text-white font-mono">LAB PROJECT NOT FOUND</h2>
        <Link to="/projects" className="text-sky-400 mt-4 inline-block hover:underline uppercase text-xs font-bold">Return to Lab Archive</Link>
      </div>
    );
  }

  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.tags.some(t => project.tags.includes(t)))
    .slice(0, 2);

  const statusColors = {
    'Completed': 'text-emerald-400',
    'In Progress': 'text-amber-400',
    'Archived': 'text-slate-400',
  };

  return (
    <article className="py-12 bg-slate-900 min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 h-1 bg-sky-500/20 w-full z-50">
        <div className="h-full bg-sky-500 transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center text-slate-500 hover:text-sky-400 mb-8 transition-colors text-xs font-bold uppercase tracking-widest">
          <i className="fas fa-arrow-left mr-2"></i> Archive
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <header className="mb-12 border-b border-slate-800 pb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Technical Research</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${statusColors[project.status]}`}>[{project.status}]</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight font-mono tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                {project.description}
              </p>
            </header>

            {/* Topology Rendering */}
            {project.topology && (
              <LabTopology nodes={project.topology.nodes} links={project.topology.links} />
            )}

            <div className="prose prose-invert prose-sky max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-headings:font-mono prose-headings:scroll-mt-24">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                    return <h1 id={id}>{children}</h1>
                  },
                  h2: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                    return <h2 id={id}>{children}</h2>
                  },
                  h3: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                    return <h3 id={id}>{children}</h3>
                  }
                }}
              >
                {project.content || "_No technical logs available for this project yet._"}
              </ReactMarkdown>
            </div>

            {/* Related Research */}
            {relatedProjects.length > 0 && (
              <div className="mt-20 pt-12 border-t border-slate-800">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Related Research</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProjects.map(p => (
                    <Link key={p.id} to={`/project/${p.id}`} className="block p-6 bg-slate-800/40 border border-slate-800 rounded-xl hover:border-sky-500/50 transition-all group">
                      <span className="text-[10px] font-bold text-sky-500 uppercase block mb-2">{p.status}</span>
                      <h4 className="text-white font-bold mb-2 group-hover:text-sky-400 transition-colors">{p.title}</h4>
                      <p className="text-slate-500 text-xs line-clamp-2">{p.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-slate-700 pb-2">Technical Index</h3>
              
              <nav className="mb-8 space-y-3">
                {headings.map((h, i) => (
                  <a 
                    key={i} 
                    href={`#${h.id}`}
                    className={`block text-[11px] font-medium transition-colors hover:text-sky-400 ${
                      h.level === 1 ? 'text-slate-300' : 'text-slate-500 pl-3'
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>

              <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-slate-700 pb-2">Metadata</h3>
              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-2">Primary Node ID</span>
                  <code className="bg-slate-900 text-sky-400 px-2 py-1 rounded text-xs font-mono">{project.id}</code>
                </div>

                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-2">Technology Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-slate-900 border border-slate-700 text-slate-400 px-2 py-0.5 rounded text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>

                {project.githubUrl && (
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase mb-2">Repository</span>
                    <a href={project.githubUrl} className="text-sky-400 hover:text-white text-xs flex items-center gap-2 transition-colors">
                      <i className="fab fa-github"></i> Source Logs
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <button 
                  onClick={() => window.print()}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold uppercase rounded transition-colors"
                >
                  <i className="fas fa-print mr-2"></i> Export Report
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;
