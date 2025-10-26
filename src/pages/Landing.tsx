import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import wave from "../assets/wave.svg";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";

const Landing: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-between">

      {/* Floating Blob Images */}
      <motion.img
        src={blob}
        alt="Blob"
        className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] opacity-40 mix-blend-multiply pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={blob1}
        alt="Blob 1"
        className="absolute bottom-[-120px] right-[-150px] w-[400px] h-[400px] opacity-35 mix-blend-multiply pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={blob2}
        alt="Blob 2"
        className="absolute top-1/3 right-[-100px] w-[350px] h-[350px] opacity-30 mix-blend-multiply pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.07, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={blob3}
        alt="Blob 3"
        className="absolute bottom-1/3 left-[-120px] w-[300px] h-[300px] opacity-25 mix-blend-multiply pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center flex-grow max-w-[1440px] mx-auto px-6 text-center z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-3xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Welcome to TicketApp
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Manage, track, and resolve tickets efficiently — all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Link
            to="/auth/login"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300 font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Wave SVG at Bottom */}
      <motion.img
        src={wave}
        alt="Wave background"
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <Footer />
    </div>
  );
};

export default Landing;
