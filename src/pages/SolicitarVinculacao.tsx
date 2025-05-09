import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const SolicitarVinculacao = () => {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [nomeAluno, setNomeAluno] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obter o ID do responsável do localStorage (assumindo que está armazenado após o login)
      const responsavelId = localStorage.getItem('userId');
      
      // Enviar solicitação para o backend
      const response = await axios.post('http://localhost:3001/api/vinculacoes', {
        responsavelId,
        matriculaAluno: matricula,
        nomeAluno,
        parentesco,
        dataSolicitacao: new Date().toISOString(),
        status: 'pendente'
      });

      toast.success("Solicitação de vinculação enviada com sucesso!");
      navigate("/home-responsaveis");
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Solicitar Vinculação com Aluno</h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para solicitar vinculação com um aluno
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="matricula">Matrícula do Aluno</Label>
                <Input
                  id="matricula"
                  placeholder="Digite a matrícula do aluno"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="nomeAluno">Nome do Aluno</Label>
                <Input
                  id="nomeAluno"
                  placeholder="Digite o nome completo do aluno"
                  value={nomeAluno}
                  onChange={(e) => setNomeAluno(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="parentesco">Parentesco</Label>
                <Select value={parentesco} onValueChange={setParentesco} required>
                  <SelectTrigger id="parentesco">
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mae">Mãe</SelectItem>
                    <SelectItem value="pai">Pai</SelectItem>
                    <SelectItem value="avo">Avô/Avó</SelectItem>
                    <SelectItem value="tio">Tio/Tia</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                Após enviar a solicitação, a instituição de ensino irá verificar as informações e aprovar a vinculação.
                Você receberá uma notificação quando a solicitação for processada.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando solicitação..." : "Solicitar Vinculação"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SolicitarVinculacao;