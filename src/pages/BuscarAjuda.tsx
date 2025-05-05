import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const BuscarAjuda = () => {
  const videos = [
    {
      titulo: "Como identificar sinais de bullying",
      descricao: "Aprenda a reconhecer os sinais de que alguém está sofrendo bullying.",
      duracao: "5:23",
      link: "#"
    },
    {
      titulo: "O que fazer quando presenciar bullying",
      descricao: "Orientações sobre como agir quando testemunhar situações de bullying.",
      duracao: "4:15",
      link: "#"
    },
    {
      titulo: "Autocuidado e saúde mental",
      descricao: "Dicas para cuidar da sua saúde mental e bem-estar.",
      duracao: "6:45",
      link: "#"
    }
  ];

  const dicas = [
    {
      titulo: "Passo a passo para denunciar",
      descricao: "Guia completo sobre como fazer uma denúncia de forma segura e eficaz."
    },
    {
      titulo: "Como conversar com um adulto de confiança",
      descricao: "Orientações para abordar o assunto com professores, pais ou responsáveis."
    },
    {
      titulo: "Cuidando da sua saúde mental",
      descricao: "Estratégias para manter sua saúde mental em dia."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/home-alunos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Como Buscar Ajuda</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Vídeos Educativos</h2>
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div key={index} className="border rounded p-4 hover:shadow transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{video.titulo}</h3>
                  <p className="text-sm text-gray-500">{video.descricao}</p>
                  <span className="text-xs text-gray-400">Duração: {video.duracao}</span>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Assistir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Dicas e Orientações</h2>
        <div className="space-y-4">
          {dicas.map((dica, index) => (
            <div key={index} className="border rounded p-4 hover:shadow transition">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-purple" />
                </div>
                <div>
                  <h3 className="font-medium">{dica.titulo}</h3>
                  <p className="text-sm text-gray-500">{dica.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Canais de Ajuda</h2>
        <div className="space-y-4">
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Disque 100</h3>
            <p className="text-sm text-gray-500 mb-2">Canal de denúncia de violações de direitos humanos</p>
            <p className="text-sm text-gray-600">Funciona 24 horas, todos os dias da semana</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Escola</h3>
            <p className="text-sm text-gray-500 mb-2">Equipe pedagógica e psicólogos escolares</p>
            <p className="text-sm text-gray-600">Disponível durante o horário escolar</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Centro de Valorização da Vida (CVV)</h3>
            <p className="text-sm text-gray-500 mb-2">Apoio emocional e prevenção do suicídio</p>
            <p className="text-sm text-gray-600">Ligue 188 ou acesse www.cvv.org.br</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BuscarAjuda; 