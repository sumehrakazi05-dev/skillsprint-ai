import React, { useState } from 'react';
import { AppState, SprintPlan } from './types';
import { generateSkillSprint } from './services/geminiService';
import InputForm from './components/InputForm';
import RoadmapView from './components/RoadmapView';
import SkillGapChart from './components/SkillGapChart';
import { Zap, AlertTriangle, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [plan, setPlan] = useState<SprintPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (jd: string, skills: string) => {
    setState(AppState.ANALYZING);
    setError(null);
    try {
      const result = await generateSkillSprint(jd, skills);
      setPlan(result);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please try again with a clearer job description.");
      setState(AppState.ERROR);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500 selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <div className="w-8 h-8 bg-gradient-to-tr from-brand-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SkillSprint<span className="text-brand-400">AI</span></span>
          </div>
          {state === AppState.SUCCESS && (
            <button 
              onClick={reset}
              className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={14} /> New Sprint
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {state === AppState.IDLE && (
          <div className="flex flex-col items-center justify-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              From Job Description to<br/>Daily Plan in 60 Seconds.
            </h1>
            <p className="text-lg text-slate-400 text-center max-w-2xl mb-12">
              Stop guessing what to learn. Paste a JD, tell us your skills, and get a hyper-personalized 30-day curriculum to land the role.
            </p>
            <InputForm onSubmit={handleGenerate} isLoading={false} />
          </div>
        )}

        {state === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full border-t-4 border-brand-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-4 border-purple-500 animate-spin animation-delay-200"></div>
              <div className="absolute inset-4 rounded-full border-b-4 border-white animate-spin animation-delay-500"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Architecting your sprint...</h2>
            <p className="text-slate-400 animate-pulse">Analyzing skill gaps and locating best resources</p>
          </div>
        )}

        {state === AppState.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
            <p className="text-slate-400 mb-6">{error}</p>
            <button 
              onClick={reset}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {state === AppState.SUCCESS && plan && (
          <div className="space-y-8 animate-fade-in">
            {/* Analysis Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Match Score */}
              <div className="glass-panel p-6 rounded-2xl md:col-span-1">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Role Fit</h3>
                <SkillGapChart analysis={plan.analysis} />
                <p className="text-center text-sm text-slate-400 mt-2">{plan.role}</p>
              </div>

              {/* Skill Breakdown */}
              <div className="glass-panel p-6 rounded-2xl md:col-span-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Analysis Summary</h3>
                  <p className="text-lg text-white mb-4">{plan.analysis.roleSummary}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                        <span className="text-red-400 font-bold text-sm block mb-2">Missing Skills (Priority)</span>
                        <div className="flex flex-wrap gap-2">
                          {plan.analysis.missingSkills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-red-500/20 text-red-200 text-xs rounded-md">{skill}</span>
                          ))}
                        </div>
                     </div>
                     <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                        <span className="text-green-400 font-bold text-sm block mb-2">Your Strengths</span>
                        <div className="flex flex-wrap gap-2">
                          {plan.analysis.presentSkills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded-md">{skill}</span>
                          ))}
                        </div>
                     </div>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg flex items-start gap-3">
                   <Zap className="text-brand-400 flex-shrink-0 mt-0.5" size={18} />
                   <p className="text-sm text-brand-100 italic">"{plan.analysis.recommendation}"</p>
                </div>
              </div>
            </div>

            {/* Roadmap Section */}
            <div className="mt-12">
               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="bg-gradient-to-r from-brand-400 to-purple-400 text-transparent bg-clip-text">30-Day Sprint Roadmap</span>
               </h2>
               <RoadmapView plan={plan} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
