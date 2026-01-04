import fs from "fs-extra";

const DB = "./database/gastos.json";

export function listar() {
  if (!fs.existsSync(DB)) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  const gastos = fs.readJSONSync(DB);

  if (gastos.length === 0) {
    console.log("Nenhum gasto registrado.");
    return;
  }

  gastos.forEach(g => {
    console.log(
      `${g.data} | ${g.descricao} | ${g.categoria} | ${g.formaPagamento} | R$ ${g.valor.toFixed(2)}`
    );
  });
}
