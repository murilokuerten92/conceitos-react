import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repository, setRepository] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, [])

  async function handleAddRepository() {


    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`
    })

    const repo = response.data;

    setRepository([...repository, repo]);
  }

  async function handleRemoveRepository(id) {


    await api.delete(`repositories/${id}`)



    setRepository(repository.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo =>
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
