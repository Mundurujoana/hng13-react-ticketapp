import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Landing: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center flex-grow max-w-[1440px] mx-auto px-6 text-center">
        {/* Animated Background Blobs */}
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

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-3xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Welcome to TicketApp
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Manage, track, and resolve tickets efficiently — all in one place.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm z-10"
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
      <motion.svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <path
          fill="#0099ff"
          fillOpacity="0.3"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
