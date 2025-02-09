import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiClock, FiUser } from 'react-icons/fi';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: {
    from: {
      address: string;
      name: string;
    };
    subject: string;
    text: string;
    html: string;
    createdAt: string;
  } | null;
}

export default function MessageModal({ isOpen, onClose, message }: MessageModalProps) {
  if (!message) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="flex min-h-full items-center justify-center">
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="relative w-full h-full md:h-auto md:max-h-[85vh] md:w-[90%] max-w-4xl bg-white md:rounded-2xl shadow-xl flex flex-col"
              >
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-100">
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 break-words">
                          {message.subject}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FiUser className="flex-shrink-0 mr-2" />
                            <span className="truncate">
                              Dari: {message.from.name} &lt;{message.from.address}&gt;
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiClock className="flex-shrink-0 mr-2" />
                            <span className="truncate">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        title="Tutup"
                      >
                        <FiX size={24} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                  <div className="prose prose-sm md:prose max-w-none">
                    {message.html ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: message.html }} 
                        className="
                          [&_a]:text-blue-600 [&_a]:underline [&_a]:break-words
                          [&_img]:max-w-full [&_img]:h-auto [&_img]:inline-block [&_img]:rounded-lg
                          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:overflow-x-auto [&_table]:block [&_table]:max-w-full
                          [&_td]:border [&_td]:p-2 [&_td]:break-words
                          [&_th]:border [&_th]:p-2 [&_th]:break-words [&_th]:bg-gray-50
                          [&_p]:break-words [&_p]:my-4 [&_div]:break-words
                          [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:bg-gray-50 [&_pre]:p-4 [&_pre]:rounded-lg
                          [&_code]:break-words [&_code]:whitespace-pre-wrap [&_code]:bg-gray-50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic
                          [&_hr]:my-8 [&_hr]:border-gray-200
                        "
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap font-sans break-words bg-gray-50 p-4 rounded-lg">
                        {message.text}
                      </pre>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 