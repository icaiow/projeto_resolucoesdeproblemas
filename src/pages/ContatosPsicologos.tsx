import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const ContatosPsicologos = () => {
  const psicologos = [
    {
      nome: "Dra. Ana Silva",
      especialidade: "Psicologia Escolar",
      contato: "(11) 99999-9999",
      endereco: "Rua das Flores, 123 - Centro",
      horario: "Segunda a Sexta, 9h às 18h",
      atendimento: "Presencial e Online"
    },
    {
      nome: "Dr. Carlos Oliveira",
      especialidade: "Psicologia Clínica",
      contato: "(11) 88888-8888",
      endereco: "Av. Principal, 456 - Jardim",
      horario: "Terça a Sábado, 8h às 17h",
      atendimento: "Presencial"
    },
    {
      nome: "Dra. Mariana Santos",
      especialidade: "Psicologia Infantil",
      contato: "(11) 77777-7777",
      endereco: "Rua das Árvores, 789 - Vila",
      horario: "Segunda a Sexta, 10h às 19h",
      atendimento: "Online"
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
        <h1 className="text-2xl font-bold">Contatos de Psicólogos</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profissionais Disponíveis</h2>
        <div className="space-y-6">
          {psicologos.map((psicologo, index) => (
            <div key={index} className="border rounded p-6 hover:shadow transition">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{psicologo.nome}</h3>
                  <p className="text-sm text-gray-500 mb-4">{psicologo.especialidade}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple" />
                      <span className="text-sm">{psicologo.contato}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple" />
                      <span className="text-sm">{psicologo.endereco}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple" />
                      <span className="text-sm">{psicologo.horario}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-sm font-medium text-purple mb-2">
                    {psicologo.atendimento}
                  </span>
                  <Button className="bg-purple text-white">
                    Agendar Consulta
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Canais de Apoio</h2>
        <div className="space-y-4">
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Centro de Valorização da Vida (CVV)</h3>
            <p className="text-sm text-gray-500 mb-2">Apoio emocional e prevenção do suicídio</p>
            <p className="text-sm text-gray-600">Ligue 188 ou acesse www.cvv.org.br</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Conselho Regional de Psicologia</h3>
            <p className="text-sm text-gray-500 mb-2">Informações sobre profissionais credenciados</p>
            <p className="text-sm text-gray-600">Acesse www.crpsp.org.br</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContatosPsicologos; 