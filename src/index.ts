import express from "express";
import { prisma } from "./prisma.js"; // Importa Prisma Client

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send('Hola');
});
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Manejo de cierre para liberar la conexión de Prisma
const shutdown = async () => {
  console.log("Closing Prisma connection...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

// Capturar señales para cierre seguro
process.on("SIGINT", shutdown); // Ctrl + C en terminal
process.on("SIGTERM", shutdown); // Signal de contenedores (Docker, Kubernetes)
