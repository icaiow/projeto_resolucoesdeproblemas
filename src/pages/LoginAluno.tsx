import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const LoginAluno = () => {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados para o cadastro
  const [showCadastro, setShowCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [novaMatricula, setNovaMatricula] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [codigoInstituicao, setCodigoInstituicao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { 
        matricula, 
        senha: password,
        tipo: 'aluno'
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para a área do aluno",
      });
      
      navigate('/home-alunos');
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

    // Log dos dados que serão enviados
    const dadosCadastro = {
      nome,
      email,
      senha,
      tipo: 'aluno',
      matricula: novaMatricula,
      turmaId,
      dataNascimento,
      instituicaoId: codigoInstituicao || undefined
    };
    console.log('Dados que serão enviados:', dadosCadastro);
    
    try {
      setIsLoading(true);
      
      // Chamada para a API de cadastro
      console.log('Iniciando requisição para /auth/register');
      const response = await api.post('/auth/register', dadosCadastro);
      console.log('Resposta do servidor:', response.data);
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login com suas credenciais",
      });
      
      // Fechar o modal e limpar os campos
      setShowCadastro(false);
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setNovaMatricula('');
      setTurmaId('');
      setDataNascimento('');
      setCodigoInstituicao('');
      
    } catch (error) {
      console.error("Erro detalhado ao cadastrar aluno:", {
        mensagem: error.message,
        status: error.response?.status,
        dados: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          headers: error.config?.headers
        }
      });

      let mensagemErro = "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
      
      if (error.response) {
        // O servidor respondeu com um status de erro
        mensagemErro = error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
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
    <div className="min-h-screen flex bg-gradient-to-r from-green-100 to-blue-100">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-md bg-green-bright"></div>
            </div>
            <h1 className="text-2xl font-bold">Entre com uma conta</h1>
            <h2 className="text-xl font-semibold mt-6">Área do Aluno</h2>
            <p className="text-gray-600 mt-2">
              Acesse para participar da comunidade escolar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  type="text"
                  placeholder="Número de matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="#" className="text-sm text-green-bright hover:underline">
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
              className="w-full bg-green-bright hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button type="button" className="text-green-bright font-medium hover:underline" onClick={() => setShowCadastro(true)}>
                Cadastre-se
              </button>
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="flex justify-center text-green-bright hover:underline"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-green-bright items-center justify-center">
        <div className="text-white p-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-6">
            Sua voz importa
          </h2>
          <p className="mb-6">
            Participe ativamente da comunidade escolar, compartilhe suas experiências e ajude a construir um ambiente mais seguro e acolhedor para todos.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Compartilhe suas experiências
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Acesse materiais educativos
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Participe de atividades
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Busque ajuda quando precisar
            </li>
          </ul>
        </div>
      </div>

      <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastro de Aluno</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleCadastro}>
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" type="text" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu-email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="novaMatricula">Matrícula</Label>
              <Input id="novaMatricula" type="text" placeholder="Número de matrícula" value={novaMatricula} onChange={e => setNovaMatricula(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="turmaId">Turma</Label>
              <Input id="turmaId" type="text" placeholder="Ex: 1A" value={turmaId} onChange={e => setTurmaId(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input id="dataNascimento" type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="codigoInstituicao">Código da Instituição (opcional)</Label>
              <Input id="codigoInstituicao" type="text" placeholder="Código fornecido pela sua escola" value={codigoInstituicao} onChange={e => setCodigoInstituicao(e.target.value)} />
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
              <Button type="submit" className="bg-green-bright hover:bg-green-600" disabled={isLoading}>
                {isLoading ? "Processando..." : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginAluno;
