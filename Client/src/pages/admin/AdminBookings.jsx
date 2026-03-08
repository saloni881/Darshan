import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/bookings').then(r=>setBookings(r.data)).catch(console.error).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="page-wrap">
      <h2 className="page-header">All Bookings</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>User</th><th>Temple</th><th>Darshan</th><th>Date</th><th>Slots</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>
            {bookings.map((b,i) => (
              <tr key={b._id}>
                <td>{i+1}</td>
                <td>{b.user?.username}</td>
                <td>{b.temple?.name}</td>
                <td>{b.slot?.name}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>{b.noOfSlots}</td>
                <td><span className={`badge ${b.type==='VIP'?'badge-orange':'badge-green'}`}>{b.type}</span></td>
                <td><span className={`badge ${b.status==='Confirmed'?'badge-green':'badge-red'}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}