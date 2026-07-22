// src/components/Toast.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-brand-text text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg z-50"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}