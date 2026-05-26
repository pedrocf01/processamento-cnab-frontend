import axios from "axios"
import {useEffect, useState} from "react"

function App() {
  const [transactions, setTransactions] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post("http://localhost:8080/cnab/upload", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
                });
  }

  const fetchTransactions = async() => {
    const response = await axios.get("http://localhost:8080/transacoes");
    setTransactions(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div>
        <h1>Importação de CNAB </h1>  
      </div>
      <div>
        <span>Choose File</span>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload File</button>
      </div>

      <div>
        <h2>Transações</h2>
        <ul>
          {transactions.map((report) => (
            <li key={report.nomeDaLoja}>
              <table>
                <thead>
                  <tr>
                    <th>Cartão</th>
                    <th>CPF</th>
                    <th>Data</th>
                    <th>Dono da Loja</th>
                    <th>Hora</th>
                    <th>Nome da Loja</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                  {report.transacoes.map((transacao) => (
                    <tr key={transacao.id}>
                      <td>{transacao.cartao}</td>
                      <td>{transacao.cpf}</td>
                      <td>{transacao.data}</td>
                      <td>{transacao.donoDaLoja}</td>
                      <td>{transacao.hora}</td>
                      <td>{transacao.nomeDaLoja}</td>
                      <td>{transacao.tipo}</td>
                      <td>{transacao.valor}</td>
                    </tr>
                  ))
                  }
      
                </tbody>
              </table>
            </li>))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
