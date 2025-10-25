import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { BarChart3, ClipboardList, CheckCircle } from "lucide-react";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
}

const Dashboard: React.FC = () => {
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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-spin-slow pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-80px] w-[350px] h-[350px] bg-purple-300 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-spin-slow-reverse pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      <Navbar />

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm">
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
          {[
            { title: "Total Tickets", value: totalTickets, icon: ClipboardList, color: "text-blue-600" },
            { title: "In Progress", value: inProgress, icon: BarChart3, color: "text-yellow-500" },
            { title: "Open Tickets", value: openTickets, icon: CheckCircle, color: "text-green-600" },
            { title: "Closed Tickets", value: closedTickets, icon: CheckCircle, color: "text-gray-500" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
            >
              <stat.icon className={`${stat.color} mb-3`} size={28} />
              <h2 className="text-sm font-semibold text-gray-500">{stat.title}</h2>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
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
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
