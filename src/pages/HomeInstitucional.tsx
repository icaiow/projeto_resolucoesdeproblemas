import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertTriangle, BookOpen, Users, BarChart, Settings, Bell, User, LogOut, MessageSquare, BarChart2, ArrowLeft, ArrowUp, ArrowDown, PieChart, LineChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "sonner";

const HomeInstitucional = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({ nome: "", cnpj: "", ultimoAcesso: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-institucional");
      return;
    }

    setIsLoading(true);
    api.get("/instituicoes/perfil")
      .then(response => {
        setPerfil(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil. Por favor, tente novamente.");
        setIsLoading(false);
      });
  }, [navigate]);

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
                  <p className="text-gray-600 text-sm">CNPJ: {perfil.cnpj || "Não disponível"}</p>
                  <p className="text-gray-500 text-xs">Último acesso: {perfil.ultimoAcesso || "Não disponível"}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:ml-auto gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/editar-perfil")}
            >
              <User className="h-4 w-4" />
              Editar Perfil
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                localStorage.removeItem('token');
                navigate("/login-institucional");
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
          <h1 className="text-2xl font-bold mb-2">Área Institucional</h1>
          <p className="text-gray-600">
            Bem-vindo à área institucional. Gerencie e acompanhe as atividades da sua instituição.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gestão de Alunos e Responsáveis */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Gestão de Alunos e Responsáveis</h3>
                <p className="text-sm text-gray-500">Gerencie alunos e seus responsáveis vinculados</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gestao-alunos")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Gerenciar
              </Button>
            </div>
          </div>
        </Card>

        {/* Relatórios e Gráficos */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Relatórios e Gráficos</h3>
                <p className="text-sm text-gray-500">Visualize dados e estatísticas</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/relatorios")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ver Relatórios
              </Button>
            </div>
          </div>
        </Card>

        {/* Painel de Comunicação */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Painel de Comunicação</h3>
                <p className="text-sm text-gray-500">Gerencie comunicações com responsáveis</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/comunicacao")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Acessar
              </Button>
            </div>
          </div>
        </Card>

        {/* Denúncias */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Denúncias</h3>
                <p className="text-sm text-gray-500">Gerencie e acompanhe denúncias</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gerenciar-denuncias")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Ver Denúncias
              </Button>
            </div>
          </div>
        </Card>

        {/* Materiais Educativos */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Materiais Educativos</h3>
                <p className="text-sm text-gray-500">Gerencie materiais de prevenção</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/materiais")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                Gerenciar Materiais
              </Button>
            </div>
          </div>
        </Card>

        {/* Configurações */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Configurações</h3>
                <p className="text-sm text-gray-500">Configure as opções da instituição</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/configuracoes")}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                Configurar
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notificações Recentes</h2>
          <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
            Ver todas
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Nova escuta recebida</p>
              <p className="text-sm text-gray-500">Aluno solicitou ajuda com matemática</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium">Nova denúncia</p>
              <p className="text-sm text-gray-500">Situação de bullying reportada</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomeInstitucional;