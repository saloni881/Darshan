import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SLIDES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tirupati_Balaji.jpg/800px-Tirupati_Balaji.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Akshardham_Temple%2C_New_Delhi.jpg/800px-Akshardham_Temple%2C_New_Delhi.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Meenakshi_amman_temple_madurai.jpg/800px-Meenakshi_amman_temple_madurai.jpg',
];
const PREVIEW = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Akshardham_Temple%2C_New_Delhi.jpg/400px-Akshardham_Temple%2C_New_Delhi.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tirupati_Balaji.jpg/400px-Tirupati_Balaji.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Meenakshi_amman_temple_madurai.jpg/400px-Meenakshi_amman_temple_madurai.jpg',
];
const FB = SLIDES[0];

export default function Landing() {
  const navigate = useNavigate();
  const [temples, setTemples] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    api.get('/temples').then(r => setTemples(r.data.slice(0,3))).catch(() => {});
    const t = setInterval(() => setSlide(s => (s+1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const displayTemples = temples.length > 0
    ? temples
    : PREVIEW.map((img,i) => ({ _id: `p${i}`, name: '', image: img, preview: true }));

  return (
    <>
      {/* Hero Slider */}
      <div className="hero">
        {SLIDES.map((src, i) => (
          <div key={i} className={`hero-slide${i===slide?' active':''}`}
            style={{ backgroundImage: `url(${src})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <img className="hero-logo-img" src={FB} alt="logo" onError={e=>e.target.style.display='none'} />
          <div className="hero-title">DarashanEase</div>
          <div className="hero-sub">Seamless Temple Darshan Ticket Booking at Your Fingertips</div>
        </div>
        <div className="hero-dots">
          {SLIDES.map((_,i) => (
            <button key={i} className={`hero-dot${i===slide?' active':''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* Temples Section */}
      <div className="section">
        <h2 className="section-title">Temples</h2>
        <div className="cards-grid">
          {displayTemples.map((t, i) => (
            <div key={t._id} className="temple-card"
              style={{ cursor: t.preview ? 'default' : 'pointer' }}
              onClick={() => !t.preview && navigate(`/temples/${t._id}`)}>
              <img src={t.image || PREVIEW[i%3]} alt={t.name} onError={e => e.target.src=FB} />
              {!t.preview && t.name && (
                <div className="temple-card-body">
                  <div className="temple-card-name">{t.name}</div>
                  <div className="temple-card-meta">📍 <span>{t.location}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p><em>"Embark on a Spiritual Journey, One Darshan at a Time — Seamless Temple Darshan Ticket Booking at Your Fingertips!"</em></p>
      <p style={{marginTop:'6px'}}>Copyright © 2024 by <strong>DarashanEase</strong>. Designed by <strong>Tirupati</strong>.</p>
    </footer>
  );
}
