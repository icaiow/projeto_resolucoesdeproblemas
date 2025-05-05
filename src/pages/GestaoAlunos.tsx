import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, User, Users, GraduationCap, AlertCircle, CheckCircle2, MessageSquare, AlertTriangle, Clock, ArrowUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Aluno {
  id: string;
  nome: string;
  turma: string;
  matricula: string;
  status: "ativo" | "inativo" | "transferido";
  ultimoAcesso: string;
  escutas: number;
  denuncias: number;
}

const GestaoAlunos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterTurma, setFilterTurma] = useState<string>("todos");

  // Dados mockados para exemplo
  const alunos: Aluno[] = [
    {
      id: "1",
      nome: "João Silva",
      turma: "8º A",
      matricula: "2024001",
      status: "ativo",
      ultimoAcesso: "15/03/2024",
      escutas: 2,
      denuncias: 1
    },
    {
      id: "2",
      nome: "Maria Santos",
      turma: "9º B",
      matricula: "2024002",
      status: "ativo",
      ultimoAcesso: "14/03/2024",
      escutas: 1,
      denuncias: 0
    },
    {
      id: "3",
      nome: "Pedro Oliveira",
      turma: "7º C",
      matricula: "2024003",
      status: "transferido",
      ultimoAcesso: "10/03/2024",
      escutas: 0,
      denuncias: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-yellow-100 text-yellow-800";
      case "transferido":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <CheckCircle2 className="h-4 w-4" />;
      case "inativo":
        return <AlertCircle className="h-4 w-4" />;
      case "transferido":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const filteredAlunos = alunos.filter(aluno => {
    const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aluno.matricula.includes(searchTerm);
    const matchesStatus = filterStatus === "todos" || aluno.status === filterStatus;
    const matchesTurma = filterTurma === "todos" || aluno.turma === filterTurma;
    return matchesSearch && matchesStatus && matchesTurma;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestão de Alunos</h1>
            <p className="text-gray-600">
              Gerencie e acompanhe os dados dos alunos da instituição.
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
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Total de Alunos</p>
              <p className="text-2xl font-bold text-purple-700">1.245</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+5% este mês</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Alunos Ativos</p>
              <p className="text-2xl font-bold text-purple-700">1.198</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+3% este mês</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Turmas</p>
              <p className="text-2xl font-bold text-purple-700">42</p>
              <div className="flex items-center text-gray-600 text-sm">
                <span>Média de 30 alunos/turma</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Taxa de Engajamento</p>
              <p className="text-2xl font-bold text-purple-700">87%</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+2% este mês</span>
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
                    placeholder="Buscar por nome ou matrícula..."
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
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="transferido">Transferido</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterTurma} onValueChange={setFilterTurma}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Turmas</SelectItem>
                    <SelectItem value="7º C">7º C</SelectItem>
                    <SelectItem value="8º A">8º A</SelectItem>
                    <SelectItem value="9º B">9º B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlunos.map((aluno) => (
                <Card key={aluno.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{aluno.nome}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(aluno.status)}`}>
                          {aluno.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Matrícula: {aluno.matricula} • Turma: {aluno.turma}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{aluno.escutas} escutas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{aluno.denuncias} denúncias</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Último acesso: {aluno.ultimoAcesso}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/alunos/${aluno.id}`)}
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        Ver Perfil
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/alunos/${aluno.id}/historico`)}
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        Histórico
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

export default GestaoAlunos; 