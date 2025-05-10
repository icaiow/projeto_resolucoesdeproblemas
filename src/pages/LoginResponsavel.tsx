import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const LoginResponsavel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { 
        email, 
        senha: password,
        tipo: 'responsavel'
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para a área do responsável",
      });
      
      navigate('/home-responsaveis');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-md bg-blue-500"></div>
            </div>
            <h1 className="text-2xl font-bold">Entre com uma conta</h1>
            <h2 className="text-xl font-semibold mt-6">Área do Responsável</h2>
            <p className="text-gray-600 mt-2">
              Acesse para acompanhar seus dependentes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="#" className="text-sm text-blue-500 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Manter-me conectado
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/cadastro-responsavel" className="text-blue-500 font-medium hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="flex justify-center text-blue-500 hover:underline"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center">
        <div className="text-white p-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-6">
            Acompanhe o desenvolvimento escolar
          </h2>
          <p className="mb-6">
            Mantenha-se informado sobre o progresso de seus dependentes, comunique-se com a instituição e participe ativamente da vida escolar.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Acompanhe o desempenho escolar
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Receba notificações importantes
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Comunique-se com a instituição
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Acesse materiais educativos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginResponsavel;