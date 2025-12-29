import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { JourneyToggle } from '../../components/JourneyToggle';
import { ProgressBar } from '../../components/ProgressBar';
import { useAppState } from '../../contexts/AppStateContext';
import { CONCEPTS, TOTAL_CONCEPTS } from '../../data/concepts';

export default function ConceptPage() {
  const router = useRouter();
  const numericId = useMemo(() => {
    const raw = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : NaN;
  }, [router.query.id]);

  const concept = useMemo(() => CONCEPTS.find((item) => item.id === numericId), [numericId]);
  const { journeyPreference, markConceptComplete, completedConcepts } = useAppState();

  useEffect(() => {
    if (concept) {
      markConceptComplete(concept.id - 1);
    }
  }, [concept, markConceptComplete]);

  if (!concept) {
    return (
      <main>
        <div className="container">
          <div className="card">
            <h1>Concept not found</h1>
            <p>We could not find that concept. Start from the beginning to continue your journey.</p>
            <Link href="/concepts/1" className="badge">
              Go to Concept 1
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const variant = journeyPreference === 'simple' ? concept.simple : concept.examples;
  const isComplete = completedConcepts[concept.id - 1];
  const previousId = concept.id > 1 ? concept.id - 1 : null;
  const nextId = concept.id < TOTAL_CONCEPTS ? concept.id + 1 : null;

  return (
    <main>
      <div className="container stack">
        <div className="card stack">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="badge">Concept {concept.id} of {TOTAL_CONCEPTS}</p>
              <h1>{concept.title}</h1>
            </div>
            {isComplete && <span className="badge" style={{ background: '#ecfdf3', color: 'var(--success)' }}>Completed</span>}
          </div>

          <ProgressBar />
          <JourneyToggle />

          <div className="stack">
            <section className="callout">
              <strong style={{ display: 'block', marginBottom: 8 }}>
                {journeyPreference === 'simple' ? 'Concise overview' : 'Walk-through with examples'}
              </strong>
              <p style={{ margin: 0 }}>{variant}</p>
            </section>
            <section>
              <h3>Key takeaway</h3>
              <p style={{ marginTop: 8 }}>{concept.takeaway}</p>
            </section>
          </div>

          <div className="nav-links">
            {previousId ? (
              <Link href={`/concepts/${previousId}`}>
                ← Previous concept
              </Link>
            ) : (
              <span />
            )}
            {nextId ? (
              <Link href={`/concepts/${nextId}`} className="primary">
                Next concept →
              </Link>
            ) : (
              <Link href="/" className="primary">
                Back to start
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
