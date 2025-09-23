import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import './style.css';
import TenantLogin from './../tenant/TenantLogin';
import TenantRegistration from './../tenant/TenantRegistration';
import Contact from './Contact';
import AdminLogin from '../Admin/AdminLogin';
import OwnerLogin from '../owner/OwnerLogin';
import NotFound from './NotFound';
import Home from './HomePage';

export default function MainNavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">PROPERTY  MANAGEMENT  SYSTEM</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/tenantregistration">Register</Link></li>
          <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/tenantlogin">Tenant</Link></li>
              <li><Link to="/ownerlogin">Owner</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/tenantregistration" element={<TenantRegistration />} exact />
        <Route path="/tenantlogin" element={<TenantLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/ownerlogin" element={<OwnerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}
