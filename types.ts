export interface DailyTask {
  day: number;
  title: string;
  description: string;
  focus: 'Theory' | 'Practice' | 'Project';
  estimatedHours: number;
  resources: string[]; // List of topic keywords to search or specific links if generated
}

export interface WeeklyPlan {
  weekNumber: number;
  theme: string;
  goal: string;
  days: DailyTask[];
}

export interface SkillGapAnalysis {
  matchPercentage: number;
  missingSkills: string[];
  presentSkills: string[];
  roleSummary: string;
  recommendation: string;
}

export interface SprintPlan {
  role: string;
  analysis: SkillGapAnalysis;
  roadmap: WeeklyPlan[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
