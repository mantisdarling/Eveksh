'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { PaymentForm } from '@/components/PaymentForm';

export default function CheckoutPage() {
  const { locale } = useParams() as { locale: string };
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expert') || '';
  const day = searchParams.get('day') || 'TBD';
  const slot = searchParams.get('slot') || 'TBD';

  return (
    <div style={{ minHeight: '100vh', background: '#37353E', color: '#D3DAD9' }}>
      <Navbar locale={locale} />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
        <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#D3DAD9' }}>Secure Checkout</h1>
          <p style={{ color: '#a3a69f', marginTop: '0.4rem' }}>Your payment is held in escrow — released only after your session ends.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Session summary */}
          <div className="glass-panel" style={{ borderRadius: '1.25rem', padding: '2rem', background: '#44444E', border: '1px solid rgba(211,218,217,0.12)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#D3DAD9' }}>Session Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[['Expert','Mentor'],['Date', day],['Time', slot],['Duration','60 minutes'],['Rate','$150/hr']].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(211,218,217,0.1)' }}>
                  <span style={{ color: '#a3a69f', fontSize: '0.875rem' }}>{label}</span>
                  <span style={{ color: '#D3DAD9', fontWeight: 600, fontSize: '0.875rem' }}>{val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#D3DAD9' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#D3DAD9' }}>$150.00</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#37353E', borderRadius: '0.875rem', border: '1px solid rgba(211,218,217,0.15)' }}>
              <p style={{ fontSize: '0.8rem', color: '#D3DAD9', fontWeight: 600, marginBottom: '0.25rem' }}>Escrow Protection</p>
              <p style={{ fontSize: '0.78rem', color: '#a3a69f', lineHeight: 1.6 }}>Your $150 is held securely until your session ends. If your mentor doesn't show up, you get a full refund.</p>
            </div>
          </div>

          {/* Payment form */}
          <div className="glass-panel" style={{ borderRadius: '1.25rem', padding: '2rem', background: '#44444E', border: '1px solid rgba(211,218,217,0.12)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#D3DAD9' }}>Payment Details</h2>
            <PaymentForm amount={150} expertId={expertId} locale={locale} />
          </div>
        </div>
      </main>
    </div>
  );
}
