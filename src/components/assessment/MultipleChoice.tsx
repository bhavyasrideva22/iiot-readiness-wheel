import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface MultipleChoiceProps {
  question: string;
  options: string[];
  onSelect: (value: number) => void;
  selectedValue?: number;
  className?: string;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  options,
  onSelect,
  selectedValue,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-foreground leading-relaxed">
        {question}
      </h3>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index + 1)}
            className={cn(
              "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
              "hover:shadow-industrial hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "flex items-center gap-3",
              selectedValue === index + 1
                ? "border-primary bg-primary/10 shadow-industrial"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              selectedValue === index + 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground"
            )}>
              {selectedValue === index + 1 && (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};