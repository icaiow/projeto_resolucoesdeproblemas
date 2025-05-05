import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Save, X } from "lucide-react";
import { toast } from "sonner";

const PerfilAluno = () => {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);

  // Dados simulados do aluno
  const [aluno, setAluno] = useState({
    nome: "João Silva",
    email: "joao.silva@escola.com",
    matricula: "2024001",
    turma: "9º Ano A",
    dataNascimento: "15/05/2009",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - Jardim Primavera",
    responsavel: "Maria Silva"
  });

  const [dadosEditados, setDadosEditados] = useState(aluno);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosEditados(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = () => {
    setAluno(dadosEditados);
    setEditando(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleCancelar = () => {
    setDadosEditados(aluno);
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home-alunos")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-gray-600">
            Visualize e edite suas informações pessoais
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* Foto do Perfil */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-500">
                    {aluno.nome.charAt(0)}
                  </span>
                </div>
                {editando && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Informações do Perfil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={editando ? dadosEditados.nome : aluno.nome}
                  onChange={handleInputChange}
                  disabled={!editando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editando ? dadosEditados.email : aluno.email}
                  onChange={handleInputChange}
                  disabled={!editando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  name="matricula"
                  value={editando ? dadosEditados.matricula : aluno.matricula}
                  onChange={handleInputChange}
                  disabled={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="turma">Turma</Label>
                <Input
                  id="turma"
                  name="turma"
                  value={editando ? dadosEditados.turma : aluno.turma}
                  onChange={handleInputChange}
                  disabled={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  name="dataNascimento"
                  value={editando ? dadosEditados.dataNascimento : aluno.dataNascimento}
                  onChange={handleInputChange}
                  disabled={!editando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={editando ? dadosEditados.telefone : aluno.telefone}
                  onChange={handleInputChange}
                  disabled={!editando}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={editando ? dadosEditados.endereco : aluno.endereco}
                  onChange={handleInputChange}
                  disabled={!editando}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  name="responsavel"
                  value={editando ? dadosEditados.responsavel : aluno.responsavel}
                  onChange={handleInputChange}
                  disabled={true}
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4">
              {editando ? (
                <>
                  <Button variant="outline" onClick={handleCancelar}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button onClick={handleSalvar}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditando(true)}>
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PerfilAluno; 