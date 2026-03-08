import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import api from '../../api/axios';

const COLORS = ['#6a4c93', '#1a7a6e', '#e85d04', '#e9a100', '#2a9d8f'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, organizers: 0, temples: 0, darshans: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(r => { setStats(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'USERS',          value: stats.users,      color: '#6a4c93', bg: '#f3eeff', icon: '👤' },
    { label: 'Organizers',     value: stats.organizers, color: '#1a7a6e', bg: '#e8f7f5', icon: '🏛️' },
    { label: 'Temples',        value: stats.temples,    color: '#e85d04', bg: '#fff0e8', icon: '🛕' },
    { label: 'Darshans',       value: stats.darshans,   color: '#e9a100', bg: '#fff8e1', icon: '🙏' },
    { label: 'Total Bookings', value: stats.bookings,   color: '#2a9d8f', bg: '#e8f7f5', icon: '🎟️' },
  ];

  const chartData = [
    { name: 'Users',      value: stats.users },
    { name: 'Organizers', value: stats.organizers },
    { name: 'Temples',    value: stats.temples },
    { name: 'Darshans',   value: stats.darshans },
    { name: 'Bookings',   value: stats.bookings },
  ];

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1a7a6e', fontSize: '1.2rem' }}>
      Loading dashboard...
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      <h1 style={{ fontFamily: "'Cinzel', serif", textAlign: 'center', fontSize: '2rem', color: '#1a1a1a', marginBottom: '8px' }}>
        DashBoard
      </h1>
      <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #e85d04, #f4a261)', margin: '0 auto 36px', borderRadius: '2px' }} />

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {cards.map(c => (
          <div key={c.label} style={{
            background: c.bg, borderRadius: '16px', padding: '24px 20px',
            textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
            borderTop: `4px solid ${c.color}`,
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{c.icon}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: c.color }}>{c.value}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", color: '#1a1a1a', marginBottom: '24px', fontSize: '1.2rem' }}>
          Platform Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} />
            <YAxis tick={{ fontSize: 12, fill: '#666' }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}