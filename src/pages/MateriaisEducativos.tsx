import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Book, FileText, Video, Download, Filter } from "lucide-react";

const MateriaisEducativos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");

  // Dados simulados dos materiais
  const materiais = [
    {
      id: 1,
      titulo: "Guia de Prevenção ao Bullying",
      tipo: "PDF",
      categoria: "Prevenção",
      descricao: "Material completo sobre como identificar e prevenir situações de bullying.",
      data: "15/04/2024",
      tamanho: "2.5 MB"
    },
    {
      id: 2,
      titulo: "Saúde Mental na Adolescência",
      tipo: "Vídeo",
      categoria: "Saúde",
      descricao: "Vídeo educativo sobre saúde mental e bem-estar emocional.",
      data: "10/04/2024",
      duracao: "15:30"
    },
    {
      id: 3,
      titulo: "Uso Seguro da Internet",
      tipo: "PDF",
      categoria: "Educação Digital",
      descricao: "Guia prático sobre segurança na internet e redes sociais.",
      data: "05/04/2024",
      tamanho: "1.8 MB"
    }
  ];

  const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "prevencao", nome: "Prevenção" },
    { id: "saude", nome: "Saúde" },
    { id: "educacao-digital", nome: "Educação Digital" }
  ];

  const materiaisFiltrados = materiais.filter(material => {
    const matchSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       material.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = categoriaSelecionada === "todos" || 
                          material.categoria.toLowerCase() === categoriaSelecionada;
    return matchSearch && matchCategoria;
  });

  const getIconePorTipo = (tipo: string) => {
    switch (tipo) {
      case "PDF":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "Vídeo":
        return <Video className="h-6 w-6 text-blue-500" />;
      default:
        return <Book className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-alunos")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Materiais Educativos</h1>
          <p className="text-gray-600">
            Acesse materiais educativos sobre diversos temas importantes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar materiais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categorias.map((categoria) => (
              <Button
                key={categoria.id}
                variant={categoriaSelecionada === categoria.id ? "default" : "outline"}
                onClick={() => setCategoriaSelecionada(categoria.id)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {categoria.nome}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {materiaisFiltrados.map((material) => (
            <Card key={material.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getIconePorTipo(material.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{material.titulo}</h3>
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {material.categoria}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {material.data}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{material.descricao}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    {material.tipo === "PDF" ? (
                      <span>Tamanho: {material.tamanho}</span>
                    ) : (
                      <span>Duração: {material.duracao}</span>
                    )}
                  </div>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Baixar Material
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {materiaisFiltrados.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-gray-500">
              Nenhum material encontrado com os filtros selecionados.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MateriaisEducativos; 