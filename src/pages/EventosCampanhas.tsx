import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const EventosCampanhas = () => {
  const { toast } = useToast();
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Semana de Conscientização contra o Bullying",
      data: "15/06/2025",
      descricao: "Uma semana inteira dedicada a atividades de conscientização sobre o bullying e seus impactos.",
      local: "Online e presencial"
    },
    {
      id: 2,
      titulo: "Palestra: Como identificar sinais de bullying",
      data: "22/06/2025",
      descricao: "Palestra com especialistas sobre como identificar sinais de bullying e como agir.",
      local: "Auditório principal"
    },
    {
      id: 3,
      titulo: "Workshop de Empatia e Respeito",
      data: "29/06/2025",
      descricao: "Workshop interativo para desenvolver habilidades de empatia e respeito entre os alunos.",
      local: "Sala de eventos"
    }
  ]);

  useEffect(() => {
    // Simulação de carregamento de dados
    toast({
      title: "Eventos carregados",
      description: "Lista de eventos e campanhas atualizada.",
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Eventos e Campanhas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventos.map((evento) => (
          <Card key={evento.id} className="shadow-md">
            <CardHeader className="bg-green-50">
              <CardTitle>{evento.titulo}</CardTitle>
              <CardDescription>Data: {evento.data}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-2">{evento.descricao}</p>
              <p className="text-sm text-gray-600">Local: {evento.local}</p>
              <div className="mt-4">
                <Button variant="outline" className="mr-2">Mais detalhes</Button>
                <Button>Participar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Próximas Campanhas</h2>
        <p className="text-gray-600">
          Fique atento às próximas campanhas de conscientização e eventos relacionados à prevenção do bullying e promoção de um ambiente escolar saudável.
        </p>
      </div>
    </div>
  );
};

export default EventosCampanhas;
