import { Link, useNavigate } from "react-router-dom";
import { Globe, CreditCard, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Logo/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    setMobileMenuOpen(false);
    navigate("/");
  };

  const userName = user?.name || "";

  return (
    <nav className="w-full bg-[#faf4ef] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="eSIM Logo" className="h-12 w-12 md:h-16 md:w-16" />
        </Link>

        <div className="hidden md:flex items-center space-x-3">
          <button className="p-1.5 hover:bg-gray-200 rounded-full">
            <Globe className="h-4 w-4 text-black" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded-full">
            <CreditCard className="h-4 w-4 text-black" />
          </button>

          <div className="h-6 w-px bg-gray-300"></div>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-800 text-sm">Hi, {userName}</span>
              <Link
                to="/my-esims"
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition"
              >
                My eSIMs
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-black hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf4ef] px-4 py-4 space-y-2 shadow-inner">
          <div className="flex items-center space-x-3 mb-2">
            <button className="p-1.5 hover:bg-gray-200 rounded-full">
              <Globe className="h-4 w-4 text-black" />
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded-full">
              <CreditCard className="h-4 w-4 text-black" />
            </button>
          </div>

          {user ? (
            <>
              <span className="font-medium text-gray-800 text-sm block">Hi, {userName}</span>
              <Link
                to="/my-esims"
                className="block px-3 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                My eSIMs
              </Link>
              <Link
                to="/my-orders"
                className="block px-3 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 border border-gray-300 rounded-full text-sm font-medium text-black hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
