import { Routes, Route, Link } from 'react-router-dom';
import './tenant.css';
import TenantHome from './TenantHome';
import TenantProfile from './TenantProfile';
import TenantLogin from './TenantLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import ViewAllProperties from './ViewAllProperties';
import BookProperty from './BookProperty';

export default function TenantNavBar() {
  const { setIsTenantLoggedIn } = useAuth(); 

  const handleLogout = () => {
    setIsTenantLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Tenant</div>
        <ul className="nav-links">
          <li><Link to="/tenanthome">Home</Link></li>
          <li><Link to="/tenantprofile">Tenant Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/viewallproperties">Book a Property</Link></li>
          <li><Link to="/bookedproperties">Booked Properties</Link></li>
          <li><Link to="/tenantlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/tenanthome" element={<TenantHome />} exact />
        <Route path="/tenantprofile" element={<TenantProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile role="tenant" />} exact />
        <Route path="/viewallproperties" element={<ViewAllProperties />} exact />
        <Route path="/bookproperty" element={<BookProperty />} />
        <Route path="/bookedproperties" element={<BookedProperties />} exact />
        <Route path="/tenantlogin" element={<TenantLogin />} exact />
      </Routes>
    </div>
  );
}
