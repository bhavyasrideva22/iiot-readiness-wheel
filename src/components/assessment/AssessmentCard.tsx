import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { AssessmentQuestion } from '@/types/assessment';
import { LikertScale } from './LikertScale';
import { MultipleChoice } from './MultipleChoice';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedValue?: number;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isLastQuestion: boolean;
  canGoBack?: boolean;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onAnswer,
  onNext,
  onPrevious,
  isLastQuestion,
  canGoBack = false
}) => {
  const getSectionTitle = (section: string, subsection: string) => {
    const titles: Record<string, Record<string, string>> = {
      psychometric: {
        interest: 'Interest & Motivation',
        personality: 'Personality Fit',
      },
      technical: {
        prerequisites: 'Technical Foundation',
        networking: 'Industrial Networking',
      },
      wiscar: {
        will: 'Persistence & Grit',
        interest: 'Career Interest',
        skill: 'Current Skills',
        cognitive: 'Problem Solving',
        ability: 'Learning Ability',
        real_world: 'Job Alignment'
      }
    };
    return titles[section]?.[subsection] || subsection;
  };

  const getSectionColor = (section: string) => {
    const colors: Record<string, string> = {
      psychometric: 'text-primary',
      technical: 'text-accent',
      wiscar: 'text-success'
    };
    return colors[section] || 'text-primary';
  };

  const renderQuestion = () => {
    if (question.type === 'likert') {
      return (
        <LikertScale
          question={question.question}
          onSelect={onAnswer}
          selectedValue={selectedValue}
        />
      );
    }

    if (question.type === 'multiple-choice' || question.type === 'scenario' || question.type === 'technical') {
      return (
        <MultipleChoice
          question={question.question}
          options={question.options || []}
          onSelect={onAnswer}
          selectedValue={selectedValue}
        />
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-elevated border-0 bg-card">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className={cn("text-sm font-medium", getSectionColor(question.section))}>
                {getSectionTitle(question.section, question.subsection)}
              </div>
              <div className="text-xs text-muted-foreground">
                Question {questionNumber} of {totalQuestions}
              </div>
            </div>
          </div>
          <ProgressBar 
            current={questionNumber} 
            total={totalQuestions}
            showText={false}
          />
        </CardHeader>

        <CardContent className="space-y-8">
          {renderQuestion()}

          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={onNext}
              disabled={!selectedValue}
              className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};