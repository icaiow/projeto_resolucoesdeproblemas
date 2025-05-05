import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, AlertTriangle, CheckCircle2, Clock, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Denuncia {
  id: string;
  aluno: string;
  turma: string;
  titulo: string;
  data: string;
  status: "pendente" | "em_investigacao" | "resolvido" | "arquivado";
  tipo: "bullying" | "discriminacao" | "violencia" | "outros";
}

const GerenciarDenuncias = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterTipo, setFilterTipo] = useState<string>("todos");

  // Dados mockados para exemplo
  const denuncias: Denuncia[] = [
    {
      id: "1",
      aluno: "João Silva",
      turma: "8º A",
      titulo: "Situação de bullying",
      data: "15/03/2024",
      status: "em_investigacao",
      tipo: "bullying"
    },
    {
      id: "2",
      aluno: "Maria Santos",
      turma: "9º B",
      titulo: "Discriminação em sala",
      data: "14/03/2024",
      status: "pendente",
      tipo: "discriminacao"
    },
    {
      id: "3",
      aluno: "Pedro Oliveira",
      turma: "7º C",
      titulo: "Agressão física",
      data: "13/03/2024",
      status: "resolvido",
      tipo: "violencia"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "text-yellow-500";
      case "em_investigacao":
        return "text-blue-500";
      case "resolvido":
        return "text-green-500";
      case "arquivado":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "em_investigacao":
        return <AlertCircle className="h-4 w-4" />;
      case "resolvido":
        return <CheckCircle2 className="h-4 w-4" />;
      case "arquivado":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "bullying":
        return "bg-red-100 text-red-800";
      case "discriminacao":
        return "bg-orange-100 text-orange-800";
      case "violencia":
        return "bg-purple-100 text-purple-800";
      case "outros":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDenuncias = denuncias.filter(denuncia => {
    const matchesSearch = denuncia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         denuncia.aluno.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || denuncia.status === filterStatus;
    const matchesTipo = filterTipo === "todos" || denuncia.tipo === filterTipo;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gerenciar Denúncias</h1>
            <p className="text-gray-600">
              Acompanhe e gerencie as denúncias recebidas na instituição.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/home-institucional")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600">Total de Denúncias</p>
              <p className="text-2xl font-bold text-red-700">156</p>
              <div className="flex items-center text-red-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+12% este mês</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600">Resolvidas</p>
              <p className="text-2xl font-bold text-red-700">128</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+8% este mês</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600">Pendentes</p>
              <p className="text-2xl font-bold text-red-700">28</p>
              <div className="flex items-center text-red-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+4% este mês</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600">Tempo Médio de Resposta</p>
              <p className="text-2xl font-bold text-red-700">2.5 dias</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>-0.5 dias este mês</span>
              </div>
            </div>
          </Card>
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
                    <SelectItem value="em_investigacao">Em Investigação</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                    <SelectItem value="arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    <SelectItem value="bullying">Bullying</SelectItem>
                    <SelectItem value="discriminacao">Discriminação</SelectItem>
                    <SelectItem value="violencia">Violência</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredDenuncias.map((denuncia) => (
                <Card key={denuncia.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{denuncia.titulo}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTipoColor(denuncia.tipo)}`}>
                          {denuncia.tipo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {denuncia.aluno} - {denuncia.turma}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1 ${getStatusColor(denuncia.status)}`}>
                        {getStatusIcon(denuncia.status)}
                        <span className="text-sm capitalize">{denuncia.status}</span>
                      </div>
                      <span className="text-sm text-gray-500">{denuncia.data}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/atividades/denuncia/${denuncia.id}`)}
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
    </div>
  );
};

export default GerenciarDenuncias; 