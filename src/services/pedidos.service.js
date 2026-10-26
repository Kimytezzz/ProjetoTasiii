let pedidos = [];
let proximoId = 1;

const TIPOS_VALIDOS = ["entrega", "retirada"];
const PRIORIDADES_VALIDAS = ["baixa", "normal", "alta"];
const STATUS_VALIDOS = [
  "recebido",
  "em_preparacao",
  "enviado",
  "entregue",
  "cancelado"
];

const TRANSICOES = {
  recebido: ["em_preparacao", "cancelado"],
  em_preparacao: ["enviado", "cancelado"],
  enviado: ["entregue", "cancelado"],
  entregue: [],
  cancelado: []
};

function erroValidacao(mensagem) {
  const error = new Error(mensagem);
  error.type = "VALIDATION";
  return error;
}

function criarPedido(dados) {
  if (!dados || typeof dados !== "object") {
    throw erroValidacao("Corpo da requisição é obrigatório");
  }

  const cliente = typeof dados.cliente === "string"
    ? dados.cliente.trim()
    : "";

  if (!cliente) {
    throw erroValidacao("Cliente é obrigatório");
  }

  if (typeof dados.valor !== "number" || !Number.isFinite(dados.valor) || dados.valor <= 0) {
    throw erroValidacao("Valor deve ser numérico e maior que zero");
  }

  if (!TIPOS_VALIDOS.includes(dados.tipo)) {
    throw erroValidacao(`Tipo deve ser um destes valores: ${TIPOS_VALIDOS.join(", ")}`);
  }

  if (!PRIORIDADES_VALIDAS.includes(dados.prioridade)) {
    throw erroValidacao(
      `Prioridade deve ser um destes valores: ${PRIORIDADES_VALIDAS.join(", ")}`
    );
  }

  const pedido = {
    id: proximoId++,
    cliente,
    tipo: dados.tipo,
    valor: dados.valor,
    prioridade: dados.prioridade,
    status: "recebido"
  };

  pedidos.push(pedido);
  return pedido;
}

function listarPedidos() {
  return pedidos;
}

function buscarPedidoPorId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }

  return pedidos.find((pedido) => pedido.id === id);
}

function atualizarStatus(id, dados) {
  const pedido = buscarPedidoPorId(id);

  if (!pedido) {
    const error = new Error("Pedido não encontrado");
    error.type = "NOT_FOUND";
    throw error;
  }

  if (!dados || !STATUS_VALIDOS.includes(dados.status)) {
    throw erroValidacao(
      `Status deve ser um destes valores: ${STATUS_VALIDOS.join(", ")}`
    );
  }

  if (!TRANSICOES[pedido.status].includes(dados.status)) {
    throw erroValidacao(
      `Não é possível alterar o status de ${pedido.status} para ${dados.status}`
    );
  }

  pedido.status = dados.status;
  return pedido;
}

function limparPedidos() {
  pedidos = [];
  proximoId = 1;
}

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarStatus,
  limparPedidos
};
