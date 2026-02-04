
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsPage from './pages/ProjectsPage';
import Toolbox from './pages/Toolbox';
import Admin from './pages/Admin';
import SecurityAssistant from './components/SecurityAssistant';
import TerminalFeed from './components/TerminalFeed';
import { MOCK_POSTS, MOCK_PROJECTS } from './constants';
import { BlogPost, ResearchProject } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('cyberdocs_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [projects, setProjects] = useState<ResearchProject[]>(() => {
    const saved = localStorage.getItem('cyberdocs_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('cyberdocs_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('cyberdocs_projects', JSON.stringify(projects));
  }, [projects]);

  const addPost = (newPost: BlogPost) => setPosts([newPost, ...posts]);
  const updatePost = (updatedPost: BlogPost) => setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  const deletePost = (id: string) => window.confirm('Delete article?') && setPosts(posts.filter(p => p.id !== id));

  const addProject = (newProject: ResearchProject) => setProjects([newProject, ...projects]);
  const updateProject = (updatedProject: ResearchProject) => setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  const deleteProject = (id: string) => window.confirm('Delete research project?') && setProjects(projects.filter(p => p.id !== id));

  const restoreBackup = (data: { posts: BlogPost[], projects: ResearchProject[] }) => {
    setPosts(data.posts);
    setProjects(data.projects);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-900">
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main id="main-content" className="flex-grow pt-16">
          <TerminalFeed />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} posts={posts} projects={projects} />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<ArticleDetail posts={posts} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
            <Route path="/projects" element={<ProjectsPage searchQuery={searchQuery} projects={projects} />} />
            <Route path="/toolbox" element={<Toolbox />} />
            <Route path="/admin" element={
              <Admin 
                posts={posts} 
                projects={projects}
                onAddPost={addPost} 
                onUpdatePost={updatePost}
                onDeletePost={deletePost} 
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={deleteProject}
                onRestore={restoreBackup}
              />
            } />
            <Route path="*" element={<Home searchQuery={searchQuery} posts={posts} projects={projects} />} />
          </Routes>
        </main>

        <SecurityAssistant />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
