import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister
        ? formData
        : { email: formData.email, password: formData.password };

      const response = await axios.post(endpoint, payload);
      onLogin(response.data.access_token, response.data.user);
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" data-testid="login-page">
      <div className="login-box">
        <div className="login-header">
          <h1 data-testid="login-title">✨ Astromean</h1>
          <p data-testid="login-subtitle">
            Descubra os segredos do universo e do seu eu interior
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" data-testid="login-form">
          {isRegister && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
                data-testid="input-name"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              data-testid="input-email"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              data-testid="input-password"
            />
          </div>

          {error && (
            <div className="error-message" data-testid="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            data-testid="submit-button"
          >
            {loading ? 'Carregando...' : isRegister ? 'Criar Conta' : 'Entrar'}
          </button>

          <div className="toggle-form">
            <span>{isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}</span>
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              data-testid="toggle-form-button"
            >
              {isRegister ? 'Faça login' : 'Cadastre-se'}
            </button>
          </div>
        </form>

        <div className="sso-section">
          <div className="divider">
            <span>ou</span>
          </div>
          <button className="btn-sso" disabled data-testid="sso-google-button">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continuar com Google (em breve)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
