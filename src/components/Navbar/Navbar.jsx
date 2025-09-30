import { Link, useNavigate } from "react-router-dom";
import { Globe, CreditCard, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Logo/4.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [language, setLanguage] = useState("EN"); // default language
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const userName = user?.name || "";

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLangModalOpen(false);
    // later connect this with translations
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-8xl mx-14 flex items-center justify-between pl-2 pr-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-80">
          <img
            src={logo}
            alt="eSIM Logo"
            className="h-16 w-auto object-contain md:h-24"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5 ml-36">
          {/* Language Modal Trigger */}
          <button
            onClick={() => setLangModalOpen(true)}
            className="p-2 rounded-full hover:bg-orange-100 transition relative"
          >
            <Globe className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-2 text-xs font-bold text-orange-600">
              {language}
            </span>
          </button>

          <button className="p-2 rounded-full hover:bg-orange-100 transition">
            <CreditCard className="h-5 w-5 text-gray-700" />
          </button>

          <div className="h-6 w-px bg-gray-300"></div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-800 text-sm">
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf4ef] px-4 py-4 space-y-3 shadow-inner animate-slideDown">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLangModalOpen(true)}
              className="p-2 rounded-full hover:bg-orange-100 transition relative"
            >
              <Globe className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-2 text-xs font-bold text-orange-600">
                {language}
              </span>
            </button>
            <button className="p-2 rounded-full hover:bg-orange-100 transition">
              <CreditCard className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {user ? (
            <>
              <span className="font-medium text-gray-800 text-sm block">
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}

      {/* Language Modal */}
      {langModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-80 p-6 text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800">🌍 Choose Language</h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleLanguageChange("EN")}
                className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 font-semibold text-gray-800 transition"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("UR")}
                className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 font-semibold text-gray-800 transition"
              >
                اردو
              </button>
              <button
                onClick={() => handleLanguageChange("AR")}
                className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 font-semibold text-gray-800 transition"
              >
                العربية
              </button>
            </div>
            <button
              onClick={() => setLangModalOpen(false)}
              className="mt-6 px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
