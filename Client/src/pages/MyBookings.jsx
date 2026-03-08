import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';

function QRCanvas({ bookingId, size = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // Simple QR placeholder — draw a styled box with booking ID
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#1a7a6e';
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, size - 8, size - 8);

    // Draw position detection patterns (corners)
    const drawCorner = (x, y) => {
      ctx.fillStyle = '#1a7a6e';
      ctx.fillRect(x, y, 18, 18);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 3, y + 3, 12, 12);
      ctx.fillStyle = '#1a7a6e';
      ctx.fillRect(x + 6, y + 6, 6, 6);
    };
    drawCorner(8, 8);
    drawCorner(size - 26, 8);
    drawCorner(8, size - 26);

    // Draw random dots from booking ID hash
    ctx.fillStyle = '#1a7a6e';
    const seed = bookingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    for (let i = 0; i < 60; i++) {
      const pseudo = ((seed * (i + 1) * 2654435761) >>> 0) % 1000;
      const gx = 30 + (pseudo % 6) * 7;
      const gy = 8 + (Math.floor(pseudo / 6) % 9) * 7;
      if (gx < size - 10 && gy < size - 10) ctx.fillRect(gx, gy, 5, 5);
    }
    for (let i = 0; i < 40; i++) {
      const pseudo = ((seed * (i + 73) * 1234567891) >>> 0) % 1000;
      const gx = 8 + (pseudo % 3) * 7;
      const gy = 30 + (Math.floor(pseudo / 3) % 6) * 7;
      if (gx < 28 && gy < size - 10) ctx.fillRect(gx, gy, 5, 5);
    }
  }, [bookingId, size]);

  return <canvas ref={canvasRef} style={{ borderRadius: '6px', flexShrink: 0 }} />;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const qrRefs = useRef({});

  useEffect(() => {
    api.get('/bookings/my')
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDownload = (booking) => {
    const canvas = qrRefs.current[booking._id];
    const qrDataUrl = canvas ? canvas.toDataURL() : '';
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Booking Ticket</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Nunito:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Nunito', sans-serif; padding: 30px; background: #fff9f2; display: flex; justify-content: center; }
        .ticket { width: 480px; border: 2px solid #e85d04; border-radius: 20px; overflow: hidden; background: #fff; }
        .header { background: linear-gradient(135deg, #e85d04, #f4a261); color: white; padding: 24px; text-align: center; }
        .header h2 { font-family: 'Cinzel', serif; font-size: 1.6rem; margin-bottom: 4px; }
        .header p { opacity: 0.9; font-size: 0.9rem; }
        .body { padding: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field label { font-size: 0.7rem; color: #aaa; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }
        .field p { font-weight: 700; color: #1a1a1a; margin-top: 3px; font-size: 0.95rem; }
        .status-confirmed { display: inline-block; background: #d4edda; color: #155724; padding: 3px 12px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; }
        .status-cancelled { display: inline-block; background: #f8d7da; color: #721c24; padding: 3px 12px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; }
        .qr-section { border-top: 2px dashed #f0e0d0; padding: 20px; text-align: center; }
        .qr-section img { border-radius: 8px; }
        .qr-section p { color: #aaa; font-size: 0.75rem; margin-top: 8px; }
        .footer-note { background: #fff9f2; padding: 12px; text-align: center; font-size: 0.8rem; color: #e85d04; font-weight: 700; border-top: 1px solid #f0e0d0; }
      </style></head><body>
      <div class="ticket">
        <div class="header">
          <h2>🛕 DarshanEase Ticket</h2>
          <p>Booking Confirmation</p>
        </div>
        <div class="body">
          <div class="field"><label>Booking ID</label><p>${booking._id?.slice(-8).toUpperCase()}</p></div>
          <div class="field"><label>Temple Name</label><p>${booking.temple?.name || '-'}</p></div>
          <div class="field"><label>Darshan Name</label><p>${booking.darshnaName || booking.slot?.name || '-'}</p></div>
          <div class="field"><label>Booking Date</label><p>${booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '-'}</p></div>
          <div class="field"><label>Darshan Timing</label><p>${booking.slot?.open || ''} - ${booking.slot?.close || ''}</p></div>
          <div class="field"><label>No of Tickets</label><p>${booking.noOfSlots}</p></div>
          <div class="field"><label>Type</label><p>${booking.type}</p></div>
          <div class="field"><label>Status</label><p><span class="status-${(booking.status || '').toLowerCase()}">${booking.status}</span></p></div>
        </div>
        ${qrDataUrl ? `
        <div class="qr-section">
          <img src="${qrDataUrl}" width="100" height="100"/>
          <p>Scan at temple entry gate</p>
        </div>` : ''}
        <div class="footer-note">🙏 Jai Shree Ram • Have a blessed darshan!</div>
      </div>
      <script>window.onload = () => { window.print(); }</script>
      </body></html>
    `);
    win.document.close();
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1a7a6e', fontSize: '1.2rem' }}>
      Loading bookings...
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", textAlign: 'center', fontSize: '2rem', color: '#1a1a1a', marginBottom: '8px' }}>
        My Bookings
      </h2>
      <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #e85d04, #f4a261)', margin: '0 auto 32px', borderRadius: '2px' }} />

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: '1.1rem' }}>
          No bookings yet.{' '}
          <a href="/temples" style={{ color: '#e85d04', fontWeight: '700' }}>Book a Darshan →</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map(b => (
            <div key={b._id} style={{
              background: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #f0e8e0',
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px', flexWrap: 'wrap',
            }}>
              {/* Temple Image */}
              <img
                src={b.temple?.image || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1'}
                alt={b.temple?.name}
                onError={e => { e.target.src = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/bf/b9/dd/somnath-temple-main-entrance.jpg?w=1400&h=1400&s=1'; }}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
              />

              {/* QR Code */}
              <div ref={el => { if (el) qrRefs.current[b._id] = el.querySelector('canvas'); }}>
                <QRCanvas bookingId={b._id} size={80} />
              </div>

              {/* Details Grid */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                {[
                  { label: 'Booking ID', value: b._id?.slice(-8).toUpperCase() },
                  { label: 'Temple Name', value: b.temple?.name || '-' },
                  { label: 'Darshan Name', value: b.darshnaName || b.slot?.name || '-' },
                  { label: 'Booking Date', value: b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : '-' },
                  { label: 'Darshan Timing', value: `${b.slot?.open || ''} - ${b.slot?.close || ''}` },
                  { label: 'No of Tickets', value: b.noOfSlots },
                  { label: 'Type', value: b.type },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: '0.68rem', color: '#aaa', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>{f.label}</div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#1a1a1a', marginTop: '2px' }}>{f.value}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#aaa', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>Status</div>
                  <span style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginTop: '2px',
                    background: b.status === 'Confirmed' ? '#d4edda' : '#f8d7da',
                    color: b.status === 'Confirmed' ? '#155724' : '#721c24',
                  }}>{b.status}</span>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(b)}
                title="Download Ticket"
                style={{
                  width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                  background: 'linear-gradient(135deg, #1a7a6e, #2a9d8f)',
                  color: '#fff', cursor: 'pointer', fontSize: '1.2rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(26,122,110,0.35)', flexShrink: 0,
                }}
              >⬇</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}