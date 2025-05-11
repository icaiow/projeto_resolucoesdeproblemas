import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, AlertTriangle, Users, LogOut, User, ChevronRight, Bell, BookOpen, FileText, History, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../services/api";

const HomeResponsaveis = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    alunos: [],
    ultimoAcesso: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-responsaveis");
      return;
    }

    setIsLoading(true);
    console.log("Buscando perfil do responsável...");
    api.get("/responsaveis/perfil")
      .then(response => {
        console.log("Resposta da API:", response.data);
        setPerfil(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil. Por favor, tente novamente.");
        setIsLoading(false);
      });
  }, [navigate]);

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (mensagem.trim()) {
      toast.success("Mensagem enviada com sucesso!");
      setMensagem("");
    } else {
      toast.error("Por favor, digite uma mensagem");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              {isLoading ? (
                <p className="text-gray-500">Carregando dados...</p>
              ) : (
                <>
                  <h3 className="font-bold text-lg">{perfil.nome || "Nome não disponível"}</h3>
                  <p className="text-gray-600 text-sm">Email: {perfil.email || "Não disponível"}</p>
                  <p className="text-gray-500 text-xs">Telefone: {perfil.telefone || "Não disponível"}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col md:ml-auto gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/editar-perfil-responsavel")}
            >
              <User className="h-4 w-4" />
              Editar Perfil
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                localStorage.removeItem('token');
                navigate("/login-responsaveis");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Área do Responsável</h1>
          <p className="text-gray-600">
            Bem-vindo à plataforma. Acompanhe seus filhos e acesse recursos importantes.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Início
        </Button>
      </div>

      {/* Alunos Vinculados */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Alunos Vinculados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <p className="text-gray-500">Carregando alunos...</p>
          ) : perfil.alunos && perfil.alunos.length > 0 ? (
            perfil.alunos.map((aluno) => (
              <Card key={aluno.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{aluno.nome}</h3>
                    <p className="text-gray-600 text-sm">{aluno.turma} - {aluno.serie}</p>
                    <p className="text-sm text-gray-500">Matrícula: {aluno.matricula}</p>
                    <p className="text-sm text-gray-500">Escola: {aluno.escola || "Não vinculado"}</p>
                    <p className="text-sm text-gray-500">Parentesco: {aluno.parentesco}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/aluno-view/${aluno.id}`)}
                  >
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Nenhum aluno vinculado</p>
          )}
        </div>
      </Card>

      {/* Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Denúncias */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Denúncias</h3>
                <p className="text-sm text-gray-500">Envie denúncias em nome do(s) filho(s)</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/denuncia")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Fazer Denúncia
              </Button>
            </div>
          </div>
        </Card>

        {/* Histórico de Denúncias */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <History className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Histórico de Denúncias</h3>
                <p className="text-sm text-gray-500">Acompanhe o andamento das denúncias</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/historico-denuncias")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Ver Histórico
              </Button>
            </div>
          </div>
        </Card>

        {/* Comunicação com a Escola */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Comunicação</h3>
                <p className="text-sm text-gray-500">Comunique-se com a instituição</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/comunicacao")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Acessar
              </Button>
            </div>
          </div>
        </Card>

        {/* Materiais Educativos */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Materiais Educativos</h3>
                <p className="text-sm text-gray-500">Acesse materiais sobre acolhimento e prevenção</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/materiais")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Ver Materiais
              </Button>
            </div>
          </div>
        </Card>

        {/* Notificações */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Notificações</h3>
                <p className="text-sm text-gray-500">Alertas e respostas da escola</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/notificacoes")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                Ver Notificações
              </Button>
            </div>
          </div>
        </Card>

        {/* Documentos */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Documentos</h3>
                <p className="text-sm text-gray-500">Acesse documentos importantes</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/documentos")}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                Ver Documentos
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Fale com a Escola */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Fale com a Escola</h2>
        <form onSubmit={handleEnviarMensagem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Input
              id="mensagem"
              placeholder="Digite sua mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enviar Mensagem
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default HomeResponsaveis; 