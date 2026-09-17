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
        <span className="absolute left-3.5 text-[#a3a69f]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          id="expert-search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search by skill, domain, or company (e.g. 'Kubernetes', 'LLMs', 'Google')..."
          className="w-full bg-[#44444E] border border-[rgba(211,218,217,0.18)] rounded-xl pl-9 pr-16 py-2.5 text-xs text-[#D3DAD9] placeholder-[#82847f] focus:outline-none focus:border-[#715A5A] transition-colors shadow-sm"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-[#715A5A] border-t-[#D3DAD9] rounded-full animate-spin" />
          ) : (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#37353E] border border-[rgba(211,218,217,0.12)] text-[#a3a69f]">ESC</span>
          )}
        </div>
      </div>

      {/* Command Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#44444E] border border-[rgba(211,218,217,0.18)] rounded-xl overflow-hidden z-50 shadow-2xl">
          <div className="px-3 py-1.5 border-b border-[rgba(211,218,217,0.1)] text-[10px] font-mono uppercase text-[#a3a69f] flex justify-between bg-[#37353E]">
            <span>RESULTS</span>
            <span>PRESS ENTER TO SELECT</span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[rgba(211,218,217,0.08)]">
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/book?expert=${r.id}`}
                onClick={() => { setOpen(false); setQuery(''); }}
                className="flex items-center justify-between p-3 hover:bg-[#37353E] transition-colors text-decoration-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#37353E] border border-[rgba(211,218,217,0.14)] flex items-center justify-center font-bold text-xs text-[#D3DAD9] flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-[#D3DAD9] truncate">{r.name}</p>
                    <p className="text-[11px] text-[#a3a69f] truncate">{r.profile?.headline}</p>
                  </div>
                </div>

                {r.profile?.skills && (
                  <div className="hidden sm:flex gap-1 flex-shrink-0">
                    {r.profile.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#37353E] border border-[rgba(211,218,217,0.14)] text-[#D3DAD9]">
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
        <div className="absolute top-full mt-2 w-full bg-[#44444E] border border-[rgba(211,218,217,0.18)] rounded-xl p-4 text-center text-[#a3a69f] text-xs z-50 shadow-lg">
          No mentors found matching &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
