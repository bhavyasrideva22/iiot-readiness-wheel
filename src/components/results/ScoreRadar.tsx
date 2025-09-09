import React from 'react';
import { WISCARScore } from '@/types/assessment';

interface ScoreRadarProps {
  scores: WISCARScore;
  className?: string;
}

export const ScoreRadar: React.FC<ScoreRadarProps> = ({ scores, className = '' }) => {
  const dimensions = [
    { key: 'will', label: 'Will', value: scores.will },
    { key: 'interest', label: 'Interest', value: scores.interest },
    { key: 'skill', label: 'Skill', value: scores.skill },
    { key: 'cognitive', label: 'Cognitive', value: scores.cognitive },
    { key: 'ability', label: 'Ability', value: scores.ability },
    { key: 'realWorld', label: 'Real-World Fit', value: scores.realWorld }
  ];

  const maxValue = 100;
  const center = 120;
  const radius = 100;

  // Calculate points for the radar chart
  const points = dimensions.map((dim, index) => {
    const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top
    const distance = (dim.value / maxValue) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y, ...dim };
  });

  // Create the polygon path
  const polygonPath = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Grid circles
  const gridCircles = [20, 40, 60, 80, 100].map(percent => (
    <circle
      key={percent}
      cx={center}
      cy={center}
      r={(percent / 100) * radius}
      fill="none"
      stroke="hsl(var(--border))"
      strokeWidth="1"
    />
  ));

  // Grid lines
  const gridLines = dimensions.map((_, index) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    const endX = center + radius * Math.cos(angle);
    const endY = center + radius * Math.sin(angle);
    return (
      <line
        key={index}
        x1={center}
        y1={center}
        x2={endX}
        y2={endY}
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />
    );
  });

  return (
    <div className={`bg-card rounded-lg p-6 shadow-industrial ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-center">WISCAR Assessment Profile</h3>
      
      <div className="flex justify-center">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {/* Grid */}
          {gridCircles}
          {gridLines}
          
          {/* Score polygon */}
          <path
            d={polygonPath}
            fill="hsl(var(--primary) / 0.2)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Score points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
              stroke="white"
              strokeWidth="2"
            />
          ))}
          
          {/* Labels */}
          {dimensions.map((dim, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const labelDistance = radius + 20;
            const labelX = center + labelDistance * Math.cos(angle);
            const labelY = center + labelDistance * Math.sin(angle);
            
            return (
              <g key={index}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-foreground"
                >
                  {dim.label}
                </text>
                <text
                  x={labelX}
                  y={labelY + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold fill-primary"
                >
                  {dim.value}%
                </text>
              </g>
            );
          })}
          
          {/* Center point */}
          <circle
            cx={center}
            cy={center}
            r="2"
            fill="hsl(var(--muted-foreground))"
          />
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {dimensions.map(dim => (
          <div key={dim.key} className="flex justify-between">
            <span className="text-muted-foreground">{dim.label}:</span>
            <span className="font-medium text-primary">{dim.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};