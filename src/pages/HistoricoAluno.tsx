import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, MessageCircle, BookOpen, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const HistoricoAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dados simulados do aluno
  const aluno = {
    id: id,
    nome: "João Silva",
    turma: "8º Ano A",
    historico: {
      denuncias: [
        {
          id: 1,
          tipo: "Bullying",
          data: "15/03/2024",
          status: "Em análise",
          descricao: "Situação de bullying relatada durante o intervalo."
        },
        {
          id: 2,
          tipo: "Discriminação",
          data: "10/02/2024",
          status: "Resolvido",
          descricao: "Caso de discriminação em sala de aula."
        }
      ],
      escutas: [
        {
          id: 1,
          tipo: "Ajuda com Matemática",
          data: "20/03/2024",
          status: "Em andamento",
          descricao: "Solicitação de ajuda com exercícios de matemática."
        }
      ],
      atividades: [
        {
          id: 1,
          tipo: "Participação em Campanha",
          data: "05/03/2024",
          status: "Concluído",
          descricao: "Participação na campanha de prevenção ao bullying."
        },
        {
          id: 2,
          tipo: "Oficina de Resolução de Conflitos",
          data: "01/03/2024",
          status: "Concluído",
          descricao: "Participação em oficina sobre resolução de conflitos."
        }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em análise":
        return "bg-amber-100 text-amber-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Resolvido":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em análise":
        return <Clock className="h-4 w-4" />;
      case "Em andamento":
        return <AlertCircle className="h-4 w-4" />;
      case "Concluído":
      case "Resolvido":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Histórico do Aluno</h1>
            <p className="text-gray-600">
              Histórico completo de atividades, denúncias e escutas
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/perfil-aluno/${aluno.id}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Perfil
          </Button>
        </div>

        {/* Denúncias */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Denúncias</h2>
              <p className="text-sm text-gray-500">Histórico de denúncias registradas</p>
            </div>
          </div>

          <div className="space-y-4">
            {aluno.historico.denuncias.map((denuncia) => (
              <Card key={denuncia.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{denuncia.tipo}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(denuncia.status)}`}>
                      {denuncia.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{denuncia.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{denuncia.data}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Escutas */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Escutas</h2>
              <p className="text-sm text-gray-500">Histórico de escutas realizadas</p>
            </div>
          </div>

          <div className="space-y-4">
            {aluno.historico.escutas.map((escuta) => (
              <Card key={escuta.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{escuta.tipo}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(escuta.status)}`}>
                      {escuta.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{escuta.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{escuta.data}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Atividades */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Atividades</h2>
              <p className="text-sm text-gray-500">Histórico de atividades participadas</p>
            </div>
          </div>

          <div className="space-y-4">
            {aluno.historico.atividades.map((atividade) => (
              <Card key={atividade.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{atividade.tipo}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(atividade.status)}`}>
                      {atividade.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{atividade.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{atividade.data}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoricoAluno; 