import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-wrap">
      <h2 className="page-header">Contact Us</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Contact Info */}
        <div>
          <div className="chart-card" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--dark)', marginBottom: '20px' }}>Get In Touch</h3>
            {[
              { icon: '📞', label: 'Phone', value: '127-865-586-67' },
              { icon: '📧', label: 'Email', value: 'support@darashanease.com' },
              { icon: '📍', label: 'Address', value: 'Tirupati, Andhra Pradesh, India' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9AM – 6PM IST' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid #f0e8e0' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', fontWeight: '700' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: 'var(--dark)', fontWeight: '600', marginTop: '2px' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-card" style={{ background: 'linear-gradient(135deg, var(--teal), var(--teal2))', color: '#fff' }}>
            <p style={{ fontSize: '14px', lineHeight: 1.8, opacity: 0.9 }}>
              🙏 <em>"Embark on a Spiritual Journey, One Darshan at a Time — Seamless Temple Darshan Ticket Booking at Your Fingertips!"</em>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="chart-card">
          <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--dark)', marginBottom: '20px' }}>Send a Message</h3>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', color: 'var(--teal)', marginBottom: '8px' }}>Message Sent!</div>
              <p style={{ color: '#666', fontSize: '13px' }}>We'll get back to you within 24 hours.</p>
              <button className="btn btn-teal mt-3" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="Enter your name"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="Enter your email"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="What is this about?"
                  value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Write your message here..."
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button className="btn btn-orange btn-full mt-3" type="submit">Send Message 📨</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
