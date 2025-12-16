import React, { useState } from 'react';
import { SprintPlan, WeeklyPlan, DailyTask } from '../types';
import { CheckCircle2, Circle, Code, BookOpen, Hammer, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

interface RoadmapViewProps {
  plan: SprintPlan;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ plan }) => {
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<DailyTask | null>(plan.roadmap[0].days[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left Column: Timeline */}
      <div className="lg:w-1/2 flex flex-col gap-4 overflow-y-auto pr-2 max-h-[800px]">
        {plan.roadmap.map((week) => (
          <div key={week.weekNumber} className="border border-slate-800 bg-slate-900/50 rounded-xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => setExpandedWeek(expandedWeek === week.weekNumber ? -1 : week.weekNumber)}
              className="w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${expandedWeek === week.weekNumber ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  W{week.weekNumber}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-100">{week.theme}</h3>
                  <p className="text-xs text-slate-400">{week.goal}</p>
                </div>
              </div>
              {expandedWeek === week.weekNumber ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>

            {expandedWeek === week.weekNumber && (
              <div className="p-2 space-y-1 bg-slate-950/30">
                {week.days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedDay?.day === day.day && selectedDay?.title === day.title
                        ? 'bg-brand-900/30 border border-brand-500/30'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0">
                       {/* Just a visual indicator of completion state (mocked) */}
                       <Circle size={18} className="text-slate-600" />
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex items-center justify-between">
                         <span className={`text-sm font-medium ${selectedDay === day ? 'text-brand-300' : 'text-slate-300'}`}>
                           Day {day.day}
                         </span>
                         <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded">
                           {day.focus}
                         </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate w-64">{day.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Column: Day Detail */}
      <div className="lg:w-1/2">
        {selectedDay ? (
          <div className="glass-panel p-8 rounded-2xl h-full sticky top-4 border-t-4 border-t-brand-500">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-brand-500/20 text-brand-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Day {selectedDay.day}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                selectedDay.focus === 'Project' ? 'bg-purple-500/20 text-purple-300' :
                selectedDay.focus === 'Theory' ? 'bg-blue-500/20 text-blue-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {selectedDay.focus} Mode
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{selectedDay.title}</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">{selectedDay.description}</p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hammer size={16} /> Action Items
                </h4>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] h-[20px] rounded-full border-2 border-slate-600"></div>
                    <p className="text-slate-300 text-sm">{selectedDay.description} (Complete this within {selectedDay.estimatedHours} hours)</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BookOpen size={16} /> Learning Resources
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDay.resources.map((res, idx) => (
                    <a 
                      key={idx}
                      href={`https://www.google.com/search?q=${encodeURIComponent(res + ' tutorial')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-brand-300 group-hover:text-brand-200">{res}</span>
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a day to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapView;
