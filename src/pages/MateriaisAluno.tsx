import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Download, Search, FileText, Video, Image, File } from "lucide-react";

const MateriaisAluno = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Dados simulados dos materiais
  const materiais = [
    {
      id: 1,
      titulo: "Prevenção ao Bullying",
      tipo: "PDF",
      categoria: "Prevenção",
      descricao: "Cartilha sobre prevenção e combate ao bullying na escola",
      dataPublicacao: "15/04/2023",
      arquivo: "cartilha-bullying.pdf",
      icon: FileText
    },
    {
      id: 2,
      titulo: "Cidadania Digital",
      tipo: "Vídeo",
      categoria: "Educação Digital",
      descricao: "Vídeo educativo sobre uso seguro da internet",
      dataPublicacao: "10/04/2023",
      arquivo: "cidadania-digital.mp4",
      icon: Video
    },
    {
      id: 3,
      titulo: "Saúde Mental",
      tipo: "Imagem",
      categoria: "Saúde",
      descricao: "Infográfico sobre cuidados com a saúde mental",
      dataPublicacao: "05/04/2023",
      arquivo: "saude-mental.jpg",
      icon: Image
    }
  ];

  const categorias = ["Todos", "Prevenção", "Educação Digital", "Saúde"];

  const filteredMateriais = materiais.filter(material => 
    material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-alunos")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Materiais Educativos</h1>
          <p className="text-gray-600">
            Acesse materiais sobre prevenção, cidadania digital e saúde.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar materiais..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant="outline"
                className={categoria === "Todos" ? "bg-blue-50" : ""}
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMateriais.map((material) => (
            <Card key={material.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <material.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{material.titulo}</h3>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {material.tipo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{material.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Publicado em: {material.dataPublicacao}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Sugestão de Material</h3>
              <p className="text-sm text-gray-500">
                Tem alguma sugestão de material educativo? Entre em contato com a coordenação.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MateriaisAluno; 