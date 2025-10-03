import { useState } from "react";

export default function ListaAlunos({ alunos }) {
  const [lista, setLista] = useState(alunos);
  const [novoAluno, setNovoAluno] = useState("");

  // Adiciona aluno na lista
  const adicionarAluno = () => {
    if (novoAluno.trim() === "") return;
    setLista([...lista, novoAluno]);
    setNovoAluno(""); // limpa input
  };

  // Remove aluno pelo índice
  const removerAluno = (index) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  return (
    <div>
      {/* Formulário de adicionar aluno */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={novoAluno}
          onChange={(e) => setNovoAluno(e.target.value)}
          placeholder="Digite o nome do aluno"
          className="input"
        />
        <button onClick={adicionarAluno} className="button">
          Adicionar
        </button>
      </div>

      {/* Lista de alunos */}
      {lista.length === 0 ? (
        <p className="empty">Nenhum aluno cadastrado.</p>
      ) : (
        <ul className="list">
          {lista.map((aluno, index) => (
            <li key={index} className="item">
              {aluno}
              <button
                onClick={() => removerAluno(index)}
                className="button small"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
