import { motion } from 'framer-motion';
import { BRAND } from '../constants/brand';
import { HopiinSketchLogo } from './HopiinSketchLogo';
import './hero.css';

const FLOAT_CHIPS = [
  { emoji: '☕', label: 'Chai run', style: { top: '18%', left: '6%' }, delay: 0 },
  { emoji: '🏏', label: 'Cricket', style: { top: '28%', right: '5%' }, delay: 0.15 },
  { emoji: '📍', label: 'Nearby', style: { bottom: '32%', left: '4%' }, delay: 0.3 },
  { emoji: '🌙', label: 'Tonight', style: { bottom: '22%', right: '6%' }, delay: 0.45 },
  { emoji: '📚', label: 'Study', style: { top: '42%', right: '3%' }, delay: 0.6 },
];

const TITLE_LINES = [
  ['Your', 'city', 'is'],
  ['alive', 'tonight.'],
];

const TAGLINE_PARTS = [
  { text: 'Find people.', highlight: false },
  { text: 'Make plans.', highlight: false },
  { text: 'Hop in.', highlight: true },
];

const SUBTITLE =
  'The social app for spontaneous real-world hangouts — walks, cricket, coffee, study sessions, and everything in between.';

const STATS = [
  { value: 'IRL', label: 'Not another feed' },
  { value: '1 tap', label: 'To hop in' },
  { value: 'Tonight', label: 'Plans start now' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden>
        <div className="hero__bg-mesh" />
        <div className="hero__bg-radial" />
      </div>

      <div className="hero__aurora" aria-hidden>
        <div className="hero__aurora-blob hero__aurora-blob--1" />
        <div className="hero__aurora-blob hero__aurora-blob--2" />
      </div>

      <div className="hero__grid" aria-hidden />

      <div className="hero__floats" aria-hidden>
        {FLOAT_CHIPS.map(chip => (
          <motion.div
            key={chip.label}
            className="hero__float-chip"
            style={chip.style}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + chip.delay, duration: 0.5, ease }}
          >
            <span className="hero__float-chip-inner">
              <span className="hero__float-emoji">{chip.emoji}</span>
              <span className="hero__float-label">{chip.label}</span>
            </span>
          </motion.div>
        ))}
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease }}
        >
          <span className="hero__badge-dot" />
          Launching soon · {BRAND.city}
        </motion.div>

        <HopiinSketchLogo className="hero__brand-sketch" />

        <h1 className="hero__title">
          {TITLE_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="hero__title-line">
              {line.map((word, wordIdx) => (
                <motion.span
                  key={word}
                  className={
                    lineIdx === 1 ? 'hero__title-word gradient-text' : 'hero__title-word'
                  }
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55 + lineIdx * 0.08 + wordIdx * 0.06,
                    duration: 0.5,
                    ease,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                  {wordIdx < line.length - 1 ? '\u00a0' : ''}
                </motion.span>
              ))}
              {lineIdx < TITLE_LINES.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className="hero__tagline">
          {TAGLINE_PARTS.map((part, i) => (
            <motion.span
              key={part.text}
              className={
                part.highlight
                  ? 'hero__tagline-part hero__tagline-part--accent'
                  : 'hero__tagline-part'
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.45, ease }}
            >
              {part.text}
              {i < TAGLINE_PARTS.length - 1 ? '\u00a0' : ''}
            </motion.span>
          ))}
        </p>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5, ease }}
        >
          {SUBTITLE}
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease }}
        >
          <a href="#waitlist" className="btn btn--primary">
            Join the waitlist
            <span className="btn__arrow">→</span>
          </a>
          <a href="#story" className="btn btn--ghost">
            Watch the story
          </a>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.5, ease }}
        >
          {STATS.map(stat => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
