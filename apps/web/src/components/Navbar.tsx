'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  locale: string;
}

const NAV_ITEMS = [
  {
    label: 'Experts',
    key: 'experts',
    href: null as string | null,
    panel: [
      {
        heading: 'Find Mentors',
        links: [
          { label: 'Browse Directory', href: '/dashboard', desc: 'Explore all expert mentors' },
          { label: 'Top Rated', href: '/dashboard', desc: 'Highest reviewed sessions' },
          { label: 'Featured Picks', href: '/dashboard', desc: 'Curated by our team' },
        ],
      },
      {
        heading: 'By Category',
        links: [
          { label: 'Engineering & Tech', href: '/dashboard', desc: 'System design, backend, cloud' },
          { label: 'Product & Growth', href: '/dashboard', desc: 'PM strategy, GTM, analytics' },
          { label: 'Startups & Fundraising', href: '/dashboard', desc: 'Pitch decks, VC intros' },
        ],
      },
    ] as { heading: string; links: { label: string; href: string; desc: string }[] }[] | null,
  },
  {
    label: 'Sessions',
    key: 'sessions',
    href: null as string | null,
    panel: [
      {
        heading: 'Your Sessions',
        links: [
          { label: 'Book a Session', href: '/book', desc: 'Schedule time with a mentor' },
          { label: 'My Appointments', href: '/appointments', desc: 'View upcoming sessions' },
          { label: 'Live Room', href: '/session', desc: 'Join your active session' },
        ],
      },
      {
        heading: 'How it Works',
        links: [
          { label: 'Escrow Payment', href: '/dashboard', desc: 'Funds held until session ends' },
          { label: 'Video & Chat', href: '/messages', desc: 'Real-time collaboration' },
        ],
      },
    ] as { heading: string; links: { label: string; href: string; desc: string }[] }[] | null,
  },
  { label: 'Messages', key: 'messages', href: '/messages', panel: null },
  { label: 'Discover', key: 'discover', href: '/dashboard', panel: null },
];

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function handleEnter(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(key);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setActivePanel(null), 120);
  }

  const currentPanel = NAV_ITEMS.find(i => i.key === activePanel && i.panel);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ padding: scrolled ? '8px 16px' : '12px 16px', transition: 'padding 0.3s ease' }}
      >
        <div
          style={{
            background: '#37353E',
            border: '1px solid rgba(211,218,217,0.16)',
            borderRadius: scrolled ? '9999px' : '20px',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'border-radius 0.35s ease, box-shadow 0.35s ease',
            width: '100%',
            maxWidth: 1060,
            fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
            position: 'relative',
          }}
          onMouseLeave={handleLeave}
        >
          {/* 3-column grid toolbar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              height: 52,
              padding: '0 10px',
            }}
          >
            {/* LEFT: Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={`/${locale}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', paddingLeft: 6 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 7,
                    background: '#715A5A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(211,218,217,0.2)',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: '#D3DAD9', fontWeight: 800, fontSize: 17, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    E
                  </span>
                </div>
                <span
                  className="hidden sm:inline"
                  style={{ color: '#D3DAD9', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.025em' }}
                >
                  EVEKSH
                </span>
              </Link>
            </div>

            {/* CENTER: Nav links */}
            <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 2 }}>
              {NAV_ITEMS.map(item => {
                const isActive = item.href ? pathname.startsWith(`/${locale}${item.href}`) : false;
                const isPanelOpen = activePanel === item.key;
                const sharedStyle: React.CSSProperties = {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  height: 34,
                  padding: '0 14px',
                  borderRadius: 9999,
                  fontSize: 13.5,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  transition: 'all 0.15s ease',
                  color: isActive || isPanelOpen ? '#D3DAD9' : 'rgba(211,218,217,0.72)',
                  background: isActive || isPanelOpen ? 'rgba(211,218,217,0.1)' : 'transparent',
                };

                return (
                  <div key={item.key}>
                    {item.href ? (
                      <Link
                        href={`/${locale}${item.href}`}
                        style={{ ...sharedStyle, textDecoration: 'none' }}
                        onMouseEnter={() => handleEnter(item.key)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        style={{ ...sharedStyle, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        onMouseEnter={() => handleEnter(item.key)}
                      >
                        {item.label}
                        <svg
                          width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor"
                          style={{
                            opacity: 0.55,
                            transform: isPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <path d="M6 8L10 12L14 8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* RIGHT: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, paddingRight: 6 }}>
              {/* Avatar */}
              <Link
                href={`/${locale}/profile`}
                title="My Profile"
                className="hidden lg:flex"
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#44444E', border: '1px solid rgba(211,218,217,0.2)',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, color: '#D3DAD9',
                  textDecoration: 'none', flexShrink: 0,
                }}
              >
                H
              </Link>

              {/* Apply CTA */}
              <Link
                href={`/${locale}/register`}
                className="hidden lg:inline-flex"
                style={{
                  height: 34, padding: '0 18px', borderRadius: 9999,
                  background: '#715A5A', border: '1px solid rgba(211,218,217,0.18)',
                  color: '#D3DAD9', fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em',
                  textDecoration: 'none', alignItems: 'center',
                  flexShrink: 0, whiteSpace: 'nowrap',
                }}
              >
                Apply
              </Link>

              {/* Mobile avatar */}
              <Link
                href={`/${locale}/profile`}
                className="lg:hidden"
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: '#44444E', border: '1px solid rgba(211,218,217,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: '#D3DAD9', textDecoration: 'none', flexShrink: 0,
                }}
              >
                H
              </Link>

              {/* Burger */}
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                  width: 34, height: 34, borderRadius: 9999,
                  background: menuOpen ? 'rgba(211,218,217,0.12)' : 'transparent',
                  border: '1px solid rgba(211,218,217,0.18)',
                  color: '#D3DAD9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0,
                }}
              >
                {menuOpen ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mega panel dropdown */}
          {currentPanel && currentPanel.panel && (
            <div
              onMouseEnter={() => handleEnter(currentPanel.key)}
              style={{
                borderTop: '1px solid rgba(211,218,217,0.1)',
                padding: '20px 24px 24px',
                display: 'grid',
                gridTemplateColumns: `repeat(${currentPanel.panel.length}, 1fr)`,
                gap: '0 32px',
                animation: 'evkFadeDown 0.15s ease',
              }}
            >
              {currentPanel.panel.map(col => (
                <div key={col.heading}>
                  <p style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em',
                    textTransform: 'uppercase', color: '#715A5A', marginBottom: 10, paddingLeft: 8, margin: '0 0 10px 8px',
                  }}>
                    {col.heading}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {col.links.map(link => (
                      <Link
                        key={link.label}
                        href={`/${locale}${link.href}`}
                        onClick={() => setActivePanel(null)}
                        className="nav-mega-link"
                        style={{ display: 'block', padding: '8px 10px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.12s ease' }}
                      >
                        <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#D3DAD9', letterSpacing: '-0.01em', marginBottom: 2 }}>
                          {link.label}
                        </span>
                        <span style={{ display: 'block', fontSize: 11.5, color: 'rgba(211,218,217,0.48)', lineHeight: 1.4 }}>
                          {link.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile drawer */}
          {menuOpen && (
            <div style={{ borderTop: '1px solid rgba(211,218,217,0.1)', padding: '8px 10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href || '/dashboard'}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '10px 14px',
                    borderRadius: 12, fontSize: 14, fontWeight: 500,
                    color: 'rgba(211,218,217,0.85)', textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div style={{ height: 1, background: 'rgba(211,218,217,0.1)', margin: '6px 0' }} />
              <div style={{ display: 'flex', gap: 8, padding: '4px 4px 0' }}>
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 38, borderRadius: 9999, background: 'rgba(211,218,217,0.07)',
                    border: '1px solid rgba(211,218,217,0.15)', color: '#D3DAD9',
                    fontSize: 13, fontWeight: 500, textDecoration: 'none',
                  }}
                >
                  Log in
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 38, borderRadius: 9999, background: '#715A5A',
                    border: '1px solid rgba(211,218,217,0.2)', color: '#D3DAD9',
                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  }}
                >
                  Apply
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes evkFadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-mega-link:hover {
          background: rgba(211,218,217,0.07) !important;
        }
      `}</style>
    </>
  );
}
