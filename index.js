import inquirer from "inquirer";
import chalk from "chalk";

import { adicionarGasto } from "./services/addGasto.js";
import { listar } from "./services/listar.js";
import { resumo } from "./services/resumo.js";
import { porCategoriaCLI } from "./services/categorias.js";
import { porPagamentoCLI } from "./services/pagamentos.js";
import { maioresGastos } from "./services/maiores.js";
import { projecao } from "./services/projecao.js";
import { alertas } from "./services/alertas.js";
import { resetar } from "./services/resetar.js";
import { limparTela, menuRetorno } from "./utils/ui.js";

/* ================= HEADER ================= */
function header() {
  console.log(
    chalk.hex("#f5c16c")(`
╔╦╗╦ ╦╔═╗╔═╗╔═╗╔═╗╔═╗
 ║ ║║║║ ║╠╣ ╠═╣║  ║╣ 
 ╩ ╚╩╝╚═╝╚  ╩ ╩╚═╝╚═╝
`)
  );
  console.log(chalk.cyan("Gastos CLI"));
  console.log(chalk.gray("v1.0.0\n"));
}

/* ================= MENU ================= */
async function menuPrincipal() {
  await limparTela();
  header();

  const { opcao } = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Selecione uma opção:",
    choices: [
      "➕ Adicionar gasto",
      "📄 Listar lançamentos",
      "📊 Resumo geral",
      "📂 Gastos por categoria",
      "💳 Gastos por forma de pagamento",
      "🔥 Maiores gastos",
      "📈 Projeção do mês",
      "⚠️ Alertas",
      "🗑️ Resetar mês",
      "❌ Sair"
    ]
  });

  if (opcao === "❌ Sair") {
    console.log("\nAté logo 👋\n");
    process.exit(0);
  }

  const acoes = {
    "➕ Adicionar gasto": adicionarGasto,
    "📄 Listar lançamentos": listar,
    "📊 Resumo geral": resumo,
    "📂 Gastos por categoria": porCategoriaCLI,
    "💳 Gastos por forma de pagamento": porPagamentoCLI,
    "🔥 Maiores gastos": maioresGastos,
    "📈 Projeção do mês": projecao,
    "⚠️ Alertas": alertas,
    "🗑️ Resetar mês": resetar
  };

  await acoes[opcao]();
  await menuRetorno();
  menuPrincipal();
}

menuPrincipal();
