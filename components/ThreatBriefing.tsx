
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const ThreatBriefing: React.FC = () => {
  const [brief, setBrief] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sources, setSources] = useState<{web: {uri: string, title: string}}[]>([]);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Summarize the 3 most critical cybersecurity vulnerabilities (CVEs) or breaches reported in the last 48 hours. Provide a very concise bulleted list with technical impact and potential mitigation.",
          config: {
            tools: [{googleSearch: {}}],
          },
        });

        setBrief(response.text || "Intelligence feed currently unavailable.");
        if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
          const chunks = response.candidates[0].groundingMetadata.groundingChunks as any;
          setSources(chunks.filter((c: any) => c.web));
        }
      } catch (error) {
        console.error("Briefing error:", error);
        setBrief("Could not load latest threat intelligence. The intelligence node might be temporarily down or undergoing maintenance.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBriefing();
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl mb-12">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Live Threat Intelligence</h3>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase">Real-time Grounding Enabled</span>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        ) : (
          <>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
              <div className="whitespace-pre-wrap leading-relaxed">{brief}</div>
            </div>
            {sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Sources Found:</span>
                <div className="flex flex-wrap gap-3">
                  {sources.slice(0, 3).map((s, i) => (
                    <a 
                      key={i} 
                      href={s.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center bg-sky-500/5 px-2 py-1 rounded border border-sky-500/10"
                    >
                      <i className="fas fa-external-link-alt mr-1"></i> {s.web.title || 'Intel Source'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThreatBriefing;
