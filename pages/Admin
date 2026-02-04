
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI } from '@google/genai';
import { BlogPost, ResearchProject, Category } from '../types';

// CHANGE YOUR PASSCODE HERE
const ADMIN_PASSCODE = '1234';

interface AdminProps {
  posts: BlogPost[];
  projects: ResearchProject[];
  onAddPost: (post: BlogPost) => void;
  onUpdatePost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
  onAddProject: (project: ResearchProject) => void;
  onUpdateProject: (project: ResearchProject) => void;
  onDeleteProject: (id: string) => void;
  onRestore: (data: { posts: BlogPost[], projects: ResearchProject[] }) => void;
}

const CATEGORIES: Category[] = [
  'General Security',
  'Network Security',
  'Web3 Security',
  'Security Research'
];

const Admin: React.FC<AdminProps> = ({ 
  posts, projects, onAddPost, onUpdatePost, onDeletePost, onAddProject, onUpdateProject, onDeleteProject, onRestore
}) => {
  const navigate = useNavigate();
  const restoreInputRef = useRef<HTMLInputElement>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [entityType, setEntityType] = useState<'post' | 'project'>('post');
  const [editId, setEditId] = useState<string | null>(null);
  
  const [postData, setPostData] = useState({
    title: '', excerpt: '', content: '', category: 'General Security' as Category, author: 'Admin',
    imageUrl: 'https://picsum.photos/seed/cyber/800/450', readTime: '5 min',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  const [projectData, setProjectData] = useState({
    title: '', description: '', content: '', status: 'In Progress' as any, tags: '', githubUrl: '', reportUrl: '',
    topologyJson: '' // Added for topology editing
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) { setIsAuthenticated(true); setAuthError(false); }
    else { setAuthError(true); setPasscode(''); setTimeout(() => setAuthError(false), 2000); }
  };

  const handleAiDraft = async () => {
    if (!aiTopic.trim()) return;
    setIsAiDrafting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Draft a professional cybersecurity documentation for "${aiTopic}". Include Abstract, Technical Details, and Mitigation. Markdown format.`,
        config: { tools: [{googleSearch: {}}] }
      });
      setPostData(prev => ({ ...prev, title: aiTopic, content: response.text || '', excerpt: (response.text || '').substring(0, 150) }));
    } catch (e) { alert("AI Drafting failed."); }
    finally { setIsAiDrafting(false); }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) onUpdatePost({ ...postData, id: editId });
    else onAddPost({ ...postData, id: `0x${Math.random().toString(16).slice(2, 10)}` });
    resetForm();
    navigate('/');
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let topology = undefined;
    if (projectData.topologyJson.trim()) {
      try {
        topology = JSON.parse(projectData.topologyJson);
      } catch (err) {
        alert("Invalid Topology JSON. Please check the format.");
        return;
      }
    }

    const formatted = { 
      ...projectData, 
      tags: projectData.tags.split(',').map(t => t.trim()).filter(t => t),
      topology 
    };
    
    if (editId) onUpdateProject({ ...formatted, id: editId } as any);
    else onAddProject({ ...formatted, id: `p-${Math.random().toString(36).substr(2, 9)}` } as any);
    resetForm();
    navigate('/projects');
  };

  const resetForm = () => {
    setEditId(null);
    setPostData({ title: '', excerpt: '', content: '', category: 'General Security', author: 'Admin', imageUrl: 'https://picsum.photos/seed/cyber/800/450', readTime: '5 min', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
    setProjectData({ title: '', description: '', content: '', status: 'In Progress', tags: '', githubUrl: '', reportUrl: '', topologyJson: '' });
  };

  const handleExport = () => {
    const data = { posts, projects, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberdocs_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.posts && data.projects) {
            if (window.confirm('This will overwrite all current articles and projects. Proceed?')) {
              onRestore(data);
              alert('Archive Restored Successfully!');
            }
          }
        } catch (err) { alert('Invalid archive file.'); }
      };
      reader.readAsText(file);
    }
  };

  const handleEditPost = (p: BlogPost) => {
    setEditId(p.id);
    setPostData({
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      author: p.author,
      imageUrl: p.imageUrl,
      readTime: p.readTime,
      date: p.date
    });
    setEntityType('post');
    setActiveTab('create');
  };

  const handleEditProject = (p: ResearchProject) => {
    setEditId(p.id);
    setProjectData({
      title: p.title,
      description: p.description,
      content: p.content,
      status: p.status,
      tags: p.tags.join(', '),
      githubUrl: p.githubUrl || '',
      reportUrl: p.reportUrl || '',
      topologyJson: p.topology ? JSON.stringify(p.topology, null, 2) : ''
    });
    setEntityType('project');
    setActiveTab('create');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className={`max-w-md w-full bg-slate-800 border-2 ${authError ? 'border-red-500 animate-shake' : 'border-slate-700'} rounded-3xl p-10 shadow-2xl`}>
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 border-2 ${authError ? 'bg-red-500/10 border-red-500/30' : 'bg-sky-500/10 border-sky-500/30'}`}>
              <i className={`fas ${authError ? 'fa-user-lock' : 'fa-fingerprint'} text-3xl ${authError ? 'text-red-500' : 'text-sky-500'}`}></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Security Clearance</h2>
            <p className="text-slate-400 text-sm">Passcode required for hub administrative tasks.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" maxLength={10} value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="• • • •" className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-6 text-center text-2xl tracking-[1em] text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono" autoFocus />
            <button type="submit" className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs">Initialize Uplink</button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <button onClick={() => navigate('/')} className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest">Public Archive</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-slate-800 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white font-mono uppercase tracking-tight">Hub <span className="text-sky-500">Terminal</span></h1>
            <p className="text-slate-500 text-sm">System integrity: 100% | Authorized as Root</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl">
            <button onClick={() => { setActiveTab('create'); resetForm(); }} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'create' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500'}`}>{editId ? 'EDITING' : 'NEW RECORD'}</button>
            <button onClick={() => setActiveTab('manage')} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'manage' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500'}`}>MANAGE HUB</button>
          </div>
        </div>

        {activeTab === 'create' ? (
          <div className="space-y-8">
            {!editId && (
              <div className="flex justify-center gap-4">
                <button onClick={() => setEntityType('post')} className={`px-4 py-2 text-[10px] font-bold uppercase border rounded ${entityType === 'post' ? 'bg-sky-500/10 text-sky-400 border-sky-400' : 'border-slate-800 text-slate-500'}`}>Blog Article</button>
                <button onClick={() => setEntityType('project')} className={`px-4 py-2 text-[10px] font-bold uppercase border rounded ${entityType === 'project' ? 'bg-purple-500/10 text-purple-400 border-purple-400' : 'border-slate-800 text-slate-500'}`}>Research Lab</button>
              </div>
            )}

            <form onSubmit={entityType === 'post' ? handlePostSubmit : handleProjectSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Technical Content (Markdown)</label>
                    <div className="flex gap-2">
                       <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="AI Topic Assist..." className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] text-white outline-none" />
                       <button type="button" onClick={handleAiDraft} disabled={isAiDrafting} className="bg-sky-600 text-[10px] px-2 py-1 rounded text-white">{isAiDrafting ? '...' : 'Draft'}</button>
                    </div>
                  </div>
                  <textarea value={entityType === 'post' ? postData.content : projectData.content} onChange={e => entityType === 'post' ? setPostData({...postData, content: e.target.value}) : setProjectData({...projectData, content: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm min-h-[500px] text-slate-300 outline-none focus:ring-1 focus:ring-sky-500 shadow-inner" placeholder="# Abstract..." />
                </div>

                {entityType === 'project' && (
                  <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Lab Topology Config (JSON)</label>
                      <span className="text-[8px] text-slate-600 font-mono">Structure: nodes[], links[]</span>
                    </div>
                    <textarea 
                      value={projectData.topologyJson} 
                      onChange={e => setProjectData({...projectData, topologyJson: e.target.value})} 
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-xs h-40 text-sky-400/80 outline-none focus:ring-1 focus:ring-sky-500 shadow-inner" 
                      placeholder='{ "nodes": [...], "links": [...] }' 
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 space-y-4 sticky top-24">
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-700 pb-2">Record Config</h3>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Title</label>
                    <input type="text" value={entityType === 'post' ? postData.title : projectData.title} onChange={e => entityType === 'post' ? setPostData({...postData, title: e.target.value}) : setProjectData({...projectData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white" />
                  </div>
                  {entityType === 'post' ? (
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Category</label>
                      <select value={postData.category} onChange={e => setPostData({...postData, category: e.target.value as Category})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white">
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Status</label>
                      <select value={projectData.status} onChange={e => setProjectData({...projectData, status: e.target.value as any})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white">
                        <option>In Progress</option><option>Completed</option><option>Archived</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Excerpt / Description</label>
                    <textarea value={entityType === 'post' ? postData.excerpt : projectData.description} onChange={e => entityType === 'post' ? setPostData({...postData, excerpt: e.target.value}) : setProjectData({...projectData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white h-20" />
                  </div>
                  {entityType === 'project' && (
                    <div>
                       <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Tags (comma separated)</label>
                       <input type="text" value={projectData.tags} onChange={e => setProjectData({...projectData, tags: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white" placeholder="Nmap, Pentest..." />
                    </div>
                  )}
                  <button type="submit" className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95">{editId ? 'Commit Update' : 'Initialize Record'}</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700 text-[10px] font-bold uppercase tracking-widest text-white">Article Archive</div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-800">
                  {posts.map(p => (
                    <div key={p.id} className="p-4 flex justify-between items-center group">
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{p.title}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditPost(p)} className="text-sky-500 p-2"><i className="fas fa-edit"></i></button>
                        <button onClick={() => onDeletePost(p.id)} className="text-slate-600 hover:text-red-500 p-2"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700 text-[10px] font-bold uppercase tracking-widest text-white">Project Archive</div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-800">
                  {projects.map(p => (
                    <div key={p.id} className="p-4 flex justify-between items-center group">
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{p.title}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditProject(p)} className="text-sky-500 p-2"><i className="fas fa-edit"></i></button>
                        <button onClick={() => onDeleteProject(p.id)} className="text-slate-600 hover:text-red-500 p-2"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 border-dashed">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-white font-bold mb-1">System Archive & Portability</h3>
                  <p className="text-slate-500 text-sm">Download your entire research database or restore from a previous backup.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleExport} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold uppercase rounded">Export JSON</button>
                  <button onClick={() => restoreInputRef.current?.click()} className="px-6 py-2 border border-slate-700 hover:border-sky-500 text-sky-500 text-[10px] font-bold uppercase rounded">Restore Backup</button>
                  <input type="file" ref={restoreInputRef} onChange={handleRestore} className="hidden" accept=".json" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
