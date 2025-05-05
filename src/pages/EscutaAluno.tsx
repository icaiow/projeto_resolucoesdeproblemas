import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Lock, Calendar, User } from "lucide-react";
import { toast } from "sonner";

const EscutaAluno = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  // Dados simulados das mensagens anteriores
  const mensagensAnteriores = [
    {
      id: 1,
      data: "15/04/2023",
      mensagem: "Estou me sentindo um pouco ansioso com as provas da próxima semana.",
      resposta: "Olá! Entendo sua preocupação. Que tal conversarmos sobre estratégias de estudo?",
      status: "respondido"
    },
    {
      id: 2,
      data: "10/04/2023",
      mensagem: "Gostaria de conversar sobre algumas dificuldades que estou tendo com matemática.",
      resposta: null,
      status: "pendente"
    }
  ];

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (mensagem.trim()) {
      toast.success("Mensagem enviada com sucesso! A equipe pedagógica entrará em contato em breve.");
      setMensagem("");
    } else {
      toast.error("Por favor, digite uma mensagem antes de enviar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-alunos")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Espaço de Escuta</h1>
          <p className="text-gray-600">
            Este é um espaço seguro para compartilhar seus pensamentos e sentimentos.
            Suas mensagens são confidenciais e serão tratadas com respeito.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Nova Mensagem</h3>
              <p className="text-sm text-gray-500">
                Compartilhe seus pensamentos com a equipe pedagógica
              </p>
            </div>
          </div>

          <form onSubmit={handleEnviarMensagem} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Digite sua mensagem aqui..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Sua mensagem é confidencial e será tratada com sigilo.</span>
            </div>
            <Button type="submit" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">Mensagens Anteriores</h2>
          <div className="space-y-4">
            {mensagensAnteriores.map((msg) => (
              <Card key={msg.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{msg.data}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      msg.status === "respondido" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {msg.status === "respondido" ? "Respondido" : "Pendente"}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{msg.mensagem}</p>
                  </div>

                  {msg.resposta && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">
                          Resposta da Equipe Pedagógica
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.resposta}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscutaAluno; 