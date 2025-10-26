import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import wave from "../assets/wave.svg";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import createIcon from "../assets/create.png";
import trackIcon from "../assets/track.png";
import resolveIcon from "../assets/resolve.png";

const Landing: React.FC = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-between">

      {/* Decorative Blobs */}
      {[blob, blob1, blob2, blob3].map((b, i) => (
        <motion.img
          key={i}
          src={b}
          alt={`Blob ${i}`}
          className={`absolute ${i === 0 ? 'top-[-150px] left-[-150px] w-[450px] h-[450px] opacity-40' :
            i === 1 ? 'bottom-[-120px] right-[-150px] w-[400px] h-[400px] opacity-35' :
            i === 2 ? 'top-1/3 right-[-100px] w-[350px] h-[350px] opacity-30' :
            'bottom-1/3 left-[-120px] w-[300px] h-[300px] opacity-25'} 
            mix-blend-multiply pointer-events-none`}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1 + i*0.05, 1] }}
          transition={{ duration: 8 + i*2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Extra Hero Circle */}
      <motion.div
        className="absolute top-20 right-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-30 mix-blend-multiply pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Feature Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
        {[
          { icon: createIcon, title: "Create Tickets", desc: "Easily create new tickets and track issues in real-time." },
          { icon: trackIcon, title: "Track Tickets", desc: "Monitor the progress of tickets with status indicators." },
          { icon: resolveIcon, title: "Resolve Tickets", desc: "Mark tickets as resolved and maintain a clean workflow." }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition transform hover:scale-105"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * idx, duration: 0.7 }}
          >
            <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
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
