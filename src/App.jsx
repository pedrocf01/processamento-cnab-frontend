import axios from "axios"
import {useEffect, useState} from "react"

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async() => {
    const response = await axios.get("http://localhost:8080/transacoes");
    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions()
  }, []);

  return (
    <div>
      <div>
        <h1>Importação de CNAB </h1>  
      </div>
      <div>
        <span>Choose File</span>
        <input type="file" accept=".txt"/>
        <button>Upload File</button>
      </div>

      <div>
        <h2>Transações</h2>
        <ul>
          <li>
            <table>
              <thead>
                <tr>Cartão</tr>
                <tr>CPF</tr>
                <tr>Data</tr>
                <tr>Dono da Loja</tr>
                <tr>Hora</tr>
                <tr>Nome da Loja</tr>
                <tr>Tipo</tr>
                <tr>Valor</tr>
              </thead>
            </table>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
