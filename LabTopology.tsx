
import React from 'react';
import { TopologyNode, TopologyLink } from '../types';

interface LabTopologyProps {
  nodes: TopologyNode[];
  links: TopologyLink[];
}

const LabTopology: React.FC<LabTopologyProps> = ({ nodes, links }) => {
  const getIcon = (type: TopologyNode['type']) => {
    switch (type) {
      case 'server': return 'fa-server';
      case 'client': return 'fa-desktop';
      case 'database': return 'fa-database';
      case 'firewall': return 'fa-shield-halved';
      case 'cloud': return 'fa-cloud';
      case 'attacker': return 'fa-user-secret';
      default: return 'fa-circle';
    }
  };

  const getColor = (type: TopologyNode['type']) => {
    switch (type) {
      case 'attacker': return 'text-red-500';
      case 'firewall': return 'text-amber-500';
      case 'server': return 'text-sky-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-8 mb-12 relative overflow-hidden group">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Lab Map</span>
      </div>
      
      <svg className="w-full h-[300px]" viewBox="0 0 800 300">
        {/* Links */}
        {links.map((link, i) => {
          const from = nodes.find(n => n.id === link.from);
          const to = nodes.find(n => n.id === link.to);
          if (!from || !to) return null;
          return (
            <line 
              key={i} 
              x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
              stroke="#334155" strokeWidth="1" strokeDasharray="4 4"
              className="group-hover:stroke-sky-500/30 transition-colors duration-500"
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-help">
            <circle r="22" className="fill-slate-900 stroke-slate-800" strokeWidth="1" />
            <foreignObject x="-15" y="-15" width="30" height="30">
              <div className={`w-full h-full flex items-center justify-center ${getColor(node.type)}`}>
                <i className={`fas ${getIcon(node.type)} text-sm`}></i>
              </div>
            </foreignObject>
            <text y="40" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono font-bold uppercase tracking-tighter">
              {node.label}
            </text>
            {node.ip && (
              <text y="52" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">
                {node.ip}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between text-[9px] text-slate-600 font-mono">
        <span>[STATUS: VIRTUALIZED]</span>
        <span>[NODES: {nodes.length}]</span>
      </div>
    </div>
  );
};

export default LabTopology;
