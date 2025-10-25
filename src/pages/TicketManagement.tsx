// src/pages/TicketManagement.tsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type TicketStatus = "open" | "in_progress" | "closed";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
}

const TicketManagement: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>("open");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(savedTickets);
  }, []);

  const saveTickets = (newTickets: Ticket[]) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
    setTickets(newTickets);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("open");
    setEditId(null);
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!["open", "in_progress", "closed"].includes(status)) {
      setError("Invalid status selected.");
      return;
    }

    if (editId !== null) {
      // Update existing ticket
      const updatedTickets = tickets.map((t) =>
        t.id === editId ? { ...t, title, description, status } : t
      );
      saveTickets(updatedTickets);
      setSuccess("Ticket updated successfully!");
    } else {
      // Create new ticket
      const newTicket: Ticket = {
        id: Date.now(),
        title,
        description,
        status,
      };
      saveTickets([...tickets, newTicket]);
      setSuccess("Ticket created successfully!");
    }

    resetForm();
  };

  const handleEdit = (ticket: Ticket) => {
    setTitle(ticket.title);
    setDescription(ticket.description || "");
    setStatus(ticket.status);
    setEditId(ticket.id);
    setError("");
    setSuccess("");
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    const updatedTickets = tickets.filter((t) => t.id !== id);
    saveTickets(updatedTickets);
    setSuccess("Ticket deleted successfully!");
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-[1440px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Ticket Management</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col gap-4 max-w-md"
        >
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? "Update Ticket" : "Create Ticket"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* Ticket List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{ticket.title}</h2>
              {ticket.description && <p className="text-gray-600">{ticket.description}</p>}
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace("_", " ").toUpperCase()}
              </span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketManagement;
