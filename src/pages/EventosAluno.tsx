import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, MapPin, Users, Tag, Search } from "lucide-react";

const EventosAluno = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Dados simulados dos eventos
  const eventos = [
    {
      id: 1,
      titulo: "Semana de Prevenção ao Bullying",
      data: "20/05/2024",
      horario: "08:00 - 12:00",
      local: "Auditório Principal",
      tipo: "Campanha",
      descricao: "Semana dedicada à conscientização e prevenção do bullying na escola.",
      participantes: 120
    },
    {
      id: 2,
      titulo: "Palestra: Saúde Mental",
      data: "25/05/2024",
      horario: "14:00 - 16:00",
      local: "Sala de Conferências",
      tipo: "Evento",
      descricao: "Palestra sobre saúde mental e bem-estar emocional.",
      participantes: 80
    },
    {
      id: 3,
      titulo: "Campanha: Internet Segura",
      data: "30/05/2024",
      horario: "10:00 - 11:30",
      local: "Laboratório de Informática",
      tipo: "Campanha",
      descricao: "Orientação sobre uso seguro da internet e redes sociais.",
      participantes: 60
    }
  ];

  const eventosFiltrados = eventos.filter(evento =>
    evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold mb-2">Eventos e Campanhas</h1>
          <p className="text-gray-600">
            Acompanhe os eventos e campanhas da escola
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {eventosFiltrados.map((evento) => (
            <Card key={evento.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{evento.titulo}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      evento.tipo === "Campanha" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {evento.tipo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{evento.participantes} participantes</span>
                  </div>
                </div>

                <p className="text-gray-600">{evento.descricao}</p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Data</p>
                      <p className="font-medium">{evento.data}</p>
                      <p className="text-gray-500">{evento.horario}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Local</p>
                      <p className="font-medium">{evento.local}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Tipo</p>
                      <p className="font-medium">{evento.tipo}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  Participar do Evento
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {eventosFiltrados.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-gray-500">
              Nenhum evento encontrado com os termos de busca.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventosAluno; 