import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, AlertTriangle } from "lucide-react";

const HistoricoDenuncias = () => {
  const navigate = useNavigate();

  // Dados simulados de denúncias
  const denuncias = [
    {
      id: 1,
      aluno: "João Silva",
      tipo: "Bullying",
      data: "15/03/2024",
      status: "Em análise",
      descricao: "Situação de bullying relatada durante o intervalo.",
    },
    {
      id: 2,
      aluno: "Ana Silva",
      tipo: "Discriminação",
      data: "10/03/2024",
      status: "Em andamento",
      descricao: "Caso de discriminação em sala de aula.",
    },
    {
      id: 3,
      aluno: "João Silva",
      tipo: "Violência",
      data: "05/03/2024",
      status: "Concluído",
      descricao: "Situação de violência física no pátio.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em análise":
        return "bg-amber-100 text-amber-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Histórico de Denúncias</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <History className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Suas Denúncias</h2>
              <p className="text-sm text-gray-500">
                Acompanhe o andamento das denúncias realizadas
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {denuncias.map((denuncia) => (
              <Card key={denuncia.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <h3 className="font-semibold">{denuncia.tipo}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Aluno: {denuncia.aluno}</p>
                    <p className="text-sm text-gray-600">Data: {denuncia.data}</p>
                    <p className="text-sm text-gray-600 mt-2">{denuncia.descricao}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      denuncia.status
                    )}`}
                  >
                    {denuncia.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoricoDenuncias; 