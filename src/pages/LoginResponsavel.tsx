import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const LoginResponsavel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados para o cadastro
  const [showCadastro, setShowCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [codigoAluno, setCodigoAluno] = useState("");

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

  const handleCadastro = async (e) => {
    e.preventDefault();
    
    // Validar senha
    if (senha !== confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "As senhas não coincidem",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simplificar os dados ao máximo
      const dadosCadastro = {
        nome,
        email: emailCadastro,
        senha,
        tipo: 'responsavel'
      };
      
      // Adicionar campos opcionais apenas se estiverem preenchidos
      if (telefone && telefone.trim() !== '') {
        dadosCadastro.telefone = telefone;
      }
      
      if (cpf && cpf.trim() !== '') {
        dadosCadastro.cpf = cpf;
      }
      
      console.log('Dados de cadastro:', dadosCadastro);
      
      // Tentar uma rota mais genérica
      const response = await api.post('/auth/register', dadosCadastro);
      
      console.log('Resposta do servidor:', response.data);
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login com suas credenciais",
      });
      
      // Fechar o modal e limpar os campos
      setShowCadastro(false);
      setNome('');
      setEmailCadastro('');
      setSenha('');
      setConfirmarSenha('');
      setTelefone('');
      setCpf('');
      setCodigoAluno('');
      
    } catch (error) {
      console.error("Erro ao cadastrar responsável:", error);
      
      // Melhorar a mensagem de erro para ser mais específica
      let mensagemErro = "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
      
      if (error.response) {
        console.log('Detalhes do erro:', error.response);
        
        // Verificar se há uma mensagem específica do servidor
        if (error.response.data && error.response.data.message) {
          mensagemErro = error.response.data.message;
        } 
        // Verificar erros comuns
        else if (error.response.status === 400) {
          mensagemErro = "Dados inválidos. Verifique as informações e tente novamente.";
        } else if (error.response.status === 409) {
          mensagemErro = "Este email já está em uso. Tente outro email.";
        } else if (error.response.status === 500) {
          mensagemErro = "Erro no servidor. Tente novamente mais tarde.";
        }
      } else if (error.request) {
        mensagemErro = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar",
        description: mensagemErro,
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
              <button type="button" className="text-blue-500 font-medium hover:underline" onClick={() => setShowCadastro(true)}>
                Cadastre-se
              </button>
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

      <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastro de Responsável</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleCadastro}>
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" type="text" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="emailCadastro">Email</Label>
              <Input id="emailCadastro" type="email" placeholder="seu-email@exemplo.com" value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={e => setTelefone(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" type="text" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="codigoAluno">Código do Aluno (opcional)</Label>
              <Input id="codigoAluno" type="text" placeholder="Código do aluno para vinculação" value={codigoAluno} onChange={e => setCodigoAluno(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" placeholder="Crie uma senha" value={senha} onChange={e => setSenha(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input id="confirmarSenha" type="password" placeholder="Confirme sua senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCadastro(false)}>Cancelar</Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? "Processando..." : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginResponsavel;