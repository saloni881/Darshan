import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const a = (p) => pathname === p ? 'nav-link active' : 'nav-link';
  const go = (p) => navigate(p);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => go('/')}>🛕 DarashanEase</span>
      <div className="navbar-links">

        {/* Public (not logged in) */}
        {!user && <>
          <button className={a('/')}         onClick={() => go('/')}>Home</button>
          <button className={a('/temples')}  onClick={() => go('/temples')}>Temples</button>
          <button className={a('/about')}    onClick={() => go('/about')}>About</button>
          <button className={a('/services')} onClick={() => go('/services')}>Services</button>
          <button className={a('/contact')}  onClick={() => go('/contact')}>Contact us</button>
          <button className={a('/login')}    onClick={() => go('/login')}>Login</button>
        </>}

        {/* User role */}
        {user?.role === 'user' && <>
          <button className={a('/temples')}    onClick={() => go('/temples')}>Temples</button>
          <button className={a('/my-bookings')} onClick={() => go('/my-bookings')}>My Bookings</button>
          <span className="nav-user">{user.username}</span>
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </>}

        {/* Organizer role */}
        {user?.role === 'organizer' && <>
          <button className={a('/organizer/dashboard')} onClick={() => go('/organizer/dashboard')}>Dashboard</button>
          <button className={a('/organizer/temple')}    onClick={() => go('/organizer/temple')}>My Temple</button>
          <button className={a('/organizer/darshans')}  onClick={() => go('/organizer/darshans')}>Darshans</button>
          <button className={a('/organizer/bookings')}  onClick={() => go('/organizer/bookings')}>Bookings</button>
          <span className="nav-user">{user.username}</span>
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </>}

        {/* Admin role */}
        {user?.role === 'admin' && <>
          <button className={a('/admin/dashboard')}   onClick={() => go('/admin/dashboard')}>Dashboard</button>
          <button className={a('/admin/users')}       onClick={() => go('/admin/users')}>Users</button>
          <button className={a('/admin/organizers')}  onClick={() => go('/admin/organizers')}>Organizers</button>
          <span className="nav-user">{user.username}</span>
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        </>}

      </div>
    </nav>
  );
}