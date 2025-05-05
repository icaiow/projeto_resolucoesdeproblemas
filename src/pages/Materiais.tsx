import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, FileText, Video } from "lucide-react";

const Materiais = () => {
  const navigate = useNavigate();

  // Dados simulados de materiais
  const materiais = [
    {
      id: 1,
      titulo: "Guia de Prevenção ao Bullying",
      tipo: "PDF",
      descricao: "Material completo sobre como identificar e prevenir situações de bullying.",
      tamanho: "2.5 MB",
      icon: FileText,
    },
    {
      id: 2,
      titulo: "Vídeo: Acolhimento Escolar",
      tipo: "Vídeo",
      descricao: "Vídeo educativo sobre a importância do acolhimento no ambiente escolar.",
      duracao: "15 min",
      icon: Video,
    },
    {
      id: 3,
      titulo: "Manual do Responsável",
      tipo: "PDF",
      descricao: "Guia completo para responsáveis sobre o acompanhamento escolar.",
      tamanho: "1.8 MB",
      icon: FileText,
    },
    {
      id: 4,
      titulo: "Cartilha de Segurança",
      tipo: "PDF",
      descricao: "Informações importantes sobre segurança e proteção dos alunos.",
      tamanho: "3.2 MB",
      icon: FileText,
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
          <h1 className="text-2xl font-bold text-gray-900">Materiais Educativos</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Materiais Disponíveis</h2>
              <p className="text-sm text-gray-500">
                Acesse materiais sobre acolhimento e prevenção
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materiais.map((material) => (
              <Card key={material.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <material.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{material.titulo}</h3>
                    <p className="text-sm text-gray-600 mt-1">{material.descricao}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <span>{material.tipo}</span>
                      <span>•</span>
                      <span>
                        {material.tamanho || material.duracao}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Materiais; 