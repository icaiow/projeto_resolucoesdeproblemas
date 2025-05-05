import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Calendar, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const AtividadeDetalhes = () => {
  const { id, tipo } = useParams();

  // Simulando dados da atividade
  const atividade = {
    id: id,
    tipo: tipo,
    titulo: tipo === 'escuta' ? "Escuta Digital #2478" :
           tipo === 'evento' ? "Workshop: Cidadania Digital" :
           "Cartilha sobre prevenção ao cyberbullying",
    data: "12/04/2023",
    descricao: tipo === 'escuta' ? "Sua escuta sobre a aula de matemática foi respondida." :
               tipo === 'evento' ? "Workshop sobre uso seguro e responsável da internet." :
               "Cartilha sobre prevenção ao cyberbullying.",
    conteudo: tipo === 'escuta' ? {
      pergunta: "Como posso melhorar meu desempenho em matemática?",
      resposta: "Para melhorar seu desempenho em matemática, recomendamos:\n\n" +
                "1. Participar ativamente das aulas e tirar dúvidas com o professor\n" +
                "2. Fazer os exercícios propostos regularmente\n" +
                "3. Revisar o conteúdo em casa\n" +
                "4. Participar das monitorias oferecidas pela escola\n" +
                "5. Utilizar recursos online como vídeos e exercícios complementares"
    } : tipo === 'evento' ? {
      horario: "14h às 16h",
      local: "Auditório Principal",
      vagas: "50",
      detalhes: "Workshop sobre uso seguro e responsável da internet, abordando temas como:\n\n" +
                "• Privacidade e segurança online\n" +
                "• Identificação de fake news\n" +
                "• Comportamento ético nas redes sociais\n" +
                "• Prevenção ao cyberbullying"
    } : {
      arquivo: "cartilha-cyberbullying.pdf",
      tamanho: "2.5 MB",
      detalhes: "Esta cartilha foi desenvolvida para ajudar estudantes a entender e prevenir o cyberbullying. " +
                "Ela contém informações importantes sobre:\n\n" +
                "• O que é cyberbullying\n" +
                "• Como identificar situações de cyberbullying\n" +
                "• O que fazer quando for vítima ou testemunha\n" +
                "• Como buscar ajuda\n" +
                "• Dicas de segurança online"
    }
  };

  const getIcone = () => {
    switch (tipo) {
      case 'escuta':
        return <MessageCircle className="h-6 w-6 text-white" />;
      case 'evento':
        return <Calendar className="h-6 w-6 text-white" />;
      case 'material':
        return <BookOpen className="h-6 w-6 text-white" />;
      default:
        return null;
    }
  };

  const getCor = () => {
    switch (tipo) {
      case 'escuta':
        return "bg-green-bright";
      case 'evento':
        return "bg-amber-500";
      case 'material':
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/atividades-recentes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {tipo === 'escuta' ? 'Detalhes da Escuta' :
           tipo === 'evento' ? 'Detalhes do Evento' :
           'Detalhes do Material'}
        </h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`${getCor()} p-2 rounded-full`}>
            {getIcone()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{atividade.titulo}</h2>
            <p className="text-sm text-gray-500">
              {tipo === 'evento' ? 'Data: ' : 'Publicado em: '}
              {atividade.data}
            </p>
          </div>
        </div>
      </Card>

      {tipo === 'escuta' && (
        <>
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Sua Pergunta</h3>
            <p className="text-gray-600">{atividade.conteudo.pergunta}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Resposta</h3>
            <div className="prose max-w-none">
              {atividade.conteudo.resposta.split('\n').map((paragrafo, index) => (
                <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
              ))}
            </div>
          </Card>
        </>
      )}

      {tipo === 'evento' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm text-gray-500">Horário</p>
                  <p className="font-medium">{atividade.conteudo.horario}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm text-gray-500">Local</p>
                  <p className="font-medium">{atividade.conteudo.local}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Sobre o Evento</h3>
            <div className="prose max-w-none">
              {atividade.conteudo.detalhes.split('\n').map((paragrafo, index) => (
                <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
              ))}
            </div>
            <div className="mt-6">
              <Button className="bg-amber-500 text-white hover:bg-amber-600">
                Inscrever-se
              </Button>
            </div>
          </Card>
        </>
      )}

      {tipo === 'material' && (
        <>
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Sobre o Material</h3>
            <div className="prose max-w-none">
              {atividade.conteudo.detalhes.split('\n').map((paragrafo, index) => (
                <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{atividade.conteudo.arquivo}</p>
                  <p className="text-sm text-gray-500">Tamanho: {atividade.conteudo.tamanho}</p>
                </div>
              </div>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Baixar Material
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default AtividadeDetalhes; 