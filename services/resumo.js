import fs from "fs-extra";
import Table from "cli-table3";
import { total } from "../utils/calculos.js";

const DB = "./database/gastos.json";

export function resumo() {
  if (!fs.existsSync(DB)) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const gastos = fs.readJSONSync(DB);

  if (gastos.length === 0) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const tabela = new Table({
    head: ["Descrição", "Categoria", "Valor (R$)"]
  });

  gastos.forEach(g => {
    tabela.push([
      g.descricao,
      g.categoria,
      Number.isFinite(g.valor) ? g.valor.toFixed(2) : "ERRO"
    ]);
  });

  console.log(tabela.toString());
  console.log(`💰 Total geral: R$ ${total(gastos).toFixed(2)}`);
}
