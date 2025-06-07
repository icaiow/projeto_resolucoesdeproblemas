// 📁 src/pages/Denuncia.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { criarDenuncia } from "@/services/denunciaService";

const Denuncia = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tipoDenuncia, setTipoDenuncia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeAgressor, setNomeAgressor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [denuncia, setDenuncia] = useState<any>(null);

  useEffect(() => {
    const carregarDenuncia = async () => {
      if (!id) return;
      setIsViewMode(true);

      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch(`/api/denuncias/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resposta.ok) throw new Error("Erro ao buscar denúncia");
        const dados = await resposta.json();
        setDenuncia(dados);
      } catch (error) {
        console.error("Erro ao carregar denúncia:", error);
        toast.error("Erro ao carregar detalhes da denúncia");
      }
    };

    carregarDenuncia();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await criarDenuncia({
        titulo: `Denúncia - ${tipoDenuncia}`,
        descricao,
        tipo: tipoDenuncia,
        anonima: false,
        nomeAgressor: nomeAgressor || null
      });

      toast.success("Denúncia enviada com sucesso!");
      navigate("/historico-denuncias");
    } catch (error) {
      console.error("Erro ao enviar denúncia:", error);
      toast.error("Erro ao enviar denúncia");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-amber-100 text-amber-800";
      case "em_analise":
        return "bg-blue-100 text-blue-800";
      case "resolvida":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(isViewMode ? "/gerenciar-denuncias" : "/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isViewMode ? "Detalhes da Denúncia" : "Fazer Denúncia"}
          </h1>
        </div>

        <Card className="p-6">
          {isViewMode ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Detalhes da Denúncia</h2>
                  <p className="text-sm text-gray-500">
                    Informações completas sobre a denúncia
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Tipo de Denúncia</Label>
                  <p className="mt-1 capitalize">{denuncia?.tipo}</p>
                </div>

                {denuncia?.nomeAgressor && (
                  <div>
                    <Label>Nome do Agressor</Label>
                    <p className="mt-1">{denuncia?.nomeAgressor}</p>
                  </div>
                )}

                <div>
                  <Label>Usuário</Label>
                  <p className="mt-1">{denuncia?.usuario?.nome}</p>
                </div>

                <div>
                  <Label>Data</Label>
                  <p className="mt-1">{new Date(denuncia?.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(denuncia?.status)}`}>
                      {denuncia?.status}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Descrição</Label>
                  <p className="mt-1">{denuncia?.descricao}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Nova Denúncia</h2>
                  <p className="text-sm text-gray-500">
                    Preencha os dados abaixo para registrar uma denúncia
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agressor">Nome do Agressor</Label>
                  <Input
                    id="agressor"
                    placeholder="Digite o nome do agressor (se souber)"
                    value={nomeAgressor}
                    onChange={(e) => setNomeAgressor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Denúncia</Label>
                  <Select value={tipoDenuncia} onValueChange={setTipoDenuncia} required>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullying">Bullying</SelectItem>
                      <SelectItem value="violencia">Violência</SelectItem>
                      <SelectItem value="discriminacao">Discriminação</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva detalhadamente a situação..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
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
                    {isLoading ? "Enviando..." : "Enviar Denúncia"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Denuncia;
