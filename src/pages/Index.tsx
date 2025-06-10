import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, GraduationCap, Users, Shield, Heart, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Logo NoHate" className="h-10 w-10 mr-2 drop-shadow-md" />
            <h1 className="text-2xl font-title font-bold text-gray-900">NoHate</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-title font-bold text-gray-900 mb-4 animate-fade-in">
              Bem-vindo ao <span className="text-purple-600">NoHate</span>
            </h1>
            <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto">
              Uma plataforma dedicada a criar um ambiente escolar mais seguro e acolhedor para todos.
            </p>
          </div>
        </div>
            </div>
            
      {/* Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/login-institucional" className="block transform hover:scale-105 transition-transform duration-300">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-purple-600 p-4 rounded-full mb-4 shadow-lg">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-title font-semibold mb-2 text-gray-900">Instituição</h2>
                <p className="text-gray-600">Acesso para gestores e professores da instituição</p>
                <Button variant="outline" className="mt-4 w-full">
                  Acessar
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/login-aluno" className="block transform hover:scale-105 transition-transform duration-300">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-green-600 p-4 rounded-full mb-4 shadow-lg">
                  <GraduationCap className="h-10 w-10 text-white" />
            </div>
                <h2 className="text-2xl font-title font-semibold mb-2 text-gray-900">Aluno</h2>
                <p className="text-gray-600">Acesso para alunos da instituição</p>
                <Button variant="outline" className="mt-4 w-full">
                  Acessar
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/login-responsavel" className="block transform hover:scale-105 transition-transform duration-300">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-blue-600 p-4 rounded-full mb-4 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-title font-semibold mb-2 text-gray-900">Responsável</h2>
                <p className="text-gray-600">Acesso para pais e responsáveis</p>
                <Button variant="outline" className="mt-4 w-full">
                  Acessar
                </Button>
              </div>
            </Card>
          </Link>
        </div>
          </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-title font-semibold mb-2">Ambiente Seguro</h3>
              <p className="text-gray-600">Promovemos um ambiente escolar livre de bullying e discriminação</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-title font-semibold mb-2">Comunicação Efetiva</h3>
              <p className="text-gray-600">Canal direto entre alunos, responsáveis e instituição</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-title font-semibold mb-2">Proteção Total</h3>
              <p className="text-gray-600">Sistema completo de monitoramento e prevenção</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios para a Instituição */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-title font-bold text-gray-900 mb-4">Como o NoHate Ajuda sua Instituição</h2>
            <p className="text-xl font-sans text-gray-600 max-w-3xl mx-auto">
              Uma solução completa para criar um ambiente escolar mais seguro e acolhedor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-title font-semibold mb-4 text-purple-600">Gestão de Denúncias</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Sistema centralizado para recebimento e acompanhamento de denúncias
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Priorização automática de casos mais urgentes
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Histórico completo de ações tomadas
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-title font-semibold mb-4 text-green-600">Monitoramento em Tempo Real</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Análise de padrões de comportamento
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Alertas automáticos para situações críticas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Relatórios detalhados de incidências
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-title font-semibold mb-4 text-blue-600">Comunicação Integrada</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Canal direto com pais e responsáveis
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Notificações automáticas de atualizações
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Sistema de feedback para melhorias contínuas
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-title font-semibold mb-4 text-indigo-600">Conformidade e Segurança</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Conformidade com LGPD e normas educacionais
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Proteção de dados sensíveis
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Backup automático de informações
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
