
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InstituicaoOrientacoes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Orientações para Instituições</h1>
        <p className="text-gray-600 mb-8">
          Diretrizes e recomendações para implementar um ambiente escolar seguro e acolhedor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-sm col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Princípios Orientadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="h-16 w-16 rounded-full bg-purple mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">1</span>
              </div>
              <h3 className="font-medium">Prevenção</h3>
              <p className="text-sm text-gray-600">
                Ações constantes para prevenir conflitos e situações de risco
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-16 rounded-full bg-green-bright mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">2</span>
              </div>
              <h3 className="font-medium">Escuta Ativa</h3>
              <p className="text-sm text-gray-600">
                Valorização do diálogo e das experiências dos estudantes
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">3</span>
              </div>
              <h3 className="font-medium">Mediação</h3>
              <p className="text-sm text-gray-600">
                Resolução pacífica de conflitos por meio de mediação qualificada
              </p>
            </div>
          </div>
        </Card>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recomendações Práticas</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-l-purple pl-4 py-2">
                <h3 className="font-medium">Capacitação da Equipe</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Promover formação contínua para professores e funcionários sobre prevenção e mediação de conflitos, identificação de sinais de violência e abuso.
                </p>
              </div>
              
              <div className="border-l-4 border-l-purple pl-4 py-2">
                <h3 className="font-medium">Canais de Comunicação</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Estabelecer canais acessíveis para que alunos possam reportar situações de risco ou compartilhar suas experiências, garantindo sigilo quando necessário.
                </p>
              </div>
              
              <div className="border-l-4 border-l-purple pl-4 py-2">
                <h3 className="font-medium">Atividades de Sensibilização</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Realizar regularmente atividades que promovam valores como respeito, empatia e diversidade junto aos alunos e comunidade escolar.
                </p>
              </div>
              
              <div className="border-l-4 border-l-purple pl-4 py-2">
                <h3 className="font-medium">Articulação com a Comunidade</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Estabelecer parcerias com famílias, serviços de saúde, assistência social e outros atores relevantes para criar uma rede de proteção.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Monitoramento e Indicadores</h2>
            <p className="text-gray-600 mb-4">
              Para garantir a efetividade das ações, é fundamental acompanhar indicadores relevantes. Recomendamos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-center mb-2">Indicadores Quantitativos</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Número de casos reportados</li>
                  <li>Tempo médio de resposta</li>
                  <li>Taxa de resolução de casos</li>
                  <li>Participação em atividades preventivas</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium text-center mb-2">Indicadores Qualitativos</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Percepção de segurança pelos alunos</li>
                  <li>Qualidade das relações interpessoais</li>
                  <li>Satisfação com os canais de escuta</li>
                  <li>Engajamento da comunidade escolar</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Materiais de Apoio</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h3 className="font-medium">Guia Prático</h3>
                  <p className="text-xs text-gray-500">PDF, 2.4MB</p>
                </div>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Baixar
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h3 className="font-medium">Modelo de Protocolo</h3>
                  <p className="text-xs text-gray-500">DOC, 1.8MB</p>
                </div>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Baixar
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h3 className="font-medium">Cartilha Educativa</h3>
                  <p className="text-xs text-gray-500">PDF, 3.6MB</p>
                </div>
                <Button size="sm" variant="outline" className="text-purple border-purple hover:bg-purple/10">
                  Baixar
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm bg-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-dark">Precisa de ajuda?</h2>
            <p className="text-sm text-gray-700 mb-4">
              Nossa equipe está disponível para orientar instituições na implementação das diretrizes e no uso da plataforma.
            </p>
            <Button className="w-full bg-purple hover:bg-purple-dark">
              Solicitar Orientação
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstituicaoOrientacoes;
