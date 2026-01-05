import fetch from "node-fetch";
import fs from "fs-extra";
import dayjs from "dayjs";
import "dotenv/config";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DB = "./database/gastos.json";

let LAST_UPDATE_ID = 0;

const api = method =>
  `https://api.telegram.org/bot${TOKEN}/${method}`;

async function send(text) {
  await fetch(api("sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown"
    })
  });
}

export async function processarComandos() {
  const res = await fetch(
    api(`getUpdates?offset=${LAST_UPDATE_ID + 1}&timeout=10`)
  );
  const data = await res.json();

  if (!data.ok || !data.result.length) return;

  for (const update of data.result) {
    LAST_UPDATE_ID = update.update_id;

    if (!update.message) continue;
    if (update.message.chat.id != CHAT_ID) continue;

    const texto = update.message.text;
    const gastos = fs.existsSync(DB)
      ? fs.readJSONSync(DB)
      : [];

    /* ===== COMANDOS ===== */

    if (texto === "/menu") {
      await send(`
📌 *MENU GASTOS CLI*

/resumo – Resumo geral
/mes – Gastos do mês
/hoje – Gastos de hoje
/semana – Últimos 7 dias
`);
    }

    if (texto === "/resumo") {
      const total = gastos.reduce((s, g) => s + g.valor, 0);
      await send(`💰 *Total gasto:* R$ ${total.toFixed(2)}`);
    }

    if (texto === "/mes") {
      const mes = dayjs().month();
      const total = gastos
        .filter(g => dayjs(g.data).month() === mes)
        .reduce((s, g) => s + g.valor, 0);

      await send(`📅 *Total do mês:* R$ ${total.toFixed(2)}`);
    }

    if (texto === "/hoje") {
      const hoje = dayjs().format("YYYY-MM-DD");
      const total = gastos
        .filter(g => g.data === hoje)
        .reduce((s, g) => s + g.valor, 0);

      await send(`📆 *Gastos hoje:* R$ ${total.toFixed(2)}`);
    }

    if (texto === "/semana") {
      const inicio = dayjs().subtract(7, "day");
      const total = gastos
        .filter(g => dayjs(g.data).isAfter(inicio))
        .reduce((s, g) => s + g.valor, 0);

      await send(`📊 *Últimos 7 dias:* R$ ${total.toFixed(2)}`);
    }
  }
}
