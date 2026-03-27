# Kodo API - Documentação do MVP

Este documento registra o estado atual e as funcionalidades da API de produtividade gamificada **Kodo**.

## 🛠 Stack Tecnológica
- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma (v6)
- **Banco de Dados:** SQLite (`prisma/dev.db`)

## 📋 Modelagem de Dados (Entidades)

### User
- `id`: Identificador único (Autoincrement)
- `nome`: Nome do usuário
- `saldo_pontos`: Saldo acumulado (Padrão: 0)

### Task
- `id`: Identificador único
- `userId`: Relacionamento com User
- `titulo`: Nome da tarefa
- `valor_pontos`: Pontos ganhos ao concluir
- `concluida`: Status (Boolean, Padrão: false)

### Reward
- `id`: Identificador único
- `userId`: Relacionamento com User
- `titulo`: Nome da recompensa
- `custo_pontos`: Pontos necessários para resgate

## 🚀 Endpoints da API (Base URL: `http://localhost:3000`)

### Usuários
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/users` | Cria um novo usuário. Corpo: `{"nome": "String"}` |
| `GET` | `/users` | Lista todos os usuários, suas tarefas e recompensas. |

### Tarefas
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/tasks` | Cria uma tarefa. Corpo: `{"userId": Int, "titulo": "String", "valor_pontos": Int}` |
| `PATCH` | `/tasks/:id/complete` | Conclui uma tarefa e soma os pontos ao saldo do usuário. |

### Recompensas
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/rewards` | Cria uma recompensa. Corpo: `{"userId": Int, "titulo": "String", "custo_pontos": Int}` |
| `POST` | `/rewards/:id/redeem` | Resgata uma recompensa. Subtrai pontos do saldo se houver saldo suficiente. |

## ⚙️ Comandos Úteis
- **Iniciar Servidor:** `node server.js`
- **Sincronizar Banco:** `npx prisma db push`
- **Gerar Prisma Client:** `npx prisma generate`

## ✅ Progresso Atual
- Estrutura inicial criada.
- Banco de Dados SQLite configurado com Prisma v6.
- Usuários de teste criados: Italo (ID: 1), Alice (ID: 2), Bob (ID: 3).
- Servidor rodando na porta 3000.
