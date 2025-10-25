import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Toast from "../../components/Toast";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setToastType("error");
      setToastMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setToastType("error");
      setToastMessage("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setError("User already exists.");
      setToastType("error");
      setToastMessage("User already exists.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    setToastType("success");
    setToastMessage("Account created successfully! Redirecting to login...");

    setTimeout(() => navigate("/auth/login"), 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      {/* Animated Blobs */}
      <motion.div
        className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-spin-slow pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[-60px] w-[350px] h-[350px] bg-purple-300 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-spin-slow-reverse pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4 z-10 relative"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-extrabold mb-4 text-gray-900 text-center">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>

      {/* Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      <Footer />
    </div>
  );
};

export default Signup;
