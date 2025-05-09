import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface Solicitacao {
  id: number;
  responsavel: string;
  aluno: string;
  matricula: string;
  parentesco: string;
  dataSolicitacao: string;
  status: string;
}

const GerenciarVinculacoes = () => {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Buscar solicitações do backend quando o componente montar
    fetchSolicitacoes();
  }, []);

  const fetchSolicitacoes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/api/vinculacoes');
      setSolicitacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      toast.error("Erro ao carregar solicitações de vinculação");
    } finally {
      setIsLoading(false);
    }
  };

  const aprovarSolicitacao = async (id: number) => {
    try {
      await axios.put(`http://localhost:3001/api/vinculacoes/${id}`, {
        status: 'aprovada'
      });
      
      // Atualizar o estado local
      setSolicitacoes(solicitacoes.map(sol => 
        sol.id === id ? {...sol, status: "aprovada"} : sol
      ));
      
      toast.success("Vinculação aprovada com sucesso!");
    } catch (error) {
      console.error("Erro ao aprovar solicitação:", error);
      toast.error("Erro ao aprovar solicitação");
    }
  };

  const recusarSolicitacao = async (id: number) => {
    try {
      await axios.put(`http://localhost:3001/api/vinculacoes/${id}`, {
        status: 'recusada'
      });
      
      // Atualizar o estado local
      setSolicitacoes(solicitacoes.map(sol => 
        sol.id === id ? {...sol, status: "recusada"} : sol
      ));
      
      toast.success("Vinculação recusada!");
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
      toast.error("Erro ao recusar solicitação");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gerenciar Vinculações</h1>
            <p className="text-gray-600">
              Aprove ou recuse solicitações de vinculação entre responsáveis e alunos
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

        <div className="space-y-4">
          {solicitacoes.map((solicitacao) => (
            <Card key={solicitacao.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{solicitacao.responsavel}</h3>
                  <p className="text-gray-600">Solicita vinculação como <span className="font-medium">{solicitacao.parentesco}</span> de:</p>
                  <div className="mt-2">
                    <p className="font-medium">{solicitacao.aluno}</p>
                    <p className="text-sm text-gray-500">Matrícula: {solicitacao.matricula}</p>
                    <p className="text-sm text-gray-500">Solicitado em: {solicitacao.dataSolicitacao}</p>
                  </div>
                </div>
                
                {solicitacao.status === "pendente" ? (
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => recusarSolicitacao(solicitacao.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Recusar
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => aprovarSolicitacao(solicitacao.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                  </div>
                ) : (
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    solicitacao.status === "aprovada" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {solicitacao.status === "aprovada" ? "Aprovada" : "Recusada"}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GerenciarVinculacoes;