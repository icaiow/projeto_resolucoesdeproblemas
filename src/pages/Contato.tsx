import React from "react";

const Contato = () => (
  <div className="max-w-2xl mx-auto py-10">
    <h1 className="text-2xl font-bold mb-4">Contato</h1>
    <p className="text-gray-600 mb-4">Entre em contato diretamente com a equipe da escola. Sua mensagem será tratada com sigilo e respeito.</p>
    <form className="flex flex-col gap-4">
      <input type="text" className="border rounded px-3 py-2" placeholder="Seu nome (opcional)" />
      <input type="email" className="border rounded px-3 py-2" placeholder="Seu e-mail (opcional)" />
      <textarea className="border rounded px-3 py-2" placeholder="Digite sua mensagem..." rows={4}></textarea>
      <button type="submit" className="bg-purple text-white px-6 py-2 rounded-md">Enviar</button>
    </form>
  </div>
);

export default Contato; 