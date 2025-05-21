import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Send, Building2, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ComunicacaoResponsaveis = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [assunto, setAssunto] = useState("");

  // Dados simulados de mensagens
  const mensagens = [
    {
      id: 1,
      remetente: "Escola Municipal",
      assunto: "Reunião de Pais",
      data: "2024-03-20 14:30",
      lida: true
    },
    {
      id: 2,
      remetente: "Coordenação Pedagógica",
      assunto: "Avaliação Bimestral",
      data: "2024-03-20 10:15",
      lida: false
    },
    {
      id: 3,
      remetente: "Secretaria Escolar",
      assunto: "Documentação Pendente",
      data: "2024-03-19 16:45",
      lida: true
    }
  ];

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assunto || !mensagem) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    toast.success("Mensagem enviada com sucesso!");
    setMensagem("");
    setAssunto("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/home-responsaveis")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação com a Escola</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Mensagens */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Mensagens Recebidas</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar mensagens..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {mensagens.map((msg) => (
                <Card 
                  key={msg.id} 
                  className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    !msg.lida ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{msg.remetente}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{msg.assunto}</p>
                      <p className="text-xs text-gray-500 mt-1">{msg.data}</p>
                    </div>
                    {!msg.lida && (
                      <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Formulário de Nova Mensagem */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Nova Mensagem</h2>
                <p className="text-sm text-gray-500">
                  Envie uma mensagem para a escola
                </p>
              </div>
            </div>

            <form onSubmit={handleEnviarMensagem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  placeholder="Digite o assunto"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Digite sua mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComunicacaoResponsaveis; 