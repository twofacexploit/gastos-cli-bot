import fs from "fs-extra";
import { agrupar, total } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function porCategoria() {
  const gastos = fs.readJSONSync(DB);
  const totalGeral = total(gastos);
  const cat = agrupar(gastos, "categoria");

  for (const c in cat) {
    const pct = (cat[c] / totalGeral) * 100;
    console.log(`${c}: R$ ${cat[c].toFixed(2)} (${pct.toFixed(1)}%)`);
  }
}
