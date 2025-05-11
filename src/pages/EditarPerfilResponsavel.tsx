import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../services/api";

const EditarPerfilResponsavel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-responsaveis");
      return;
    }

    api.get("/responsaveis/perfil")
      .then(response => {
        setFormData({
          ...formData,
          nome: response.data.nome || "",
          email: response.data.email || "",
          telefone: response.data.telefone || "",
          cpf: response.data.cpf || ""
        });
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar dados do perfil. Por favor, tente novamente.");
      });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar senhas se estiver alterando
    if (formData.novaSenha || formData.confirmarSenha) {
      if (!formData.senhaAtual) {
        toast.error("Por favor, informe sua senha atual");
        setIsLoading(false);
        return;
      }
      if (formData.novaSenha !== formData.confirmarSenha) {
        toast.error("As senhas não coincidem");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Enviar apenas os dados necessários para atualização
      await api.put("/responsaveis/perfil", {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone
      });
      
      toast.success("Perfil atualizado com sucesso!");
      navigate("/home-responsaveis");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/home-responsaveis" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para página inicial
        </Link>

        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
            <p className="text-gray-600 mt-2">Atualize suas informações pessoais</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                value={formData.cpf}
                onChange={handleChange}
                disabled
              />
              <p className="text-xs text-gray-500">O CPF não pode ser alterado</p>
            </div>

            <div className="border-t pt-4 mt-4">
              <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>
              <p className="text-sm text-gray-500 mb-4">Deixe em branco se não deseja alterar a senha</p>
              
              <div className="space-y-2">
                <Label htmlFor="senhaAtual">Senha Atual</Label>
                <Input
                  id="senhaAtual"
                  name="senhaAtual"
                  type="password"
                  value={formData.senhaAtual}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="novaSenha">Nova Senha</Label>
                <Input
                  id="novaSenha"
                  name="novaSenha"
                  type="password"
                  value={formData.novaSenha}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/home-responsaveis")}
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditarPerfilResponsavel; 