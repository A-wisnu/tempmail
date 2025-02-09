import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

export default function Toast({ message, type, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`
            px-4 py-3 rounded-lg shadow-lg flex items-center gap-2
            ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white
          `}>
            {type === 'success' ? (
              <FiCheck className="text-white" size={18} />
            ) : (
              <FiX className="text-white" size={18} />
            )}
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 