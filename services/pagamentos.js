import fs from "fs-extra";
import Table from "cli-table3";
import { porPagamento } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function porPagamentoCLI() {
  if (!fs.existsSync(DB)) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const gastos = fs.readJSONSync(DB);
  if (!gastos.length) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const pagamentos = porPagamento(gastos);

  const table = new Table({
    head: ["Forma de Pagamento", "Total (R$)"]
  });

  Object.entries(pagamentos).forEach(([forma, valor]) => {
    table.push([forma, valor.toFixed(2)]);
  });

  console.log(table.toString());
}
