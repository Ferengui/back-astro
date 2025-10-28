import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signs.css';

const Signs = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSigns();
  }, []);

  const fetchSigns = async () => {
    try {
      const response = await axios.get('/signs');
      setSigns(response.data);
    } catch (error) {
      console.error('Erro ao carregar signos:', error);
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
    <div className="page-container" data-testid="signs-page">
      <div className="signs-content">
        <div className="page-header">
          <h1 data-testid="signs-title">♈ Signos do Zodíaco</h1>
          <p data-testid="signs-subtitle">
            Descubra as características e energias dos 12 signos
          </p>
        </div>

        <div className="signs-grid grid grid-3">
          {signs.map((sign) => (
            <div
              key={sign.id}
              className="sign-card card"
              data-testid={`sign-card-${sign.id}`}
            >
              <div className="sign-header">
                <div className="sign-symbol">{sign.symbol}</div>
                <div>
                  <h3>{sign.name}</h3>
                  <span className="sign-dates">{sign.date_range}</span>
                </div>
              </div>
              <p className="sign-desc">{sign.description}</p>
              <div className="sign-attributes">
                <span className="attribute-badge element">
                  {sign.element_id === 'elem-fire' && '🔥 Fogo'}
                  {sign.element_id === 'elem-earth' && '🌍 Terra'}
                  {sign.element_id === 'elem-air' && '💨 Ar'}
                  {sign.element_id === 'elem-water' && '💧 Água'}
                </span>
                <span className="attribute-badge quality">
                  {sign.quality_id === 'qual-cardinal' && 'Cardinal'}
                  {sign.quality_id === 'qual-fixed' && 'Fixa'}
                  {sign.quality_id === 'qual-mutable' && 'Mutável'}
                </span>
                <span className="attribute-badge polarity">
                  {sign.polarity_id === 'pol-yang' && '☀️ Yang'}
                  {sign.polarity_id === 'pol-yin' && '🌙 Yin'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signs;
