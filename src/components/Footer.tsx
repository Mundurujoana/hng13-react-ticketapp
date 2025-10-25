// src/components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-[1440px] mx-auto px-6 py-6 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} TicketApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
