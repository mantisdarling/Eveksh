import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EVEKSH — Stop guessing, start talking.',
  description: 'Direct 1-on-1 on-demand access to vetted engineering leaders, AI researchers, and startup founders. Protected by Stripe Escrow.',
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageClient locale={locale} />;
}

function HomePageClient({ locale }: { locale: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Index');

  const bentoFeatures = [
    {
      tag: t('feature1Tag'),
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.14)] font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#a3a69f] border-b border-[rgba(211,218,217,0.1)] pb-2">
            <span>Direct Audio/Video</span>
            <span className="font-semibold text-[#D3DAD9]">00:42:19</span>
          </div>
          <div className="flex items-center justify-between text-[#D3DAD9] font-medium">
            <span>Sarah Chen (Ex-Staff Google)</span>
            <span className="text-[#D3DAD9] bg-[#715A5A]/50 px-2 py-0.5 rounded text-[10px] font-semibold">Connected</span>
          </div>
          <div className="text-[11px] text-[#82847f]">Shared Whiteboard: Distributed Spanner Consensus</div>
        </div>
      ),
    },
    {
      tag: t('feature2Tag'),
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.14)] font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[11px] text-[#a3a69f] border-b border-[rgba(211,218,217,0.1)] pb-2">
            <span>Escrow state</span>
            <span className="text-[#D3DAD9] font-semibold">Funds secured</span>
          </div>
          <div className="flex justify-between text-[#D3DAD9] font-medium">
            <span>Session Authorization</span>
            <span className="text-white font-bold">$220.00</span>
          </div>
          <div className="text-[11px] text-[#82847f]">Auto-release only after verified completion</div>
        </div>
      ),
    },
    {
      tag: t('feature3Tag'),
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-[#37353E] border border-[rgba(211,218,217,0.14)] font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[11px] text-[#a3a69f] border-b border-[rgba(211,218,217,0.1)] pb-2">
            <span>Match index</span>
            <span className="text-[#D3DAD9] font-semibold">99.4%</span>
          </div>
          <div className="flex justify-between text-[#D3DAD9] font-medium">
            <span>Query: &quot;PostgreSQL 50k RPS&quot;</span>
            <span className="text-[#a3a69f]">Top 3 Experts</span>
          </div>
          <div className="text-[11px] text-[#82847f]">Ranked by verified domain benchmarks</div>
        </div>
      ),
    },
  ];

  const metrics = [
    { label: t('trustStat1'), value: '500+' },
    { label: t('trustStat2'), value: '4.97 / 5' },
    { label: t('trustStat3'), value: '$0' },
    { label: 'Avg. Response Time', value: '< 2 hrs' },
  ];

  return (
    <div className="min-h-screen text-[#D3DAD9] relative" style={{ backgroundColor: '#37353E', fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar locale={locale} />

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Top Minimalist Pill Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[rgba(211,218,217,0.18)] bg-[#44444E]/60 text-[11px] font-mono tracking-wider uppercase text-[#D3DAD9] mb-8 shadow-sm">
          {t('badge')}
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-[#D3DAD9] leading-[1.08] mb-6">
          {t('titlePart1')} <br />
          <span className="text-[#a3a69f] font-normal" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: 'italic' }}>
            {t('titlePart2')}
          </span>
        </h1>

        {/* Clean Subtitle */}
        <p className="text-[#a3a69f] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          {t('subtitle')}
        </p>

        {/* Midday Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <Link
            href={`/${locale}/dashboard`}
            className="btn-midday-primary text-sm py-3 px-7"
          >
            {t('ctaLearner')} →
          </Link>
          <Link
            href={`/${locale}/register`}
            className="btn-midday-secondary text-sm py-3 px-7"
          >
            {t('ctaExpert')}
          </Link>
        </div>

        {/* Metric Grid Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(211,218,217,0.12)] rounded-2xl overflow-hidden border border-[rgba(211,218,217,0.14)] max-w-4xl mx-auto shadow-lg">
          {metrics.map((m, i) => (
            <div key={i} className="bg-[#44444E] p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#D3DAD9] mb-1">
                {m.value}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#a3a69f]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[rgba(211,218,217,0.12)]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#D3DAD9] mb-3">
            {t('featuresTitle')}
          </h2>
          <p className="text-[#a3a69f] text-sm">
            Everything you need for verified high-impact mentorship without platform friction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {bentoFeatures.map((b, i) => (
            <div key={i} className="bento-card p-6 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a3a69f] bg-[#37353E] px-2 py-0.5 rounded border border-[rgba(211,218,217,0.1)]">{b.tag}</span>
                </div>
                <h3 className="text-base font-bold text-[#D3DAD9] mb-2 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-[#a3a69f] leading-relaxed font-normal">
                  {b.desc}
                </p>
              </div>

              {b.preview}
            </div>
          ))}
        </div>
      </section>

      {/* ── Architectural Footer ── */}
      <footer className="relative z-10 border-t border-[rgba(211,218,217,0.12)] py-12 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a3a69f] font-mono">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-widest text-[#D3DAD9] uppercase text-sm">EVEKSH</span>
          <span>·</span>
          <span>STOP GUESSING, START TALKING.</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© {new Date().getFullYear()} EVEKSH Inc.</span>
        </div>
      </footer>
    </div>
  );
}
