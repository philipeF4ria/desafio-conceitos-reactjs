import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: 'Desafio conceitos ReactJS',
      url: 'https://github.com/philipeF4ria/desafio-conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS'],
    });
    
    setRepositories([ ...repositories, data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id != id));
  }

  return (
    <div className="container">
      <div className="listArea">
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
            <h1>{repository.title}</h1>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>  
          ))}
        </ul>
      </div>
      
      <div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
              
    </div>
  );
}

export default App;
