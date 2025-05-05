
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, UserPlus, FileText } from "lucide-react";

const GestaoInstitucional = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Gestão Institucional</h1>
        <p className="text-gray-600 mb-8">
          Gerencie turmas, professores e funcionários.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-purple">248</p>
            <p className="text-sm text-gray-500">Alunos</p>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-purple">32</p>
            <p className="text-sm text-gray-500">Professores</p>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-purple">12</p>
            <p className="text-sm text-gray-500">Turmas</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-sm">
        <Tabs defaultValue="students">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="teachers">Professores</TabsTrigger>
            <TabsTrigger value="classes">Turmas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Lista de Alunos</h2>
                <p className="text-sm text-gray-500">Gerencie o cadastro de alunos</p>
              </div>
              <Button className="bg-purple hover:bg-purple-dark">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Aluno
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">Ana Silva</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2023001</td>
                    <td className="px-4 py-3 text-sm">9º Ano A</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Ativo</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                        Ver perfil
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Bruno Santos</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2023002</td>
                    <td className="px-4 py-3 text-sm">7º Ano B</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Ativo</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                        Ver perfil
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Carla Oliveira</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2023003</td>
                    <td className="px-4 py-3 text-sm">6º Ano A</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Ativo</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                        Ver perfil
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="text-purple border-purple hover:bg-purple/10">
                Ver todos os alunos
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="teachers">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Lista de Professores</h2>
                <p className="text-sm text-gray-500">Gerencie o quadro docente</p>
              </div>
              <Button className="bg-purple hover:bg-purple-dark">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Professor
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplina</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turmas</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">Paulo Roberto</td>
                    <td className="px-4 py-3 text-sm">Matemática</td>
                    <td className="px-4 py-3 text-sm">6º, 7º e 8º Anos</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                        Ver perfil
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Mariana Costa</td>
                    <td className="px-4 py-3 text-sm">Português</td>
                    <td className="px-4 py-3 text-sm">9º Ano, Ensino Médio</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                        Ver perfil
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="classes">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Turmas</h2>
                <p className="text-sm text-gray-500">Gerencie turmas e séries</p>
              </div>
              <Button className="bg-purple hover:bg-purple-dark">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Turma
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 shadow-sm">
                <h3 className="font-medium mb-2">6º Ano A</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Alunos:</span>
                  <span className="font-medium">28/30</span>
                </div>
                <Progress value={93} className="h-2 mb-3" />
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                    Detalhes
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 shadow-sm">
                <h3 className="font-medium mb-2">7º Ano B</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Alunos:</span>
                  <span className="font-medium">24/30</span>
                </div>
                <Progress value={80} className="h-2 mb-3" />
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                    Detalhes
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 shadow-sm">
                <h3 className="font-medium mb-2">9º Ano A</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Alunos:</span>
                  <span className="font-medium">26/30</span>
                </div>
                <Progress value={87} className="h-2 mb-3" />
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                    Detalhes
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Relatórios Institucionais</h2>
                <p className="text-sm text-gray-500">Acesse relatórios e documentos</p>
              </div>
              <Button className="bg-purple hover:bg-purple-dark">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Relatório de Desempenho Escolar</h3>
                  <p className="text-sm text-gray-500">Período: 1º Bimestre 2023</p>
                </div>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Baixar PDF
                </Button>
              </div>
              
              <div className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Relatório de Frequência</h3>
                  <p className="text-sm text-gray-500">Período: Março/2023</p>
                </div>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Baixar PDF
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default GestaoInstitucional;
