import React from 'react';
import { useAppState } from '../contexts/AppStateContext';

export const JourneyToggle: React.FC = () => {
  const { journeyPreference, setJourneyPreference } = useAppState();

  return (
    <div>
      <div className="section-title">
        <h3 style={{ margin: 0 }}>Choose your journey</h3>
        <span>Tailor the explanations to your style</span>
      </div>
      <div className="toggle" role="group" aria-label="Journey preference">
        <button
          className={journeyPreference === 'simple' ? 'active' : ''}
          onClick={() => setJourneyPreference('simple')}
          type="button"
        >
          Simple overview
        </button>
        <button
          className={journeyPreference === 'examples' ? 'active' : ''}
          onClick={() => setJourneyPreference('examples')}
          type="button"
        >
          Show me examples
        </button>
      </div>
    </div>
  );
};
