import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AstralChart.css';

const AstralChart = ({ user }) => {
  const [chart, setChart] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const chartRes = await axios.get(`/charts/${user.id}`);
      setChart(chartRes.data);
      
      const energyRes = await axios.get(`/charts/${user.id}/energy`);
      setEnergy(energyRes.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('');
      } else {
        setError('Erro ao carregar mapa astral');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateChart = async () => {
    setGenerating(true);
    setError('');
    
    try {
      await axios.post('/charts/generate');
      await fetchChart();
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao gerar mapa astral');
    } finally {
      setGenerating(false);
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

  if (!chart) {
    return (
      <div className="page-container" data-testid="chart-page">
        <div className="chart-content">
          <div className="empty-chart card" data-testid="empty-chart">
            <div className="empty-icon">🌠</div>
            <h2>Seu Mapa Astral</h2>
            <p>
              Gere seu mapa astral personalizado e descubra as posições dos
              planetas no momento do seu nascimento.
            </p>
            {error && (
              <div className="error-message" data-testid="error-message">{error}</div>
            )}
            <button
              className="btn btn-primary"
              onClick={handleGenerateChart}
              disabled={generating}
              data-testid="generate-chart-button"
            >
              {generating ? 'Gerando...' : 'Gerar Mapa Astral'}
            </button>
            <p className="note">
              <small>
                * Este é um mapa simulado para fins de demonstração. Em produção,
                será calculado com base em sua data, hora e local de nascimento.
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" data-testid="chart-page">
      <div className="chart-content">
        <div className="page-header">
          <h1 data-testid="chart-title">🌠 Seu Mapa Astral</h1>
          <p data-testid="chart-subtitle">
            Explore as posições planetárias no momento do seu nascimento
          </p>
        </div>

        {energy && (
          <div className="energy-section">
            <h2>Distribuição Energética</h2>
            <div className="energy-grid grid grid-3">
              <div className="energy-card card" data-testid="energy-elements">
                <h3>🔥 Elementos</h3>
                <div className="energy-bars">
                  <div className="energy-item">
                    <span>Fogo</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill fire"
                        style={{ width: `${energy.fire}%` }}
                        data-testid="energy-fire"
                      ></div>
                    </div>
                    <span>{energy.fire}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Terra</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill earth"
                        style={{ width: `${energy.earth}%` }}
                        data-testid="energy-earth"
                      ></div>
                    </div>
                    <span>{energy.earth}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Ar</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill air"
                        style={{ width: `${energy.air}%` }}
                        data-testid="energy-air"
                      ></div>
                    </div>
                    <span>{energy.air}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Água</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill water"
                        style={{ width: `${energy.water}%` }}
                        data-testid="energy-water"
                      ></div>
                    </div>
                    <span>{energy.water}%</span>
                  </div>
                </div>
              </div>

              <div className="energy-card card" data-testid="energy-polarities">
                <h3>☀️ Polaridades</h3>
                <div className="energy-bars">
                  <div className="energy-item">
                    <span>Yang</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill yang"
                        style={{ width: `${energy.yang}%` }}
                        data-testid="energy-yang"
                      ></div>
                    </div>
                    <span>{energy.yang}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Yin</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill yin"
                        style={{ width: `${energy.yin}%` }}
                        data-testid="energy-yin"
                      ></div>
                    </div>
                    <span>{energy.yin}%</span>
                  </div>
                </div>
              </div>

              <div className="energy-card card" data-testid="energy-qualities">
                <h3>✨ Qualidades</h3>
                <div className="energy-bars">
                  <div className="energy-item">
                    <span>Cardinal</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill cardinal"
                        style={{ width: `${energy.cardinal}%` }}
                        data-testid="energy-cardinal"
                      ></div>
                    </div>
                    <span>{energy.cardinal}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Fixa</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill fixed"
                        style={{ width: `${energy.fixed}%` }}
                        data-testid="energy-fixed"
                      ></div>
                    </div>
                    <span>{energy.fixed}%</span>
                  </div>
                  <div className="energy-item">
                    <span>Mutável</span>
                    <div className="energy-bar">
                      <div
                        className="energy-fill mutable"
                        style={{ width: `${energy.mutable}%` }}
                        data-testid="energy-mutable"
                      ></div>
                    </div>
                    <span>{energy.mutable}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="positions-section">
          <h2>Posições Planetárias</h2>
          <div className="positions-grid grid grid-2">
            {chart.interpretations?.map((interpretation, index) => (
              <div
                key={index}
                className="position-card card"
                data-testid={`position-${index}`}
              >
                <h3>{interpretation.planet}</h3>
                <div className="position-info">
                  <span className="position-badge">em {interpretation.sign}</span>
                  <span className="position-badge">Casa {interpretation.house}</span>
                </div>
                <p>{interpretation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstralChart;
