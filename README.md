# Processamento CNAB — Frontend

Interface web para o sistema de importação e visualização de transações CNAB. Permite fazer upload de arquivos `.txt` no padrão CNAB para o backend processar, e exibe o relatório de transações agrupadas por loja em uma tabela.

## Funcionalidades

- **Upload de arquivo CNAB** — seleção de arquivo `.txt` e envio via `multipart/form-data` para o backend
- **Listagem de transações por loja** — exibe o relatório retornado pela API agrupado por nome da loja
- **Valores coloridos** — valores negativos (saídas) aparecem em vermelho e positivos (entradas) em verde
- **Atualização manual** — botão para recarregar as transações sem precisar recarregar a página
- **Carregamento inicial automático** — as transações são buscadas na API assim que a página é aberta

## Stack

- JavaScript (JSX)  
- React 18  
- Vite  
- Tailwind CSS  
- Axios  
- Docker


## Como Executar

### Com Docker

O frontend é construído e servido automaticamente ao subir o `docker-compose.yml` do [repositório do backend](https://github.com/pedrocf01/processamento-cnab-backend):

```bash
# Na raiz do projeto backend
docker compose up
```

O frontend ficará disponível em `http://localhost:9090`.

> O `docker-compose.yml` do backend já aponta para `../processamento-cnab-frontend` como contexto de build do serviço `spa-app`. Certifique-se de que este repositório está no diretório correto em relação ao backend.

### Apenas o container do frontend

```bash
# Na raiz deste repositório
docker build -t frontend-cnab .
docker run -p 9090:9090 frontend-cnab
```

O Dockerfile instala as dependências, executa `npm run build` para gerar os arquivos de produção e serve a aplicação com `vite preview` na porta `9090`.


## Como Usar

1. Acesse `http://localhost:9090` no navegador.
2. Na seção de upload, clique em **Escolher arquivo** e selecione um arquivo `.txt` no formato CNAB.
3. Clique em **Upload File** para enviar o arquivo ao backend. O processamento ocorre de forma assíncrona.
4. Clique em **Atualizar Transações** para carregar os dados processados.
5. As transações aparecem agrupadas por loja, com valores em verde (entradas) ou vermelho (saídas).

## Integração com o Backend

O frontend se comunica diretamente com a API do backend via Axios:

| Ação | Método | Endpoint |
|---|---|---|
| Enviar arquivo CNAB | `POST` | `http://localhost:8080/cnab/upload` |
| Listar transações | `GET` | `http://localhost:8080/transacoes` |

O CORS está habilitado no backend para a origem `http://localhost:9090`.