import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiTrash } from 'react-icons/fi';

import api from './services/api';

import "./styles.scss";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    techsInput: '',
  });

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  }, []);

  function handleChangeInput(event) {
    const { name, value } = event.target; 
    
    setFormData({...formData, [name]: value});
  }

  async function handleAddRepository() {    
    const techs = formData.techsInput.split(', ');
    const { title, url } = formData;
 
    const { data } = await api.post('repositories', {
      title,
      url,
      techs,
    });
    
    setRepositories([ ...repositories, data ]);
    setFormData({
      title: '',
      url: '',
      techsInput: '',
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <>
      <header>
          <h1>Desafio Rocketseat</h1>
          <div>
            <a href="https://github.com/philipeF4ria">
              <FiGithub size={20}/>
            </a>

            <a href="https://www.linkedin.com/in/philipe-faria-052b171a0/">
              <FiLinkedin size={20}/>
            </a>
          </div>
      </header>
      <div className="container">
        <div className="formArea">
          <div className="formBox">
            <input 
              type="text" 
              name="title"
              value={formData.title} 
              placeholder="Título do repositório" 
              onChange={handleChangeInput} 
            />
          
            <input 
              type="text" 
              name="url" 
              value={formData.url}
              placeholder="URL do repositório" 
              onChange={handleChangeInput}
            />
          
            <input 
              type="text" 
              name="techsInput"
              value={formData.techsInput}
              placeholder="Tecnologias" 
              onChange={handleChangeInput}
            />
            <button onClick={handleAddRepository}>Adicionar</button>
            
          </div>
        </div>
        
        <div className="listArea">
          <ul data-testid="repository-list">
            {repositories.map(repository => (
              <li key={repository.id}>
                <h1>{repository.title}</h1>
                <FiTrash 
                  size={20}
                  onClick={() => handleRemoveRepository(repository.id)}  
                />
              </li>  
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
