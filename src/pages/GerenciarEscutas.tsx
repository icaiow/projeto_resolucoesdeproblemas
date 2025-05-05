import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, MessageSquare, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Escuta {
  id: string;
  aluno: string;
  turma: string;
  titulo: string;
  data: string;
  status: "pendente" | "em_andamento" | "resolvido";
  prioridade: "baixa" | "media" | "alta";
}

const GerenciarEscutas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterPrioridade, setFilterPrioridade] = useState<string>("todos");

  // Dados mockados para exemplo
  const escutas: Escuta[] = [
    {
      id: "1",
      aluno: "João Silva",
      turma: "8º A",
      titulo: "Dúvida sobre matemática",
      data: "15/03/2024",
      status: "pendente",
      prioridade: "media"
    },
    {
      id: "2",
      aluno: "Maria Santos",
      turma: "9º B",
      titulo: "Problema com colega de classe",
      data: "14/03/2024",
      status: "em_andamento",
      prioridade: "alta"
    },
    {
      id: "3",
      aluno: "Pedro Oliveira",
      turma: "7º C",
      titulo: "Sugestão para aula de história",
      data: "13/03/2024",
      status: "resolvido",
      prioridade: "baixa"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "text-yellow-500";
      case "em_andamento":
        return "text-blue-500";
      case "resolvido":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "em_andamento":
        return <MessageSquare className="h-4 w-4" />;
      case "resolvido":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "baixa":
        return "bg-green-100 text-green-800";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "alta":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEscutas = escutas.filter(escuta => {
    const matchesSearch = escuta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         escuta.aluno.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || escuta.status === filterStatus;
    const matchesPrioridade = filterPrioridade === "todos" || escuta.prioridade === filterPrioridade;
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home-institucional")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Gerenciar Escutas</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou aluno..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Prioridades</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEscutas.map((escuta) => (
              <Card key={escuta.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{escuta.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPrioridadeColor(escuta.prioridade)}`}>
                        {escuta.prioridade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {escuta.aluno} - {escuta.turma}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1 ${getStatusColor(escuta.status)}`}>
                      {getStatusIcon(escuta.status)}
                      <span className="text-sm capitalize">{escuta.status}</span>
                    </div>
                    <span className="text-sm text-gray-500">{escuta.data}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/atividades/escuta/${escuta.id}`)}
                    >
                      Ver Detalhes
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

export default GerenciarEscutas; 