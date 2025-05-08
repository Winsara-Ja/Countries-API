import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountriesPage from './pages/CountriesPage';
import CountryDetail from './pages/CountryDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<CountriesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/country/:name" element={<CountryDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;