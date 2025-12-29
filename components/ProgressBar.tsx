import React from 'react';
import { useAppState } from '../contexts/AppStateContext';

export const ProgressBar: React.FC = () => {
  const { progressPercent, completedConcepts, totalConcepts } = useAppState();

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span>Progress</span>
        <span>
          {completedConcepts.filter(Boolean).length} / {totalConcepts} concepts
        </span>
      </div>
      <div className="progress-track" aria-label="Learning progress">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
        />
      </div>
    </div>
  );
};
