
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-sky-900/10 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/20 text-sky-400 rounded-2xl mb-6 border border-sky-500/30">
          <i className="fas fa-paper-plane text-2xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Stay Ahead of the Threat</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Get my latest research findings, project updates, and deep-dives into emerging cyber trends delivered directly to your inbox.
        </p>

        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl animate-bounce">
            <i className="fas fa-check-circle mr-2"></i> Subscription confirmed! Welcome to the loop.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your security-conscious email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
            <button
              disabled={status === 'loading'}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center"
            >
              {status === 'loading' ? (
                <i className="fas fa-circle-notch animate-spin"></i>
              ) : (
                'Secure My Spot'
              )}
            </button>
          </form>
        )}
        <p className="mt-6 text-xs text-slate-500">
          No spam. No trackers. Just quality technical content.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
