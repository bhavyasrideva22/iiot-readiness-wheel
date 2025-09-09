import React from 'react';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  question: string;
  onSelect: (value: number) => void;
  selectedValue?: number;
  className?: string;
}

const likertOptions = [
  { value: 1, label: 'Strongly Disagree', color: 'text-destructive' },
  { value: 2, label: 'Disagree', color: 'text-warning' },
  { value: 3, label: 'Neutral', color: 'text-muted-foreground' },
  { value: 4, label: 'Agree', color: 'text-primary' },
  { value: 5, label: 'Strongly Agree', color: 'text-success' }
];

export const LikertScale: React.FC<LikertScaleProps> = ({
  question,
  onSelect,
  selectedValue,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-foreground leading-relaxed">
        {question}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {likertOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all duration-200 text-center hover:shadow-industrial",
              "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedValue === option.value
                ? "border-primary bg-primary/10 shadow-industrial"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="text-2xl font-bold mb-2">{option.value}</div>
            <div className={cn(
              "text-sm font-medium",
              selectedValue === option.value ? "text-primary" : option.color
            )}>
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};