import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" data-testid="navbar-brand">
          <span className="logo-icon">✨</span>
          Astromean
        </Link>

        <div className="navbar-menu">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            data-testid="nav-dashboard"
          >
            Dashboard
          </Link>
          <Link
            to="/planets"
            className={`nav-link ${isActive('/planets') ? 'active' : ''}`}
            data-testid="nav-planets"
          >
            Planetas
          </Link>
          <Link
            to="/signs"
            className={`nav-link ${isActive('/signs') ? 'active' : ''}`}
            data-testid="nav-signs"
          >
            Signos
          </Link>
          <Link
            to="/houses"
            className={`nav-link ${isActive('/houses') ? 'active' : ''}`}
            data-testid="nav-houses"
          >
            Casas
          </Link>
          <Link
            to="/chart"
            className={`nav-link ${isActive('/chart') ? 'active' : ''}`}
            data-testid="nav-chart"
          >
            Meu Mapa
          </Link>
          <Link
            to="/courses"
            className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
            data-testid="nav-courses"
          >
            Cursos
          </Link>
        </div>

        <div className="navbar-user">
          <span className="user-name" data-testid="user-name">{user.name}</span>
          <button onClick={onLogout} className="btn-logout" data-testid="logout-button">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
