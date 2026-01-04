import inquirer from "inquirer";
import fs from "fs-extra";
import dayjs from "dayjs";
import { enviarTelegram } from "./telegram.js";

const DB = "./database/gastos.json";

function normalizarValor(valor) {
  return Number(
    valor
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

export async function adicionarGasto() {
  const g = await inquirer.prompt([
    { name: "descricao", message: "Descrição:" },
    {
      name: "valor",
      message: "Valor (R$):",
      validate: v =>
        isNaN(normalizarValor(v)) ? "Digite um valor válido" : true
    },
    {
      type: "list",
      name: "categoria",
      choices: [
        "Cartão de Crédito",
        "Contas Fixas",
        "Veículo",
        "Gastos Diários",
        "Assinaturas",
        "Saúde",
        "Educação",
        "Impostos e Taxas",
        "Outros"
      ]
    },
    {
      type: "list",
      name: "formaPagamento",
      choices: ["Crédito", "Débito", "PIX", "Dinheiro"]
    }
  ]);

  const gasto = {
    data: dayjs().format("YYYY-MM-DD"),
    descricao: g.descricao,
    categoria: g.categoria,
    formaPagamento: g.formaPagamento,
    valor: normalizarValor(g.valor),
    tipo: ["Contas Fixas", "Assinaturas"].includes(g.categoria)
      ? "Fixo"
      : "Variável"
  };

  const dados = fs.existsSync(DB) ? fs.readJSONSync(DB) : [];
  dados.push(gasto);
  fs.writeJSONSync(DB, dados, { spaces: 2 });

  console.log("\n✅ Gasto registrado com sucesso!\n");

  await enviarTelegram(`
💸 *Novo gasto registrado*

📌 *Descrição:* ${gasto.descricao}
📂 *Categoria:* ${gasto.categoria}
💳 *Pagamento:* ${gasto.formaPagamento}
💰 *Valor:* R$ ${gasto.valor.toFixed(2)}
📅 *Data:* ${gasto.data}
`);
}
