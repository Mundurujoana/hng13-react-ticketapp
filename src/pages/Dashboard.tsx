import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { BarChart3, ClipboardList, CheckCircle, LogOut } from "lucide-react";

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
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(savedTickets);
  }, []);



  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage and monitor all your tickets at a glance.
            </p>
          </div>

        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <ClipboardList className="text-blue-600 mb-3" size={28} />
            <h2 className="text-sm font-semibold text-gray-500">Total Tickets</h2>
            <p className="text-3xl font-bold mt-1">{totalTickets}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <BarChart3 className="text-yellow-500 mb-3" size={28} />
            <h2 className="text-sm font-semibold text-gray-500">In Progress</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{inProgress}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <CheckCircle className="text-green-600 mb-3" size={28} />
            <h2 className="text-sm font-semibold text-gray-500">Open Tickets</h2>
            <p className="text-3xl font-bold text-green-600 mt-1">{openTickets}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <CheckCircle className="text-gray-500 mb-3" size={28} />
            <h2 className="text-sm font-semibold text-gray-500">Closed Tickets</h2>
            <p className="text-3xl font-bold text-gray-700 mt-1">{closedTickets}</p>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="text-gray-500 text-sm">
              Create or manage tickets with one click.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/tickets"
              className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Manage Tickets
            </Link>
            {/* <Link
              to="/tickets/new"
              className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Create Ticket
            </Link> */}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
