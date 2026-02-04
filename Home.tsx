
import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';
import Newsletter from '../components/Newsletter';
import ThreatBriefing from '../components/ThreatBriefing';
import { BlogPost, ResearchProject } from '../types';

interface HomeProps {
  searchQuery: string;
  posts: BlogPost[];
  projects: ResearchProject[];
}

const Home: React.FC<HomeProps> = ({ searchQuery, posts, projects }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'research'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const all = posts.map(p => p.category);
    return Array.from(new Set(all));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, posts]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery, projects]);

  return (
    <div className="space-y-0">
      <Hero />
      <Stats articlesCount={posts.length} projectsCount={projects.length} />

      {/* Main Content Grid */}
      <section id="latest-posts" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column: Feed & Content */}
            <div className="lg:col-span-3 space-y-12">
              <ThreatBriefing />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase tracking-tight">
                    {searchQuery ? `Search Results` : (activeTab === 'articles' ? 'Technical Articles' : 'Research Labs')}
                  </h2>
                  <div className="h-1 w-12 bg-sky-500 rounded-full"></div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex bg-slate-800 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveTab('articles')}
                      className={`px-4 py-1.5 text-xs font-bold uppercase rounded transition-all ${
                        activeTab === 'articles'
                          ? 'bg-sky-600 text-white shadow-lg'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Docs
                    </button>
                    <button
                      onClick={() => setActiveTab('research')}
                      className={`px-4 py-1.5 text-xs font-bold uppercase rounded transition-all ${
                        activeTab === 'research'
                          ? 'bg-sky-600 text-white shadow-lg'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Labs
                    </button>
                  </div>
                </div>
              </div>

              {activeTab === 'articles' ? (
                <div className="space-y-4">
                  {selectedCategory && (
                    <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-800/50 p-2 rounded border border-slate-700 w-fit">
                      Filtering: {selectedCategory}
                      <button onClick={() => setSelectedCategory(null)} className="ml-2 text-sky-400 hover:text-white"><i className="fas fa-times"></i></button>
                    </div>
                  )}
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl">
                      <div className="text-slate-700 text-4xl mb-4"><i className="fas fa-search"></i></div>
                      <h3 className="text-sm text-slate-500 uppercase tracking-widest font-bold">No Records Found</h3>
                    </div>
                  )}
                </div>
              ) : (
                filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl">
                    <h3 className="text-sm text-slate-500 uppercase tracking-widest font-bold">No Active Labs Found</h3>
                  </div>
                )
              )}
            </div>

            {/* Right Column: Taxonomy / Categories */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-slate-700 pb-2">Category Map</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-all ${
                        selectedCategory === cat 
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <i className="fas fa-folder-open mr-2 opacity-50"></i>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-slate-700 pb-2">Status Key</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase">System Status</span>
                    <span className="text-emerald-500 font-bold">OPTIMAL</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase">Encryption</span>
                    <span className="text-sky-500 font-bold">AES-GCM</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 uppercase">Node Uplink</span>
                    <span className="text-slate-400 font-bold">SECURE</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Home;
