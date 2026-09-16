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
    <div className="min-h-screen w-full bg-white text-[#09090b] flex flex-col justify-between items-center p-4 sm:p-6 relative">

      {/* ── Top Header Brand (Light) ── */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-decoration-none">
          <span className="font-extrabold text-sm tracking-widest text-zinc-950 uppercase">EVEKSH</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/dashboard`}
            className="text-xs font-mono text-zinc-600 hover:text-black transition-colors"
          >
            Browse mentors →
          </Link>
          <Link
            href={`/${locale}/login`}
            className="text-xs font-mono text-zinc-500 hover:text-black transition-colors"
          >
            Already have an account? <span className="text-zinc-950 font-semibold underline underline-offset-4">Sign in</span>
          </Link>
        </div>
      </header>

      {/* ── Midday Light Authentication Card ── */}
      <div className="relative z-10 w-full max-w-[440px] my-auto">
        <div className="p-8 sm:p-9 space-y-5 shadow-xl border border-zinc-200 bg-white rounded-2xl">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-xs font-bold text-zinc-950 tracking-widest uppercase">EV</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Create an account
            </h1>
            <p className="text-xs text-zinc-500 font-normal">
              Join EVEKSH for verified 1-on-1 expert mentorship.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 border border-zinc-200 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setRole('LEARNER')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                role === 'LEARNER' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Learner
            </button>
            <button
              type="button"
              onClick={() => setRole('EXPERT')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                role === 'EXPERT' ? 'bg-black text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Mentor
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Google OAuth Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-800 transition-all text-xs font-medium shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="w-full border-t border-zinc-200" />
            <span className="bg-white px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-400 absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1" htmlFor="register-name">
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 focus:border-zinc-950 focus:outline-none text-xs text-zinc-900 placeholder-zinc-400 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1" htmlFor="register-email">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 focus:border-zinc-950 focus:outline-none text-xs text-zinc-900 placeholder-zinc-400 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1" htmlFor="register-password">
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 focus:border-zinc-950 focus:outline-none text-xs text-zinc-900 placeholder-zinc-400 transition-colors shadow-sm"
              />
            </div>

            {/* Midday Solid Black Submit Button */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-midday-primary w-full py-2.5 rounded-xl text-xs font-semibold mt-2"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            {/* Continue Without Signing In Option */}
            <div className="pt-2">
              <Link
                href={`/${locale}/dashboard`}
                className="btn-midday-secondary w-full py-2.5 rounded-xl text-xs font-medium text-center text-zinc-700 hover:text-black border border-zinc-200 block shadow-sm"
              >
                Continue without signing in →
              </Link>
            </div>
          </form>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-[11px] font-mono text-zinc-500 mt-6 leading-relaxed">
          By registering, you agree to EVEKSH&apos;s{' '}
          <span className="text-zinc-700 hover:text-black cursor-pointer underline">Terms</span> and{' '}
          <span className="text-zinc-700 hover:text-black cursor-pointer underline">Privacy Policy</span>.
        </p>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full max-w-5xl py-4 text-center text-xs font-mono text-zinc-400">
        © {new Date().getFullYear()} EVEKSH Inc. All rights reserved.
      </footer>
    </div>
  );
}
