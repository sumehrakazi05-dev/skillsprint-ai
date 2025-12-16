import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { SkillGapAnalysis } from '../types';

interface SkillGapChartProps {
  analysis: SkillGapAnalysis;
}

const SkillGapChart: React.FC<SkillGapChartProps> = ({ analysis }) => {
  const data = [
    { name: 'Match', value: analysis.matchPercentage },
    { name: 'Gap', value: 100 - analysis.matchPercentage },
  ];

  const COLORS = ['#0ea5e9', '#334155']; // brand-500 and slate-700

  return (
    <div className="h-64 w-full relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
            itemStyle={{ color: '#f1f5f9' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-bold text-white">{analysis.matchPercentage}%</span>
        <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Match</span>
      </div>
    </div>
  );
};

export default SkillGapChart;
