import fetch from "node-fetch";
import fs from "fs-extra";
import dayjs from "dayjs";
import { gerarGraficoSemana } from "./telegramGrafico.js";
import "dotenv/config";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DB = "./database/gastos.json";

const api = path => `https://api.telegram.org/bot${TOKEN}/${path}`;

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

export async function enviarTelegram(msg) {
  await send(msg);
}

/* ================= COMANDOS ================= */

export async function processarComandos() {
  const res = await fetch(api("getUpdates"));
  const data = await res.json();
  if (!data.ok || !data.result.length) return;

  const msg = data.result.at(-1).message;
  if (!msg || msg.chat.id != CHAT_ID) return;

  const texto = msg.text;
  const gastos = fs.readJSONSync(DB);

  if (texto === "/menu") {
    await send(`
📌 *MENU GASTOS CLI*

/resumo – Resumo geral
/mes – Gastos do mês
/hoje – Gastos de hoje
/semana – Resumo semanal
/grafico – Gráfico da semana
/limite 2000 – Definir limite
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

  if (texto === "/grafico") {
    await gerarGraficoSemana();
  }

  if (texto.startsWith("/limite")) {
    const limite = texto.split(" ")[1];
    if (!limite) return send("❌ Informe o valor. Ex: /limite 2000");
    process.env.LIMITE_MENSAL = limite;
    await send(`🚨 Limite mensal definido: R$ ${limite}`);
  }
}
