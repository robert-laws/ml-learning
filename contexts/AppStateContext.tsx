import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TOTAL_CONCEPTS } from '../data/concepts';

type JourneyPreference = 'simple' | 'examples';

type FormResponses = {
  question1: string;
  question2: string;
  question3: string;
};

type AppState = {
  formResponses: FormResponses;
  updateResponse: (questionKey: keyof FormResponses, value: string) => void;
  journeyPreference: JourneyPreference;
  setJourneyPreference: (preference: JourneyPreference) => void;
  completedConcepts: boolean[];
  markConceptComplete: (index: number) => void;
  progressPercent: number;
  totalConcepts: number;
};

const FORM_STORAGE_KEY = 'ml-learning:form-responses';
const JOURNEY_STORAGE_KEY = 'ml-learning:journey-preference';
const PROGRESS_STORAGE_KEY = 'ml-learning:concept-progress';

const defaultFormResponses: FormResponses = {
  question1: '',
  question2: '',
  question3: '',
};

const AppStateContext = createContext<AppState | undefined>(undefined);

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Failed to read ${key} from storage`, error);
  }
  return fallback;
}

function writeToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to write ${key} to storage`, error);
  }
}

export const AppStateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [formResponses, setFormResponses] = useState<FormResponses>(defaultFormResponses);
  const [journeyPreference, setJourneyPreferenceState] = useState<JourneyPreference>('simple');
  const [completedConcepts, setCompletedConcepts] = useState<boolean[]>(
    Array.from({ length: TOTAL_CONCEPTS }, () => false),
  );

  useEffect(() => {
    setFormResponses(readFromStorage<FormResponses>(FORM_STORAGE_KEY, defaultFormResponses));
    setJourneyPreferenceState(readFromStorage<JourneyPreference>(JOURNEY_STORAGE_KEY, 'simple'));
    setCompletedConcepts(
      readFromStorage<boolean[]>(
        PROGRESS_STORAGE_KEY,
        Array.from({ length: TOTAL_CONCEPTS }, () => false),
      ),
    );
  }, []);

  useEffect(() => {
    writeToStorage(FORM_STORAGE_KEY, formResponses);
  }, [formResponses]);

  useEffect(() => {
    writeToStorage(JOURNEY_STORAGE_KEY, journeyPreference);
  }, [journeyPreference]);

  useEffect(() => {
    writeToStorage(PROGRESS_STORAGE_KEY, completedConcepts);
  }, [completedConcepts]);

  const updateResponse = (questionKey: keyof FormResponses, value: string) => {
    setFormResponses((prev) => ({ ...prev, [questionKey]: value }));
  };

  const setJourneyPreference = (preference: JourneyPreference) => {
    setJourneyPreferenceState(preference);
  };

  const markConceptComplete = (index: number) => {
    setCompletedConcepts((prev) => {
      if (index < 0 || index >= TOTAL_CONCEPTS) return prev;
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const progressPercent = useMemo(() => {
    const completedCount = completedConcepts.filter(Boolean).length;
    return Math.round((completedCount / TOTAL_CONCEPTS) * 100);
  }, [completedConcepts]);

  const value: AppState = useMemo(
    () => ({
      formResponses,
      updateResponse,
      journeyPreference,
      setJourneyPreference,
      completedConcepts,
      markConceptComplete,
      progressPercent,
      totalConcepts: TOTAL_CONCEPTS,
    }),
    [formResponses, journeyPreference, completedConcepts, progressPercent],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
