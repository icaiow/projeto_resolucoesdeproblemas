import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação e tratamento de erros
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar interceptor de resposta para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro na resposta:', error.response.data);
      if (error.response.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Erro na requisição:', error.request);
    } else {
      // Algo aconteceu na configuração da requisição
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;