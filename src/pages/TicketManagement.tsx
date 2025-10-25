import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type TicketStatus = "open" | "in_progress" | "closed";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
}

const TicketManagement: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const quickActionRef = useRef<HTMLDivElement>(null);
  const [quickOpen, setQuickOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>("open");

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(savedTickets);
  }, []);

  // Close quick action if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickActionRef.current && !quickActionRef.current.contains(event.target as Node)) {
        setQuickOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveTickets = (newTickets: Ticket[]) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
    setTickets(newTickets);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("open");
    setSelectedTicket(null);
  };

  const openModalForCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const openModalForEdit = (ticket: Ticket) => {
    setTitle(ticket.title);
    setDescription(ticket.description || "");
    setStatus(ticket.status);
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const openDeleteModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setConfirmDeleteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setToast({ message: "Title is required.", type: "error" });
      return;
    }

    if (selectedTicket) {
      const updatedTickets = tickets.map((t) =>
        t.id === selectedTicket.id ? { ...t, title, description, status } : t
      );
      saveTickets(updatedTickets);
      setToast({ message: "Ticket updated successfully!", type: "success" });
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        title,
        description,
        status,
      };
      saveTickets([...tickets, newTicket]);
      setToast({ message: "Ticket created successfully!", type: "success" });
    }

    resetForm();
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!selectedTicket) return;
    const updatedTickets = tickets.filter((t) => t.id !== selectedTicket.id);
    saveTickets(updatedTickets);
    setToast({ message: "Ticket deleted successfully!", type: "success" });
    setConfirmDeleteModalOpen(false);
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-amber-100 text-amber-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-8 gap-4">
          <h1 className="text-3xl font-bold text-center sm:text-left text-gray-800">
            Ticket Management
          </h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Ticket Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredTickets.length ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold">{ticket.title}</h2>
                {ticket.description && <p className="text-gray-600">{ticket.description}</p>}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status.replace("_", " ").toUpperCase()}
                </span>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openModalForEdit(ticket)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(ticket)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No tickets found.</p>
          )}
        </div>
      </main>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTicket ? "Edit Ticket" : "Create New Ticket"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          >
            {selectedTicket ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={confirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="text-center space-y-4">
          <p className="text-gray-700 text-lg">
            Are you sure you want to delete this ticket?
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setConfirmDeleteModalOpen(false)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Floating Quick Action Button */}
      <div className="fixed bottom-28 right-8 z-50" ref={quickActionRef}>
        {/* Main Button */}
        <button
          onClick={() => setQuickOpen(!quickOpen)}
          className={`w-16 h-16 rounded-full bg-blue-600 text-white text-4xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform transform ${
            quickOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </button>

        {/* Dropdown Actions */}
        <AnimatePresence>
          {quickOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3"
            >
              <Link
                to="/dashboard"
                className="bg-gray-900 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800 transition font-medium text-center"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default TicketManagement;
