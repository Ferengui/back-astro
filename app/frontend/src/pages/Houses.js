import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Houses.css';

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/houses');
      setHouses(response.data.sort((a, b) => a.number - b.number));
    } catch (error) {
      console.error('Erro ao carregar casas:', error);
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
    <div className="page-container" data-testid="houses-page">
      <div className="houses-content">
        <div className="page-header">
          <h1 data-testid="houses-title">🏠 Casas Astrológicas</h1>
          <p data-testid="houses-subtitle">
            As 12 casas representam diferentes áreas da vida e experiência humana
          </p>
        </div>

        <div className="houses-grid grid grid-2">
          {houses.map((house) => (
            <div
              key={house.id}
              className="house-card card"
              data-testid={`house-card-${house.id}`}
            >
              <div className="house-number" data-testid={`house-number-${house.number}`}>{house.number}</div>
              <div className="house-content">
                <h3>{house.life_area}</h3>
                <p>{house.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="houses-info card">
          <h2>Sobre as Casas</h2>
          <p>
            As casas astrológicas dividem o céu em 12 setores, cada um governando
            diferentes aspectos da vida. A posição dos planetas nas casas no
            momento do seu nascimento revela onde e como as energias planetárias
            se manifestam em sua vida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Houses;
