import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const LoginInstitucional = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSolicitarAcesso, setShowSolicitarAcesso] = useState(false);
  const [instituicaoNome, setInstituicaoNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [emailInst, setEmailInst] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cpfResponsavel, setCpfResponsavel] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [validandoCnpj, setValidandoCnpj] = useState(false);
  const [cnpjValido, setCnpjValido] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Tentando fazer login com:', { email, senha: password, tipo: 'institucional' });
    
    try {
      console.log('Enviando requisição para:', '/auth/login');
      const response = await api.post('/auth/login', { 
        email, 
        senha: password,
        tipo: 'institucional'
      });
      
      console.log('Resposta recebida:', response.data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Redirecionando para a área institucional",
      });
      
      navigate('/home-institucional');
    } catch (error) {
      console.error("Erro detalhado ao fazer login:", error.response || error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function validarCnpjMock(cnpj: string) {
    setValidandoCnpj(true);
    setTimeout(() => {
      // Remove caracteres não numéricos
      const cnpjNumerico = cnpj.replace(/\D/g, '');
      setCnpjValido(cnpjNumerico.length === 14); // mock: 14 dígitos
      setValidandoCnpj(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-md bg-purple-light"></div>
            </div>
            <h1 className="text-2xl font-bold">Entre com uma conta</h1>
            <h2 className="text-xl font-semibold mt-6">Área da Instituição</h2>
            <p className="text-gray-600 mt-2">
              Acesse para gerenciar sua instituição de ensino
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@instituicao.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="#" className="text-sm text-purple hover:underline">
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
              className="w-full bg-purple hover:bg-purple-dark"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button type="button" className="text-purple font-medium hover:underline" onClick={() => setShowSolicitarAcesso(true)}>
                Solicite acesso
              </button>
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="flex justify-center text-purple hover:underline"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-purple items-center justify-center">
        <div className="text-white p-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-6">
            Educação com segurança e compromisso
          </h2>
          <p className="mb-6">
            Gerencie sua instituição, monitore casos, previna conflitos e promova
            um ambiente escolar seguro e acolhedor.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Gestão de alunos e turmas
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Monitoramento de casos
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Relatórios e estatísticas
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Materiais informativos
            </li>
          </ul>
        </div>
      </div>

      <Dialog open={showSolicitarAcesso} onOpenChange={setShowSolicitarAcesso}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Acesso Institucional</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={e => {
            e.preventDefault(); 
            setShowSolicitarAcesso(false); 
            toast({
              title: 'Cadastro realizado com sucesso', 
              description: 'Você já pode fazer login com suas credenciais.'
            });
          }}>
            <div>
              <Label htmlFor="instituicaoNome">Nome da Instituição</Label>
              <Input id="instituicaoNome" type="text" placeholder="Nome completo da instituição" value={instituicaoNome} onChange={e => setInstituicaoNome(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ ou Código da Escola</Label>
              <Input id="cnpj" type="text" placeholder="Apenas números" value={cnpj} onChange={e => setCnpj(e.target.value)} onBlur={() => validarCnpjMock(cnpj)} required />
              {!cnpjValido && !validandoCnpj && <span className="text-xs text-red-500">CNPJ inválido</span>}
              {validandoCnpj && <span className="text-xs text-gray-500">Validando...</span>}
            </div>
            <div>
              <Label htmlFor="emailInst">E-mail Institucional</Label>
              <Input id="emailInst" type="email" placeholder="contato@instituicao.edu.br" value={emailInst} onChange={e => setEmailInst(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" placeholder="(99) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" type="text" placeholder="Rua, número, bairro, cidade" value={endereco} onChange={e => setEndereco(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="responsavel">Responsável (Gestor)</Label>
              <Input id="responsavel" type="text" placeholder="Nome completo do responsável" value={responsavel} onChange={e => setResponsavel(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cpfResponsavel">CPF do Responsável</Label>
              <Input id="cpfResponsavel" type="text" placeholder="Apenas números" value={cpfResponsavel} onChange={e => setCpfResponsavel(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="usuario">Usuário para login</Label>
              <Input id="usuario" type="text" placeholder="Escolha um nome de usuário" value={usuario} onChange={e => setUsuario(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" placeholder="Crie uma senha" value={senha} onChange={e => setSenha(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowSolicitarAcesso(false)}>Cancelar</Button>
              <Button type="submit" className="bg-purple hover:bg-purple-dark" disabled={validandoCnpj || !cnpjValido}>Solicitar Acesso</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginInstitucional;
