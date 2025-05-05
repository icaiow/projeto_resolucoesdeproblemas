import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, AlertTriangle, Users, LogOut, Edit, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const HomeResponsaveis = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  // Dados simulados do responsável
  const responsavel = {
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
    alunos: [
      {
        id: 1,
        nome: "João Silva",
        turma: "8º Ano A",
        matricula: "2024001",
      },
      {
        id: 2,
        nome: "Ana Silva",
        turma: "6º Ano B",
        matricula: "2024002",
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
    toast.success("Logout realizado com sucesso!");
  };

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Área do Responsável</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/editar-perfil-responsavel")}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Perfil do Responsável */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{responsavel.nome}</h2>
              <p className="text-gray-600">{responsavel.email}</p>
              <p className="text-gray-600">{responsavel.telefone}</p>
            </div>
          </div>
        </Card>

        {/* Alunos Vinculados */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Alunos Vinculados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {responsavel.alunos.map((aluno) => (
              <Card key={aluno.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{aluno.nome}</h3>
                    <p className="text-gray-600">{aluno.turma}</p>
                    <p className="text-sm text-gray-500">Matrícula: {aluno.matricula}</p>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/aluno-view/${aluno.id}`)}>
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Escuta Digital</h3>
                <p className="text-gray-600">Comunique-se com a escola</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate("/escuta-digital")}>
              Acessar
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Denúncia</h3>
                <p className="text-gray-600">Reporte situações de risco</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate("/denuncia")}>
              Acessar
            </Button>
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
            <Button type="submit" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default HomeResponsaveis; 