import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 30, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-sm shadow-2xl rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 bg-black text-white border border-gray-700"
        >
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 sm:gap-3 font-medium text-sm sm:text-base text-center sm:text-left">
            {type === "success" ? (
              <span className="text-green-400 text-lg">✔</span>
            ) : (
              <span className="text-red-500 text-lg">✖</span>
            )}
            <p className="break-words">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
