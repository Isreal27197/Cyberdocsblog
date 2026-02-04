
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../types';

interface ArticleDetailProps {
  posts: BlogPost[];
}

const CodeBlock = ({ children, className }: { children?: any, className?: string }) => {
  const [copied, setCopied] = useState(false);
  const content = String(children || '').replace(/\n$/, '');
  const language = className?.replace('language-', '') || 'text';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={handleCopy}
          className="bg-slate-700/80 hover:bg-sky-600 text-white text-[10px] font-bold py-1 px-3 rounded border border-slate-600 transition-colors"
        >
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>
      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{language}</span>
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          </div>
        </div>
        <pre className={`${className} p-4 text-sm font-mono leading-relaxed overflow-x-auto no-scrollbar`}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);
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
    if (post?.content) {
      const h: {id: string, text: string, level: number}[] = [];
      const lines = post.content.split('\n');
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
  }, [post]);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl text-white">Article not found</h2>
        <Link to="/" className="text-sky-400 mt-4 inline-block hover:underline">Back to Home</Link>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="py-12 bg-slate-900 min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 h-1 bg-sky-500/20 w-full z-50">
        <div className="h-full bg-sky-500 transition-all duration-75" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-sky-400 mb-8 transition-colors group text-xs font-bold uppercase tracking-widest">
          <i className="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i> Back to Archive
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-3">
            <header className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase rounded border border-sky-500/20">
                  {post.category}
                </span>
                <span className="text-slate-500 text-xs font-mono">{post.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight font-mono">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-slate-400">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mr-3 border border-slate-700">
                    <i className="fas fa-fingerprint text-sky-400"></i>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">{post.author}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-slate-500">Node ID: {post.id}</span>
                  </div>
                </div>
                <div className="border-l border-slate-700 pl-6 hidden sm:block">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold">Complexity</span>
                  <span className="block text-xs font-medium text-white">Advanced Analysis</span>
                </div>
              </div>
            </header>

            <div className="relative h-[350px] mb-12 rounded-3xl overflow-hidden border border-slate-800 group">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
            </div>

            <div className="prose prose-invert prose-sky max-w-none prose-headings:font-mono prose-headings:tracking-tight prose-a:text-sky-400 prose-img:rounded-xl">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                    return <h1 id={id} className="scroll-mt-24">{children}</h1>
                  },
                  h2: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                    return <h2 id={id} className="scroll-mt-24">{children}</h2>
                  },
                  code: ({ node, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <CodeBlock className={className}>{children}</CodeBlock>
                    ) : (
                      <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Related Docs */}
            {relatedPosts.length > 0 && (
              <div className="mt-20 pt-12 border-t border-slate-800">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Related Intelligence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(p => (
                    <Link key={p.id} to={`/article/${p.id}`} className="block p-6 bg-slate-800/40 border border-slate-800 rounded-xl hover:border-sky-500/50 transition-all group">
                      <span className="text-[10px] font-bold text-sky-500 uppercase block mb-2">{p.category}</span>
                      <h4 className="text-white font-bold mb-2 group-hover:text-sky-400 transition-colors">{p.title}</h4>
                      <div className="flex items-center text-[10px] text-slate-500 space-x-3">
                        <span>{p.date}</span>
                        <span>{p.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-slate-700 pb-2">Research Index</h3>
                <nav className="space-y-4">
                  {headings.length > 0 ? (
                    headings.map((h, i) => (
                      <a 
                        key={i} 
                        href={`#${h.id}`}
                        className={`block text-xs font-medium transition-colors hover:text-sky-400 ${
                          h.level === 1 ? 'text-slate-300' : 'text-slate-500 pl-3 border-l border-slate-700 ml-1'
                        }`}
                      >
                        {h.text}
                      </a>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-600 italic">No sections detected in document.</span>
                  )}
                </nav>
              </div>

              <div className="p-6 border border-slate-800 border-dashed rounded-2xl">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Article Tools</h4>
                <div className="space-y-3">
                  <button onClick={() => window.print()} className="w-full text-left text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center">
                    <i className="fas fa-file-pdf mr-3 w-4"></i> Export Technical Report
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to dashboard.');
                  }} className="w-full text-left text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center">
                    <i className="fas fa-share-nodes mr-3 w-4"></i> Generate Node Link
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
