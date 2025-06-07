import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas com erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('Token inválido ou expirado. Redirecionando para login.');

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      // Evita redirecionamento em loop
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else {
      console.error('Erro na resposta da API:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
