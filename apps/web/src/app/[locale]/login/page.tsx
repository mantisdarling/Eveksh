'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginPage() {
  const { locale } = useParams() as { locale: string };
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid email or password.');
        return;
      }

      document.cookie = `jwt=${data.access_token}; path=/; max-age=${7 * 24 * 3600}; SameSite=Strict`;
      localStorage.setItem('token', data.access_token);
      router.push(`/${locale}/dashboard`);
    } catch {
      setError('Connection error. Please verify backend connectivity.');
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen w-full text-[#D3DAD9] flex flex-col justify-between items-center p-4 sm:p-6 relative" style={{ backgroundColor: '#37353E' }}>

      {/* ── Top Header Brand ── */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-decoration-none">
          <span className="font-extrabold text-sm tracking-widest text-[#D3DAD9] uppercase">EVEKSH</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/dashboard`}
            className="text-xs font-mono text-[#a3a69f] hover:text-white transition-colors"
          >
            Browse mentors →
          </Link>
          <Link
            href={`/${locale}/register`}
            className="text-xs font-mono text-[#a3a69f] hover:text-white transition-colors"
          >
            Need an account? <span className="text-[#D3DAD9] font-semibold underline underline-offset-4">Sign up</span>
          </Link>
        </div>
      </header>

      {/* ── Authentication Card ── */}
      <div className="relative z-10 w-full max-w-[420px] my-auto">
        <div className="p-8 sm:p-9 space-y-6 shadow-2xl border border-[rgba(211,218,217,0.16)] bg-[#44444E] rounded-2xl">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.2)] flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="text-xs font-bold text-[#D3DAD9] tracking-widest uppercase">EV</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#D3DAD9]">
              Sign in to your account
            </h1>
            <p className="text-xs text-[#a3a69f] font-normal">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-[#715A5A]/30 border border-[#715A5A] text-[#D3DAD9] text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Google OAuth Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.18)] hover:bg-[#37353E]/80 text-[#D3DAD9] transition-all text-xs font-medium shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#D3DAD9]">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-[rgba(211,218,217,0.12)]" />
            <span className="bg-[#44444E] px-3 text-[10px] font-mono uppercase tracking-wider text-[#a3a69f] absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#D3DAD9] mb-1.5" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.18)] focus:border-[#715A5A] focus:outline-none text-xs text-[#D3DAD9] placeholder-[#82847f] transition-colors shadow-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#D3DAD9]" htmlFor="login-password">
                  Password
                </label>
                <Link href={`/${locale}/login`} className="text-xs text-[#a3a69f] hover:text-white transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.18)] focus:border-[#715A5A] focus:outline-none text-xs text-[#D3DAD9] placeholder-[#82847f] transition-colors shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-midday-primary w-full py-2.5 rounded-xl text-xs font-semibold mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in to EVEKSH'}
            </button>

            {/* Continue Without Signing In Option */}
            <div className="pt-2">
              <Link
                href={`/${locale}/dashboard`}
                className="btn-midday-secondary w-full py-2.5 rounded-xl text-xs font-medium text-center text-[#D3DAD9] hover:text-white block shadow-sm"
              >
                Continue without signing in →
              </Link>
            </div>
          </form>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-center text-[11px] font-mono text-[#a3a69f] mt-6 leading-relaxed">
          By signing in, you agree to EVEKSH&apos;s{' '}
          <span className="text-[#D3DAD9] hover:underline cursor-pointer">Terms</span> and{' '}
          <span className="text-[#D3DAD9] hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full max-w-5xl py-4 text-center text-xs font-mono text-[#a3a69f]">
        © {new Date().getFullYear()} EVEKSH Inc. All rights reserved.
      </footer>
    </div>
  );
}
