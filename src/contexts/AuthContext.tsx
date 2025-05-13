import { createContext, ReactNode, useState, useEffect } from 'react';
import api from '@/services/api';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  instituicaoId?: number;
}

interface AuthContextData {
  usuario: Usuario | null;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('usuario');

        console.log('Carregando dados armazenados:', {
          token: token ? 'Presente' : 'Ausente',
          usuario: storedUser ? 'Presente' : 'Ausente'
        });

        if (token && storedUser) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Validar o token fazendo uma requisição
          try {
            const response = await api.get('/auth/validate');
            console.log('Token validado com sucesso:', response.data);
            
            setUsuario(JSON.parse(storedUser));
          } catch (error) {
            console.error('Erro ao validar token:', error);
            // Se houver erro na validação, limpar os dados
            signOut();
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados armazenados:', error);
        signOut();
      } finally {
        setLoading(false);
      }
    }

    loadStoredData();
  }, []);

  const signIn = async (email: string, senha: string) => {
    try {
      console.log('Iniciando login com:', { email });
      
      const response = await api.post('/auth/login', { email, senha });
      const { token, usuario } = response.data;

      console.log('Login bem-sucedido:', {
        token: token ? 'Presente' : 'Ausente',
        usuario: usuario ? 'Presente' : 'Ausente'
      });

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUsuario(usuario);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const signOut = () => {
    console.log('Realizando logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    delete api.defaults.headers.common['Authorization'];
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      signIn, 
      signOut, 
      isAuthenticated: !!usuario,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
} 