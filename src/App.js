import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'
import terra from './terra.png'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch () {
    if (input == '') {
      alert('Digite um CEP!')
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch (error) {
      alert("Erro ao buscar o CEP!")
      setInput('')
    }
  }

  return (
    <div className="container">
      <img src={terra} className="imgTerra"/>

      <div>
        <h1 className="titulo">Bem-Vindo ao Busca CEP</h1>
      </div>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP. . ." value={input} onChange={(e)=>setInput(e.target.value)}/>

        <button className="buttonPesquisa" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
