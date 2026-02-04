
import React from 'react';
import { Link } from 'react-router-dom';

interface StatsProps {
  articlesCount: number;
  projectsCount: number;
}

const Stats: React.FC<StatsProps> = ({ articlesCount, projectsCount }) => {
  const statsList = [
    { label: 'Articles Published', value: articlesCount, icon: 'fa-file-alt', color: 'text-sky-400' },
    { label: 'Research Projects', value: projectsCount, icon: 'fa-flask', color: 'text-purple-400' },
    { label: 'OS Contributions', value: 5, icon: 'fa-code-branch', color: 'text-emerald-400' },
  ];

  return (
    <section className="py-12 bg-slate-800/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {statsList.map((stat) => (
            <Link 
              key={stat.label} 
              to="/about"
              className="text-center group cursor-pointer hover:bg-slate-800 transition-all p-4 rounded-xl"
            >
              <div className={`text-3xl mb-2 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="text-3xl font-bold text-white mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                {stat.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
