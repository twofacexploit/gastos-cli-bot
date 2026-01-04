import cron from "node-cron";
import fs from "fs-extra";
import dayjs from "dayjs";
import { enviarTelegram } from "./telegram.js";
import "dotenv/config";

const DB = "./database/gastos.json";

export function iniciarCron() {
  cron.schedule("0 21 * * *", async () => {
    const gastos = fs.readJSONSync(DB);
    const hoje = dayjs().format("YYYY-MM-DD");

    const totalHoje = gastos
      .filter(g => g.data === hoje)
      .reduce((s, g) => s + g.valor, 0);

    await enviarTelegram(`
📆 *Resumo diário*

💰 Total hoje: R$ ${totalHoje.toFixed(2)}
`);
  });

  cron.schedule("0 * * * *", async () => {
    const gastos = fs.readJSONSync(DB);
    const totalMes = gastos.reduce((s, g) => s + g.valor, 0);
    const limite = Number(process.env.LIMITE_MENSAL);

    if (totalMes > limite) {
      await enviarTelegram(`
🚨 *ALERTA DE LIMITE*

💰 Atual: R$ ${totalMes.toFixed(2)}
📉 Limite: R$ ${limite}
`);
    }
  });
}
