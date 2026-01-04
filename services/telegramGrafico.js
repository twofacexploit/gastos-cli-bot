import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs-extra";
import dayjs from "dayjs";
import fetch from "node-fetch";
import "dotenv/config";

const DB = "./database/gastos.json";
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function gerarGraficoSemana() {
  const canvas = new ChartJSNodeCanvas({ width: 800, height: 400 });
  const gastos = fs.readJSONSync(DB);

  const dias = [...Array(7)].map((_, i) =>
    dayjs().subtract(6 - i, "day").format("DD/MM")
  );

  const valores = dias.map(d =>
    gastos
      .filter(g => dayjs(g.data).format("DD/MM") === d)
      .reduce((s, g) => s + g.valor, 0)
  );

  const img = await canvas.renderToBuffer({
    type: "bar",
    data: {
      labels: dias,
      datasets: [
        {
          label: "Gastos (R$)",
          data: valores,
          backgroundColor: "#f5c16c"
        }
      ]
    }
  });

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
    method: "POST",
    body: (() => {
      const form = new FormData();
      form.append("chat_id", CHAT_ID);
      form.append("photo", img, "grafico.png");
      return form;
    })()
  });
}
