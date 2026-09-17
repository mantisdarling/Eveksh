import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import type { Metadata } from 'next';

export const metadata: Metadata = { 
  title: 'Explore Mentors — EVEKSH',
  description: 'Connect with verified expert mentors across engineering, AI, product, and startups.'
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Expert {
  id: string;
  name: string;
  profile?: { 
    bio?: string; 
    headline?: string; 
    avatarUrl?: string; 
    skills?: string[]; 
    rating?: number; 
    hourlyRate?: number;
    isVerified?: boolean;
  };
}

async function getExperts(): Promise<Expert[]> {
  try {
    const res = await fetch(`${API_URL}/experts`, { next: { revalidate: 60 } });
    if (!res.ok) return MOCK_EXPERTS;
    return await res.json();
  } catch {
    return MOCK_EXPERTS;
  }
}

const MOCK_EXPERTS: Expert[] = [
  { id: '1', name: 'Sarah Chen', profile: { headline: 'Ex-Google Staff Infrastructure Engineer', bio: 'Scaled storage systems to 100M users. Distributed systems architect.', skills: ['System Design', 'Go', 'Kubernetes', 'Spanner'], rating: 4.97, hourlyRate: 220, isVerified: true } },
  { id: '2', name: 'Marcus Webb', profile: { headline: 'Fintech CTO & 3x Founder (YC W19)', bio: 'Built and scaled 2 fintech exits. Specialized in zero-to-one and seed fundraising.', skills: ['Fundraising', 'Product Strategy', 'Fintech', 'Go-to-Market'], rating: 4.88, hourlyRate: 350, isVerified: true } },
  { id: '3', name: 'Dr. Priya Patel', profile: { headline: 'AI Research Lead at Meta • LLM Architect', bio: 'Specialist in low-latency LLM inference, RAG pipelines, and model evaluation.', skills: ['AI/ML', 'Python', 'LLMs', 'PyTorch', 'Fine-tuning'], rating: 5.0, hourlyRate: 280, isVerified: true } },
  { id: '4', name: 'Daniel Okafor', profile: { headline: 'YC Alum • Scaled B2B SaaS $0 to $4M ARR', bio: 'Enterprise sales leadership, customer retention, and B2B pricing model optimization.', skills: ['B2B SaaS', 'Growth', 'Enterprise Sales', 'Fundraising'], rating: 4.79, hourlyRate: 180, isVerified: true } },
  { id: '5', name: 'Elena Rossi', profile: { headline: 'Principal Design Architect at Figma', bio: 'Built core multi-tenant design systems and spatial interfaces for 20M+ users.', skills: ['UX Architecture', 'Design Systems', 'Figma', 'User Research'], rating: 4.92, hourlyRate: 190, isVerified: true } },
  { id: '6', name: 'James Liu', profile: { headline: 'Smart Contract Security Auditor', bio: 'Formally verified smart contracts securing over $1B in Total Value Locked.', skills: ['Solidity', 'Web3', 'Smart Contract Audits', 'Rust'], rating: 4.85, hourlyRate: 300, isVerified: true } },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-[#a3a69f] font-mono">
      <span>Rating</span>
      <span className="text-[#D3DAD9] font-semibold">{rating.toFixed(2)}</span>
    </div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-11 h-11 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.18)] flex items-center justify-center text-xs font-bold text-[#D3DAD9] flex-shrink-0">
      {initials}
    </div>
  );
}

function ExpertCard({ expert, locale }: { expert: Expert; locale: string }) {
  const p = expert.profile;
  return (
    <div className="bento-card p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Top Info Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {p?.avatarUrl ? (
              <img src={p.avatarUrl} alt={expert.name} className="w-11 h-11 rounded-xl object-cover border border-[rgba(211,218,217,0.18)] flex-shrink-0" />
            ) : (
              <AvatarInitials name={expert.name} />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#D3DAD9] truncate">{expert.name}</h3>
                <span className="text-[10px] font-mono text-[#D3DAD9] bg-[#715A5A]/50 px-1.5 py-0.5 rounded border border-[rgba(211,218,217,0.16)] font-medium">Verified</span>
              </div>
              <p className="text-xs text-[#a3a69f] truncate mt-0.5">{p?.headline}</p>
            </div>
          </div>

          {p?.hourlyRate && (
            <div className="text-right flex-shrink-0">
              <div className="text-base font-extrabold text-[#D3DAD9] tracking-tight">${p.hourlyRate}</div>
              <div className="text-[10px] font-mono text-[#82847f] uppercase">/ hr</div>
            </div>
          )}
        </div>

        {/* Bio Preview */}
        {p?.bio && (
          <p className="text-xs text-[#a3a69f] line-clamp-2 leading-relaxed font-normal">
            {p.bio}
          </p>
        )}

        {/* Skill Chips */}
        {p?.skills && p.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.skills.slice(0, 4).map((s) => (
              <span key={s} className="skill-chip">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[rgba(211,218,217,0.1)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {p?.rating && <StarRating rating={p.rating} />}
          <span className="text-[11px] text-[#82847f]">·</span>
          <span className="text-[11px] text-[#a3a69f]">
            Available
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/${locale}/experts/${expert.id}`}
            className="btn-midday-secondary text-xs py-1.5 px-3 rounded-lg"
          >
            Profile
          </a>
          <a
            href={`/${locale}/book?expert=${expert.id}`}
            className="btn-midday-primary text-xs py-1.5 px-3.5 rounded-lg"
          >
            Book
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const experts = await getExperts();

  return (
    <div className="min-h-screen text-[#D3DAD9] relative" style={{ backgroundColor: '#37353E' }}>
      <Navbar locale={locale} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[rgba(211,218,217,0.12)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a3a69f] uppercase tracking-widest mb-1.5">
              <span>Directory</span>
              <span>·</span>
              <span className="text-[#D3DAD9] font-semibold">500+ Mentors</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#D3DAD9]">
              Explore Mentors
            </h1>
            <p className="text-[#a3a69f] text-xs sm:text-sm mt-1">
              Direct access to verified tech leaders, AI researchers, and startup founders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-1 rounded bg-[#44444E] border border-[rgba(211,218,217,0.14)] text-[#D3DAD9]">⌘K</span>
            <span className="text-xs text-[#a3a69f] font-mono">Quick search</span>
          </div>
        </div>

        {/* Command Search Bar */}
        <div className="mb-8">
          <SearchBar locale={locale} />
        </div>

        {/* Directory Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#a3a69f]">
            <span>AVAILABLE EXPERTS ({experts.length})</span>
            <span>SORTED BY RELEVANCE</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} locale={locale} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
