
import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE_DATA } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center">
                <i className="fas fa-shield-alt text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                CYBER<span className="text-sky-500">DOCS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A personal research hub documenting technical cybersecurity insights, lab projects, and emerging defense trends.
            </p>
            <div className="flex space-x-4">
              <a href={PROFILE_DATA.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={PROFILE_DATA.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                <i className="fab fa-github"></i>
              </a>
              <a href={PROFILE_DATA.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={PROFILE_DATA.socialLinks.email} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-sky-400">Technical Docs</Link></li>
              <li><Link to="/projects" className="hover:text-sky-400">Active Labs</Link></li>
              <li><Link to="/toolbox" className="hover:text-sky-400">Researcher Toolbox</Link></li>
              <li><a href="#" className="hover:text-sky-400">System RSS</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Taxonomy</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-400">General Security</a></li>
              <li><a href="#" className="hover:text-sky-400">Network Security</a></li>
              <li><a href="#" className="hover:text-sky-400">Web3 Security</a></li>
              <li><a href="#" className="hover:text-sky-400">Security Research</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Receive notifications about my new findings.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-800 border border-slate-700 rounded py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-sky-600 rounded text-xs font-bold hover:bg-sky-500 transition-colors">
                GO
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} CyberDocs. Internal Research Documentation.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <a href="#" className="hover:text-slate-300">Open Node Link</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
