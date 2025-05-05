import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2, Download, Calendar, Users, MessageSquare, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Relatorio {
  id: string;
  titulo: string;
  tipo: "geral" | "escutas" | "denuncias" | "alunos";
  periodo: string;
  data: string;
  arquivo: string;
  tamanho: string;
}

const Relatorios = () => {
  const navigate = useNavigate();
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [filterPeriodo, setFilterPeriodo] = useState<string>("todos");

  // Dados mockados para exemplo
  const relatorios: Relatorio[] = [
    {
      id: "1",
      titulo: "Relatório Geral Mensal",
      tipo: "geral",
      periodo: "Março 2024",
      data: "01/04/2024",
      arquivo: "relatorio-geral-marco-2024.pdf",
      tamanho: "1.2 MB"
    },
    {
      id: "2",
      titulo: "Análise de Escutas",
      tipo: "escutas",
      periodo: "1º Trimestre 2024",
      data: "15/03/2024",
      arquivo: "analise-escutas-trimestre.pdf",
      tamanho: "0.8 MB"
    },
    {
      id: "3",
      titulo: "Relatório de Denúncias",
      tipo: "denuncias",
      periodo: "Fevereiro 2024",
      data: "01/03/2024",
      arquivo: "relatorio-denuncias-fevereiro.pdf",
      tamanho: "1.5 MB"
    },
    {
      id: "4",
      titulo: "Perfil dos Alunos",
      tipo: "alunos",
      periodo: "Ano Letivo 2024",
      data: "15/02/2024",
      arquivo: "perfil-alunos-2024.pdf",
      tamanho: "2.1 MB"
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "geral":
        return <BarChart2 className="h-4 w-4" />;
      case "escutas":
        return <MessageSquare className="h-4 w-4" />;
      case "denuncias":
        return <AlertTriangle className="h-4 w-4" />;
      case "alunos":
        return <Users className="h-4 w-4" />;
      default:
        return <BarChart2 className="h-4 w-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "geral":
        return "bg-blue-100 text-blue-800";
      case "escutas":
        return "bg-green-100 text-green-800";
      case "denuncias":
        return "bg-red-100 text-red-800";
      case "alunos":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRelatorios = relatorios.filter(relatorio => {
    const matchesTipo = filterTipo === "todos" || relatorio.tipo === filterTipo;
    const matchesPeriodo = filterPeriodo === "todos" || relatorio.periodo === filterPeriodo;
    return matchesTipo && matchesPeriodo;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home-institucional")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Relatórios</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-4">
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="escutas">Escutas</SelectItem>
                  <SelectItem value="denuncias">Denúncias</SelectItem>
                  <SelectItem value="alunos">Alunos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPeriodo} onValueChange={setFilterPeriodo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Períodos</SelectItem>
                  <SelectItem value="Março 2024">Março 2024</SelectItem>
                  <SelectItem value="1º Trimestre 2024">1º Trimestre 2024</SelectItem>
                  <SelectItem value="Fevereiro 2024">Fevereiro 2024</SelectItem>
                  <SelectItem value="Ano Letivo 2024">Ano Letivo 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRelatorios.map((relatorio) => (
              <Card key={relatorio.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{relatorio.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getTipoColor(relatorio.tipo)}`}>
                        {relatorio.tipo}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{relatorio.periodo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Gerado em: {relatorio.data}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{relatorio.arquivo}</span>
                        <span>•</span>
                        <span>{relatorio.tamanho}</span>
                      </div>
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

export default Relatorios; 