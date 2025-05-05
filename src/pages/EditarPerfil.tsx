import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "Escola Estadual Exemplo",
    cnpj: "12.345.678/0001-90",
    email: "contato@escolaexemplo.com",
    telefone: "(11) 1234-5678",
    endereco: "Rua Exemplo, 123",
    cidade: "São Paulo",
    estado: "SP"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as alterações
    alert("Perfil atualizado com sucesso!");
    navigate("/home-institucional");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>
            <p className="text-gray-600">
              Atualize as informações do perfil da instituição.
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

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Instituição</label>
                <Input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome da instituição"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">CNPJ</label>
                <Input
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  placeholder="CNPJ"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                <Input
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Endereço"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cidade</label>
                  <Input
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    placeholder="Cidade"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Input
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="Estado"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/home-institucional")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditarPerfil; 