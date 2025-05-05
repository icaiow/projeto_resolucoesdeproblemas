import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Comunicacao = () => {
  const navigate = useNavigate();
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [aluno, setAluno] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dados simulados dos alunos
  const alunos = [
    { id: 1, nome: "João Silva", turma: "8º Ano A" },
    { id: 2, nome: "Ana Silva", turma: "6º Ano B" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Mensagem enviada com sucesso!");
      navigate("/home-responsaveis");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação com a Escola</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nova Mensagem</h2>
              <p className="text-sm text-gray-500">
                Envie uma mensagem para a escola
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aluno">Aluno</Label>
              <Select value={aluno} onValueChange={setAluno} required>
                <SelectTrigger id="aluno">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {alunos.map((aluno) => (
                    <SelectItem key={aluno.id} value={aluno.id.toString()}>
                      {aluno.nome} - {aluno.turma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Input
                id="assunto"
                placeholder="Digite o assunto da mensagem"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea
                id="mensagem"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                className="min-h-[200px]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/home-responsaveis")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Comunicacao; 