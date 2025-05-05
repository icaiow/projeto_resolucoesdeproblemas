import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const Notificacoes = () => {
  const navigate = useNavigate();

  // Dados simulados de notificações
  const notificacoes = [
    {
      id: 1,
      tipo: "alerta",
      titulo: "Falta de Material",
      mensagem: "Seu filho(a) não trouxe o material de matemática hoje.",
      data: "15/03/2024 08:30",
      lida: false,
      icon: AlertCircle,
      cor: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      id: 2,
      tipo: "resposta",
      titulo: "Resposta da Escola",
      mensagem: "Sua mensagem sobre o evento de ciências foi recebida. Confirmamos sua presença.",
      data: "14/03/2024 15:45",
      lida: true,
      icon: MessageCircle,
      cor: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      id: 3,
      tipo: "confirmação",
      titulo: "Presença Confirmada",
      mensagem: "Sua presença na reunião de pais foi confirmada para o dia 20/03.",
      data: "13/03/2024 10:15",
      lida: true,
      icon: CheckCircle,
      cor: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Bell className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Alertas e Respostas</h2>
              <p className="text-sm text-gray-500">
                Acompanhe as notificações da escola
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notificacoes.map((notificacao) => (
              <Card
                key={notificacao.id}
                className={`p-4 ${
                  !notificacao.lida ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${notificacao.bg}`}
                  >
                    <notificacao.icon className={`h-5 w-5 ${notificacao.cor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{notificacao.titulo}</h3>
                      <span className="text-sm text-gray-500">
                        {notificacao.data}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notificacao.mensagem}
                    </p>
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

export default Notificacoes; 