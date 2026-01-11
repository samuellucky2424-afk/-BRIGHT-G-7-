
import React, { useState } from 'react';
import { getLogisticsAdvice } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    const advice = await getLogisticsAdvice(query);
    setResponse(advice || 'Service temporarily unavailable.');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-[calc(100vw-2rem)] md:w-[24rem] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-950 p-6 text-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
                  ⚡
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest leading-none">Logistics AI</h3>
                  <p className="text-[10px] font-bold text-slate-500 tracking-tighter mt-1 uppercase">Instant Consultant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">✕</button>
            </div>
          </div>
          
          <div className="p-6 flex-1 max-h-[22rem] overflow-y-auto space-y-4 text-sm scrollbar-thin">
            {!response && !loading && (
              <div className="text-center py-10">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Awaiting Input</p>
                <p className="text-slate-600 font-medium">Ask about routes, container specs, or international regulations.</p>
              </div>
            )}
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consulting Core...</span>
              </div>
            )}
            
            {response && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed font-medium shadow-sm">
                {response}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How to ship heavy machinery?"
              className="flex-1 bg-white px-5 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-200 transition-all"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-orange-500 text-white w-12 h-12 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-90"
            >
              🚀
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-slate-950 text-white w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center text-2xl hover:bg-orange-600 transition-all hover:-translate-y-2 active:scale-95"
        >
          <span className="group-hover:animate-bounce">💬</span>
        </button>
      )}
    </div>
  );
};

export default AIConsultant;
