import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Monitoramento = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home-institucional")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold mb-4">Monitoramento</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-bold text-purple">24</p>
            <p className="text-sm text-gray-500">Denúncias Recebidas</p>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-bold text-green-bright">18</p>
            <p className="text-sm text-gray-500">Casos Resolvidos</p>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-bold text-amber-500">6</p>
            <p className="text-sm text-gray-500">Casos em Análise</p>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-bold text-blue-500">42</p>
            <p className="text-sm text-gray-500">Escutas Realizadas</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-sm">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="reports">Denúncias</TabsTrigger>
            <TabsTrigger value="indicators">Indicadores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Distribuição de Casos por Categoria</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bullying</span>
                      <span>42% (10 casos)</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Discriminação</span>
                      <span>25% (6 casos)</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Assédio</span>
                      <span>17% (4 casos)</span>
                    </div>
                    <Progress value={17} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Violência</span>
                      <span>8% (2 casos)</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Outros</span>
                      <span>8% (2 casos)</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Status dos Casos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 shadow-sm border-l-4 border-l-green-bright">
                    <h4 className="font-medium mb-1">Resolvidos</h4>
                    <p className="text-2xl font-bold">75%</p>
                    <p className="text-sm text-gray-500">18 casos</p>
                  </Card>
                  <Card className="p-4 shadow-sm border-l-4 border-l-amber-500">
                    <h4 className="font-medium mb-1">Em análise</h4>
                    <p className="text-2xl font-bold">25%</p>
                    <p className="text-sm text-gray-500">6 casos</p>
                  </Card>
                  <Card className="p-4 shadow-sm border-l-4 border-l-red-500">
                    <h4 className="font-medium mb-1">Críticos</h4>
                    <p className="text-2xl font-bold">8%</p>
                    <p className="text-sm text-gray-500">2 casos</p>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="space-y-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Últimas Denúncias</h3>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Ver todas
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Bullying na sala de aula</h4>
                      <p className="text-sm text-gray-500">Série: 8º Ano B</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Reportado em 12/04/2023
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Em análise</span>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button size="sm" variant="ghost" className="text-purple hover:text-purple-dark">
                      Ver detalhes <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Discriminação por gênero</h4>
                      <p className="text-sm text-gray-500">Série: Ensino Médio</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Reportado em 05/04/2023
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Resolvido</span>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-purple hover:text-purple-dark"
                      onClick={() => navigate("/atividades/denuncia/1")}
                    >
                      Ver detalhes <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="indicators">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Indicadores de Desempenho</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Tempo Médio de Resolução</h4>
                    <p className="text-3xl font-bold text-purple">4.2<span className="text-base font-normal text-gray-500 ml-1">dias</span></p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="text-green-600">↓ 15%</span> em relação ao mês anterior
                    </p>
                  </Card>
                  
                  <Card className="p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Taxa de Satisfação</h4>
                    <p className="text-3xl font-bold text-purple">92%</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="text-green-600">↑ 3%</span> em relação ao mês anterior
                    </p>
                  </Card>
                  
                  <Card className="p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Ações Preventivas</h4>
                    <p className="text-3xl font-bold text-purple">8</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Campanhas e workshops realizados este mês
                    </p>
                  </Card>
                  
                  <Card className="p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Escutas Digitais</h4>
                    <p className="text-3xl font-bold text-purple">42</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="text-green-600">↑ 24%</span> em relação ao mês anterior
                    </p>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Recomendações</h3>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Baseado nos dados atuais:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Realizar uma campanha específica sobre bullying no 8º ano</li>
                    <li>Capacitar professores em mediação de conflitos</li>
                    <li>Aumentar o número de atividades de integração entre alunos</li>
                    <li>Criar um canal direto de comunicação para o 7º ano, que apresenta maior incidência de casos</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="flex justify-center mt-6">
        <Button className="bg-purple hover:bg-purple-dark">
          Gerar Relatório Completo
        </Button>
      </div>
    </div>
  );
};

export default Monitoramento;
