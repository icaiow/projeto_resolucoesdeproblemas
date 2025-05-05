import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertTriangle, BookOpen, Users, BarChart, Settings, Bell, User, LogOut, MessageSquare, FileText, BarChart2, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HomeInstitucional = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Escola Estadual Exemplo</h3>
              <p className="text-gray-600 text-sm">CNPJ: 12.345.678/0001-90</p>
              <p className="text-gray-500 text-xs">Último acesso: 15/04/2023</p>
            </div>
          </div>
          <div className="flex flex-col md:ml-auto gap-2">
            <div className="flex flex-col gap-2">
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
                  // Aqui você implementaria a lógica de logout
                  // Por exemplo, limpar o token de autenticação
                  localStorage.removeItem('token');
                  navigate("/login-institucional");
                }}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
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
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Escuta Digital</h3>
                <p className="text-sm text-gray-500">Acompanhe e responda às escutas dos alunos.</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gerenciar-escutas")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Gerenciar escutas
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Gestão de Alunos</h3>
                <p className="text-sm text-gray-500">Gerencie os dados e acompanhamento dos alunos</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gestao-alunos")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Gerenciar alunos
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Denúncias</h3>
                <p className="text-sm text-gray-500">Gerencie e acompanhe as denúncias recebidas.</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gerenciar-denuncias")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Ver denúncias
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Materiais Educativos</h3>
                <p className="text-sm text-gray-500">Gerencie os materiais educativos disponíveis.</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/gerenciar-materiais")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Gerenciar materiais
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Relatórios</h3>
                <p className="text-sm text-gray-500">Acesse relatórios e análises</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/relatorios")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                Ver Relatórios
              </Button>
            </div>
          </div>
        </Card>

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