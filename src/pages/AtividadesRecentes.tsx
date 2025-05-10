import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";

const AtividadesRecentes = () => {
  const [atividades, setAtividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/atividades/recentes');
        setAtividades(response.data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
        toast.error("Erro ao carregar atividades recentes");
        
        // Dados simulados para fallback
        setAtividades([
          {
            id: "2478",
            tipo: "escuta",
            titulo: "Escuta Digital #2478",
            status: "Respondido",
            descricao: "Sua escuta sobre a aula de matemática foi respondida.",
            data: "12/04/2023",
            link: "/atividades/escuta/2478",
            icone: <MessageCircle className="h-5 w-5" />,
            cor: "bg-green-bright"
          },
          {
            id: "workshop",
            tipo: "evento",
            titulo: "Workshop: Cidadania Digital",
            status: "Próximo Evento",
            descricao: "Workshop sobre uso seguro e responsável da internet.",
            data: "20/04/2023",
            link: "/atividades/evento/workshop",
            icone: <Calendar className="h-5 w-5" />,
            cor: "bg-amber-500"
          },
          {
            id: "cartilha",
            tipo: "material",
            titulo: "Nova cartilha disponível",
            status: "Material",
            descricao: "Cartilha sobre prevenção ao cyberbullying.",
            data: "08/04/2023",
            link: "/atividades/material/cartilha",
            icone: <BookOpen className="h-5 w-5" />,
            cor: "bg-blue-500"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/home-alunos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Atividades Recentes</h1>
      </div>

      <div className="space-y-6">
        {atividades.map((atividade, index) => (
          <Card key={index} className="p-6">
            <div className="flex gap-4">
              <div className={`w-1 ${atividade.cor} rounded-full`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{atividade.titulo}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    atividade.tipo === 'escuta' ? 'bg-green-100 text-green-800' :
                    atividade.tipo === 'evento' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {atividade.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{atividade.descricao}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {atividade.tipo === 'evento' ? 'Data: ' : 'Publicado em: '}
                    {atividade.data}
                  </span>
                  <Link to={`/atividades/${atividade.tipo}/${atividade.id}`}>
                    <Button variant="ghost" size="sm" className="text-purple hover:text-purple-dark">
                      {atividade.tipo === 'escuta' ? 'Ver resposta' :
                       atividade.tipo === 'evento' ? 'Detalhes' : 'Acessar'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AtividadesRecentes;