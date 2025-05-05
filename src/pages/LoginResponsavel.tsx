import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const LoginResponsavel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCadastro, setShowCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senha, setSenha] = useState("");
  const [alunoVinculado, setAlunoVinculado] = useState("");
  const [instituicao, setInstituicao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mockup login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao portal do responsável",
      });
      navigate("/home-responsaveis");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-md bg-blue-600"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">Entre com uma conta</h1>
            <h2 className="text-xl font-semibold mt-6 text-white">Portal do Responsável</h2>
            <p className="text-gray-300 mt-2">
              Acesse sua área exclusiva de responsável
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <Link to="#" className="text-sm text-blue-400 hover:text-blue-300">
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
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  Manter-me conectado
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Primeiro acesso?{" "}
              <button type="button" className="text-blue-400 font-medium hover:text-blue-300" onClick={() => setShowCadastro(true)}>
                Cadastre-se
              </button>
            </p>
          </div>

          <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
            <DialogContent className="bg-gray-900 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Cadastro de Responsável</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={e => {e.preventDefault(); setShowCadastro(false); toast({title: 'Cadastro realizado', description: 'Seu cadastro foi realizado com sucesso!'});}}>
                <div>
                  <Label htmlFor="nome" className="text-white">Nome Completo</Label>
                  <Input id="nome" type="text" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="cpf" className="text-white">CPF</Label>
                  <Input id="cpf" type="text" placeholder="Apenas números" value={cpf} onChange={e => setCpf(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="telefone" className="text-white">Telefone</Label>
                  <Input id="telefone" type="tel" placeholder="(99) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="emailCadastro" className="text-white">E-mail</Label>
                  <Input id="emailCadastro" type="email" placeholder="seu-email@exemplo.com" value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="senha" className="text-white">Senha</Label>
                  <Input id="senha" type="password" placeholder="Crie uma senha" value={senha} onChange={e => setSenha(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="alunoVinculado" className="text-white">Aluno Vinculado</Label>
                  <Input id="alunoVinculado" type="text" placeholder="Nome do aluno" value={alunoVinculado} onChange={e => setAlunoVinculado(e.target.value)} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                </div>
                <div>
                  <Label htmlFor="instituicao" className="text-white">Instituição</Label>
                  <Select value={instituicao} onValueChange={setInstituicao} required>
                    <SelectTrigger id="instituicao" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione a instituição" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="escola1" className="text-white hover:bg-gray-700">Escola Estadual Exemplo</SelectItem>
                      <SelectItem value="escola2" className="text-white hover:bg-gray-700">Colégio Municipal Modelo</SelectItem>
                      <SelectItem value="escola3" className="text-white hover:bg-gray-700">Instituto Educacional Teste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowCadastro(false)} className="border-gray-700 text-white hover:bg-gray-800">Cancelar</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Cadastrar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-8">
            <Link
              to="/"
              className="flex justify-center text-blue-400 hover:text-blue-300"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-blue-900 items-center justify-center">
        <div className="text-white p-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-6">
            Acompanhe e participe da vida escolar
          </h2>
          <p className="mb-6 text-gray-300">
            Acesse informações sobre o desempenho escolar, participe de eventos e
            mantenha-se conectado com a instituição de ensino.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
              Acompanhe o desempenho escolar
            </li>
            <li className="flex items-center text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
              Participe de eventos e campanhas
            </li>
            <li className="flex items-center text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
              Receba notificações importantes
            </li>
            <li className="flex items-center text-gray-300">
              <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
              Mantenha contato com a escola
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginResponsavel; 