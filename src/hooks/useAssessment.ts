import { useState, useCallback } from 'react';
import { AssessmentResponse, AssessmentProgress, AssessmentResult, WISCARScore, CareerMatch } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const useAssessment = () => {
  const [progress, setProgress] = useState<AssessmentProgress>({
    currentSection: 'psychometric',
    currentQuestion: 0,
    totalQuestions: assessmentQuestions.length,
    sectionsCompleted: [],
    responses: []
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const submitResponse = useCallback((questionId: string, value: number) => {
    setProgress(prev => {
      const newResponses = [...prev.responses.filter(r => r.questionId !== questionId)];
      newResponses.push({
        questionId,
        value,
        timestamp: new Date()
      });

      const nextQuestion = Math.min(prev.currentQuestion + 1, prev.totalQuestions - 1);
      const currentQuestionData = assessmentQuestions[nextQuestion];
      
      return {
        ...prev,
        responses: newResponses,
        currentQuestion: nextQuestion,
        currentSection: currentQuestionData?.section || prev.currentSection
      };
    });
  }, []);

  const calculateResults = useCallback((): AssessmentResult => {
    const responses = progress.responses;
    
    // Calculate psychometric score
    const psychometricResponses = responses.filter(r => 
      assessmentQuestions.find(q => q.id === r.questionId)?.section === 'psychometric'
    );
    const psychometricScore = Math.round(
      (psychometricResponses.reduce((sum, r) => sum + r.value, 0) / (psychometricResponses.length * 5)) * 100
    );

    // Calculate technical score
    const technicalResponses = responses.filter(r => 
      assessmentQuestions.find(q => q.id === r.questionId)?.section === 'technical'
    );
    const technicalScore = Math.round(
      (technicalResponses.reduce((sum, r) => sum + r.value, 0) / (technicalResponses.length * 5)) * 100
    );

    // Calculate WISCAR scores
    const wiscarResponses = responses.filter(r => 
      assessmentQuestions.find(q => q.id === r.questionId)?.section === 'wiscar'
    );
    
    const wiscarScores: WISCARScore = {
      will: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'will'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20),
      interest: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'interest'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20),
      skill: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'skill'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20),
      cognitive: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'cognitive'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20),
      ability: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'ability'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20),
      realWorld: Math.round((wiscarResponses.filter(r => 
        assessmentQuestions.find(q => q.id === r.questionId)?.subsection === 'real_world'
      ).reduce((sum, r) => sum + r.value, 0) / 5) * 20)
    };

    // Calculate overall score
    const overallScore = Math.round((psychometricScore + technicalScore + 
      Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3);

    // Determine recommendation
    let recommendation: 'yes' | 'no' | 'maybe' = 'maybe';
    if (overallScore >= 70) recommendation = 'yes';
    else if (overallScore < 40) recommendation = 'no';

    // Generate feedback
    const feedback = generateFeedback(overallScore, psychometricScore, technicalScore, wiscarScores);

    // Generate next steps
    const nextSteps = generateNextSteps(recommendation, technicalScore);

    // Generate career matches
    const careerMatches = generateCareerMatches(overallScore, technicalScore);

    return {
      userId: 'user-' + Date.now(),
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      feedback,
      nextSteps,
      careerMatches,
      completedAt: new Date()
    };
  }, [progress.responses]);

  const completeAssessment = useCallback(() => {
    const assessmentResult = calculateResults();
    setResult(assessmentResult);
    setIsCompleted(true);
  }, [calculateResults]);

  const resetAssessment = useCallback(() => {
    setProgress({
      currentSection: 'psychometric',
      currentQuestion: 0,
      totalQuestions: assessmentQuestions.length,
      sectionsCompleted: [],
      responses: []
    });
    setIsCompleted(false);
    setResult(null);
  }, []);

  const getCurrentQuestion = () => {
    return assessmentQuestions[progress.currentQuestion];
  };

  const isLastQuestion = () => {
    return progress.currentQuestion >= assessmentQuestions.length - 1;
  };

  return {
    progress,
    isCompleted,
    result,
    submitResponse,
    completeAssessment,
    resetAssessment,
    getCurrentQuestion,
    isLastQuestion
  };
};

const generateFeedback = (
  overall: number, 
  psychometric: number, 
  technical: number, 
  wiscar: WISCARScore
): string => {
  if (overall >= 70) {
    return "Excellent! You show strong alignment with IIoT Integration. Your combination of technical aptitude, genuine interest, and cognitive fit suggests you'd thrive in this field. Consider starting with hands-on projects to build practical experience.";
  } else if (overall >= 40) {
    return "You show potential for IIoT Integration with some areas for development. Focus on strengthening your technical foundation while exploring the field through online courses and maker projects to confirm your interest.";
  } else {
    return "IIoT Integration may not be the best fit based on your current profile. Consider exploring related fields like data analysis, user experience design, or project management where your other strengths might be better utilized.";
  }
};

const generateNextSteps = (recommendation: 'yes' | 'no' | 'maybe', technicalScore: number): string[] => {
  if (recommendation === 'yes') {
    return [
      "Start with PLC programming fundamentals (Ladder Logic)",
      "Learn industrial communication protocols (Modbus, OPC-UA)",
      "Get hands-on with Arduino/Raspberry Pi IoT projects",
      "Explore SCADA software like Ignition or WinCC",
      "Consider industrial automation certifications"
    ];
  } else if (recommendation === 'maybe') {
    return [
      "Take an introductory course in industrial automation",
      "Try Arduino starter kits to gauge your interest",
      "Shadow an automation engineer or visit industrial facilities",
      "Strengthen programming fundamentals (Python recommended)",
      "Explore online simulations of industrial processes"
    ];
  } else {
    return [
      "Consider data analysis or business intelligence roles",
      "Explore UX/UI design for industrial applications",
      "Look into project management in tech industries",
      "Consider sales engineering for technical products",
      "Explore quality assurance and testing roles"
    ];
  }
};

const generateCareerMatches = (overall: number, technical: number): CareerMatch[] => {
  const baseMatches: CareerMatch[] = [
    {
      role: "IIoT Integrator",
      description: "Connect OT and IT systems using IoT technologies",
      matchPercentage: Math.max(overall - 10, 0),
      requiredSkills: ["PLC Programming", "Industrial Protocols", "IoT Platforms", "Networking"],
      salaryRange: "$65,000 - $95,000"
    },
    {
      role: "Automation Engineer", 
      description: "Design and implement automated industrial systems",
      matchPercentage: Math.max(overall - 5, 0),
      requiredSkills: ["SCADA", "PLC Programming", "Process Control", "Electrical Systems"],
      salaryRange: "$70,000 - $105,000"
    },
    {
      role: "Controls Engineer",
      description: "Design control systems for industrial processes",
      matchPercentage: Math.max(technical, 0),
      requiredSkills: ["Control Theory", "PID Tuning", "Instrumentation", "Safety Systems"],
      salaryRange: "$75,000 - $110,000"
    },
    {
      role: "Industrial Data Analyst",
      description: "Analyze sensor data for operational insights",
      matchPercentage: Math.max(overall - 20, 0),
      requiredSkills: ["Python", "Time Series Analysis", "SQL", "Data Visualization"],
      salaryRange: "$60,000 - $85,000"
    }
  ];

  return baseMatches.filter(match => match.matchPercentage > 30);
};