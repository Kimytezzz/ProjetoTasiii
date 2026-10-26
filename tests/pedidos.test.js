const request = require("supertest");
const app = require("../src/app");
const service = require("../src/services/pedidos.service");

describe("API de Gerenciamento de Pedidos", () => {
  beforeEach(() => {
    service.limparPedidos();
  });

  test("deve criar um pedido válido com status 201", async () => {
    const response = await request(app)
      .post("/pedidos")
      .send({
        cliente: "Carlos Silva",
        tipo: "entrega",
        valor: 350,
        prioridade: "normal"
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      cliente: "Carlos Silva",
      tipo: "entrega",
      valor: 350,
      prioridade: "normal",
      status: "recebido"
    });
  });

  test("deve rejeitar cliente vazio com status 400", async () => {
    const response = await request(app)
      .post("/pedidos")
      .send({
        cliente: "   ",
        tipo: "entrega",
        valor: 100,
        prioridade: "normal"
      });

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe("Cliente é obrigatório");
  });

  test("deve rejeitar valor menor ou igual a zero", async () => {
    const response = await request(app)
      .post("/pedidos")
      .send({
        cliente: "Ana",
        tipo: "retirada",
        valor: 0,
        prioridade: "alta"
      });

    expect(response.status).toBe(400);
  });

  test("deve listar os pedidos com status 200", async () => {
    await request(app).post("/pedidos").send({
      cliente: "Carlos Silva",
      tipo: "entrega",
      valor: 350,
      prioridade: "normal"
    });

    const response = await request(app).get("/pedidos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("deve consultar pedido existente com status 200", async () => {
    await request(app).post("/pedidos").send({
      cliente: "Carlos Silva",
      tipo: "entrega",
      valor: 350,
      prioridade: "normal"
    });

    const response = await request(app).get("/pedidos/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test("deve retornar 404 para pedido inexistente", async () => {
    const response = await request(app).get("/pedidos/999");

    expect(response.status).toBe(404);
    expect(response.body.erro).toBe("Pedido não encontrado");
  });

  test("deve atualizar status de recebido para em_preparacao", async () => {
    await request(app).post("/pedidos").send({
      cliente: "Carlos Silva",
      tipo: "entrega",
      valor: 350,
      prioridade: "normal"
    });

    const response = await request(app)
      .patch("/pedidos/1/status")
      .send({ status: "em_preparacao" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("em_preparacao");
  });

  test("deve rejeitar transição de status inválida", async () => {
    await request(app).post("/pedidos").send({
      cliente: "Carlos Silva",
      tipo: "entrega",
      valor: 350,
      prioridade: "normal"
    });

    const response = await request(app)
      .patch("/pedidos/1/status")
      .send({ status: "entregue" });

    expect(response.status).toBe(400);
  });
});
