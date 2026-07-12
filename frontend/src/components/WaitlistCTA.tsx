import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ASSETS, BRAND } from '../constants/brand';
import { joinWaitlist } from '../lib/waitlistApi';
import './sections.css';

export function WaitlistCTA() {
  const [ref, inView] = useInView<HTMLElement>();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await joinWaitlist(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <section ref={ref} className="section waitlist" id="waitlist">
      <div className="waitlist__glow" aria-hidden />
      <div className="container waitlist__inner">
        <motion.div
          className="waitlist__card"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="waitlist__brand">
            Hop<span className="waitlist__brand-accent">iin</span>
          </p>
          <p className="section__eyebrow">Coming soon</p>
          <h2 className="waitlist__title">
            Be first to
            <span className="gradient-text"> hop in.</span>
          </h2>
          <p className="waitlist__desc">
            We&apos;re launching in {BRAND.city} first. Drop your email — we&apos;ll send you early
            access when the curtain rises.
          </p>

          {status === 'success' ? (
            <motion.div
              className="waitlist__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src={ASSETS.navLogo} alt={BRAND.name} className="waitlist__success-logo" />
              <p>You&apos;re on the list. The trailer&apos;s just the beginning.</p>
            </motion.div>
          ) : (
            <form className="waitlist__form" onSubmit={onSubmit}>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                className="waitlist__input"
                required
                autoComplete="email"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="btn btn--primary waitlist__submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="waitlist__error" role="alert">
              {errorMessage || 'Please enter a valid email.'}
            </p>
          )}

          <div className="waitlist__social">
            <p className="waitlist__social-label">Stay in the loop</p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="waitlist__ig"
              aria-label={`Follow ${BRAND.name} on Instagram ${BRAND.instagramHandle}`}
            >
              <span className="waitlist__ig-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <defs>
                    <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f58529" />
                      <stop offset="50%" stopColor="#dd2a7b" />
                      <stop offset="100%" stopColor="#8134af" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="url(#igGrad)"
                    strokeWidth="1.75"
                  />
                  <circle cx="12" cy="12" r="4.2" stroke="url(#igGrad)" strokeWidth="1.75" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igGrad)" />
                </svg>
              </span>
              <span className="waitlist__ig-copy">
                <span className="waitlist__ig-title">Follow us on Instagram</span>
                <span className="waitlist__ig-handle">{BRAND.instagramHandle}</span>
              </span>
              <span className="waitlist__ig-arrow" aria-hidden>
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
