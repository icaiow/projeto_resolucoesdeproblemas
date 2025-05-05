import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, FileText, Plus, Download, Edit2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Material {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  data: string;
  arquivo: string;
  tamanho: string;
}

const GerenciarMateriais = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState<string>("todos");

  // Dados mockados para exemplo
  const materiais: Material[] = [
    {
      id: "1",
      titulo: "Guia de Prevenção ao Bullying",
      categoria: "Prevenção",
      descricao: "Material completo sobre prevenção e combate ao bullying escolar",
      data: "15/03/2024",
      arquivo: "guia-prevencao-bullying.pdf",
      tamanho: "2.5 MB"
    },
    {
      id: "2",
      titulo: "Cartilha de Inclusão",
      categoria: "Inclusão",
      descricao: "Cartilha sobre inclusão e respeito à diversidade",
      data: "14/03/2024",
      arquivo: "cartilha-inclusao.pdf",
      tamanho: "1.8 MB"
    },
    {
      id: "3",
      titulo: "Manual de Mediação de Conflitos",
      categoria: "Mediação",
      descricao: "Manual prático para mediação de conflitos escolares",
      data: "13/03/2024",
      arquivo: "manual-mediacao.pdf",
      tamanho: "3.2 MB"
    }
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Prevenção":
        return "bg-blue-100 text-blue-800";
      case "Inclusão":
        return "bg-green-100 text-green-800";
      case "Mediação":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMateriais = materiais.filter(material => {
    const matchesSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filterCategoria === "todos" || material.categoria === filterCategoria;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home-institucional")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Gerenciar Materiais</h1>
        </div>
        <Button onClick={() => navigate("/materiais/novo")}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Material
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  <SelectItem value="Prevenção">Prevenção</SelectItem>
                  <SelectItem value="Inclusão">Inclusão</SelectItem>
                  <SelectItem value="Mediação">Mediação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMateriais.map((material) => (
              <Card key={material.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{material.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoriaColor(material.categoria)}`}>
                        {material.categoria}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{material.descricao}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileText className="h-4 w-4" />
                      <span>{material.arquivo}</span>
                      <span>•</span>
                      <span>{material.tamanho}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GerenciarMateriais; 