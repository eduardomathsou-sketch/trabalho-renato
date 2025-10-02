// ToDoList - React (Simples)
// Arquivo: TodoList.jsx
// Como usar: copie este arquivo para src/TodoList.jsx em um projeto Create React App / Vite + React.
// Importe e use <TodoList /> em App.jsx.
// Não usa Tailwind, estilos estão no arquivo TodoList.css

import React, { useState, useEffect } from 'react';
import './TodoList.css';


export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos:v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos:v1', JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false }
    ]);
    setText('');
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function removeTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  return (
    <div className="todo-container">
      <h1 className="title">To‑Do List (Simples)</h1>

      <form onSubmit={addTodo} className="form">
        <input
          className="input"
          placeholder="Adicione uma tarefa..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="button" type="submit">Adicionar</button>
      </form>

      <ul className="list">
        {todos.length === 0 && (
          <li className="empty">Nenhuma tarefa. Adicione a primeira!</li>
        )}

        {todos.map(todo => (
          <li key={todo.id} className="item">
            <label className="label">
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            </label>

            <div className="actions">
              <button onClick={() => removeTodo(todo.id)} className="button small">Remover</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span className="info">{todos.filter(t => !t.completed).length} por fazer</span>
        <div className="actions">
          <button onClick={() => setTodos([])} className="button small">Limpar tudo</button>
          <button onClick={clearCompleted} className="button small">Limpar concluídas</button>
        </div>
      </div>
    </div>
  );
}

