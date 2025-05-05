
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const PerfilInstitucional = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Perfil Institucional</h1>
        <p className="text-gray-600 mb-8">
          Gerencie informações da instituição e dados cadastrais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Dados da Instituição</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nome da Instituição</p>
              <p className="font-medium">Colégio Exemplo</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CNPJ</p>
              <p className="font-medium">12.345.678/0001-90</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="font-medium">Escola Particular</p>
            </div>
            <div className="pt-2">
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Editar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Endereço Institucional</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium">Rua Exemplo, 123</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cidade/UF</p>
              <p className="font-medium">São Paulo/SP</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CEP</p>
              <p className="font-medium">01234-567</p>
            </div>
            <div className="pt-2">
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Editar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Documento Institucional</h2>
          <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg mb-4">
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="Documento" 
                className="mx-auto h-24 w-24 object-cover"
              />
              <p className="text-sm text-gray-500 mt-2">Cartilha de Orientação</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10 w-full">
            Visualizar Documento
          </Button>
        </Card>

        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Canais de contato</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">contato@colegio.exemplo.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">(11) 1234-5678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <p className="font-medium">www.colegio.exemplo.com</p>
            </div>
            <div className="pt-2">
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Editar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="col-span-1 md:col-span-2">
          <Card className="p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Direção e Coordenação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Diretor(a)</p>
                <p className="font-medium">Maria Silva</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Coordenador(a) Pedagógico</p>
                <p className="font-medium">João Santos</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Coordenador(a) Administrativo</p>
                <p className="font-medium">Ana Oliveira</p>
              </div>
            </div>
            <div className="pt-4">
              <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Editar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerfilInstitucional;
