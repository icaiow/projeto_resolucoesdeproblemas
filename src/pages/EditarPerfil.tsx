import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [perfil, setPerfil] = useState({ nome: "", cnpj: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-institucional");
      return;
    }

    api.get("/instituicoes/perfil")
      .then(response => {
        setPerfil(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar os dados do perfil. Tente novamente mais tarde."
        });
      });
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.put("/instituicoes/perfil", perfil);
      toast({
        title: "Perfil atualizado com sucesso",
        description: "Os dados da instituição foram atualizados."
      });
      navigate("/home-institucional");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar os dados do perfil. Tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/home-institucional")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>
      </div>
      <p className="text-gray-600 mb-8">
        Atualize as informações do perfil da instituição.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
              <div className="grid gap-4 mb-6">
                <div>
                  <Label htmlFor="nome">Nome da Instituição</Label>
                  <Input 
                    id="nome" 
                    value={perfil.nome}
                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                    placeholder="Nome da instituição"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    value={perfil.cnpj}
                    onChange={(e) => setPerfil({ ...perfil, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil; 