import api from "./api";

export const criarDenuncia = async (dados: {
  titulo: string;
  descricao: string;
  tipo: string;
  anonima: boolean;
  nomeAgressor?: string | null;
}) => {
  const resposta = await api.post("/denuncias", dados);
  return resposta.data;
};

export const listarMinhasDenuncias = async () => {
  const resposta = await api.get("/denuncias");
  return resposta.data;
};
