import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../../../utils/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = localStorage.getItem('token') || null; // Fallback if token exists
  const navigate = useNavigate();
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post(`${BaseUrl}/signin`, { email, password });

      if (res.data.token) {
        login(res.data.token);  // 👈 Save token
        navigate("/admin/dashboard");          // 👈 Redirect to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B284D]">
      <motion.div
        className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hifah Technologies
          </motion.h1>
          <p className="text-gray-300 mt-2">Admin Panel Login</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@hifah.com"
                variants={inputVariants}
                whileFocus="focus"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                variants={inputVariants}
                whileFocus="focus"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  />
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
            <motion.div
              className="absolute inset-0 bg-blue-500/30"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot Password?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;