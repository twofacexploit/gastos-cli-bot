import fs from "fs-extra";
import Table from "cli-table3";
import { porCategoria } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function porCategoriaCLI() {
  if (!fs.existsSync(DB)) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const gastos = fs.readJSONSync(DB);
  if (!gastos.length) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const categorias = porCategoria(gastos);

  const table = new Table({
    head: ["Categoria", "Total (R$)"]
  });

  Object.entries(categorias).forEach(([cat, valor]) => {
    table.push([cat, valor.toFixed(2)]);
  });

  console.log(table.toString());
}
