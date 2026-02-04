
import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';

const COMMON_PORTS = [
  { port: 20, service: 'FTP Data', risk: 'Low', description: 'File Transfer Protocol (Data)' },
  { port: 21, service: 'FTP Control', risk: 'High', description: 'Command control. Often vulnerable to brute force.' },
  { port: 22, service: 'SSH', risk: 'Medium', description: 'Secure Shell. Secure if patched, high risk if weak creds.' },
  { port: 23, service: 'Telnet', risk: 'Critical', description: 'Unencrypted communication. Avoid use.' },
  { port: 25, service: 'SMTP', risk: 'Medium', description: 'Mail transfer. Vulnerable to relay attacks.' },
  { port: 53, service: 'DNS', risk: 'High', description: 'Domain Name System. Vulnerable to amplification/spoofing.' },
  { port: 80, service: 'HTTP', risk: 'Medium', description: 'Web traffic. Target for many web vulnerabilities.' },
  { port: 443, service: 'HTTPS', risk: 'Low', description: 'Secure Web traffic.' },
  { port: 445, service: 'SMB', risk: 'Critical', description: 'Server Message Block. Target for EternalBlue/WannaCry.' },
  { port: 3389, service: 'RDP', risk: 'High', description: 'Remote Desktop. Major target for ransomware.' },
];

