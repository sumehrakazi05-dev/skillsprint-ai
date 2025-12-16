import React, { useState } from 'react';
import { ArrowRight, Sparkles, Briefcase, User } from 'lucide-react';

interface InputFormProps {
  onSubmit: (jd: string, skills: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [jd, setJd] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jd && skills) {
      onSubmit(jd, skills);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Job Description Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1">
            <Briefcase size={16} className="text-brand-400" />
            Paste Job Description
          </label>
          <div className="relative group">
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="e.g. Senior React Developer at TechCorp. Requirements: 5+ years React, TypeScript, Node.js..."
              className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </div>
        </div>

        {/* Current Skills Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1">
            <User size={16} className="text-purple-400" />
            Your Current Skills
          </label>
           <div className="relative group">
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. HTML, CSS, Basic JavaScript. I built a Todo app once."
              className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
              required
            />
             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-brand-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
           </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !jd || !skills}
          className={`
            w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]
            ${isLoading 
              ? 'bg-slate-800 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-lg shadow-brand-500/20'
            }
          `}
        >
          {isLoading ? (
            <>
              <Sparkles className="animate-spin" /> Analyzing Gap...
            </>
          ) : (
            <>
              Generate Sprint Plan <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
          <div className="text-brand-400 font-bold text-xl mb-1">Analyze</div>
          <div className="text-xs text-slate-500">Instant JD Breakdown</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
          <div className="text-purple-400 font-bold text-xl mb-1">Compare</div>
          <div className="text-xs text-slate-500">Skill Gap Detection</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
          <div className="text-green-400 font-bold text-xl mb-1">Plan</div>
          <div className="text-xs text-slate-500">30-Day Action Roadmap</div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
