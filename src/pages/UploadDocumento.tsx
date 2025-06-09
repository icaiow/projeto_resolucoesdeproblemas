// 📁 src/pages/UploadDocumento.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import api from "@/services/api";

const UploadDocumento = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação ao carregar a página
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    
    if (!token) {
      toast.error("Você precisa estar autenticado para acessar esta página");
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(usuario || '{}');
      if (userData.tipo !== 'admin' && userData.tipo !== 'instituicao') {
        toast.error("Você não tem permissão para acessar esta página");
        navigate("/home-institucional");
      }
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      toast.error("Erro ao verificar permissões");
      navigate("/login");
    }
  }, [navigate]);

  const handleUpload = async () => {
    if (!titulo || !descricao || !tipo || !arquivo) {
      toast.error("Preencha todos os campos e selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("tipo", tipo);
    formData.append("arquivo", arquivo);

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("Você precisa estar autenticado para enviar documentos");
        navigate("/login");
        return;
      }

      const response = await api.post("/documentos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      toast.success("Documento enviado com sucesso!");
      navigate("/materiais-institucional");
    } catch (error: any) {
      console.error("Erro ao enviar documento:", error);
      const mensagem = error?.response?.data?.message || "Erro ao enviar documento";
      toast.error(mensagem);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Enviar Novo Material</h1>

      <div className="space-y-2">
        <Label>Título</Label>
        <Input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Cartilha de Prevenção"
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o conteúdo do material..."
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo</Label>
        <Select value={tipo} onValueChange={setTipo}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="vídeo">Vídeo</SelectItem>
            <SelectItem value="documento">Documento</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Arquivo</Label>
        <Input
          type="file"
          accept="*/*"
          onChange={(e) => setArquivo(e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
};

export default UploadDocumento;
