import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './features.css';

export type FeatureVisual =
  | 'chips'
  | 'button'
  | 'publish'
  | 'map'
  | 'avatars'
  | 'notif'
  | 'chat'
  | 'filters';

export type FeatureItem = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  gradient: string;
  layout: 'hero' | 'highlight' | 'standard' | 'wide' | 'banner';
  mesh: string;
  accent: string;
  visual: FeatureVisual;
};

type Props = {
  feature: FeatureItem;
  index: number;
};

function FeatureCardVisual({ visual, active }: { visual: FeatureVisual; active: boolean }) {
  switch (visual) {
    case 'chips':
      return (
        <div className="fc-visual fc-visual--chips">
          {['🌙 Walk', '☕ Chai', '🏏 Cricket'].map((c, i) => (
            <motion.span
              key={c}
              className={`fc-visual__chip ${i === 2 ? 'fc-visual__chip--on' : ''}`}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      );
    case 'button':
      return <div className="fc-visual__hop-btn">Hop In ⚡</div>;
    case 'publish':
      return (
        <div className="fc-visual fc-visual--publish">
          <motion.div
            className="fc-visual__progress"
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <span className="fc-visual__pub">Publish 🔥</span>
        </div>
      );
    case 'map':
      return (
        <div className="fc-visual fc-visual--map">
          <span className="fc-visual__pin">📍</span>
          <span className="fc-visual__map-label">CG Road · 0.8 km</span>
        </div>
      );
    case 'avatars':
      return (
        <div className="fc-visual fc-visual--avatars">
          {[0, 1, 2, 3].map(i => (
            <motion.span
              key={i}
              className="fc-visual__avatar"
              style={{ ['--i' as string]: i }}
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            />
          ))}
          <span className="fc-visual__avatar-count">+12 joined</span>
        </div>
      );
    case 'notif':
      return (
        <motion.div
          className="fc-visual__notif"
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <span>🔔 Plot twist — someone joined!</span>
        </motion.div>
      );
    case 'chat':
      return (
        <div className="fc-visual fc-visual--chat">
          {['See you at 8?', 'On my way 🏃'].map((m, i) => (
            <motion.span
              key={m}
              className={`fc-visual__bubble ${i === 1 ? 'fc-visual__bubble--alt' : ''}`}
              initial={{ opacity: 0, x: i ? 12 : -12 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              {m}
            </motion.span>
          ))}
        </div>
      );
    case 'filters':
      return (
        <div className="fc-visual fc-visual--filters">
          {['🎵 Music', '🍕 Food', '🌃 Night'].map((f, i) => (
            <motion.span
              key={f}
              className="fc-visual__filter"
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.12 + i * 0.06 }}
            >
              {f}
            </motion.span>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function FeatureCard3D({ feature, index }: Props) {
  const [cardRef, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <motion.article
      ref={cardRef}
      className={`feature-card feature-card--${feature.layout}`}
      style={{
        background: feature.gradient,
        ['--mesh-color' as string]: feature.mesh,
        ['--accent' as string]: feature.accent,
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.04 * index,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="feature-card__mesh" aria-hidden />
      <div className="feature-card__border" aria-hidden />

      <div className="feature-card__inner">
        <div className="feature-card__top">
          <span className="feature-card__icon" aria-hidden>
            {feature.icon}
          </span>
          <span className="feature-card__index">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <p className="feature-card__tagline">{feature.tagline}</p>
        <h3 className="feature-card__title">{feature.title}</h3>

        <FeatureCardVisual visual={feature.visual} active={inView} />

        <p className="feature-card__desc">{feature.description}</p>
      </div>
    </motion.article>
  );
}
