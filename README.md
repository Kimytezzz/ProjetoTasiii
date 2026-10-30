# API de Gerenciamento de Pedidos

Projeto Prático Avaliativo da disciplina **Tópicos Avançados em Sistemas de Informação II**.

## 1. Tecnologias

- Node.js
- Express
- JavaScript
- Jest
- Supertest
- Postman
- Git e GitHub

O armazenamento dos pedidos é feito em memória, conforme permitido no enunciado.

## 2. Instalação

Pré-requisito: Node.js instalado.

No terminal:

```bash
npm install
```

## 3. Execução

```bash
npm start
```

A API será executada em:

```text
http://localhost:3000
```

## 4. Testes automatizados

```bash
npm test
```

## 5. Arquitetura

O projeto utiliza arquitetura em camadas:

```text
routes -> controllers -> services
```

- **routes:** define as rotas HTTP.
- **controllers:** recebe a requisição e devolve a resposta HTTP.
- **services:** contém as regras de negócio e validações.

## 6. Rotas

### Criar pedido

`POST /pedidos`

Exemplo:

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta esperada: `201 Created`.

### Listar pedidos

`GET /pedidos`

Resposta esperada: `200 OK`.

### Consultar pedido

`GET /pedidos/:id`

- Pedido encontrado: `200 OK`
- Pedido inexistente: `404 Not Found`

### Atualizar status

`PATCH /pedidos/:id/status`

Exemplo:

```json
{
  "status": "em_preparacao"
}
```

- Atualização válida: `200 OK`
- Dados inválidos: `400 Bad Request`
- Pedido inexistente: `404 Not Found`

## 7. Valores aceitos

### Tipo

- `entrega`
- `retirada`

### Prioridade

- `baixa`
- `normal`
- `alta`

### Status

- `recebido`
- `em_preparacao`
- `enviado`
- `entregue`
- `cancelado`

## 8. Transições de status

As transições implementadas são:

```text
recebido -> em_preparacao
recebido -> cancelado

em_preparacao -> enviado
em_preparacao -> cancelado

enviado -> entregue
enviado -> cancelado

entregue -> nenhuma
cancelado -> nenhuma
```

Uma transição não prevista retorna `400 Bad Request`.

## 9. Validações

- Cliente é obrigatório e não pode ser vazio.
- Valor deve ser numérico e maior que zero.
- Tipo deve ser reconhecido.
- Prioridade deve ser reconhecida.
- Status deve ser reconhecido.
- ID inexistente retorna `404`.
- Dados inválidos retornam `400`.
- Erros inesperados são tratados como `500`.

## 10. Evidências do Postman

Criar a pasta `evidencias/` e salvar:

```text
01-criacao.png
02-validacao.png
03-listagem.png
04-consulta-inexistente.png
05-atualizacao.png
```

Cada captura deve mostrar método, URL, corpo quando necessário, resposta e código HTTP.

## 11. GitHub

O projeto deve ser enviado para um repositório GitHub.

Sugestão de pelo menos cinco commits:

1. `chore: cria estrutura inicial do projeto`
2. `feat: implementa cadastro e listagem de pedidos`
3. `feat: implementa consulta e atualização de status`
4. `test: adiciona testes automatizados`
5. `docs: adiciona README e instruções`

## 12. Uso de IA

Foi utilizada inteligência artificial como apoio ao desenvolvimento do projeto, principalmente para organizar a estrutura em camadas, sugerir validações, criar exemplos de testes e revisar a documentação.

Uma sugestão aceita foi a separação da aplicação em `routes`, `controllers` e `services`, pois essa organização atende ao requisito de arquitetura em camadas e facilita a localização das responsabilidades.

O código foi revisado e testado pelo aluno, que permanece responsável por compreender seu funcionamento e realizar as correções necessárias.
"# ProjetoTasiii" 
