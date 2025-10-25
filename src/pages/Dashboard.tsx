// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Load tickets from localStorage
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(savedTickets);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/auth/login");
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2">Total Tickets</h2>
            <p className="text-3xl font-bold">{totalTickets}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2">Open Tickets</h2>
            <p className="text-3xl font-bold text-green-600">{openTickets}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2">Resolved Tickets</h2>
            <p className="text-3xl font-bold text-gray-600">{closedTickets}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <Link
            to="/tickets"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Manage Tickets
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
