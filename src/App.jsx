// src/App.jsx
import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ListaAlunos from "./components/ListaAlunos";

export default function App() {
  const [alunos, setAlunos] = useState(["Maria", "João", "Pedro"]);

  return (
    <div>
      <Header />
      <main>
        <h2>Lista de Alunos</h2>
        <ListaAlunos alunos={alunos} />
      </main>
      <Footer />
    </div>
  );
}