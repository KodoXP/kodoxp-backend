const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// 1. Criar Usuário
app.post('/users', async (req, res) => {
  const { nome } = req.body;
  const user = await prisma.user.create({ data: { nome } });
  res.json(user);
});

// 1.1 Listar Usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { tasks: true, rewards: true }
  });
  res.json(users);
});

// 2. Criar Tarefa
app.post('/tasks', async (req, res) => {
  const { userId, titulo, valor_pontos } = req.body;
  const task = await prisma.task.create({
    data: { userId, titulo, valor_pontos }
  });
  res.json(task);
});

// 3. Criar Recompensa
app.post('/rewards', async (req, res) => {
  const { userId, titulo, custo_pontos } = req.body;
  const reward = await prisma.reward.create({
    data: { userId, titulo, custo_pontos }
  });
  res.json(reward);
});

// 4. Concluir Tarefa
app.patch('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    if (task.concluida) return res.status(400).json({ error: 'Tarefa já concluída' });

    // Atualiza tarefa e saldo do usuário de forma atômica
    const result = await prisma.$transaction([
      prisma.task.update({
        where: { id: parseInt(id) },
        data: { concluida: true }
      }),
      prisma.user.update({
        where: { id: task.userId },
        data: { saldo_pontos: { increment: task.valor_pontos } }
      })
    ]);

    res.json({ message: 'Tarefa concluída com sucesso', user: result[1] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Resgatar Recompensa
app.post('/rewards/:id/redeem', async (req, res) => {
  const { id } = req.params;

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });

    if (!reward) return res.status(404).json({ error: 'Recompensa não encontrada' });

    if (reward.user.saldo_pontos < reward.custo_pontos) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: reward.userId },
      data: { saldo_pontos: { decrement: reward.custo_pontos } }
    });

    res.json({ message: 'Recompensa resgatada com sucesso', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
