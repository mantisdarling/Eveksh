'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface SearchResult {
  id: string;
  name: string;
  profile?: { headline?: string; skills?: string[]; rating?: number };
}

interface SearchBarProps {
  locale: string;
}

export function SearchBar({ locale }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/experts/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setOpen(true);
      }
    } catch {
      // Non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, search]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-zinc-400 text-sm">⌕</span>
        <input
          id="expert-search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search by skill, domain, or company (e.g. 'Kubernetes', 'LLMs', 'Google')..."
          className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-16 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors shadow-sm"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
          ) : (
            <span className="kbd text-[10px]">ESC</span>
          )}
        </div>
      </div>

      {/* Midday Command Dropdown (Light) */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl overflow-hidden z-50 shadow-2xl">
          <div className="px-3 py-1.5 border-b border-zinc-100 text-[10px] font-mono uppercase text-zinc-400 flex justify-between bg-zinc-50">
            <span>RESULTS</span>
            <span>PRESS ENTER TO SELECT</span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-zinc-100">
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/book?expert=${r.id}`}
                onClick={() => { setOpen(false); setQuery(''); }}
                className="flex items-center justify-between p-3 hover:bg-zinc-50 transition-colors text-decoration-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-900 flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-zinc-900 truncate">{r.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{r.profile?.headline}</p>
                  </div>
                </div>

                {r.profile?.skills && (
                  <div className="hidden sm:flex gap-1 flex-shrink-0">
                    {r.profile.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && results.length === 0 && query.trim() && !loading && (
        <div className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl p-4 text-center text-zinc-500 text-xs z-50 shadow-lg">
          No mentors found matching &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
