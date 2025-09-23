import { BrowserRouter } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import TenantNavBar from "./tenant/tenantnavbar";
import OwnerNavBar from "./owner/OwnerNavbar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import AdminNavBar from "./Admin/AdminNavbar";

function AppContent() {
  const { isAdminLoggedIn, isTenantLoggedIn, isOwnerLoggedIn } = useAuth();

  return (
    <div>
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isTenantLoggedIn ? (
        <TenantNavBar />
      ) : isOwnerLoggedIn ? (
        <OwnerNavBar />
      ) : (
        <MainNavbar />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
