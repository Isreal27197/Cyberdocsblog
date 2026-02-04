
import React, { useState, useEffect, useRef } from 'react';

const LOG_MESSAGES = [
  "INBOUND: TCP 443 -> 192.168.1.45 [ACCEPTED]",
  "INBOUND: TCP 22 -> 192.168.1.102 [REJECTED]",
  "SYSLOG: Cron job @daily execution successful",
  "THREAT_INTEL: Emerging pattern detected in AS65530",
  "DOC_ENGINE: Syncing node 0x7F2A... [OK]",
  "FIREWALL: Port sweep detected from 104.22.10.1",
  "AUTH: Admin login detected from internal subnet",
  "MONITOR: CPU Load 12% | RAM 4.2GB/16GB",
  "SCANNER: No critical vulnerabilities found in last local audit",
  "UPLINK: Data transmission encrypted with AES-256",
];

const TerminalFeed: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial logs
    setLogs(LOG_MESSAGES.slice(0, 5));

    const interval = setInterval(() => {
      const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      const fullLog = `[${timestamp}] ${randomMsg}`;
      
      setLogs(prev => {
        const updated = [...prev, fullLog];
        return updated.slice(-6); // Keep last 6 logs
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 border-y border-slate-800 py-2 px-4 overflow-hidden h-12 flex items-center">
      <div className="flex items-center space-x-4 whitespace-nowrap animate-pulse-subtle">
        <span className="text-sky-500 font-bold font-mono text-[10px] uppercase tracking-tighter">System.Logs:</span>
        <div className="flex space-x-8">
          {logs.map((log, i) => (
            <span key={i} className="text-slate-500 font-mono text-[10px] transition-all duration-1000">
              {log}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalFeed;
