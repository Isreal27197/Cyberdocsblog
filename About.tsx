
import React from 'react';
import SkillMatrix from '../components/SkillMatrix';
import { PROFILE_DATA } from '../constants';

const About: React.FC = () => {
  return (
    <div className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-16">
            
            <header className="space-y-6">
              <div className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-sky-400 uppercase bg-sky-400/10 border border-sky-400/20 rounded-full">
                Personnel Identity Verified
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white font-mono tracking-tighter">
                {PROFILE_DATA.name.split(' ')[0]}<span className="text-sky-500">{PROFILE_DATA.name.split(' ')[1]}</span>
              </h1>
              <p className="text-2xl text-slate-400 font-light italic">
                "{PROFILE_DATA.tagline}"
              </p>
            </header>

            <section className="bg-slate-800/20 rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <i className="fas fa-fingerprint text-8xl text-sky-500"></i>
              </div>
              <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center">
                <i className="fas fa-user-tie mr-3 text-sky-500"></i> Dossier Summary
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                {PROFILE_DATA.bio}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Focus Areas</span>
                  <span className="text-white text-sm">Security Research & Infrastructure Defense</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Primary Toolset</span>
                  <span className="text-white text-sm">Python, Solidity, Lua, Ansible</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-8 flex items-center">
                <i className="fas fa-code-branch mr-3 text-emerald-500"></i> Open Source Contributions
              </h2>
              <div className="space-y-4">
                {PROFILE_DATA.contributions.map((contribution, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="mr-4 mt-1.5 w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform"></div>
                    <p className="text-slate-400 text-sm leading-relaxed border-b border-slate-800 pb-4 flex-grow group-hover:text-slate-200 transition-colors">
                      {contribution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-12">
            
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-8 sticky top-24">
              <SkillMatrix skills={PROFILE_DATA.skills} />
              
              <div className="mt-12 space-y-8">
                <div>
                  <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center">
                    <i className="fas fa-certificate mr-2 text-amber-500"></i> Credentials
                  </h4>
                  <ul className="space-y-3">
                    {PROFILE_DATA.certifications.map(cert => (
                      <li key={cert} className="text-xs text-slate-400 flex items-center">
                        <i className="fas fa-check text-[8px] text-emerald-500 mr-2"></i> {cert}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center">
                    <i className="fas fa-link mr-2 text-sky-500"></i> Secure Channels
                  </h4>
                  <div className="flex gap-4">
                    <a href={PROFILE_DATA.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href={PROFILE_DATA.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href={PROFILE_DATA.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={PROFILE_DATA.socialLinks.email} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500 transition-all">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
