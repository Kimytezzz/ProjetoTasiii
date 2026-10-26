const service = require("../services/pedidos.service");

function criar(req, res) {
  try {
    const pedido = service.criarPedido(req.body);
    return res.status(201).json(pedido);
  } catch (error) {
    if (error.type === "VALIDATION") {
      return res.status(400).json({ erro: error.message });
    }
    throw error;
  }
}

function listar(req, res) {
  return res.status(200).json(service.listarPedidos());
}

function buscarPorId(req, res) {
  const pedido = service.buscarPedidoPorId(Number(req.params.id));

  if (!pedido) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  return res.status(200).json(pedido);
}

function atualizarStatus(req, res) {
  try {
    const pedido = service.atualizarStatus(Number(req.params.id), req.body);
    return res.status(200).json(pedido);
  } catch (error) {
    if (error.type === "NOT_FOUND") {
      return res.status(404).json({ erro: error.message });
    }

    if (error.type === "VALIDATION") {
      return res.status(400).json({ erro: error.message });
    }

    throw error;
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizarStatus
};
