export default function About() {
  return (
    <div className="page-wrap">
      <h2 className="page-header">About Us</h2>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="chart-card" style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', fontSize: '48px', marginBottom: '16px' }}>🛕</div>
          <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--dark)', marginBottom: '12px', textAlign: 'center' }}>
            Who We Are
          </h3>
          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '14px' }}>
            DarashanEase is a seamless temple darshan booking platform that connects devotees with sacred temples across India.
            We make it easy to book your darshan slots online, saving you time and ensuring a peaceful spiritual experience.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: '🙏', title: 'Our Mission', text: 'To make temple darshan accessible to every devotee across India.' },
            { icon: '👁️', title: 'Our Vision', text: 'A digital India where spirituality meets technology seamlessly.' },
            { icon: '💎', title: 'Our Values', text: 'Devotion, Transparency, Simplicity and Service to all.' },
          ].map(c => (
            <div key={c.title} className="slot-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{c.icon}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontWeight: '700', color: 'var(--dark)', marginBottom: '8px' }}>{c.title}</div>
              <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.7 }}>{c.text}</div>
            </div>
          ))}
        </div>
        <div className="chart-card">
          <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--dark)', marginBottom: '16px' }}>Why DarashanEase?</h3>
          {[
            '✅ Book darshan slots from anywhere, anytime',
            '✅ Skip long queues with digital tickets',
            '✅ QR code based entry for fast verification',
            '✅ Support for Normal & VIP darshan slots',
            '✅ Trusted by thousands of devotees',
          ].map(item => (
            <p key={item} style={{ fontSize: '14px', color: '#444', padding: '8px 0', borderBottom: '1px solid #f0e8e0', lineHeight: 1.6 }}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}