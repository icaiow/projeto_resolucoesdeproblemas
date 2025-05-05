import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Eye, FileCheck } from "lucide-react";

const Documentos = () => {
  const navigate = useNavigate();

  // Dados simulados de documentos
  const documentos = [
    {
      id: 1,
      titulo: "Regimento Escolar",
      tipo: "PDF",
      descricao: "Documento oficial com as regras e normas da escola.",
      data: "01/03/2024",
      status: "Atualizado",
      tamanho: "1.2 MB",
      icon: FileText,
    },
    {
      id: 2,
      titulo: "Calendário Escolar 2024",
      tipo: "PDF",
      descricao: "Calendário completo com todas as datas importantes do ano letivo.",
      data: "15/02/2024",
      status: "Atualizado",
      tamanho: "0.8 MB",
      icon: FileText,
    },
    {
      id: 3,
      titulo: "Contrato de Prestação de Serviços",
      tipo: "PDF",
      descricao: "Contrato de prestação de serviços educacionais.",
      data: "10/01/2024",
      status: "Pendente Assinatura",
      tamanho: "1.5 MB",
      icon: FileCheck,
    },
    {
      id: 4,
      titulo: "Manual do Aluno",
      tipo: "PDF",
      descricao: "Guia completo com informações importantes para os alunos.",
      data: "05/03/2024",
      status: "Atualizado",
      tamanho: "2.1 MB",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/home-responsaveis")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Documentos Importantes</h2>
              <p className="text-sm text-gray-500">
                Acesse e gerencie documentos importantes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {documentos.map((documento) => (
              <Card key={documento.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <documento.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{documento.titulo}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          documento.status === "Atualizado"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {documento.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {documento.descricao}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{documento.tipo}</span>
                      <span>•</span>
                      <span>{documento.tamanho}</span>
                      <span>•</span>
                      <span>Atualizado em: {documento.data}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Documentos; 