// 📁 src/pages/HistoricoDenuncias.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { listarMinhasDenuncias } from "@/services/denunciaService";

const HistoricoDenuncias = () => {
  const navigate = useNavigate();
  const [denuncias, setDenuncias] = useState<any[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await listarMinhasDenuncias();
        setDenuncias(dados);
      } catch (error) {
        console.error("Erro ao carregar denúncias:", error);
        toast.error("Erro ao carregar denúncias");
      }
    };

    carregar();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-amber-100 text-amber-800";
      case "em_analise":
        return "bg-blue-100 text-blue-800";
      case "resolvida":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}> 
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Histórico de Denúncias</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <History className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Suas Denúncias</h2>
              <p className="text-sm text-gray-500">
                Acompanhe o andamento das denúncias realizadas
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {denuncias.map((denuncia) => (
              <Card
                key={denuncia.id}
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/denuncias/${denuncia.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <h3 className="font-semibold capitalize">{denuncia.tipo}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Usuário: {denuncia.usuario?.nome}</p>
                    <p className="text-sm text-gray-600">
                      Data: {new Date(denuncia.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {denuncia.descricao.length > 120
                        ? denuncia.descricao.slice(0, 120) + "..."
                        : denuncia.descricao}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(denuncia.status)}`}
                  >
                    {denuncia.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoricoDenuncias;
