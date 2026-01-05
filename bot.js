import { processarComandos } from "./services/telegram.js";
import { initDB } from "./utils/initDB.js";
import http from "http";

const PORT = process.env.PORT || 3000;

console.log("🤖 Bot Telegram iniciado");

/* ================= INIT DB ================= */
initDB();

/* ================= TELEGRAM POLLING ================= */
setInterval(processarComandos, 5000);

/* ================= HTTP KEEP-ALIVE (RENDER) ================= */
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot Telegram está rodando 🚀");
}).listen(PORT, () => {
  console.log(`🌐 Servidor HTTP ativo na porta ${PORT}`);
});
