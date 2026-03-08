import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (data.role === 'admin')     navigate('/admin/dashboard');
      else if (data.role === 'organizer') navigate('/organizer/dashboard');
      else navigate('/temples');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {/* Left temple image */}
        <div className="auth-img-panel" />
        {/* Right form */}
        <div className="auth-form-panel">
          <div className="auth-logo">🛕</div>
          <div className="auth-title">Login to user account</div>
          <div className="auth-subtitle">Welcome back, devotee</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="Enter email"
                value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Password"
                value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button className="btn btn-orange btn-full mt-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="auth-switch mt-3">
            Don't have an account? <a onClick={() => navigate('/register')}>Register here</a>
          </div>
          <div className="auth-switch" style={{marginTop:'6px',fontSize:'11px'}}>
            Already have an account? <a onClick={() => navigate('/login')}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}