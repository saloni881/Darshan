export default function Services() {
  const services = [
    { icon: '🎟️', title: 'Online Darshan Booking', desc: 'Book your temple darshan slot online in just a few clicks. Choose from Normal or VIP darshan options.', color: 'var(--teal)' },
    { icon: '📱', title: 'Digital QR Tickets', desc: 'Receive a QR code ticket after booking. Show it at the temple gate for quick and easy entry.', color: 'var(--orange)' },
    { icon: '🛕', title: 'Temple Management', desc: 'Temple organizers can manage their temple profile, darshan slots, timings, and bookings easily.', color: 'var(--green)' },
    { icon: '📊', title: 'Booking Analytics', desc: 'Organizers and admins get detailed analytics and insights about bookings and devotee traffic.', color: 'var(--purple)' },
    { icon: '🔔', title: 'Slot Availability', desc: 'Check real-time slot availability for any temple. Plan your visit in advance with confidence.', color: '#e9a100' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Your booking data and personal information is always safe with our secure platform.', color: '#e63946' },
  ];

  return (
    <div className="page-wrap">
      <h2 className="page-header">Our Services</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px', fontSize: '14px' }}>
        Everything you need for a seamless darshan experience
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {services.map(s => (
          <div key={s.title} className="darshan-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>{s.icon}</div>
            <div className="darshan-card-name" style={{ color: s.color }}>{s.title}</div>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, marginTop: '8px' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
