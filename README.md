# Kodo 🚀

**Kodo** is a productivity and self-control application designed to gamify task completion. Inspired by reward-based systems like Google Rewards, Kodo allows users to register their own tasks and earn points upon completion. These points can later be redeemed for personal rewards—like "1 hour of gaming" or any other activity the user chooses as a treat.

---

## 💡 Concept

The core idea behind **Kodo** is to provide a tool for self-discipline and positive reinforcement. Instead of just tracking tasks, Kodo makes productivity rewarding:
1. **Create Tasks:** Register your daily, weekly, or one-off goals.
2. **Complete & Earn:** Earn points for every task successfully finished.
3. **Redeem Rewards:** Use your hard-earned points to "buy" rewards you've pre-defined.

---

## 🛠️ Tech Stack

This project is built using a modern and robust back-end stack:

- **Runtime:** [Node.js](https://nodejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express.js (v5)](https://expressjs.com/)
- **ORM:** [Sequelize](https://sequelize.org/)
- **Migrations:** [Umzug](https://github.com/sequelize/umzug)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Validation:** [Zod](https://zod.dev/)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Development Tools:** `tsx` for hot-reloading, `eslint` & `prettier` for code quality.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/kodo.git
   cd kodo
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file based on `.env.example` and fill in your database credentials.

4. **Spin up the database:**
   ```bash
   pnpm run up:services
   ```

5. **Run migrations:**
   ```bash
   pnpm run migrate
   ```

6. **Start development server:**
   ```bash
   pnpm run dev
   ```

---

## 📂 Project Structure

- `src/models`: Database schemas and Sequelize models.
- `src/controllers`: Request handlers.
- `src/services`: Business logic layer.
- `src/repositories`: Data access layer.
- `src/routes`: API endpoint definitions.
- `src/migrations`: Database version control.
- `src/schemas`: Zod validation schemas.

---

## 🏗️ Roadmap

- [ ] Complete Task CRUD and point calculation.
- [ ] Implement Reward system and redemption logic.
- [ ] User authentication and authorization (JWT).
- [ ] Profile points dashboard.
- [ ] Integration tests.

---

## 📄 License

This project is licensed under the MIT License.
