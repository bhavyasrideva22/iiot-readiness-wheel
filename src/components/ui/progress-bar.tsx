import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  className,
  showText = true 
}) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full", className)}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progress
          </span>
          <span className="text-sm font-medium text-primary">
            {current} / {total}
          </span>
        </div>
      )}
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-primary transition-all duration-500 ease-out shadow-glow"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-center mt-1 text-muted-foreground">
          {percentage}% Complete
        </div>
      )}
    </div>
  );
};