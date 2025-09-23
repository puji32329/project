import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddOwner from './AddOwner';
import ViewTenants from './ViewTenants';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddPlots from './AddPlots';
import DisplayPlot from './DisplayPlot';
import ViewAllPlots from './ViewAllPlots';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addowner">Add Owner</Link></li>
          <li><Link to="/viewowners">View Owners</Link></li>
          <li><Link to="/viewalltenants">View All Tenants</Link></li>

          <li className="dropdown">
            <span>Plots▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/addplot">Add</Link></li>
              <li><Link to="/viewallplots">View All</Link></li>
              <li><Link to="/displayplots">Display</Link></li>
            </ul>
          </li>

          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addowner" element={<AddOwner />} exact />
        <Route path="/viewowners" element={<ViewOwners />} exact />
        <Route path="/viewalltenants" element={<ViewTenants />} exact />

        <Route path="/addplot" element={<AddPlot />} exact />
        <Route path="/viewallplots" element={<ViewAllPlots />} exact />
        <Route path="/displayplots" element={<DisplayPlots />} exact />

        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}

