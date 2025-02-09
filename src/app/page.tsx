'use client';

import { motion } from 'framer-motion';
import { FiCopy, FiRefreshCw, FiMail } from 'react-icons/fi';
import { useEffect, useState, useCallback, useRef } from 'react';
import { mailService } from '@/services/mail';
import MessageModal from '@/components/MessageModal';
import Toast from '@/components/Toast';
import CountdownTimer from '@/components/CountdownTimer';
import dynamic from 'next/dynamic';

const RainEffect = dynamic(() => import('@/components/RainEffect'), {
  ssr: false
});

interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  text: string;
  html: string;
  createdAt: string;
}

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const lastMessageCountRef = useRef(0);
  const initAttemptedRef = useRef(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // For modern browsers
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        
        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          throw new Error('Gagal menyalin teks');
        }
      }
      showToast('Email berhasil disalin ke clipboard', 'success');
    } catch (error) {
      console.error('Failed to copy:', error);
      showToast('Gagal menyalin email', 'error');
    }
  }, [email]);

  const generateNewEmail = useCallback(async () => {
    let mounted = true;
    
    try {
      setLoading(true);
      setError(null);
      const account = await mailService.createAccount();
      
      if (!mounted) return;
      
      setEmail(account.address);
      setMessages([]);
      // Set waktu kedaluwarsa 24 jam dari sekarang
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      setExpiryTime(expiry);
      showToast('Email baru berhasil dibuat', 'success');
    } catch (error) {
      console.error('Error generating email:', error);
      if (mounted) {
        setError('Gagal membuat email baru. Silakan coba lagi nanti.');
        showToast('Gagal membuat email baru', 'error');
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const checkMessages = useCallback(async () => {
    try {
      setRefreshing(true);
      const newMessages = await mailService.getMessages();
      
      if (newMessages.length > lastMessageCountRef.current) {
        const newCount = newMessages.length - lastMessageCountRef.current;
        showToast(
          `${newCount} pesan baru masuk${newCount > 1 ? '' : ''}`, 
          'success'
        );
      }
      
      lastMessageCountRef.current = newMessages.length;
      setMessages(newMessages);
    } catch (error) {
      console.error('Error checking messages:', error);
      showToast('Gagal memperbarui pesan', 'error');
    } finally {
      setRefreshing(false);
    }
  }, [showToast]);

  const handleMessageClick = async (message: Message) => {
    try {
      const fullMessage = await mailService.getMessage(message.id);
      setSelectedMessage(fullMessage);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error getting message details:', error);
      showToast('Gagal memuat detail pesan', 'error');
    }
  };

  useEffect(() => {
    if (initAttemptedRef.current) return;
    
    let mounted = true;
    let interval: NodeJS.Timeout;

    const init = async () => {
      try {
        initAttemptedRef.current = true;
        if (!mounted) return;

        await generateNewEmail();
        
        if (!mounted) return;

        const cleanup = mailService.setupEventListeners(() => {
          if (mounted) checkMessages();
        });

        interval = setInterval(() => {
          if (mounted) checkMessages();
        }, 5000);

        return cleanup;
      } catch (error) {
        console.error('Failed to initialize:', error);
        if (mounted) {
          setError('Gagal membuat email. Silakan refresh halaman atau coba lagi nanti.');
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, [generateNewEmail, checkMessages]);

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen bg-gradient-to-b from-sky-100 to-blue-50">
      <RainEffect />

      {/* Header */}
      <header>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <h1 className="text-4xl font-bold text-sky-800 mb-4 drop-shadow-lg">TempMail - Email Sementara Gratis</h1>
          <p className="text-sky-600">Buat email sementara dengan mudah dan cepat, tanpa registrasi</p>
          <div className="mt-4 text-sm text-sky-500">
            <p>✨ Lindungi privasi Anda dari spam</p>
            <p>⚡ Langsung pakai tanpa daftar</p>
            <p>🔒 Aman dan gratis selamanya</p>
          </div>
        </motion.div>
      </header>

      {error && (
        <div role="alert" className="max-w-4xl mx-auto mb-8">
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg p-4 text-red-700 shadow-lg">
            <p>{error}</p>
            <button
              onClick={generateNewEmail}
              disabled={loading}
              className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        {/* Email Generator Section */}
        <section aria-label="Pembuat Email Sementara">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 mb-8 border border-sky-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 bg-sky-50/80 backdrop-blur rounded-lg p-4 flex items-center border border-sky-100">
                <FiMail className="text-sky-400 mr-3" size={20} />
                <input
                  type="text"
                  readOnly
                  value={loading ? 'Membuat email...' : email}
                  className="bg-transparent w-full outline-none text-sky-700"
                />
              </div>
              <button 
                onClick={copyToClipboard}
                disabled={loading || !email}
                className="p-3 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95"
                title="Salin email"
              >
                <FiCopy size={20} />
              </button>
              <button 
                onClick={generateNewEmail}
                disabled={loading}
                className="p-3 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95"
                title="Buat email baru"
              >
                <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4 text-center border border-sky-100 shadow-md"
              >
                <h3 className="text-sm text-sky-600 mb-1">Pesan</h3>
                <p className="text-2xl font-semibold text-sky-700">{messages.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4 text-center border border-sky-100 shadow-md"
              >
                <h3 className="text-sm text-sky-600 mb-1">Penyimpanan</h3>
                <p className="text-2xl font-semibold text-sky-700">0 MB</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4 text-center border border-sky-100 shadow-md relative overflow-hidden"
              >
                <h3 className="text-sm text-sky-600 mb-1">Berlaku Sampai</h3>
                {expiryTime && (
                  <CountdownTimer 
                    expiryTime={expiryTime} 
                    onExpire={() => {
                      setError('Email sudah kedaluwarsa. Silakan buat email baru.');
                      showToast('Email sudah kedaluwarsa', 'error');
                    }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Inbox Section */}
        <section aria-label="Kotak Masuk Email">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-sky-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-sky-800">Kotak Masuk</h2>
              <button
                onClick={checkMessages}
                disabled={refreshing}
                className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95 flex items-center gap-2"
                title="Perbarui pesan"
              >
                <FiRefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                <span className="text-sm">Perbarui</span>
              </button>
            </div>
            {messages.length === 0 ? (
              <div className="text-center text-sky-500 py-12">
                <FiMail size={48} className="mx-auto mb-4 text-sky-300" />
                <p>Belum ada pesan</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message: Message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className="p-4 border border-sky-100 rounded-lg hover:bg-sky-50/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sky-800">{message.from.address}</h3>
                      <span className="text-sm text-sky-500">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sky-600 text-sm">{message.subject}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </main>

      <footer className="mt-12 text-center text-sm text-sky-500">
        <p>© {new Date().getFullYear()} TempMail - Email Sementara Gratis</p>
        <p className="mt-2">Dibuat dengan ❤️ untuk melindungi privasi Anda</p>
      </footer>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={selectedMessage}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
      />
    </div>
  );
}
