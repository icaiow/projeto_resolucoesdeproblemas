import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const MaterialDetalhes = () => {
  const { id } = useParams();

  // Simulando dados do material
  const material = {
    id: id,
    titulo: "Cartilha sobre prevenção ao cyberbullying",
    data: "08/04/2023",
    descricao: "Esta cartilha foi desenvolvida para ajudar estudantes a entender e prevenir o cyberbullying. " +
               "Ela contém informações importantes sobre:\n\n" +
               "• O que é cyberbullying\n" +
               "• Como identificar situações de cyberbullying\n" +
               "• O que fazer quando for vítima ou testemunha\n" +
               "• Como buscar ajuda\n" +
               "• Dicas de segurança online\n\n" +
               "O material foi elaborado por especialistas em psicologia escolar e segurança digital.",
    arquivo: "cartilha-cyberbullying.pdf",
    tamanho: "2.5 MB"
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/atividades-recentes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Detalhes do Material</h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-500 p-2 rounded-full">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{material.titulo}</h2>
            <p className="text-sm text-gray-500">Publicado em: {material.data}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Sobre o Material</h3>
        <div className="prose max-w-none">
          {material.descricao.split('\n').map((paragrafo, index) => (
            <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">{material.arquivo}</p>
              <p className="text-sm text-gray-500">Tamanho: {material.tamanho}</p>
            </div>
          </div>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Baixar Material
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MaterialDetalhes; 