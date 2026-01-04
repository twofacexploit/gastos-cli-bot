import { processarComandos } from "./services/telegram.js";
import { iniciarCron } from "./services/cron.js";
import { initDB } from "./utils/initDB.js";

console.log("🤖 Bot Telegram iniciado");

initDB(); // ← GARANTE database/gastos.json

setInterval(processarComandos, 5000);
iniciarCron();
