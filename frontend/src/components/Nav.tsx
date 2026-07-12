import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ASSETS, BRAND } from '../constants/brand';
import './nav.css';

const links = [
  { href: '#story', label: 'Story' },
  { href: '#features', label: 'Features' },
  { href: '#experience', label: 'Experience' },
  { href: '#circle', label: 'Circle' },
  { href: '#waitlist', label: 'Waitlist' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        id="mobile-menu"
        className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <nav className="nav-drawer__panel" aria-label="Mobile">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-drawer__link"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="btn btn--primary nav-drawer__cta"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            Get early access
          </a>
        </nav>
      </div>,
      document.body,
    );

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'nav--solid' : ''}`}>
        <div className="nav__inner container">
          <a
            href="#top"
            className="nav__brand"
            aria-label={`${BRAND.name} home`}
            onClick={closeMenu}
          >
            <img
              src={ASSETS.navLogo}
              alt={BRAND.name}
              className="nav__logo"
              width={140}
              height={40}
              decoding="async"
            />
          </a>

          <nav className="nav__links nav__links--desktop" aria-label="Main">
            {links.map(link => (
              <a key={link.href} href={link.href} className="nav__link">
                {link.label}
              </a>
            ))}
            <a href="#waitlist" className="btn btn--primary nav__cta">
              Get early access
            </a>
          </nav>

          <button
            type="button"
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
