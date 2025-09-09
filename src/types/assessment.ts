export interface AssessmentQuestion {
  id: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  subsection: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'technical';
  question: string;
  options?: string[];
  weight: number;
  category: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: number;
  timestamp: Date;
}

export interface SectionScore {
  section: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  userId: string;
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  feedback: string;
  nextSteps: string[];
  careerMatches: CareerMatch[];
  completedAt: Date;
}

export interface CareerMatch {
  role: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  salaryRange: string;
}

export interface AssessmentProgress {
  currentSection: string;
  currentQuestion: number;
  totalQuestions: number;
  sectionsCompleted: string[];
  responses: AssessmentResponse[];
}