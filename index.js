import inquirer from "inquirer";
import chalk from "chalk";

import { processarComandos } from "./services/telegram.js";
import { iniciarCron } from "./services/cron.js";
import { adicionarGasto } from "./services/addGasto.js";
import { listar } from "./services/listar.js";
import { resumo } from "./services/resumo.js";
import { porCategoria } from "./services/categorias.js";
import { porPagamento } from "./services/pagamentos.js";
import { maioresGastos } from "./services/maiores.js";
import { projecao } from "./services/projecao.js";
import { alertas } from "./services/alertas.js";
import { resetar } from "./services/resetar.js";
import { limparTela, menuRetorno } from "./utils/ui.js";

async function menuPrincipal() {
  await limparTela();

  const { opcao } = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: chalk.white("Selecione uma opção:"),
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

  await executarOpcao(opcao);
}

async function executarOpcao(opcao) {
  await limparTela();

  const acoes = {
    "➕ Adicionar gasto": adicionarGasto,
    "📄 Listar lançamentos": listar,
    "📊 Resumo geral": resumo,
    "📂 Gastos por categoria": porCategoria,
    "💳 Gastos por forma de pagamento": porPagamento,
    "🔥 Maiores gastos": maioresGastos,
    "📈 Projeção do mês": projecao,
    "⚠️ Alertas": alertas,
    "🗑️ Resetar mês": resetar
  };

  if (opcao === "❌ Sair") process.exit();

  await acoes[opcao]();

  const retorno = await menuRetorno();

  if (retorno.startsWith("🔙")) return menuPrincipal();
  if (retorno.startsWith("➕")) {
    await limparTela();
    await adicionarGasto();
    return menuPrincipal();
  }

  process.exit();
}

menuPrincipal();
