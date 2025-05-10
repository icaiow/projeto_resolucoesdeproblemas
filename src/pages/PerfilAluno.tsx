import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Users, Mail, Phone, MapPin, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";

const PerfilAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/alunos/${id}`);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
        toast.error("Erro ao carregar dados do aluno");
        
        // Dados simulados para fallback
        setAluno({
          id: id,
          nome: "João Silva",
          matricula: "2024001",
          turma: "8º Ano A",
          dataNascimento: "15/05/2010",
          endereco: "Rua Exemplo, 123 - Bairro Centro",
          email: "joao.silva@escola.com",
          telefone: "(11) 98765-4321",
          responsaveis: [
            {
              id: 1,
              nome: "Maria Silva",
              parentesco: "Mãe",
              email: "maria.silva@email.com",
              telefone: "(11) 91234-5678"
            },
            {
              id: 2,
              nome: "José Silva",
              parentesco: "Pai",
              email: "jose.silva@email.com",
              telefone: "(11) 99876-5432"
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAluno();
    }
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Perfil do Aluno</h1>
            <p className="text-gray-600">
              Informações detalhadas do aluno e seus responsáveis
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/gestao-alunos")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                <p className="text-sm text-gray-500">Dados cadastrais do aluno</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nome Completo</p>
                <p className="font-medium">{aluno.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Matrícula</p>
                <p className="font-medium">{aluno.matricula}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Turma</p>
                <p className="font-medium">{aluno.turma}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Nascimento</p>
                <p className="font-medium">{aluno.dataNascimento}</p>
              </div>
            </div>
          </Card>

          {/* Contato */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Contato</h2>
                <p className="text-sm text-gray-500">Informações de contato</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{aluno.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{aluno.telefone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{aluno.endereco}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Responsáveis */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Responsáveis</h2>
                <p className="text-sm text-gray-500">Responsáveis vinculados</p>
              </div>
            </div>

            <div className="space-y-4">
              {aluno.responsaveis.map((responsavel) => (
                <Card key={responsavel.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{responsavel.nome}</h3>
                      <span className="text-sm text-gray-500">{responsavel.parentesco}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-sm">{responsavel.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-sm">{responsavel.telefone}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/historico-aluno/${aluno.id}`)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Ver Histórico
          </Button>
          <Button
            onClick={() => navigate(`/editar-perfil-aluno/${aluno.id}`)}
          >
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerfilAluno;