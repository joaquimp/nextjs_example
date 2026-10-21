"use client"
import { useState } from "react";
import Botao from "../../componentes/botao/botao";
import Tarefa from "../../componentes/tarefa";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  function adicionar() {
    const titulo = texto.trim();
    if (!titulo) {
        alert("O título da tarefa não pode ser vazio.");
        return;
    }
    setTarefas([...tarefas, { id: Date.now() + Math.random(), titulo, concluida: false }]);
    setTexto("");
  }

  function alternar(id) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)));
  }

  function remover(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  return (
    <main>
      <h1>Tarefas</h1>
      <div>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
          placeholder="Nova tarefa"
        />
        <Botao onClick={adicionar}>Adicionar</Botao>
      </div>
      <section>
        <p>Total de Tarefas: {tarefas.length}</p>
        <p>Concluídas: {tarefas.filter(t => t.concluida).length}</p>
        <p>Pendentes: {tarefas.filter(t => !t.concluida).length}</p>
      </section>
      <section>
        {tarefas.map((t) => (
          <Tarefa
            key={t.id}
            titulo={t.titulo}
            concluida={t.concluida}
            onAlternar={() => alternar(t.id)}
            onRemover={() => remover(t.id)}
          />
        ))}
      </section>
    </main>
  );
}
