import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const BullyingInfo = () => {
  const materiais = [
    {
      titulo: "Cartilha: O que é Bullying?",
      descricao: "Guia completo sobre bullying, suas formas e como identificar.",
      link: "#",
      data: "2024-03-15"
    },
    {
      titulo: "Cyberbullying: Guia para Alunos",
      descricao: "Informações sobre cyberbullying e como se proteger online.",
      link: "#",
      data: "2024-03-10"
    },
    {
      titulo: "Prevenção ao Bullying na Escola",
      descricao: "Estratégias e práticas para prevenir o bullying no ambiente escolar.",
      link: "#",
      data: "2024-02-28"
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
        <h1 className="text-2xl font-bold">O que é Bullying/Cyberbullying?</h1>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Entendendo o Bullying</h2>
        <p className="text-gray-600 mb-4">
          O bullying é um comportamento agressivo, intencional e repetitivo que ocorre entre pessoas com uma relação desigual de poder. Pode acontecer de várias formas:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>Física: empurrões, socos, chutes</li>
          <li>Verbal: xingamentos, apelidos ofensivos</li>
          <li>Social: exclusão, difamação</li>
          <li>Psicológica: ameaças, chantagens</li>
        </ul>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Cyberbullying</h2>
        <p className="text-gray-600 mb-4">
          O cyberbullying é uma forma de bullying que ocorre através de meios digitais, como redes sociais, mensagens e jogos online. Pode incluir:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>Mensagens ofensivas ou ameaçadoras</li>
          <li>Divulgação de fotos ou vídeos constrangedores</li>
          <li>Criação de perfis falsos para difamar</li>
          <li>Exclusão de grupos online</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Materiais Educativos</h2>
        <div className="space-y-4">
          {materiais.map((material, index) => (
            <div key={index} className="border rounded p-4 hover:shadow transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{material.titulo}</h3>
                  <p className="text-sm text-gray-500">{material.descricao}</p>
                  <span className="text-xs text-gray-400">Publicado em: {material.data}</span>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BullyingInfo; 