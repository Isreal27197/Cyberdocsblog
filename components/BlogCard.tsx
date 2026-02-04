
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-sky-500/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-sky-900/10">
      <div className="relative overflow-hidden h-48">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-sky-400 border border-sky-400/30 rounded">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
          <span><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
          <span><i className="far fa-clock mr-1"></i> {post.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <Link
            to={`/article/${post.id}`}
            className="text-sky-400 text-sm font-semibold inline-flex items-center group-hover:underline"
          >
            Read More
            <i className="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
