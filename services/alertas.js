import fs from "fs-extra";
import { total } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function alertas() {
  const gastos = fs.readJSONSync(DB);
  const media = total(gastos) / gastos.length;

  gastos
    .filter(g => g.valor > media * 2)
    .forEach(g =>
      console.log(`⚠️ Gasto alto: ${g.descricao} (R$ ${g.valor})`)
    );
}
