import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaGlobeAmericas, FaUserCircle,  } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <FaGlobeAmericas className="h-7 w-7" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">WorldExplorer</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
              <FaUserCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 
                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiLogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaUserCircle className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </>
          )}
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaMoon className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
