import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, User, Users, GraduationCap, AlertCircle, CheckCircle2, MessageSquare, AlertTriangle, Clock, ArrowUp, BookOpen, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/AuthContext";

interface Aluno {
  id: number;
  usuarioId: number;
  nome: string;
  email: string;
  turma: string;
  matricula: string;
  dataNascimento: string;
  status: "ativo" | "inativo" | "transferido";
  ultimoAcesso: string;
  dataCadastro: string;
  instituicaoId?: number | null;
  instituicaoNome?: string | null;
}

interface Responsavel {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
}

const GestaoAlunos = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterTurma, setFilterTurma] = useState<string>("todos");
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [selectedResponsavel, setSelectedResponsavel] = useState<Responsavel | null>(null);
  const [showVincularModal, setShowVincularModal] = useState(false);
  const [showVincularInstituicaoModal, setShowVincularInstituicaoModal] = useState(false);
  const [alunosData, setAlunosData] = useState<Aluno[]>([]);
  const [responsaveisData, setResponsaveisData] = useState<Responsavel[]>([]);
  const [isLoadingAlunos, setIsLoadingAlunos] = useState(true);
  const [isLoadingResponsaveis, setIsLoadingResponsaveis] = useState(true);
  const [isVinculando, setIsVinculando] = useState(false);
  const [isVinculandoInstituicao, setIsVinculandoInstituicao] = useState(false);
  const [parentesco, setParentesco] = useState<string>("");
  const [alunoParaVincular, setAlunoParaVincular] = useState<Aluno | null>(null);
  const [matriculaAluno, setMatriculaAluno] = useState("");
  const [alunoEncontrado, setAlunoEncontrado] = useState<Aluno | null>(null);
  const [isBuscandoAluno, setIsBuscandoAluno] = useState(false);

  useEffect(() => {
    // Buscar dados de alunos e responsáveis do banco de dados
    console.log("Iniciando busca inicial de dados...");
    fetchAlunos();
    fetchResponsaveis();

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(() => {
      console.log("Atualizando dados periodicamente...");
      fetchAlunos();
      fetchResponsaveis();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Monitorar mudanças nos dados para depuração
  useEffect(() => {
    console.log("Estado atual de alunosData:", {
      total: alunosData.length,
      dados: alunosData,
      loading: isLoadingAlunos
    });
  }, [alunosData, isLoadingAlunos]);

  useEffect(() => {
    console.log("Estado atual de responsaveisData:", {
      total: responsaveisData.length,
      dados: responsaveisData,
      loading: isLoadingResponsaveis
    });
  }, [responsaveisData, isLoadingResponsaveis]);

  useEffect(() => {
    console.log("Estado atual dos selects:", {
      selectedAluno,
      selectedResponsavel,
      parentesco
    });
  }, [selectedAluno, selectedResponsavel, parentesco]);

  const fetchAlunos = async () => {
    try {
      setIsLoadingAlunos(true);
      console.log("Iniciando busca de alunos...");
      
      const response = await api.get('/auth/usuarios/instituicao', {
        params: { tipo: 'aluno' }
      });
      
      console.log("Resposta completa da API para alunos:", {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Dados brutos recebidos da API para alunos:", response.data);
        
        if (response.data.length === 0) {
          console.log("API retornou array vazio para alunos");
          toast.warning("Nenhum aluno encontrado na base de dados");
          setAlunosData([]);
          return;
        }
        
        const alunosMapeados: Aluno[] = response.data.map((aluno: any) => {
          console.log("Processando aluno:", aluno);
          return {
            id: Number(aluno.id),
            usuarioId: Number(aluno.usuarioId),
            nome: aluno.nome || 'Nome não disponível',
            email: aluno.email || 'Email não disponível',
            turma: aluno.turma || 'Turma não definida',
            matricula: aluno.matricula || 'Matrícula não disponível',
            dataNascimento: aluno.dataNascimento || new Date().toISOString(),
            status: aluno.status || 'ativo',
            ultimoAcesso: aluno.ultimoAcesso || new Date().toISOString(),
            dataCadastro: aluno.dataCadastro || new Date().toISOString(),
            instituicaoId: aluno.instituicaoId ? Number(aluno.instituicaoId) : null,
            instituicaoNome: aluno.instituicaoNome || null
          };
        });
        
        console.log("Total de alunos mapeados:", alunosMapeados.length);
        setAlunosData(alunosMapeados);
        toast.success(`${alunosMapeados.length} alunos carregados com sucesso!`);
      } else {
        console.warn("Formato de dados inválido recebido da API para alunos:", response.data);
        toast.error("Formato de dados inválido recebido da API para alunos");
        setAlunosData([]);
      }
    } catch (error: any) {
      console.error("Erro detalhado ao buscar alunos:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error("Erro ao carregar alunos. Por favor, tente novamente.");
      setAlunosData([]);
    } finally {
      setIsLoadingAlunos(false);
    }
  };

  const fetchResponsaveis = async () => {
    try {
      setIsLoadingResponsaveis(true);
      console.log("Iniciando busca de responsáveis...");
      
      const response = await api.get('/auth/usuarios', {
        params: { tipo: 'responsavel' }
      });
      
      console.log("Resposta completa da API para responsáveis:", {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Dados brutos recebidos da API para responsáveis:", response.data);
        
        if (response.data.length === 0) {
          console.log("API retornou array vazio para responsáveis");
          toast.warning("Nenhum responsável encontrado na base de dados");
          setResponsaveisData([]);
          return;
        }
        
        const responsaveisMapeados = response.data.map((responsavel: any) => {
          console.log("Processando responsável:", responsavel);
          const responsavelMapeado = {
            id: responsavel.id,
            nome: responsavel.nome || 'Nome não disponível',
            email: responsavel.email || 'Email não disponível',
            telefone: responsavel.telefone || 'Telefone não disponível',
            cpf: responsavel.cpf || 'CPF não disponível',
            status: responsavel.status || 'ativo',
            ultimoAcesso: responsavel.ultimoAcesso || new Date().toISOString(),
            alunosVinculados: responsavel.alunosVinculados || 0
          };
          console.log("Responsável mapeado:", responsavelMapeado);
          return responsavelMapeado;
        });
        
        console.log("Total de responsáveis mapeados:", responsaveisMapeados.length);
        setResponsaveisData(responsaveisMapeados);
        toast.success(`${responsaveisMapeados.length} responsáveis carregados com sucesso!`);
      } else {
        console.warn("Formato de dados inválido recebido da API para responsáveis:", response.data);
        toast.error("Formato de dados inválido recebido da API para responsáveis");
        setResponsaveisData([]);
      }
    } catch (error: any) {
      console.error("Erro detalhado ao buscar responsáveis:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error("Erro ao carregar responsáveis. Por favor, tente novamente.");
      setResponsaveisData([]);
    } finally {
      setIsLoadingResponsaveis(false);
    }
  };

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

  const filteredAlunos = alunosData.filter(aluno => {
    const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aluno.matricula.includes(searchTerm) ||
                         aluno.turma.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || aluno.status === filterStatus;
    const matchesTurma = filterTurma === "todos" || aluno.turma === filterTurma;
    return matchesSearch && matchesStatus && matchesTurma;
  });

  const handleVincular = async () => {
    if (!selectedAluno || !selectedResponsavel || !parentesco) {
      toast.error("Por favor, selecione um aluno, um responsável e informe o parentesco.");
      return;
    }

    try {
      setIsVinculando(true);
      const alunoId = Number(selectedAluno.id);
      const responsavelId = Number(selectedResponsavel.id);

      if (isNaN(alunoId) || isNaN(responsavelId)) {
        throw new Error("IDs inválidos");
      }

      console.log("Iniciando vinculação:", { alunoId, responsavelId, parentesco });
      
      const response = await api.post('/responsaveis/vincular-aluno', {
        alunoId,
        responsavelId,
        parentesco
      });
      
      console.log("Resposta da vinculação:", response.data);
      
      // Atualizar o estado local após vinculação bem-sucedida
      const updatedAlunos = alunosData.map(aluno => 
        aluno.id === selectedAluno.id 
          ? { 
              ...aluno, 
              responsavel: selectedResponsavel.nome, 
              idResponsavel: selectedResponsavel.id,
              parentesco: parentesco 
            } 
          : aluno
      );
      
      setAlunosData(updatedAlunos);
      console.log("Vinculação realizada com sucesso!");
      toast.success(`Aluno ${selectedAluno.nome} vinculado com sucesso ao responsável ${selectedResponsavel.nome}!`);
      
      // Limpar seleções
      setSelectedAluno(null);
      setSelectedResponsavel(null);
      setParentesco("");
      
      // Atualizar dados
      fetchAlunos();
    } catch (error: any) {
      console.error("Erro ao vincular aluno e responsável:", error);
      const errorMessage = error.response?.data?.message || "Não foi possível realizar a vinculação. Tente novamente mais tarde.";
      toast.error(errorMessage);
    } finally {
      setIsVinculando(false);
    }
  };

  const buscarAlunoPorMatricula = async () => {
    if (!matriculaAluno.trim()) {
      toast.error("Por favor, informe a matrícula do aluno.");
      return;
    }

    try {
      setIsBuscandoAluno(true);
      console.log("Buscando aluno pela matrícula:", matriculaAluno);
      
      const response = await api.get(`/alunos/buscar/${matriculaAluno}`);
      
      console.log("Resposta da busca:", response.data);
      
      if (response.data) {
        const aluno = response.data;
        
        // Verificar se o aluno já está vinculado a outra instituição
        if (aluno.instituicaoId && aluno.instituicaoId !== usuario?.instituicaoId) {
          toast.error(`Este aluno já está vinculado à instituição: ${aluno.instituicaoNome}`);
          setAlunoEncontrado(null);
          return;
        }
        
        setAlunoEncontrado(aluno);
        toast.success("Aluno encontrado! Verifique os dados antes de confirmar a vinculação.");
      } else {
        toast.error("Nenhum aluno encontrado com esta matrícula.");
        setAlunoEncontrado(null);
      }
    } catch (error: any) {
      console.error("Erro ao buscar aluno:", error);
      const errorMessage = error.response?.data?.message || "Erro ao buscar aluno. Tente novamente.";
      toast.error(errorMessage);
      setAlunoEncontrado(null);
    } finally {
      setIsBuscandoAluno(false);
    }
  };

  const handleVincularInstituicao = async () => {
    if (!alunoEncontrado) {
      toast.error("Por favor, busque um aluno válido primeiro.");
      return;
    }

    if (!usuario?.instituicaoId) {
      toast.error("Você precisa estar logado como instituição para fazer esta operação.");
      return;
    }

    try {
      setIsVinculandoInstituicao(true);
      console.log("Iniciando vinculação do aluno à instituição:", alunoEncontrado);
      
      const response = await api.post('/instituicoes/vincular-aluno', {
        alunoId: alunoEncontrado.id
      });
      
      console.log("Resposta da vinculação:", response.data);
      
      // Atualizar o estado local após vinculação bem-sucedida
      const updatedAlunos = alunosData.map(aluno => 
        aluno.id === alunoEncontrado.id 
          ? { 
              ...aluno, 
              status: 'ativo' as const, 
              instituicaoId: usuario.instituicaoId,
              instituicaoNome: usuario.nome
            } 
          : aluno
      );
      
      setAlunosData(updatedAlunos);
      console.log("Vinculação realizada com sucesso!");
      toast.success(`Aluno ${alunoEncontrado.nome} vinculado com sucesso à instituição!`);
      
      // Fechar o modal e limpar estados
      setShowVincularInstituicaoModal(false);
      setAlunoEncontrado(null);
      setMatriculaAluno("");
      
      // Atualizar dados
      fetchAlunos();
    } catch (error: any) {
      console.error("Erro ao vincular aluno à instituição:", error);
      const errorMessage = error.response?.data?.message || "Não foi possível realizar a vinculação. Tente novamente mais tarde.";
      toast.error(errorMessage);
    } finally {
      setIsVinculandoInstituicao(false);
    }
  };

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

        {/* Seção para Vincular Aluno e Responsável */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vincular Aluno a Responsável</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Aluno</label>
              <Select
                value={selectedAluno?.id?.toString()}
                onValueChange={(value) => {
                  console.log("Select de aluno alterado:", value);
                  const aluno = alunosData.find(a => a.id.toString() === value);
                  console.log("Aluno selecionado:", aluno);
                  setSelectedAluno(aluno || null);
                }}
                disabled={isLoadingAlunos}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingAlunos ? "Carregando alunos..." : "Selecione um aluno"} />
                </SelectTrigger>
                <SelectContent>
                  {alunosData.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Nenhum aluno disponível
                    </SelectItem>
                  ) : (
                    alunosData.map((aluno) => (
                      <SelectItem key={aluno.id} value={aluno.id.toString()}>
                        {aluno.nome} - {aluno.turma} ({aluno.matricula})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {isLoadingAlunos 
                  ? "Carregando alunos..." 
                  : alunosData.length === 0
                    ? "Nenhum aluno encontrado"
                    : `${alunosData.length} aluno${alunosData.length !== 1 ? 's' : ''} disponível${alunosData.length !== 1 ? 'is' : ''}`
                }
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Responsável</label>
              <Select
                value={selectedResponsavel?.id}
                onValueChange={(value) => {
                  console.log("Select de responsável alterado:", value);
                  const responsavel = responsaveisData.find(r => r.id === value);
                  console.log("Responsável selecionado:", responsavel);
                  setSelectedResponsavel(responsavel || null);
                }}
                disabled={isLoadingResponsaveis}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingResponsaveis ? "Carregando responsáveis..." : "Selecione um responsável"} />
                </SelectTrigger>
                <SelectContent>
                  {responsaveisData.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Nenhum responsável disponível
                    </SelectItem>
                  ) : (
                    responsaveisData.map((responsavel) => (
                      <SelectItem key={responsavel.id} value={responsavel.id}>
                        {responsavel.nome} {responsavel.email ? `(${responsavel.email})` : ''}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {isLoadingResponsaveis 
                  ? "Carregando responsáveis..." 
                  : responsaveisData.length === 0
                    ? "Nenhum responsável encontrado"
                    : `${responsaveisData.length} responsável${responsaveisData.length !== 1 ? 'is' : ''} disponível${responsaveisData.length !== 1 ? 'is' : ''}`
                }
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Parentesco</label>
              <Select
                value={parentesco}
                onValueChange={setParentesco}
                disabled={isVinculando}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o parentesco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pai">Pai</SelectItem>
                  <SelectItem value="mae">Mãe</SelectItem>
                  <SelectItem value="avó">Avó</SelectItem>
                  <SelectItem value="avô">Avô</SelectItem>
                  <SelectItem value="tio">Tio</SelectItem>
                  <SelectItem value="tia">Tia</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Button 
              onClick={handleVincular} 
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
              disabled={isLoadingAlunos || isLoadingResponsaveis || isVinculando || !selectedAluno || !selectedResponsavel || !parentesco}
            >
              {isLoadingAlunos || isLoadingResponsaveis ? "Carregando dados..." : 
               isVinculando ? "Vinculando..." : "Vincular"}
            </Button>
          </div>

          {selectedAluno && selectedResponsavel && parentesco && (
            <p className="text-sm text-gray-600 mt-4">
              Você está prestes a vincular o aluno <strong>{selectedAluno.nome}</strong> ao responsável <strong>{selectedResponsavel.nome}</strong> como <strong>{parentesco}</strong>.
            </p>
          )}
        </Card>

        {/* Botão para Vincular Aluno à Instituição */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Vincular Aluno à Instituição</h2>
            <Button 
              onClick={() => setShowVincularInstituicaoModal(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Vincular Novo Aluno
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Selecione um aluno para vinculá-lo à sua instituição. Alunos vinculados terão acesso ao sistema.
          </p>
        </Card>

        {/* Modal de Vincular Aluno à Instituição */}
        <Dialog open={showVincularInstituicaoModal} onOpenChange={setShowVincularInstituicaoModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Vincular Aluno à Instituição</DialogTitle>
              <DialogDescription>
                Digite a matrícula do aluno para vincular à sua instituição.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Matrícula do Aluno</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite a matrícula do aluno"
                    value={matriculaAluno}
                    onChange={(e) => setMatriculaAluno(e.target.value)}
                    disabled={isBuscandoAluno || isVinculandoInstituicao}
                  />
                  <Button
                    onClick={buscarAlunoPorMatricula}
                    disabled={!matriculaAluno.trim() || isBuscandoAluno || isVinculandoInstituicao}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isBuscandoAluno ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
              </div>

              {alunoEncontrado && (
                <div className="p-4 bg-gray-50 rounded-md space-y-2">
                  <h4 className="font-medium mb-2">Dados do Aluno</h4>
                  <p className="text-sm"><strong>Nome:</strong> {alunoEncontrado.nome}</p>
                  <p className="text-sm"><strong>Matrícula:</strong> {alunoEncontrado.matricula}</p>
                  <p className="text-sm"><strong>Turma:</strong> {alunoEncontrado.turma}</p>
                  <p className="text-sm"><strong>Status:</strong> {alunoEncontrado.status}</p>
                  {alunoEncontrado.instituicaoId && (
                    <p className="text-sm text-yellow-600">
                      <strong>Atenção:</strong> Este aluno já está vinculado à instituição: {alunoEncontrado.instituicaoNome}
                    </p>
                  )}
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowVincularInstituicaoModal(false);
                    setAlunoEncontrado(null);
                    setMatriculaAluno("");
                  }}
                  disabled={isVinculandoInstituicao}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleVincularInstituicao}
                  disabled={!alunoEncontrado || isVinculandoInstituicao}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isVinculandoInstituicao ? "Vinculando..." : "Confirmar Vinculação"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

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
                    placeholder="Buscar por nome, turma ou matrícula..."
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
                          <Clock className="h-4 w-4" />
                          <span>Último acesso: {aluno.ultimoAcesso}</span>
                        </div>
                        {aluno.instituicaoNome && (
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>Instituição: {aluno.instituicaoNome}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/perfil-aluno/${aluno.id}`)}
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        <User className="h-4 w-4" />
                        Perfil
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/historico-aluno/${aluno.id}`)}
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        <BookOpen className="h-4 w-4" />
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