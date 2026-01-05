import fs from "fs-extra";
import Table from "cli-table3";
import dayjs from "dayjs";
import { total } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function resumo() {
  if (!fs.existsSync(DB)) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const gastos = fs.readJSONSync(DB);

  if (!gastos.length) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const table = new Table({
    head: ["Descrição", "Categoria", "Data", "Valor (R$)"]
  });

  gastos.forEach(g => {
    table.push([
      g.descricao,
      g.categoria,
      dayjs(g.data).format("DD/MM/YYYY"),
      Number(g.valor).toFixed(2)
    ]);
  });

  console.log(table.toString());
  console.log(`💰 Total geral: R$ ${total(gastos).toFixed(2)}`);
}