const Toolbox: React.FC = () => {
  // Common Utilities State
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [hashOutput, setHashOutput] = useState('');
  const [jwtInput, setJwtInput] = useState('');
  const [jwtData, setJwtData] = useState<{header: any, payload: any} | null>(null);
  const [portSearch, setPortSearch] = useState('');

  // CVE Investigator State
  const [cveId, setCveId] = useState('');
  const [cveResult, setCveResult] = useState<string | null>(null);
  const [isCveLoading, setIsCveLoading] = useState(false);

  // Subnet Calc
  const [subnetIp, setSubnetIp] = useState('192.168.1.0');
  const [subnetMask, setSubnetMask] = useState('24');

  // Password Analyst
  const [passInput, setPassInput] = useState('');

  const calculateSubnet = () => {
    // Simplified calculator for UI demonstration
    const hostCount = Math.pow(2, 32 - parseInt(subnetMask)) - 2;
    return {
      network: subnetIp,
      mask: `/${subnetMask}`,
      usable: hostCount.toLocaleString(),
      range: `${subnetIp.split('.').slice(0,3).join('.')}.1 - .254`
    };
  };

  const getEntropy = (pass: string) => {
    if (!pass) return 0;
    let charsetSize = 0;
    if (/[a-z]/.test(pass)) charsetSize += 26;
    if (/[A-Z]/.test(pass)) charsetSize += 26;
    if (/[0-9]/.test(pass)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pass)) charsetSize += 32;
    return Math.floor(pass.length * Math.log2(charsetSize));
  };

  const handleBase64Encode = () => { try { setBase64Output(btoa(base64Input)); } catch (e) { setBase64Output('Error: Invalid encoding'); } };
  const handleBase64Decode = () => { try { setBase64Output(atob(base64Input)); } catch (e) { setBase64Output('Error: Invalid Base64'); } };
  
  const handleCveSearch = async () => {
    if (!cveId.trim()) return;
    setIsCveLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a technical summary of ${cveId}. Include: CVSS score, affected systems, exploit availability, and mitigation. Keep it concise for a security researcher's dashboard.`,
        config: { tools: [{googleSearch: {}}] }
      });
      setCveResult(response.text || 'No data found.');
    } catch (e) { setCveResult('Search failed. Ensure CVE ID is correct.'); }
    finally { setIsCveLoading(false); }
  };

  const subnetResult = calculateSubnet();
  const entropy = getEntropy(passInput);

  const filteredPorts = useMemo(() => {
    return COMMON_PORTS.filter(p => p.port.toString().includes(portSearch) || p.service.toLowerCase().includes(portSearch.toLowerCase()));
  }, [portSearch]);

  return (
    <div className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-mono">
            Researcher's <span className="text-sky-500">Toolbox</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
            Essential utilities for security analysis, documentation, and vulnerability research. All processing happens locally within your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* CVE Investigator */}
          <div className="lg:col-span-2 bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center">
                <i className="fas fa-search-location"></i>
              </div>
              <h3 className="text-xl font-bold text-white">CVE Intelligence</h3>
            </div>
            <div className="flex space-x-2 mb-6">
              <input 
                type="text" value={cveId} onChange={(e) => setCveId(e.target.value)}
                placeholder="CVE-2024-..."
                className="flex-grow bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 font-mono focus:ring-1 focus:ring-red-500 outline-none"
              />
              <button 
                onClick={handleCveSearch} disabled={isCveLoading}
                className="px-6 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg disabled:opacity-50 transition-all flex items-center"
              >
                {isCveLoading ? <i className="fas fa-circle-notch animate-spin"></i> : 'QUERY'}
              </button>
            </div>
            <div className="flex-grow bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-xs overflow-y-auto max-h-[300px]">
              {cveResult ? (
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{cveResult}</div>
              ) : (
                <div className="text-slate-600 italic uppercase tracking-widest text-[10px]">Awaiting Uplink...</div>
              )}
            </div>
          </div>

          {/* Subnet Calculator */}
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-sky-500/20 text-sky-400 rounded-lg flex items-center justify-center"><i className="fas fa-network-wired"></i></div>
              <h3 className="text-xl font-bold text-white">Subnet Calc</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input type="text" value={subnetIp} onChange={e => setSubnetIp(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white flex-grow font-mono" />
                <input type="text" value={subnetMask} onChange={e => setSubnetMask(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white w-12 font-mono" />
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-700 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 uppercase font-bold">Network</span>
                  <span className="text-sky-400 font-mono">{subnetResult.network}{subnetResult.mask}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 uppercase font-bold">Usable Hosts</span>
                  <span className="text-white font-mono">{subnetResult.usable}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 uppercase font-bold">Host Range</span>
                  <span className="text-slate-300 font-mono">{subnetResult.range}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Base64 */}
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-xl">
             <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center"><i className="fas fa-random"></i></div>
                <h3 className="text-xl font-bold text-white">Base64 Converter</h3>
              </div>
              <textarea 
                value={base64Input} onChange={(e) => setBase64Input(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 mb-4 h-24 font-mono outline-none"
                placeholder="Data to encode/decode..."
              ></textarea>
              <div className="flex space-x-2 mb-4">
                <button onClick={handleBase64Encode} className="flex-grow py-2 bg-sky-600 text-[10px] font-bold rounded">ENCODE</button>
                <button onClick={handleBase64Decode} className="flex-grow py-2 bg-slate-700 text-[10px] font-bold rounded">DECODE</button>
              </div>
              <div className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sky-400 text-[10px] font-mono break-all min-h-[50px]">
                {base64Output || "Output..."}
              </div>
          </div>

          {/* Entropy Analyst */}
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-xl">
             <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center"><i className="fas fa-shield-cat"></i></div>
                <h3 className="text-xl font-bold text-white">Entropy Analyst</h3>
              </div>
              <input 
                type="password" value={passInput} onChange={(e) => setPassInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 mb-4 font-mono outline-none"
                placeholder="Test password complexity..."
              />
              <div className="space-y-4">
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${entropy < 40 ? 'bg-red-500' : entropy < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (entropy/80)*100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase font-bold">Strength</span>
                  <span className={`font-bold ${entropy < 40 ? 'text-red-400' : entropy < 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {entropy < 40 ? 'WEAK' : entropy < 60 ? 'MODERATE' : 'ROBUST'}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white font-mono">{entropy}</span>
                  <span className="text-[10px] text-slate-500 ml-1 uppercase">Bits</span>
                </div>
              </div>
          </div>

          {/* Port Cheat Sheet */}
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center"><i className="fas fa-list-check"></i></div>
              <h3 className="text-xl font-bold text-white">Node Reference</h3>
            </div>
            <input 
              type="text" value={portSearch} onChange={(e) => setPortSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 mb-4 text-[10px] text-slate-200 uppercase tracking-widest font-bold outline-none"
              placeholder="Filter services..."
            />
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredPorts.map(p => (
                <div key={p.port} className="flex items-center justify-between p-1.5 bg-slate-900/50 rounded border border-slate-700 group hover:border-amber-500/30">
                  <div>
                    <span className="text-sky-400 font-bold font-mono text-[10px]">{p.port}</span>
                    <span className="text-slate-400 text-[10px] ml-2 font-mono">{p.service}</span>
                  </div>
                  <span className={`text-[8px] font-bold px-1 rounded ${p.risk === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{p.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
