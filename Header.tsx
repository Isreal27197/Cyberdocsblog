
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, searchQuery, setSearchQuery }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Toolbox', path: '/toolbox' },
    { name: 'Projects', path: '/projects' },
    { name: 'Admin', path: '/admin', icon: 'fa-lock' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center">
              <i className="fas fa-shield-alt text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              CYBER<span className="text-sky-500">DOCS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-sky-400 flex items-center gap-2 ${
                  location.pathname === link.path ? 'text-sky-500' : 'text-slate-300'
                }`}
              >
                {link.icon && <i className={`fas ${link.icon} text-[10px]`}></i>}
                {link.name}
              </Link>
            ))}
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all w-40 group-focus-within:w-64"
              />
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <i className="fas fa-times-circle text-xs"></i>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 py-4 px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-300 hover:text-sky-400 font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg py-2 px-4 pl-10 focus:outline-none"
            />
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
