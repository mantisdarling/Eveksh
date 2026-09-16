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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (path: string) => pathname.includes(path);

  return (
    <>
      <header
        className="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : '#ffffff',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        {/* Top bar desktop layout (inspired by Y Combinator navbar) */}
        <div className="max-w-[1400px] mx-auto px-5 h-[64px] flex items-center justify-between relative">
          
          {/* Left Navigation Links with YC-style dropdowns */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1">
            {/* Explore Mentors Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('mentors')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={`/${locale}/dashboard`}
                className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
                  isActive('dashboard') ? 'text-zinc-950 font-semibold' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <span>Explore</span>
                <svg className="w-3 h-3 text-zinc-500 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {openDropdown === 'mentors' && (
                <div className="absolute left-0 top-full pt-2 w-56 animate-fade-in">
                  <div className="bg-white border border-zinc-200 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                    <Link
                      href={`/${locale}/dashboard`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      Top Rated Mentors
                    </Link>
                    <Link
                      href={`/${locale}/dashboard`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      Engineering & System Design
                    </Link>
                    <Link
                      href={`/${locale}/dashboard`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      AI & Machine Learning
                    </Link>
                    <Link
                      href={`/${locale}/dashboard`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      Startup Founders & CTOs
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sessions / Appointments */}
            <Link
              href={`/${locale}/appointments`}
              className={`text-[14px] font-medium transition-colors ${
                isActive('appointments') ? 'text-zinc-950 font-semibold' : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Sessions
            </Link>

            {/* Messages */}
            <Link
              href={`/${locale}/messages`}
              className={`text-[14px] font-medium transition-colors ${
                isActive('messages') ? 'text-zinc-950 font-semibold' : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Messages
            </Link>
          </div>

          {/* Centered YC-Style Brand Badge & Wordmark */}
          <div className="flex items-center justify-center">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 text-zinc-950 no-underline group"
              title="EVEKSH"
            >
              {/* Square monochromatic logo block like YC's square */}
              <div className="w-[36px] h-[36px] bg-zinc-950 text-white rounded-lg flex items-center justify-center font-black text-[17px] tracking-tighter group-hover:bg-zinc-800 transition-colors shadow-sm">
                E
              </div>
              <span className="font-extrabold text-[15px] tracking-[0.18em] text-zinc-950 uppercase hidden sm:inline-block">
                EVEKSH
              </span>
            </Link>
          </div>

          {/* Right Navigation & Action Items */}
          <div className="flex items-center justify-end gap-5 flex-1">
            {/* Resources dropdown for desktop */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                <span>Resources</span>
                <svg className="w-3 h-3 text-zinc-500 mt-[1px]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8L10 12L14 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {openDropdown === 'resources' && (
                <div className="absolute right-0 top-full pt-2 w-52 animate-fade-in">
                  <div className="bg-white border border-zinc-200 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                    <Link
                      href={`/${locale}/dashboard`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      How Mentorship Works
                    </Link>
                    <Link
                      href={`/${locale}/session`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      Live Session Demo
                    </Link>
                    <Link
                      href={`/${locale}/admin`}
                      className="px-3 py-2 text-[13px] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      Admin Portal
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Login Link */}
            <Link
              href={`/${locale}/login`}
              className="text-[14px] font-medium text-zinc-800 hover:text-zinc-950 transition-colors"
            >
              Log in
            </Link>

            {/* YC-style rounded pill CTA button */}
            <Link
              href={`/${locale}/register`}
              className="hidden sm:inline-flex items-center justify-center h-[38px] px-5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-[13.5px] font-medium transition-all shadow-sm"
              style={{
                fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif",
                fontStyle: 'italic',
                letterSpacing: '0.015em',
              }}
            >
              Apply as Mentor
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-900 bg-white hover:bg-zinc-50"
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

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-5 py-4 flex flex-col gap-3 shadow-lg">
            <Link
              href={`/${locale}/dashboard`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg"
            >
              Explore Mentors
            </Link>
            <Link
              href={`/${locale}/appointments`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg"
            >
              Sessions & Appointments
            </Link>
            <Link
              href={`/${locale}/messages`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg"
            >
              Messages
            </Link>
            <Link
              href={`/${locale}/admin`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg"
            >
              Admin Portal
            </Link>

            <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
              <Link
                href={`/${locale}/login`}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium border border-zinc-200 rounded-xl text-zinc-800 hover:bg-zinc-50"
              >
                Log in
              </Link>
              <Link
                href={`/${locale}/register`}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium bg-zinc-950 text-white rounded-xl hover:bg-zinc-800"
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif",
                  fontStyle: 'italic',
                }}
              >
                Apply as Mentor
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
