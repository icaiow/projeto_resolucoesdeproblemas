import React from "react";

const Notificacoes = () => (
  <div className="max-w-2xl mx-auto py-10">
    <h1 className="text-2xl font-bold mb-4">Notificações</h1>
    <p className="text-gray-600 mb-4">Aqui você encontra todas as notificações importantes enviadas pela escola.</p>
    <ul className="space-y-3">
      <li className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">Nova cartilha sobre cyberbullying disponível!</li>
      <li className="bg-green-50 border-l-4 border-green-400 p-4 rounded">Seu relato foi respondido pela equipe pedagógica.</li>
      <li className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">Lembrete: Palestra sobre bullying amanhã às 10h.</li>
    </ul>
  </div>
);

export default Notificacoes; 