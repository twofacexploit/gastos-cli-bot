import { processarComandos } from "./services/telegram.js";
import { iniciarCron } from "./services/cron.js";

console.log("🤖 Bot Telegram iniciado");

setInterval(processarComandos, 5000);
iniciarCron();
