'use client';

import Link from 'next/link';
import { FiMail, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-50 px-4">
      <div className="text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <FiMail className="mx-auto text-sky-400" size={64} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-sky-800 mb-4">404 - Page Not Found</h1>
          <p className="text-sky-600 mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <FiHome size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 