import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import TempleList from './pages/TempleList';
import TempleSlots from './pages/TempleSlots';
import MyBookings from './pages/MyBookings';
import MyTemple from './pages/MyTemple';
import UpdateTemple from './pages/UpdateTemple';

import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import OrganizerBookings  from './pages/organizer/OrganizerBookings';
import CreateTemple       from './pages/organizer/CreateTemple';
import CreateSlot         from './pages/organizer/CreateSlot';

import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminUsers      from './pages/admin/AdminUsers';
import AdminOrganizers from './pages/admin/AdminOrganizers';
import AdminTemples    from './pages/admin/AdminTemples';
import AdminBookings   from './pages/admin/AdminBookings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/"        element={<Landing />} />
          <Route path="/login"   element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/temples"  element={<TempleList />} />
          <Route path="/temples/:id" element={<TempleSlots />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />

          {/* User */}
          <Route path="/my-bookings" element={
            <PrivateRoute roles={['user']}><MyBookings /></PrivateRoute>
          } />

          {/* Organizer */}
          <Route path="/organizer/dashboard" element={
            <PrivateRoute roles={['organizer']}><OrganizerDashboard /></PrivateRoute>
          } />
          <Route path="/organizer/temple" element={
            <PrivateRoute roles={['organizer']}><MyTemple /></PrivateRoute>
          } />
          <Route path="/organizer/create-temple" element={
            <PrivateRoute roles={['organizer']}><CreateTemple /></PrivateRoute>
          } />
          <Route path="/organizer/update-temple/:id" element={
            <PrivateRoute roles={['organizer']}><UpdateTemple /></PrivateRoute>
          } />
          <Route path="/organizer/darshans" element={
            <PrivateRoute roles={['organizer']}><CreateSlot /></PrivateRoute>
          } />
          <Route path="/organizer/bookings" element={
            <PrivateRoute roles={['organizer']}><OrganizerBookings /></PrivateRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>
          } />
          <Route path="/admin/organizers" element={
            <PrivateRoute roles={['admin']}><AdminOrganizers /></PrivateRoute>
          } />
          <Route path="/admin/temples" element={
            <PrivateRoute roles={['admin']}><AdminTemples /></PrivateRoute>
          } />
          <Route path="/admin/bookings" element={
            <PrivateRoute roles={['admin']}><AdminBookings /></PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}