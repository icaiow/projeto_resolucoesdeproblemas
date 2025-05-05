import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Calendar, BookOpen, MessageCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const AlunoView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados simulados do aluno
  const aluno = {
    id: id,
    nome: "João Silva",
    turma: "8º Ano A",
    matricula: "2024001",
    escola: "Escola Estadual Exemplo",
    responsavel: "Maria Silva",
    atividades: [
      {
        id: 1,
        tipo: "escuta",
        titulo: "Relato sobre bullying",
        data: "15/03/2024",
        status: "Em análise",
      },
      {
        id: 2,
        tipo: "evento",
        titulo: "Palestra sobre cidadania digital",
        data: "10/03/2024",
        status: "Concluído",
      },
      {
        id: 3,
        tipo: "material",
        titulo: "Cartilha de prevenção ao bullying",
        data: "05/03/2024",
        status: "Visualizado",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "em análise":
        return "text-amber-600";
      case "concluído":
        return "text-green-600";
      case "visualizado":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "escuta":
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case "evento":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "material":
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Informações do Aluno */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{aluno.nome}</h1>
              <p className="text-gray-600">{aluno.turma}</p>
              <p className="text-sm text-gray-500">Matrícula: {aluno.matricula}</p>
              <p className="text-sm text-gray-500">Escola: {aluno.escola}</p>
            </div>
          </div>
        </Card>

        {/* Atividades Recentes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
          <div className="space-y-4">
            {aluno.atividades.map((atividade) => (
              <Card key={atividade.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTipoIcon(atividade.tipo)}
                    <div>
                      <h3 className="font-semibold">{atividade.titulo}</h3>
                      <p className="text-sm text-gray-500">{atividade.data}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${getStatusColor(atividade.status)}`}>
                      {atividade.status}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/atividades/${atividade.tipo}/${atividade.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
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
      </div>
    </div>
  );
};

export default AlunoView;
