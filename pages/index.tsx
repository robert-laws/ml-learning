import Link from 'next/link';
import React from 'react';
import { JourneyToggle } from '../components/JourneyToggle';
import { ProgressBar } from '../components/ProgressBar';
import { useAppState } from '../contexts/AppStateContext';

const QUESTIONS = [
  {
    key: 'question1' as const,
    prompt: 'How familiar are you with machine learning fundamentals?',
    options: ['Just starting', 'Some hands-on practice', 'Comfortable and revisiting'],
  },
  {
    key: 'question2' as const,
    prompt: 'How do you prefer to learn new ideas?',
    options: ['Short explanations', 'Step-by-step guidance', 'Hands-on intuition with code'],
  },
  {
    key: 'question3' as const,
    prompt: 'Which skill are you aiming to strengthen first?',
    options: ['Vocabulary & concepts', 'Model intuition', 'Practical implementation'],
  },
];

export default function HomePage() {
  const { formResponses, updateResponse, progressPercent } = useAppState();

  return (
    <main>
      <div className="container stack">
        <div className="card stack">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p className="badge">Guided ML journey</p>
              <h1>Shape your learning path</h1>
              <p style={{ color: 'var(--muted)', maxWidth: 720 }}>
                Answer a few questions to tailor the curriculum. Your responses, journey preference, and
                progress are stored locally so you can pick up right where you left off.
              </p>
            </div>
            <Link href="/concepts/1" className="badge" style={{ alignSelf: 'center' }}>
              Start with Concept 1
            </Link>
          </div>

          <ProgressBar />

          <div className="stack">
            <section>
              <div className="section-title">
                <h3 style={{ margin: 0 }}>Your quick-start profile</h3>
                <span>3 short questions</span>
              </div>
              <div className="form-grid">
                {QUESTIONS.map((question, index) => (
                  <div key={question.key} className="question">
                    <strong>
                      {index + 1}. {question.prompt}
                    </strong>
                    <div className="options">
                      {question.options.map((option) => {
                        const inputId = `${question.key}-${option}`;
                        return (
                          <label key={option} className="option-label" htmlFor={inputId}>
                            <input
                              type="radio"
                              id={inputId}
                              name={question.key}
                              value={option}
                              checked={formResponses[question.key] === option}
                              onChange={(event) => updateResponse(question.key, event.target.value)}
                            />
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <JourneyToggle />

            <div className="callout">
              <p style={{ margin: '0 0 8px' }}>
                Your answers automatically save to your browser (localStorage). Toggle between journeys to
                switch content variants across the six core concept pages.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="badge">Current progress: {progressPercent}%</span>
                <Link href="/concepts/1" className="badge" style={{ background: 'var(--surface)' }}>
                  Continue learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
