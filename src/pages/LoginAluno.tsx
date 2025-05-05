import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const LoginAluno = () => {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAtivarConta, setShowAtivarConta] = useState(false);
  const [anonimo, setAnonimo] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [emailAtivacao, setEmailAtivacao] = useState("");
  const [instituicao, setInstituicao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mockup login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao portal do aluno",
      });
      navigate("/home-alunos");
    }, 1000);
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
            <h2 className="text-xl font-semibold mt-6">Portal do Aluno</h2>
            <p className="text-gray-600 mt-2">
              Acesse sua área exclusiva de estudante
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
              Primeiro acesso?{" "}
              <button type="button" className="text-green-bright font-medium hover:underline" onClick={() => setShowAtivarConta(true)}>
                Ative sua conta
              </button>
            </p>
          </div>

          <Dialog open={showAtivarConta} onOpenChange={setShowAtivarConta}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ativar Conta de Aluno</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={e => {e.preventDefault(); setShowAtivarConta(false); toast({title: 'Conta ativada', description: 'Sua conta foi ativada!'});}}>
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" type="text" placeholder="Seu nome" value={anonimo ? "Anônimo" : nome} onChange={e => setNome(e.target.value)} disabled={anonimo} required={!anonimo} />
                  <div className="flex items-center mt-1">
                    <Checkbox id="anonimo" checked={anonimo} onCheckedChange={v => setAnonimo(!!v)} />
                    <Label htmlFor="anonimo" className="ml-2 text-sm">Quero me identificar como anônimo</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="idade">Idade ou Série</Label>
                  <Input id="idade" type="text" placeholder="Ex: 15 anos ou 9º Ano" value={idade} onChange={e => setIdade(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="emailAtivacao">E-mail ou Matrícula</Label>
                  <Input id="emailAtivacao" type="text" placeholder="Seu e-mail ou matrícula" value={emailAtivacao} onChange={e => setEmailAtivacao(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="instituicao">Instituição</Label>
                  <Select value={instituicao} onValueChange={setInstituicao} required>
                    <SelectTrigger id="instituicao">
                      <SelectValue placeholder="Selecione a instituição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="escola1">Escola Estadual Exemplo</SelectItem>
                      <SelectItem value="escola2">Colégio Municipal Modelo</SelectItem>
                      <SelectItem value="escola3">Instituto Educacional Teste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAtivarConta(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-green-bright hover:bg-green-600">Ativar Conta</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

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
            Sua voz é importante para nós
          </h2>
          <p className="mb-6">
            Acesse materiais educativos, compartilhe suas experiências e
            participe ativamente da construção de um ambiente escolar seguro.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Envie escutas digitais
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Acesse materiais educativos
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Reporte situações de risco
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              Acompanhe respostas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginAluno;
