import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const MateriaisEducativos = () => {
  const materiais = [
    {
      id: "1",
      titulo: "Guia de Cidadania Digital",
      categoria: "Cidadania Digital",
      descricao: "Aprenda sobre segurança online, privacidade e comportamento ético na internet.",
      data: "15/04/2023",
      arquivo: "guia-cidadania-digital.pdf",
      tamanho: "2.5 MB"
    },
    {
      id: "2",
      titulo: "Prevenção ao Cyberbullying",
      categoria: "Prevenção",
      descricao: "Entenda o que é cyberbullying, como identificar e como se proteger.",
      data: "12/04/2023",
      arquivo: "prevencao-cyberbullying.pdf",
      tamanho: "1.8 MB"
    },
    {
      id: "3",
      titulo: "Uso Responsável das Redes Sociais",
      categoria: "Redes Sociais",
      descricao: "Dicas e orientações para um uso seguro e responsável das redes sociais.",
      data: "10/04/2023",
      arquivo: "uso-redes-sociais.pdf",
      tamanho: "3.2 MB"
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
        <h1 className="text-2xl font-bold">Materiais Educativos</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-500 p-2 rounded-full">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Recursos para Aprendizado</h2>
            <p className="text-gray-600">Acesse materiais sobre cidadania digital, prevenção e temas importantes.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar materiais..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            Filtrar
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {materiais.map((material) => (
          <Card key={material.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{material.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {material.categoria} • Publicado em: {material.data}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {material.tamanho}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{material.descricao}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>{material.arquivo}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MateriaisEducativos; 