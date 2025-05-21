import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, GraduationCap, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao NoHate</h1>
          <p className="text-lg text-gray-600">Escolha como deseja acessar a plataforma</p>
            </div>
            
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/login-institucional" className="block">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple p-3 rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Instituição</h2>
                <p className="text-gray-600">Acesso para gestores e professores da instituição</p>
              </div>
            </Card>
          </Link>

          <Link to="/login-aluno" className="block">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-bright p-3 rounded-full mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
            </div>
                <h2 className="text-xl font-semibold mb-2">Aluno</h2>
                <p className="text-gray-600">Acesso para alunos da instituição</p>
              </div>
            </Card>
          </Link>

          <Link to="/login-responsavel" className="block">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Responsável</h2>
                <p className="text-gray-600">Acesso para pais e responsáveis</p>
              </div>
            </Card>
          </Link>
        </div>
          </div>
    </div>
  );
};

export default Index;
