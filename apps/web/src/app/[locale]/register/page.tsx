'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RegisterPage() {
  const { locale } = useParams() as { locale: string };
  const router = useRouter();

  const [role, setRole] = useState<'LEARNER' | 'EXPERT'>('LEARNER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      document.cookie = `jwt=${data.access_token}; path=/; max-age=${7 * 24 * 3600}; SameSite=Strict`;
      localStorage.setItem('token', data.access_token);
      router.push(`/${locale}/dashboard`);
    } catch {
      setError('Connection error. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-neutral-900">
      {/* ── Atmospheric Misty Mountain Forest Background ── */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 opacity-70 scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('/images/login-bg.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* ── Elevated Pinterest-Inspired Card ── */}
      <div className="relative z-10 w-full max-w-4xl bg-white text-black rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-white/40 overflow-hidden grid md:grid-cols-12 min-h-[620px] animate-fade-in">
        
        {/* Left Form Column (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Logo Mark */}
            <Link href={`/${locale}`} className="inline-block">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M4 6L10 18H7L3 8L4 6Z" fill="currentColor" />
                  <path d="M14 6L20 18H17L13 8L14 6Z" fill="currentColor" />
                </svg>
                <span className="font-extrabold text-sm tracking-widest text-black uppercase">EVEKSH</span>
              </div>
            </Link>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                Create Account
              </h1>
              <p className="text-xs font-mono text-neutral-400">
                Join the verified mentorship network
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex bg-neutral-100 p-1 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setRole('LEARNER')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'LEARNER' ? 'bg-black text-white shadow-sm' : 'text-neutral-500 hover:text-black'
                }`}
              >
                🎓 Learner
              </button>
              <button
                type="button"
                onClick={() => setRole('EXPERT')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'EXPERT' ? 'bg-black text-white shadow-sm' : 'text-neutral-500 hover:text-black'
                }`}
              >
                🧠 Mentor
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Social OAuth Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all text-xs font-medium text-neutral-700 shadow-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="w-full border-t border-neutral-200" />
              <span className="bg-white px-3 text-[10px] font-mono uppercase text-neutral-400 absolute">OR</span>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1" htmlFor="register-name">
                  Full Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:border-black focus:outline-none text-xs text-black placeholder-neutral-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:border-black focus:outline-none text-xs text-black placeholder-neutral-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1" htmlFor="register-password">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:border-black focus:outline-none text-xs text-black placeholder-neutral-400 transition-colors"
                />
              </div>

              {/* Solid Black Sign Up Pill Button */}
              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-xs tracking-wide shadow-md disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>

          {/* Bottom Link */}
          <div className="pt-5 text-center text-xs text-neutral-500">
            Already have an account?{' '}
            <Link href={`/${locale}/login`} className="font-semibold text-black underline underline-offset-4 hover:text-neutral-700">
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Halftone Art Column (5 cols) */}
        <div className="hidden md:block md:col-span-5 relative bg-neutral-100 overflow-hidden border-l border-neutral-100">
          <div className="absolute inset-0 bg-white">
            <svg className="w-full h-full object-cover" viewBox="0 0 400 650" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="halftone-register-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="6" cy="6" r="3.5" fill="#000000" />
                </pattern>
                <mask id="register-stipple-mask">
                  <path d="M100,0 C220,90 320,170 370,320 C420,470 260,540 390,650 L400,0 Z" fill="white" />
                  <path d="M60,90 C160,150 240,260 280,380 C320,500 180,580 340,650 L400,0 Z" fill="#bbbbbb" />
                </mask>
              </defs>

              <rect width="400" height="650" fill="url(#halftone-register-dots)" mask="url(#register-stipple-mask)" />
              
              <g opacity="0.9">
                {Array.from({ length: 190 }).map((_, i) => {
                  const x = 120 + (i * 41) % 260;
                  const y = 20 + (i * 31) % 610;
                  const r = (i % 5) + 1.2;
                  return (
                    <circle key={i} cx={x} cy={y} r={r} fill="#000000" opacity={(x / 400) * 0.9} />
                  );
                })}
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent w-24 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
