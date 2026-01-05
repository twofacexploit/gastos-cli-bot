import { processarComandos } from "./services/telegram.js";
import { initDB } from "./utils/initDB.js";

console.log("🤖 Bot Telegram iniciado");

initDB();

/* polling seguro */
setInterval(processarComandos, 5000);
