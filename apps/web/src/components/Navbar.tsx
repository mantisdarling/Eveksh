'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className="w-full fixed top-0 left-0 right-0 z-50 transition-colors duration-150"
        style={{
          backgroundColor: '#37353E',
          borderBottom: '1px solid rgba(211, 218, 217, 0.12)',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between relative">
          
          {/* ── Left Navigation Links (About, Companies, Library) ── */}
          <div className="hidden lg:flex items-center gap-7 text-[#D3DAD9] text-[13.5px] font-normal tracking-[0.2px]">
            
            {/* About Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>About</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute left-0 top-full pt-1 w-56 animate-fade-in">
                  <div className="bg-[#44444E] border border-[rgba(211,218,217,0.16)] rounded-xl shadow-2xl p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      What Happens at EVEKSH?
                    </Link>
                    <Link href={`/${locale}/register`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Apply as Mentor
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Interview Guide & FAQ
                    </Link>
                    <Link href={`/${locale}/admin`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Community & People
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Companies / Experts Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('companies')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>Companies</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'companies' && (
                <div className="absolute left-0 top-full pt-1 w-56 animate-fade-in">
                  <div className="bg-[#44444E] border border-[rgba(211,218,217,0.16)] rounded-xl shadow-2xl p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Startup Directory
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Founder Directory
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Launch Batch
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Library link */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:text-white transition-colors"
            >
              Library
            </Link>
          </div>

          {/* ── Centerpiece Signature Brand Mark ── */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link
              href={`/${locale}`}
              className="inline-block transition-transform hover:scale-[1.03]"
              title="EVEKSH"
            >
              <div
                className="w-[42px] h-[42px] rounded-[6px] flex items-center justify-center shadow-lg border border-[rgba(211,218,217,0.2)]"
                style={{ backgroundColor: '#715A5A' }}
              >
                <span
                  style={{
                    color: '#D3DAD9',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: '23px',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  E
                </span>
              </div>
            </Link>
          </div>

          {/* ── Right Navigation Links & Action Buttons ── */}
          <div className="hidden lg:flex items-center gap-7 text-[#D3DAD9] text-[13.5px] font-normal tracking-[0.2px]">
            
            {/* Partners */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:text-white transition-colors"
            >
              Partners
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>Resources</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute right-0 top-full pt-1 w-56 animate-fade-in">
                  <div className="bg-[#44444E] border border-[rgba(211,218,217,0.16)] rounded-xl shadow-2xl p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Startup Mentorship
                    </Link>
                    <Link href={`/${locale}/messages`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Direct Messaging
                    </Link>
                    <Link href={`/${locale}/appointments`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      My Appointments
                    </Link>
                    <Link href={`/${locale}/session`} className="px-3 py-2 text-[#D3DAD9] hover:bg-[#715A5A]/30 hover:text-white rounded-lg transition-colors">
                      Live Video Room
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Startup Jobs */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:text-white transition-colors mr-2"
            >
              Startup Jobs
            </Link>

            {/* User Profile Avatar Pill */}
            <Link
              href={`/${locale}/profile`}
              className="w-[34px] h-[34px] rounded-full border border-[rgba(211,218,217,0.25)] bg-[#44444E] flex items-center justify-center text-[12px] font-medium text-[#D3DAD9] hover:border-[#D3DAD9] transition-colors"
              title="Profile"
            >
              H
            </Link>

            {/* Rose Accent Pill 'Apply' Button */}
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center justify-center h-[38px] px-5 rounded-full text-[#D3DAD9] text-[13px] transition-all shadow-md hover:bg-[#846a6a] hover:text-white"
              style={{
                backgroundColor: '#715A5A',
                border: '1px solid rgba(211, 218, 217, 0.2)',
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '0.015rem',
              }}
            >
              Apply
            </Link>
          </div>

          {/* ── Mobile View Controls ── */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href={`/${locale}/profile`}
              className="w-[32px] h-[32px] rounded-full border border-[rgba(211,218,217,0.25)] bg-[#44444E] flex items-center justify-center text-[11px] font-medium text-[#D3DAD9]"
            >
              H
            </Link>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(211,218,217,0.18)] text-[#D3DAD9] bg-[#44444E]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {menuOpen && (
          <div className="lg:hidden bg-[#37353E] border-b border-[rgba(211,218,217,0.14)] px-6 py-4 flex flex-col gap-2.5 text-[14px]">
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              About
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              Companies
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              Library
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              Partners
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              Resources
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#D3DAD9] border-b border-[rgba(211,218,217,0.08)]">
              Startup Jobs
            </Link>
            <div className="pt-2 flex items-center justify-between gap-3">
              <Link
                href={`/${locale}/login`}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm text-[#D3DAD9] border border-[rgba(211,218,217,0.18)] rounded-xl bg-[#44444E]"
              >
                Log in
              </Link>
              <Link
                href={`/${locale}/register`}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm bg-[#715A5A] text-[#D3DAD9] rounded-full border border-[rgba(211,218,217,0.2)]"
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontStyle: 'italic',
                }}
              >
                Apply
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
