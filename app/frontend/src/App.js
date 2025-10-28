import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Dashboard from './pages/Dashboard';
import Planets from './pages/Planets';
import Signs from './pages/Signs';
import Houses from './pages/Houses';
import Login from './pages/Login';
import Courses from './pages/Courses';
import AstralChart from './pages/AstralChart';
import Navbar from './components/Navbar';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Axios defaults
axios.defaults.baseURL = API;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/planets"
            element={user ? <Planets /> : <Navigate to="/login" />}
          />
          <Route
            path="/signs"
            element={user ? <Signs /> : <Navigate to="/login" />}
          />
          <Route
            path="/houses"
            element={user ? <Houses /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses"
            element={user ? <Courses /> : <Navigate to="/login" />}
          />
          <Route
            path="/chart"
            element={user ? <AstralChart user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
