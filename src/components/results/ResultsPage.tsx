import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AssessmentResult } from '@/types/assessment';
import { ScoreRadar } from './ScoreRadar';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Briefcase, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, onRestart }) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />;
      default:
        return <AlertCircle className="w-8 h-8 text-warning" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'bg-success/10 border-success text-success';
      case 'no':
        return 'bg-destructive/10 border-destructive text-destructive';
      default:
        return 'bg-warning/10 border-warning text-warning';
    }
  };

  const getRecommendationTitle = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'Strong Fit - Recommended';
      case 'no':
        return 'Not Recommended at This Time';
      default:
        return 'Potential Fit - With Development';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-warning';  
    return 'text-destructive';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Your IIoT Integration Assessment Results
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your responses, here's your comprehensive evaluation for pursuing a career in Industrial IoT Integration.
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="shadow-elevated border-2">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            {getRecommendationIcon(result.recommendation)}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {getRecommendationTitle(result.recommendation)}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {result.overallScore}%
                </span>
                <Badge className={cn("px-3 py-1", getRecommendationColor(result.recommendation))}>
                  Overall Fit Score
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {result.feedback}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Score Breakdown */}
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Psychometric Fit</span>
                <span className={cn("text-lg font-bold", getScoreColor(result.psychometricScore))}>
                  {result.psychometricScore}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="h-3 bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${result.psychometricScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Technical Readiness</span>
                <span className={cn("text-lg font-bold", getScoreColor(result.technicalScore))}>
                  {result.technicalScore}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="h-3 bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${result.technicalScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">WISCAR Average</span>
                <span className={cn("text-lg font-bold", 
                  getScoreColor(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6))}>
                  {Math.round(Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="h-3 bg-success rounded-full transition-all duration-500"
                  style={{ width: `${Object.values(result.wiscarScores).reduce((a, b) => a + b, 0) / 6}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Radar */}
        <ScoreRadar scores={result.wiscarScores} />
      </div>

      {/* Career Matches */}
      {result.careerMatches.length > 0 && (
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Career Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {result.careerMatches.map((match, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-industrial transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{match.role}</h4>
                    <Badge variant="secondary">{match.matchPercentage}% match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{match.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-primary">{match.salaryRange}</div>
                    <div className="flex flex-wrap gap-1">
                      {match.requiredSkills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="shadow-industrial">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} variant="outline" size="lg">
          Take Assessment Again
        </Button>
        <Button 
          onClick={() => window.print()} 
          size="lg"
          className="bg-gradient-primary hover:shadow-glow"
        >
          Save Results
        </Button>
      </div>
    </div>
  );
};