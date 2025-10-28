import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    planets: 0,
    signs: 0,
    houses: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [planetsRes, signsRes, housesRes, coursesRes] = await Promise.all([
        axios.get('/planets'),
        axios.get('/signs'),
        axios.get('/houses'),
        axios.get('/courses'),
      ]);

      setStats({
        planets: planetsRes.data.length,
        signs: signsRes.data.length,
        houses: housesRes.data.length,
        courses: coursesRes.data.length,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" data-testid="dashboard-page">
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1 data-testid="welcome-title">Bem-vindo, {user.name}! ✨</h1>
          <p data-testid="welcome-subtitle">
            Explore o universo da astrologia e descubra mais sobre si mesmo
          </p>
        </div>

        <div className="stats-grid grid grid-4">
          <div className="stat-card card" data-testid="stat-planets">
            <div className="stat-icon">🪐</div>
            <div className="stat-info">
              <h3>{stats.planets}</h3>
              <p>Planetas</p>
            </div>
          </div>

          <div className="stat-card card" data-testid="stat-signs">
            <div className="stat-icon">♈</div>
            <div className="stat-info">
              <h3>{stats.signs}</h3>
              <p>Signos</p>
            </div>
          </div>

          <div className="stat-card card" data-testid="stat-houses">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>{stats.houses}</h3>
              <p>Casas</p>
            </div>
          </div>

          <div className="stat-card card" data-testid="stat-courses">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{stats.courses}</h3>
              <p>Cursos</p>
            </div>
          </div>
        </div>

        <div className="quick-actions grid grid-2">
          <div className="action-card card" data-testid="action-generate-chart">
            <h3>🌠 Gerar Meu Mapa Astral</h3>
            <p>
              Descubra as posições dos planetas no momento do seu nascimento e
              compreenda sua essência.
            </p>
            <a href="/chart" className="btn btn-primary">
              Gerar Mapa
            </a>
          </div>

          <div className="action-card card" data-testid="action-explore-content">
            <h3>🔭 Explorar Conteúdo</h3>
            <p>
              Navegue pela biblioteca de planetas, signos e casas astrológicas
              para aprofundar seu conhecimento.
            </p>
            <a href="/planets" className="btn btn-secondary">
              Começar Exploração
            </a>
          </div>
        </div>

        <div className="info-section card">
          <h2>Sobre o Astromean</h2>
          <p>
            O <strong>Astromean</strong> é uma plataforma educacional e interativa
            voltada para o autoconhecimento através da Astrologia. Aqui você pode
            aprender sobre os fundamentos da astrologia, gerar seu mapa astral
            personalizado e participar de cursos sobre diversos temas astrológicos.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Cálculo de mapa astral personalizado</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Cursos e lições sobre astrologia</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Análise de distribuição energética</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🧠</span>
              <span>Interpretações e insights personalizados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
