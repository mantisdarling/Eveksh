'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  locale: string;
}

const NAV_LINKS = [
  { href: 'dashboard', label: 'Explore Mentors' },
  { href: 'appointments', label: 'Sessions' },
  { href: 'messages', label: 'Messages' },
];

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (href: string) => pathname.includes(href);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
          background: scrolled ? 'rgba(9, 9, 11, 0.92)' : 'rgba(9, 9, 11, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Logo / Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              EVEKSH
            </span>
            <span className="status-dot" style={{ marginLeft: 2 }} />
          </Link>

          {/* Desktop Links (Midday Minimalist Pills) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  color: isActive(href) ? '#ffffff' : '#8e8e93',
                  background: isActive(href) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <Link
            href={`/${locale}/login`}
            className="btn-midday-ghost"
            style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }}
          >
            Sign In
          </Link>

          <Link
            href={`/${locale}/register`}
            className="btn-midday-primary"
            style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem' }}
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            id="navbar-menu"
            style={{
              display: 'none',
              width: 36,
              height: 36,
              borderRadius: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              color: '#fafafa',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(9, 9, 11, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive(href) ? '#ffffff' : '#8e8e93',
                background: isActive(href) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <Link href={`/${locale}/login`} onClick={() => setMenuOpen(false)} className="btn-midday-secondary" style={{ flex: 1, textAlign: 'center' }}>Sign In</Link>
            <Link href={`/${locale}/register`} onClick={() => setMenuOpen(false)} className="btn-midday-primary" style={{ flex: 1, textAlign: 'center' }}>Get Started</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
