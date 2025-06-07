import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Mail, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/services/api";

interface Responsavel {
  id: number;
  nome: string;
  parentesco: string;
  telefone: string;
  email: string;
  foto: string | null;
}

// Dados mockados para simulação
const mockResponsaveis: Responsavel[] = [
  {
    id: 1,
    nome: "Maria Silva",
    parentesco: "Mãe",
    telefone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    foto: null
  },
  {
    id: 2,
    nome: "João Silva",
    parentesco: "Pai",
    telefone: "(11) 91234-5678",
    email: "joao.silva@email.com",
    foto: null
  },
  {
    id: 3,
    nome: "Ana Oliveira",
    parentesco: "Avó",
    telefone: "(11) 99876-5432",
    email: "ana.oliveira@email.com",
    foto: null
  }
];

const ResponsaveisAluno = () => {
  const navigate = useNavigate();
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        setIsLoading(true);
        // Obter o ID do aluno do localStorage
        const usuarioString = localStorage.getItem('usuario');
        const usuario = usuarioString ? JSON.parse(usuarioString) : null;
        const alunoId = usuario?.id;
        
        if (!alunoId) {
          toast.error('Erro: ID do aluno não encontrado. Por favor, faça login novamente.');
          navigate('/login-alunos');
          return;
        }
        
        // Usar a rota correta com o prefixo /api
        console.log(`Acessando rota: /api/alunos/${alunoId}/responsaveis`);
        const response = await api.get(`/api/alunos/${alunoId}/responsaveis`);
        console.log('Responsáveis carregados:', response.data);
        setResponsaveis(response.data);
      } catch (error) {
        console.error('Erro ao carregar responsáveis:', error);
        toast.error('Usando dados de exemplo para demonstração.');
        // Usar dados mockados em caso de erro
        setResponsaveis(mockResponsaveis);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponsaveis();
  }, [navigate]);

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
          <h1 className="text-2xl font-bold mb-2">Responsáveis Vinculados</h1>
          <p className="text-gray-600">
            Visualize os responsáveis vinculados ao seu perfil
          </p>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <Card className="p-6">
              <p className="text-center text-gray-500">Carregando responsáveis...</p>
            </Card>
          ) : responsaveis.length > 0 ? (
            responsaveis.map((responsavel) => (
              <Card key={responsavel.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-500">
                      {responsavel.nome.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{responsavel.nome}</h3>
                      <span className="text-sm text-gray-500">{responsavel.parentesco}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{responsavel.telefone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{responsavel.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6">
              <p className="text-center text-gray-500">Nenhum responsável vinculado encontrado.</p>
            </Card>
          )}

          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Precisa vincular um novo responsável?
                </h3>
                <p className="text-yellow-700 mt-1">
                  Entre em contato com a coordenação da escola para solicitar o vínculo de um novo responsável.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResponsaveisAluno;