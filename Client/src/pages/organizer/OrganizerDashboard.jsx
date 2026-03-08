import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function OrganizerDashboard() {
  const [stats, setStats] = useState({ temples:0, darshans:0, bookings:0 });

  useEffect(() => {
    Promise.all([
      api.get('/temples/my').catch(()=>null),
      api.get('/slots/my').catch(()=>({data:[]})),
      api.get('/bookings/organizer').catch(()=>({data:[]})),
    ]).then(([t,s,b]) => {
      setStats({ temples: t?1:0, darshans: s.data.length, bookings: b.data.length });
    });
  }, []);

  const chartData = [
    { name:'Temple',   value: stats.temples  },
    { name:'Darshans', value: stats.darshans },
    { name:'Bookings', value: stats.bookings },
  ];

  return (
    <div className="dashboard-wrap">
      <h1 className="dashboard-title">DashBoard</h1>
      <div className="stat-cards">
        <div className="stat-card s-teal">
          <div className="stat-val">{stats.temples}</div>
          <div className="stat-label">Temple</div>
        </div>
        <div className="stat-card s-orange">
          <div className="stat-val">{stats.darshans}</div>
          <div className="stat-label">Darshans</div>
        </div>
        <div className="stat-card s-green">
          <div className="stat-val">{stats.bookings}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Overview</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{top:10,right:20,left:0,bottom:5}}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="value" fill="#1a7a6e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}