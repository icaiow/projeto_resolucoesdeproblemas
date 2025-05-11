import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import { toast } from "sonner";

const EditarPerfilAluno = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    matricula: "",
    serie: "",
    turma: "",
    escola: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-alunos");
      return;
    }

    api.get("/alunos/perfil")
      .then(response => {
        setFormData({
          nome: response.data.nome || "",
          email: response.data.email || "",
          matricula: response.data.matricula || "",
          serie: response.data.serie || "",
          turma: response.data.turma || "",
          escola: response.data.escola || ""
        });
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil. Por favor, tente novamente.");
      });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.put("/alunos/perfil", {
        nome: formData.nome,
        email: formData.email,
        turma: formData.turma,
        serie: formData.serie
      });
      
      toast.success("Perfil atualizado com sucesso!");
      navigate("/home-alunos");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/home-alunos")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>
      </div>
      <p className="text-gray-600 mb-8">
        Atualize suas informações pessoais.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome completo"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="matricula">Matrícula (RA)</Label>
                  <Input
                    id="matricula"
                    name="matricula"
                    value={formData.matricula}
                    placeholder="Matrícula"
                    className="mt-1"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">A matrícula não pode ser alterada</p>
                </div>

                <div>
                  <Label htmlFor="escola">Escola</Label>
                  <Input
                    id="escola"
                    name="escola"
                    value={formData.escola}
                    placeholder="Escola"
                    className="mt-1"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">A escola é vinculada pela instituição</p>
                </div>

                <div>
                  <Label htmlFor="serie">Série</Label>
                  <Input
                    id="serie"
                    name="serie"
                    value={formData.serie}
                    onChange={handleChange}
                    placeholder="Série"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="turma">Turma</Label>
                  <Input
                    id="turma"
                    name="turma"
                    value={formData.turma}
                    onChange={handleChange}
                    placeholder="Turma"
                    className="mt-1"
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

export default EditarPerfilAluno; 