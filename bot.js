import { processarComandos } from "./services/telegram.js";
import { initDB } from "./utils/initDB.js";

console.log("🤖 Bot Telegram iniciado");

initDB();

/* roda a cada 5 segundos (ok para Render Free) */
setInterval(processarComandos, 5000);
