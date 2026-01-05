import fetch from "node-fetch";
import comandos from "./commands/index.js";

/* ================= CONFIG ================= */

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = String(process.env.TELEGRAM_CHAT_ID);

if (!TOKEN || !CHAT_ID) {
  throw new Error("❌ TELEGRAM_TOKEN ou TELEGRAM_CHAT_ID não definidos");
}

const api = method =>
  `https://api.telegram.org/bot${TOKEN}/${method}`;

/* ================= STATE ================= */

let LAST_UPDATE_ID = 0;

/* ================= SEND ================= */

async function enviarMensagem(texto) {
  await fetch(api("sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: texto,
      parse_mode: "Markdown"
    })
  });
}

/* ================= ROUTER ================= */

export async function processarComandos() {
  try {
    const res = await fetch(
      api(`getUpdates?offset=${LAST_UPDATE_ID + 1}&timeout=10`)
    );

    const data = await res.json();

    if (!data.ok || !data.result || data.result.length === 0) return;

    for (const update of data.result) {
      LAST_UPDATE_ID = update.update_id;

      if (!update.message) continue;
      if (String(update.message.chat.id) !== CHAT_ID) continue;

      const texto = update.message.text?.trim();
      if (!texto) continue;

      /* ================= HELP ================= */

      if (texto === "/start" || texto === "/ajuda") {
        await enviarMensagem(
`📌 *Gastos CLI – Comandos Disponíveis*

/menu – Menu principal
/resumo – Resumo do mês
/saldo – Saldo restante
/percentual – % do limite usado
/orcamento_diario – Quanto pode gastar por dia
/hoje – Gastos de hoje
/semana – Últimos 7 dias
/mes – Total do mês
/categorias – Gastos por categoria
/top5 – Maiores gastos
/ultimo_gasto – Último lançamento
/status – Status do bot

Digite o comando desejado 👇`
        );
        continue;
      }

      /* ================= MENU ================= */

      if (texto === "/menu") {
        await enviarMensagem(
`📊 *MENU – GASTOS CLI*

💰 /saldo
📈 /percentual
📅 /orcamento_diario
📆 /hoje
📊 /semana
📅 /mes
📂 /categorias
🔥 /top5
🧾 /ultimo_gasto
⚙️ /status
❓ /ajuda`
        );
        continue;
      }

      /* ================= COMMAND DISPATCH ================= */

      const comando = texto.split(" ")[0];

      if (!comandos[comando]) {
        await enviarMensagem(
          "❌ Comando não reconhecido.\nUse /menu para ver as opções."
        );
        continue;
      }

      const resposta = await comandos[comando](texto);

      if (resposta) {
        await enviarMensagem(resposta);
      }
    }
  } catch (err) {
    console.error("Erro no bot Telegram:", err.message);
  }
}
