import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto text-center py-24 px-6 flex flex-col justify-center items-center flex-grow">
        {/* Decorative Circles */}
        <div className="absolute top-16 left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl animate-pulse opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-32 right-8 w-36 h-36 bg-purple-100 rounded-full blur-3xl animate-pulse opacity-40 pointer-events-none"></div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to TicketApp
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Manage, track, and resolve tickets efficiently — all in one place.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm z-10">
          <Link
            to="/auth/login"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out text-center font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="w-full sm:w-auto border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition duration-300 ease-in-out text-center font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Wave SVG at Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
