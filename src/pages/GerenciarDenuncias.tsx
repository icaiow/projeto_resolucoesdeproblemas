// 📁 src/pages/GerenciarDenuncias.tsx
import { useState, useEffect } from "react";
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
import { listarMinhasDenuncias } from "@/services/denunciaService";
import { toast } from "sonner";

const GerenciarDenuncias = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [denuncias, setDenuncias] = useState<any[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await listarMinhasDenuncias();
        setDenuncias(dados);
      } catch (error) {
        toast.error("Erro ao carregar denúncias");
      }
    };
    carregar();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "text-yellow-500";
      case "em_analise":
        return "text-blue-500";
      case "resolvida":
        return "text-green-500";
      case "arquivada":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "em_analise":
        return <AlertCircle className="h-4 w-4" />;
      case "resolvida":
        return <CheckCircle2 className="h-4 w-4" />;
      case "arquivada":
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
                         denuncia.usuario?.nome.toLowerCase().includes(searchTerm.toLowerCase());
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
          {/* Cards de resumo podem ser dinâmicos no futuro */}
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
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="resolvida">Resolvida</SelectItem>
                    <SelectItem value="arquivada">Arquivada</SelectItem>
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
                        <h3 className="font-semibold capitalize">{denuncia.titulo}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTipoColor(denuncia.tipo)}`}>
                          {denuncia.tipo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {denuncia.usuario?.nome}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1 ${getStatusColor(denuncia.status)}`}>
                        {getStatusIcon(denuncia.status)}
                        <span className="text-sm capitalize">{denuncia.status}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(denuncia.createdAt).toLocaleDateString()}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/denuncias/${denuncia.id}`)}
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
