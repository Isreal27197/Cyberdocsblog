
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// Added missing imports for markdown rendering
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SecurityAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are "DocBot", an elite cybersecurity research assistant for the CyberDocs hub. You provide deep technical analysis on network protocols, offensive security tactics, defensive posture, and web3 vulnerabilities. Your tone is professional, concise, and technical. When discussing code, prioritize readability and security. If asked about current events, use your search capabilities to find the latest CVEs or breach reports.',
        }
      });

      const aiResponse = response.text || "I was unable to process that technical query.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Interface connection failure. Please verify node connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-slate-900 border border-slate-800 w-[350px] sm:w-[450px] h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center border border-sky-400/30">
                <i className="fas fa-terminal text-white text-xs"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Security Node v2.5</h3>
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Active Research Feed</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 scroll-smooth bg-slate-900/80">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                  <i className="fas fa-shield-virus text-slate-600 text-2xl"></i>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-3">System Ready</p>
                <p className="text-slate-400 text-sm leading-relaxed px-6">Provide a CVE ID, protocol name, or audit target for technical documentation assistance.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sky-600 text-white rounded-tr-none shadow-lg shadow-sky-900/20' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-md font-mono text-[13px]'
                }`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query global intelligence..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-5 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 hover:text-sky-400 disabled:text-slate-700 transition-colors"
              >
                <i className="fas fa-bolt"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
        >
          <i className="fas fa-brain text-xl group-hover:scale-110 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-slate-900"></span>
        </button>
      )}
    </div>
  );
};

export default SecurityAssistant;
