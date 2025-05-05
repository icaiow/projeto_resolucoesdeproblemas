import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EscutaDetalhes = () => {
  const { id } = useParams();

  // Simulando dados da escuta
  const escuta = {
    id: id,
    titulo: "Escuta Digital #2478",
    data: "12/04/2023",
    pergunta: "Como posso melhorar meu desempenho em matemática?",
    resposta: "Para melhorar seu desempenho em matemática, recomendamos:\n\n" +
              "1. Participar ativamente das aulas e tirar dúvidas com o professor\n" +
              "2. Fazer os exercícios propostos regularmente\n" +
              "3. Revisar o conteúdo em casa\n" +
              "4. Participar das monitorias oferecidas pela escola\n" +
              "5. Utilizar recursos online como vídeos e exercícios complementares"
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/atividades-recentes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Detalhes da Escuta</h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-green-bright p-2 rounded-full">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{escuta.titulo}</h2>
            <p className="text-sm text-gray-500">Enviado em: {escuta.data}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Sua Pergunta</h3>
        <p className="text-gray-600">{escuta.pergunta}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Resposta</h3>
        <div className="prose max-w-none">
          {escuta.resposta.split('\n').map((paragrafo, index) => (
            <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EscutaDetalhes; 