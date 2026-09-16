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
          backgroundColor: '#fbfbfa',
          borderBottom: '1px solid #eeece6',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between relative">
          
          {/* ── Left Navigation Links (About, Companies, Library) ── */}
          <div className="hidden lg:flex items-center gap-7 text-[#16140f] text-[13.5px] font-normal tracking-[0.2px]">
            
            {/* About Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>About</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute left-0 top-full pt-1 w-52 animate-fade-in">
                  <div className="bg-[#fbfbfa] border border-[#eeece6] rounded-xl shadow-lg p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      What Happens at EVEKSH?
                    </Link>
                    <Link href={`/${locale}/register`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Apply as Mentor
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Interview Guide & FAQ
                    </Link>
                    <Link href={`/${locale}/admin`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
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
                className="inline-flex items-center gap-1 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>Companies</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'companies' && (
                <div className="absolute left-0 top-full pt-1 w-52 animate-fade-in">
                  <div className="bg-[#fbfbfa] border border-[#eeece6] rounded-xl shadow-lg p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Startup Directory
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Founder Directory
                    </Link>
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Launch YC Batch
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Library link */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:opacity-60 transition-opacity"
            >
              Library
            </Link>
          </div>

          {/* ── Centerpiece Iconic Orange Square Logo ── */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link
              href={`/${locale}`}
              className="inline-block transition-transform hover:scale-[1.03]"
              title="Y Combinator"
            >
              <div
                className="w-[42px] h-[42px] rounded-[1px] flex items-center justify-center shadow-sm"
                style={{ backgroundColor: '#FF6600' }}
              >
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '25px',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Y
                </span>
              </div>
            </Link>
          </div>

          {/* ── Right Navigation Links & Action Buttons ── */}
          <div className="hidden lg:flex items-center gap-7 text-[#16140f] text-[13.5px] font-normal tracking-[0.2px]">
            
            {/* Partners */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:opacity-60 transition-opacity"
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
                className="inline-flex items-center gap-1 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-inherit font-inherit"
              >
                <span>Resources</span>
                <svg className="w-2.5 h-2.5 opacity-70 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute right-0 top-full pt-1 w-56 animate-fade-in">
                  <div className="bg-[#fbfbfa] border border-[#eeece6] rounded-xl shadow-lg p-2 flex flex-col gap-1 text-[13px]">
                    <Link href={`/${locale}/dashboard`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Startup School
                    </Link>
                    <Link href={`/${locale}/messages`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Hacker News
                    </Link>
                    <Link href={`/${locale}/appointments`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      Find a Co-Founder
                    </Link>
                    <Link href={`/${locale}/session`} className="px-3 py-2 text-[#16140f] hover:bg-[#eeece6] rounded-lg transition-colors">
                      SAFE Financing Docs
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Startup Jobs */}
            <Link
              href={`/${locale}/dashboard`}
              className="hover:opacity-60 transition-opacity mr-2"
            >
              Startup Jobs
            </Link>

            {/* User Profile Avatar Pill (Circle with H as shown in screenshot) */}
            <Link
              href={`/${locale}/profile`}
              className="w-[34px] h-[34px] rounded-full border border-[#16140f]/20 flex items-center justify-center text-[12px] font-medium text-[#16140f] hover:border-[#16140f] transition-colors"
              title="Profile"
            >
              H
            </Link>

            {/* Black Italic Serif Pill 'Apply' Button */}
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center justify-center h-[38px] px-5 rounded-full bg-black text-white text-[13px] transition-opacity hover:opacity-85 shadow-sm"
              style={{
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
              className="w-[32px] h-[32px] rounded-full border border-[#16140f]/20 flex items-center justify-center text-[11px] font-medium text-[#16140f]"
            >
              H
            </Link>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#eeece6] text-[#16140f] bg-[#fbfbfa]"
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
          <div className="lg:hidden bg-[#fbfbfa] border-b border-[#eeece6] px-6 py-4 flex flex-col gap-2.5 text-[14px]">
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              About
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              Companies
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              Library
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              Partners
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              Resources
            </Link>
            <Link href={`/${locale}/dashboard`} onClick={() => setMenuOpen(false)} className="py-2 text-[#16140f] border-b border-[#eeece6]/60">
              Startup Jobs
            </Link>
            <div className="pt-2 flex items-center justify-between gap-3">
              <Link
                href={`/${locale}/login`}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm text-[#16140f] border border-[#eeece6] rounded-xl bg-white"
              >
                Log in
              </Link>
              <Link
                href={`/${locale}/register`}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm bg-black text-white rounded-full"
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
