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
      icon: '⚡',
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-800/80 pb-2">
            <span className="flex items-center gap-1.5"><span className="status-dot"></span> LIVE RTC CALL</span>
            <span>00:42:19</span>
          </div>
          <div className="flex items-center justify-between text-zinc-300">
            <span>Sarah Chen (Ex-Staff Google)</span>
            <span className="text-emerald-400 font-semibold">Connected</span>
          </div>
          <div className="text-[11px] text-zinc-500">Shared Whiteboard: Distributed Spanner Consensus</div>
        </div>
      ),
    },
    {
      tag: t('feature2Tag'),
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      icon: '🔒',
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[11px] text-zinc-500 border-b border-zinc-800/80 pb-2">
            <span>ESCROW STATE</span>
            <span className="text-amber-400 font-semibold">FUNDS SECURED</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Session Authorization</span>
            <span className="text-white font-bold">$220.00</span>
          </div>
          <div className="text-[11px] text-zinc-500">Auto-release only after verified completion</div>
        </div>
      ),
    },
    {
      tag: t('feature3Tag'),
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      icon: '🧠',
      preview: (
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[11px] text-zinc-500 border-b border-zinc-800/80 pb-2">
            <span>AI MATCH ACCURACY</span>
            <span className="text-indigo-400 font-semibold">99.4% MATCH</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Query: &quot;PostgreSQL 50k RPS&quot;</span>
            <span className="text-white">Top 3 Experts</span>
          </div>
          <div className="text-[11px] text-zinc-500">Ranked by verified domain benchmarks</div>
        </div>
      ),
    },
  ];

  const metrics = [
    { label: t('trustStat1'), value: '500+' },
    { label: t('trustStat2'), value: '4.97 ★' },
    { label: t('trustStat3'), value: '$0' },
    { label: 'Avg. Response Time', value: '< 2 hrs' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] relative overflow-hidden">
      <Navbar locale={locale} />

      {/* ── Architectural Background Grid ── */}
      <div className="absolute inset-0 bg-grid bg-radial-fade pointer-events-none opacity-40 h-[1000px]" />

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Top Minimalist Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-8 animate-fade-in">
          <span className="status-dot"></span>
          {t('badge')}
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-white leading-[1.06] mb-6">
          {t('titlePart1')} <br />
          <span className="text-zinc-500">{t('titlePart2')}</span>
        </h1>

        {/* Clean Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          {t('subtitle')}
        </p>

        {/* Midday High-Contrast Action Buttons */}
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

        {/* Midday Metric Grid Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden border border-white/[0.08] max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <div key={i} className="bg-[#0c0c0e] p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                {m.value}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Midday Bento Grid Features ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-mono mb-3 inline-block">ENGINEERED FOR EXCELLENCE</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-white mb-3">
            {t('featuresTitle')}
          </h2>
          <p className="text-zinc-400 text-sm">
            Everything you need for verified high-impact mentorship without platform friction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {bentoFeatures.map((b, i) => (
            <div key={i} className="bento-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-mono">{b.tag}</span>
                  <span className="text-lg text-zinc-400">{b.icon}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {b.desc}
                </p>
              </div>

              {b.preview}
            </div>
          ))}
        </div>
      </section>

      {/* ── Midday Architectural Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-12 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-widest text-white uppercase text-sm">EVEKSH</span>
          <span>·</span>
          <span>STOP GUESSING, START TALKING.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="status-dot"></span> All Systems Operational
          </span>
          <span>© {new Date().getFullYear()} EVEKSH Inc.</span>
        </div>
      </footer>
    </div>
  );
}
