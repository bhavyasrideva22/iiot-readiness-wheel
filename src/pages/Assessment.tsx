import React from 'react';
import { AssessmentCard } from '@/components/assessment/AssessmentCard';
import { ResultsPage } from '@/components/results/ResultsPage';
import { useAssessment } from '@/hooks/useAssessment';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const {
    progress,
    isCompleted,
    result,
    submitResponse,
    completeAssessment,
    resetAssessment,
    getCurrentQuestion,
    isLastQuestion
  } = useAssessment();

  const currentQuestion = getCurrentQuestion();

  const handleAnswer = (value: number) => {
    if (currentQuestion) {
      submitResponse(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (isLastQuestion()) {
      completeAssessment();
    }
  };

  const handleRestart = () => {
    resetAssessment();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Show results page if assessment is completed
  if (isCompleted && result) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleGoHome}
            className="mb-6 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <ResultsPage result={result} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  // Show assessment questions
  if (currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleGoHome}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <AssessmentCard
            question={currentQuestion}
            questionNumber={progress.currentQuestion + 1}
            totalQuestions={progress.totalQuestions}
            selectedValue={progress.responses.find(r => r.questionId === currentQuestion.id)?.value}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLastQuestion={isLastQuestion()}
            canGoBack={progress.currentQuestion > 0}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Assessment;