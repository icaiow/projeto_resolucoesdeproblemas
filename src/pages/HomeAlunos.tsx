import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Bell, User, LogOut, ArrowLeft, Users, MessageCircle, Calendar, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Componente principal da área do aluno
 * @component
 * @example
 * <HomeAlunos />
 */
const HomeAlunos = () => {
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
              <h3 className="font-bold text-lg">João da Silva</h3>
              <p className="text-gray-600 text-sm">Escola Estadual Exemplo</p>
              <p className="text-gray-500 text-xs">RA: 123456789</p>
            </div>
          </div>
          <div className="flex flex-col md:ml-auto gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/editar-perfil-aluno")}
            >
              <User className="h-4 w-4" />
              Editar Perfil
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                localStorage.removeItem('token');
                navigate("/login-alunos");
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
          <h1 className="text-2xl font-bold mb-2">Área do Aluno</h1>
          <p className="text-gray-600">
            Bem-vindo à plataforma educacional. Confira as principais ferramentas e recursos disponíveis.
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
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Meu Perfil</h3>
                <p className="text-sm text-gray-500">Visualize e edite suas informações</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/perfil-aluno")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ver Perfil
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
                <h3 className="font-semibold">Responsáveis</h3>
                <p className="text-sm text-gray-500">Visualize seus responsáveis vinculados</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/responsaveis-aluno")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Ver Responsáveis
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Espaço de Escuta</h3>
                <p className="text-sm text-gray-500">Compartilhe seus pensamentos</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/escuta-aluno")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Acessar
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Eventos e Campanhas</h3>
                <p className="text-sm text-gray-500">Acompanhe as atividades da escola</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/eventos-campanhas")}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Ver Eventos
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Materiais Educativos</h3>
                <p className="text-sm text-gray-500">Acesse conteúdos importantes</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => navigate("/materiais-educativos")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Ver Materiais
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-sm mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Atividades Recentes</h2>
          <Link to="/atividades-recentes">
            <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
              Ver todas
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4 pb-4 border-b">
            <div className="w-1 bg-amber-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">Workshop: Cidadania Digital</h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Próximo Evento</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Workshop sobre uso seguro e responsável da internet.</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Data: 20/04/2023</span>
                <Link to="/atividades/evento/workshop">
                  <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
                    Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">Nova cartilha disponível</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Material</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Cartilha sobre prevenção ao cyberbullying.</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Publicado: 08/04/2023</span>
                <Link to="/atividades/material/cartilha">
                  <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
                    Acessar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recursos e Apoio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/bullying-info" className="block bg-white border rounded p-4 hover:shadow transition">
            <p className="font-medium mb-1">O que é bullying/cyberbullying?</p>
            <span className="text-xs text-gray-500">Informações e cartilhas em PDF</span>
          </Link>
          <Link to="/buscar-ajuda" className="block bg-white border rounded p-4 hover:shadow transition">
            <p className="font-medium mb-1">Como buscar ajuda</p>
            <span className="text-xs text-gray-500">Dicas, vídeos e orientações</span>
          </Link>
          <Link to="/contatos-psicologos" className="block bg-white border rounded p-4 hover:shadow transition">
            <p className="font-medium mb-1">Contatos de psicólogos</p>
            <span className="text-xs text-gray-500">Profissionais disponíveis para atendimento</span>
          </Link>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Fale com a Escola</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/home-alunos")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
        <p className="text-gray-600 mb-4">Canal direto e mediado com a equipe responsável. Sua mensagem será tratada com sigilo e respeito.</p>
        <form 
          className="flex flex-col md:flex-row gap-4 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const mensagem = form.mensagem.value;
            if (mensagem.trim()) {
              toast.success("Mensagem enviada com sucesso! A equipe entrará em contato em breve.");
              form.reset();
            } else {
              toast.error("Por favor, digite uma mensagem antes de enviar.");
            }
          }}
        >
          <input 
            type="text" 
            name="mensagem"
            className="w-full border rounded px-3 py-2" 
            placeholder="Digite sua mensagem..." 
          />
          <Button type="submit" className="bg-purple text-white px-6 py-2 rounded-md">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default HomeAlunos;
