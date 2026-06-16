import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  LogOut,
  User,
  Store,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const navLinks = [
  {
    label: 'Marketplace',
    href: '/marketplace',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return '/dashboard/admin';
    }

    if (user.role === 'farmer') {
      return '/dashboard/farmer';
    }

    return '/dashboard/customer';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
                <Leaf className="text-white" size={18} />
              </div>

              <div>
                <h1 className="font-bold text-lg text-gray-900">
                  AgriLink
                </h1>

                <p className="text-xs text-forest-600 font-semibold tracking-widest">
                  AI
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-2">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    location.pathname === link.href
                      ? 'bg-forest-50 text-forest-600'
                      : 'text-gray-600 hover:text-forest-600 hover:bg-forest-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <Link
                  to={getDashboardLink()}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-forest-600 hover:bg-forest-50 transition flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}

              <Link
                to="/cart"
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-forest-50 transition"
              >
                <ShoppingCart size={18} />
              </Link>

              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-forest-50 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50">
                    <User size={16} />
                    <span className="text-sm font-medium">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2">

              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="section-container py-4 flex flex-col gap-2">

                <Link
                  to="/marketplace"
                  className="p-3 rounded-xl hover:bg-gray-50"
                >
                  Marketplace
                </Link>

                {user && (
                  <Link
                    to={getDashboardLink()}
                    className="p-3 rounded-xl hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/cart"
                  className="p-3 rounded-xl hover:bg-gray-50 flex items-center gap-2"
                >
                  <Store size={16} />
                  Cart
                </Link>

                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="btn-secondary text-center"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="btn-primary text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16 lg:h-20" />
    </>
  );
}