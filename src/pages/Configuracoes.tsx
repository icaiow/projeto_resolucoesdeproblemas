import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Bell, Lock, Users, FileText, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Configuracoes = () => {
  const navigate = useNavigate();
  const [notificacoes, setNotificacoes] = useState(true);
  const [privacidade, setPrivacidade] = useState(true);
  const [acessoAlunos, setAcessoAlunos] = useState(true);
  const [relatorios, setRelatorios] = useState(true);
  const [email, setEmail] = useState(true);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home-institucional")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Notificações</h3>
                  <p className="text-sm text-gray-500">Receba alertas sobre novas escutas e denúncias</p>
                </div>
              </div>
              <Switch
                checked={notificacoes}
                onCheckedChange={setNotificacoes}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Privacidade</h3>
                  <p className="text-sm text-gray-500">Controle o acesso aos dados dos alunos</p>
                </div>
              </div>
              <Switch
                checked={privacidade}
                onCheckedChange={setPrivacidade}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Acesso dos Alunos</h3>
                  <p className="text-sm text-gray-500">Permitir que alunos acessem a plataforma</p>
                </div>
              </div>
              <Switch
                checked={acessoAlunos}
                onCheckedChange={setAcessoAlunos}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Relatórios Automáticos</h3>
                  <p className="text-sm text-gray-500">Gerar relatórios mensais automaticamente</p>
                </div>
              </div>
              <Switch
                checked={relatorios}
                onCheckedChange={setRelatorios}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Notificações por E-mail</h3>
                  <p className="text-sm text-gray-500">Receber atualizações por e-mail</p>
                </div>
              </div>
              <Switch
                checked={email}
                onCheckedChange={setEmail}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes; 