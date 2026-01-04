import fs from "fs-extra";
import { agrupar } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function porPagamento() {
  const gastos = fs.readJSONSync(DB);
  const dados = agrupar(gastos, "formaPagamento");

  for (const f in dados) {
    console.log(`${f}: R$ ${dados[f].toFixed(2)}`);
  }
}
