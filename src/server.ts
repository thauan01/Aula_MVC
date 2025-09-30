import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para parsing URL encoded
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use("/api", taskRoutes);

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
    console.error('❌ Erro não capturado:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejeitada não tratada:', reason);
    process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 API disponível em http://localhost:${PORT}/api`);
}).on('error', (err) => {
    console.error('❌ Erro ao iniciar servidor:', err);
});