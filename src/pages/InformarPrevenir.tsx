
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

const InformarPrevenir = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Informar e Prevenir</h1>
        <p className="text-gray-600 mb-8">
          Acesse materiais educativos e campanhas de prevenção.
        </p>
      </div>

      <Card className="p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Materiais Educativos</h2>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-md p-4 flex gap-4">
            <div className="bg-gray-100 h-24 w-24 rounded-md flex items-center justify-center">
              <Download className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Cartilha de Prevenção ao Bullying</h3>
              <p className="text-sm text-gray-500 mb-4">
                Material destinado a orientar educadores sobre como identificar e prevenir situações de bullying.
              </p>
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Baixar PDF
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 flex gap-4">
            <div className="bg-gray-100 h-24 w-24 rounded-md flex items-center justify-center">
              <Download className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Guia de Segurança Digital</h3>
              <p className="text-sm text-gray-500 mb-4">
                Informações sobre segurança online e como proteger os alunos no ambiente digital.
              </p>
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Campanhas e Iniciativas</h2>
        <Separator className="mb-6" />
        
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Setembro Amarelo - Prevenção ao Suicídio</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Em andamento</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Campanha de conscientização sobre a importância da saúde mental e prevenção ao suicídio.
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Período: 01/09/2023 - 30/09/2023</span>
              <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                Ver detalhes
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Capacitação de Professores: Mediação de Conflitos</h3>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Programado</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Workshop sobre técnicas de mediação de conflitos em sala de aula.
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Data: 15/05/2023</span>
              <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                Ver detalhes
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="bg-purple hover:bg-purple-dark">
            Propor Nova Campanha
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InformarPrevenir;
