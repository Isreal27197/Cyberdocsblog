
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    'Documenting Research.',
    'Sharing Projects.',
    'Analyzing Trends.',
    'Securing Systems.'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative py-20 overflow-hidden bg-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-sky-400 uppercase bg-sky-400/10 border border-sky-400/20 rounded-full">
            Personal Documentation Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 font-mono tracking-tight">
            I'm <span className="text-sky-500">{text}</span>
            <span className="animate-pulse">_</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            Exploring the frontiers of cybersecurity, from low-level network exploits to high-level Web3 auditing. My personal repository for projects, research papers, and technical insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#latest-posts"
              className="w-full sm:w-auto px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-sky-600/20"
            >
              Latest Articles
            </a>
            <a
              href="/projects"
              className="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all duration-200"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
