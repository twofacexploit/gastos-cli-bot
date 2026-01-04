import fs from "fs-extra";

const DB = "./database/gastos.json";

export function maioresGastos() {
  const gastos = fs.readJSONSync(DB)
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

  gastos.forEach(g =>
    console.log(`${g.descricao} - R$ ${g.valor.toFixed(2)}`)
  );
}
