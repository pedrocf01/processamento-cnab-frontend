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
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-800">
            Importação de CNAB
          </h1>
          <p className="mt-2 text-slate-500">
            Faça upload do arquivo CNAB
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-white hover:file:bg-slate-700"
            />

            <button
              onClick={uploadFile}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Upload File
            </button>

            
          </div>
        </div>
        <div className="box">
          <button
              onClick={fetchTransactions}
              className="rounded-xl bg-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                Atualizar Transações
              </button>
        </div>
        {/* Transactions */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">
            Transações
          </h2>

          <div className="space-y-8">
            {transactions.map((report) => (
              <div
                key={report.nomeDaLoja}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                {/* Store Header */}
                <div className="bg-slate-800 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    {report.nomeDaLoja}
                  </h3>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left">Cartão</th>
                        <th className="px-4 py-3 text-left">CPF</th>
                        <th className="px-4 py-3 text-left">Data</th>
                        <th className="px-4 py-3 text-left">
                          Dono da Loja
                        </th>
                        <th className="px-4 py-3 text-left">Hora</th>
                        <th className="px-4 py-3 text-left">
                          Nome da Loja
                        </th>
                        <th className="px-4 py-3 text-left">Tipo</th>
                        <th className="px-4 py-3 text-left">Valor</th>
                      </tr>
                    </thead>

                    <tbody>
                      {report.transacoes.map((transacao, index) => (
                        <tr
                          key={transacao.id}
                          className={`border-t border-slate-200 ${
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-slate-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            {transacao.cartao}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.cpf}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.data}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.donoDaLoja}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.hora}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.nomeDaLoja}
                          </td>
                          <td className="px-4 py-3">
                            {transacao.tipo}
                          </td>
                          <td className={`px-4 py-3 font-semibold + ${
                                transacao.valor < 0 
                                ? "text-red-600" 
                                : "text-green-600"
                                }`}
                          >
                            R${transacao.valor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                Nenhuma transação encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
