import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token encontrado no localStorage:', token ? 'Sim' : 'Não');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token adicionado ao header:', config.headers.Authorization);
    } else {
      console.log('Nenhum token encontrado para adicionar ao header');
    }
    
    return config;
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Erro de autenticação detectado');
      // Limpar dados de autenticação
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      delete api.defaults.headers.common['Authorization'];
      
      // Redirecionar para a página de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;