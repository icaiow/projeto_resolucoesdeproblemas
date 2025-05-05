import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Plus, History } from "lucide-react";
import { Link } from "react-router-dom";

const EscutaDigital = () => {
  const escutas = [
    {
      id: "2478",
      titulo: "Dúvida sobre matemática",
      status: "Respondido",
      data: "12/04/2023",
      resposta: "Sua dúvida foi respondida pelo professor de matemática."
    },
    {
      id: "2479",
      titulo: "Sugestão para aula de história",
      status: "Em análise",
      data: "15/04/2023",
      resposta: "Sua sugestão está sendo analisada pela equipe pedagógica."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/home-alunos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Escuta Digital</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-green-bright p-2 rounded-full">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Compartilhe suas experiências</h2>
            <p className="text-gray-600">Compartilhe suas dúvidas, sugestões ou experiências com a equipe pedagógica.</p>
          </div>
        </div>
        <Link to="/enviar-escuta">
          <Button className="w-full bg-green-bright text-white hover:bg-green-bright/90">
            <Plus className="h-4 w-4 mr-2" />
            Iniciar nova escuta
          </Button>
        </Link>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <History className="h-5 w-5" />
          <h3 className="font-medium">Suas escutas recentes</h3>
        </div>

        {escutas.map((escuta) => (
          <Card key={escuta.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{escuta.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1">Enviado em: {escuta.data}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                escuta.status === 'Respondido' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {escuta.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{escuta.resposta}</p>
            <div className="mt-4">
              <Link to={`/atividades/escuta/${escuta.id}`}>
                <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EscutaDigital;
