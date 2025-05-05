import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Plus, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Denuncia = () => {
  const denuncias = [
    {
      id: "1234",
      titulo: "Situação de bullying",
      status: "Em análise",
      data: "10/04/2023",
      descricao: "Sua denúncia está sendo analisada pela equipe responsável."
    },
    {
      id: "1235",
      titulo: "Discriminação em sala",
      status: "Em andamento",
      data: "08/04/2023",
      descricao: "A equipe está tomando as medidas necessárias."
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
        <h1 className="text-2xl font-bold">Denúncia</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-red-500 p-2 rounded-full">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Reporte situações</h2>
            <p className="text-gray-600">Reporte situações de bullying, discriminação ou assédio de forma segura e anônima.</p>
          </div>
        </div>
        <Link to="/enviar-denuncia">
          <Button className="w-full bg-red-500 text-white hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Fazer denúncia
          </Button>
        </Link>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Shield className="h-5 w-5" />
          <h3 className="font-medium">Suas denúncias</h3>
        </div>

        {denuncias.map((denuncia) => (
          <Card key={denuncia.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{denuncia.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1">Enviado em: {denuncia.data}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                denuncia.status === 'Em análise' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {denuncia.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{denuncia.descricao}</p>
            <div className="mt-4">
              <Link to={`/atividades/denuncia/${denuncia.id}`}>
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

export default Denuncia;
