import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EventoDetalhes = () => {
  const { id } = useParams();

  // Simulando dados do evento
  const evento = {
    id: id,
    titulo: "Workshop: Cidadania Digital",
    data: "20/04/2023",
    horario: "14h às 16h",
    local: "Auditório Principal",
    vagas: "50",
    descricao: "Workshop sobre uso seguro e responsável da internet, abordando temas como:\n\n" +
               "• Privacidade e segurança online\n" +
               "• Identificação de fake news\n" +
               "• Comportamento ético nas redes sociais\n" +
               "• Prevenção ao cyberbullying\n\n" +
               "O workshop será ministrado por especialistas em segurança digital e psicólogos escolares."
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/atividades-recentes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Detalhes do Evento</h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-amber-500 p-2 rounded-full">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{evento.titulo}</h2>
            <p className="text-sm text-gray-500">Data: {evento.data}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Horário</p>
              <p className="font-medium">{evento.horario}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Local</p>
              <p className="font-medium">{evento.local}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Vagas Disponíveis</p>
              <p className="font-medium">{evento.vagas}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Sobre o Evento</h3>
        <div className="prose max-w-none">
          {evento.descricao.split('\n').map((paragrafo, index) => (
            <p key={index} className="text-gray-600 mb-2">{paragrafo}</p>
          ))}
        </div>
        <div className="mt-6">
          <Button className="bg-amber-500 text-white hover:bg-amber-600">
            Inscrever-se
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EventoDetalhes; 