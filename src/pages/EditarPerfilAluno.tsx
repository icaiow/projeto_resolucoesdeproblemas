import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";

const EditarPerfilAluno = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "João da Silva",
    email: "joao.silva@escola.com",
    telefone: "(11) 99999-9999",
    escola: "Escola Estadual Exemplo",
    RA: "123456789",
    serie: "8º Ano",
    turma: "A"
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
    navigate("/home-alunos");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>
            <p className="text-gray-600">
              Atualize suas informações pessoais.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/home-alunos")}
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
                <label className="text-sm font-medium">Nome Completo</label>
                <Input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome completo"
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
                <label className="text-sm font-medium">Escola</label>
                <Input
                  name="escola"
                  value={formData.escola}
                  onChange={handleChange}
                  placeholder="Escola"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">RA</label>
                <Input
                  name="RA"
                  value={formData.RA}
                  onChange={handleChange}
                  placeholder="RA"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Série</label>
                <Input
                  name="serie"
                  value={formData.serie}
                  onChange={handleChange}
                  placeholder="Série"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Turma</label>
                <Input
                  name="turma"
                  value={formData.turma}
                  onChange={handleChange}
                  placeholder="Turma"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/home-alunos")}
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

export default EditarPerfilAluno; 