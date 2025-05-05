import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import LoginInstitucional from "./pages/LoginInstitucional";
import LoginAluno from "./pages/LoginAluno";
import LoginResponsavel from "./pages/LoginResponsavel";
import PerfilInstitucional from "./pages/PerfilInstitucional";
import EscutaDigital from "./pages/EscutaDigital";
import InformarPrevenir from "./pages/InformarPrevenir";
import GestaoInstitucional from "./pages/GestaoInstitucional";
import Denuncia from "./pages/Denuncia";
import Monitoramento from "./pages/Monitoramento";
import HomeAlunos from "./pages/HomeAlunos";
import HomeResponsaveis from "./pages/HomeResponsaveis";
import AlunoView from "./pages/AlunoView";
import InstituicaoOrientacoes from "./pages/InstituicaoOrientacoes";
import EnviarEscuta from "./pages/EnviarEscuta";
import NotFound from "./pages/NotFound";
import EditarPerfil from "./pages/EditarPerfil";
import EditarPerfilAluno from "./pages/EditarPerfilAluno";
import EditarPerfilResponsavel from "./pages/EditarPerfilResponsavel";
import BullyingInfo from "./pages/BullyingInfo";
import BuscarAjuda from "./pages/BuscarAjuda";
import ContatosPsicologos from "./pages/ContatosPsicologos";
import AtividadesRecentes from "./pages/AtividadesRecentes";
import AtividadeDetalhes from "./pages/atividades/AtividadeDetalhes";
import MateriaisEducativos from "./pages/MateriaisEducativos";
import HomeInstitucional from "./pages/HomeInstitucional";
import GerenciarEscutas from "./pages/GerenciarEscutas";
import GerenciarDenuncias from "./pages/GerenciarDenuncias";
import GerenciarMateriais from "./pages/GerenciarMateriais";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import GestaoAlunos from "./pages/GestaoAlunos";
import CadastroResponsavel from "./pages/CadastroResponsavel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login-institucional" element={<LoginInstitucional />} />
          <Route path="/login-aluno" element={<LoginAluno />} />
          <Route path="/login-responsavel" element={<LoginResponsavel />} />
          <Route path="/cadastro-responsavel" element={<CadastroResponsavel />} />
          <Route element={<Layout />}>
            <Route path="/perfil-institucional" element={<PerfilInstitucional />} />
            <Route path="/escuta-digital" element={<EscutaDigital />} />
            <Route path="/gerenciar-escutas" element={<GerenciarEscutas />} />
            <Route path="/gerenciar-denuncias" element={<GerenciarDenuncias />} />
            <Route path="/gerenciar-materiais" element={<GerenciarMateriais />} />
            <Route path="/informar-prevenir" element={<InformarPrevenir />} />
            <Route path="/gestao-institucional" element={<GestaoInstitucional />} />
            <Route path="/denuncia" element={<Denuncia />} />
            <Route path="/monitoramento" element={<Monitoramento />} />
            <Route path="/home-alunos" element={<HomeAlunos />} />
            <Route path="/home-responsaveis" element={<HomeResponsaveis />} />
            <Route path="/home-institucional" element={<HomeInstitucional />} />
            <Route path="/aluno-view/:id" element={<AlunoView />} />
            <Route path="/instituicao-orientacoes" element={<InstituicaoOrientacoes />} />
            <Route path="/enviar-escuta" element={<EnviarEscuta />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/editar-perfil-aluno" element={<EditarPerfilAluno />} />
            <Route path="/editar-perfil-responsavel" element={<EditarPerfilResponsavel />} />
            <Route path="/bullying-info" element={<BullyingInfo />} />
            <Route path="/buscar-ajuda" element={<BuscarAjuda />} />
            <Route path="/contatos-psicologos" element={<ContatosPsicologos />} />
            <Route path="/atividades-recentes" element={<AtividadesRecentes />} />
            <Route path="/atividades/:tipo/:id" element={<AtividadeDetalhes />} />
            <Route path="/materiais-educativos" element={<MateriaisEducativos />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/gestao-alunos" element={<GestaoAlunos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
