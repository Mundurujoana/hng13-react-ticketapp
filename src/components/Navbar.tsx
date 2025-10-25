import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ticketapp_session");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/auth/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Ticket<span className="text-gray-900">App</span>
        </Link>

        {/* Desktop Menu */}
        {token && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/tickets"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Tickets
            </Link>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {token && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none hover:text-blue-600 transition"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && token && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 space-y-3">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/tickets"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Tickets
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
