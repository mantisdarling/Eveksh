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
      <div className="relative z-10 w-full max-w-4xl bg-white text-black rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-white/40 overflow-hidden grid md:grid-cols-12 min-h-[580px] animate-fade-in">
        
        {/* Left Form Column (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-6">
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
                Sign In
              </h1>
              <p className="text-xs font-mono text-neutral-400">
                Continue to access your dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Social OAuth Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80 transition-all text-xs font-medium text-neutral-700 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80 transition-all text-xs font-medium text-neutral-700 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.04 1.7-0.91 2.73.99.08 2.01-.5 2.6-1.22z"/>
                </svg>
                Sign in with Apple
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-neutral-200" />
              <span className="bg-white px-3 text-[10px] font-mono uppercase text-neutral-400 absolute">OR</span>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-black focus:outline-none text-xs text-black placeholder-neutral-400 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-medium text-neutral-500" htmlFor="login-password">
                    Password
                  </label>
                  <Link href={`/${locale}/login`} className="text-[11px] text-neutral-400 hover:text-black transition-colors font-medium">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-black focus:outline-none text-xs text-black placeholder-neutral-400 transition-colors"
                />
              </div>

              {/* Solid Black Sign In Pill Button */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-xs tracking-wide shadow-md disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Bottom Link */}
          <div className="pt-6 text-center text-xs text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link href={`/${locale}/register`} className="font-semibold text-black underline underline-offset-4 hover:text-neutral-700">
              Create an Account
            </Link>
          </div>
        </div>

        {/* Right Halftone Art Column (5 cols) */}
        <div className="hidden md:block md:col-span-5 relative bg-neutral-100 overflow-hidden border-l border-neutral-100">
          {/* Halftone / Dither Silhouette Visual Pattern */}
          <div className="absolute inset-0 bg-white">
            <svg className="w-full h-full object-cover" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="halftone-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="6" cy="6" r="3.5" fill="#000000" />
                </pattern>
                <linearGradient id="fade-mask" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <mask id="stipple-mask">
                  <path d="M120,0 C240,80 340,160 380,300 C420,440 280,520 400,600 L400,0 Z" fill="white" />
                  <path d="M80,80 C180,140 260,240 300,360 C340,480 200,560 360,600 L400,0 Z" fill="#bbbbbb" />
                </mask>
              </defs>

              {/* Base Dither Texture */}
              <rect width="400" height="600" fill="url(#halftone-dots)" mask="url(#stipple-mask)" />
              
              {/* Halftone Decorative Clusters */}
              <g opacity="0.9">
                {Array.from({ length: 180 }).map((_, i) => {
                  const x = 140 + (i * 37) % 240;
                  const y = 20 + (i * 29) % 560;
                  const r = (i % 5) + 1.2;
                  return (
                    <circle key={i} cx={x} cy={y} r={r} fill="#000000" opacity={(x / 400) * 0.9} />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Organic Dissolving Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent w-24 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
