
import React from 'react';
import { Skill } from '../types';

interface SkillMatrixProps {
  skills: Skill[];
}

const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-xs uppercase tracking-widest">Technical Proficiency</h3>
        <span className="text-[10px] text-sky-500 font-mono">REAL-TIME DATA</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors">
                {skill.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(14,165,233,0.3)]"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-[8px] uppercase tracking-tighter text-slate-600 font-bold">{skill.category}</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 rounded-full ${i < Math.round(skill.level / 20) ? 'bg-sky-500/50' : 'bg-slate-800'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 border-dashed">
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            Proficiency levels are calculated based on completed lab projects, documented research papers, and peer-reviewed contributions within this hub.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
