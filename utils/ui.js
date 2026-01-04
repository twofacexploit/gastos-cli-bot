import inquirer from "inquirer";
import chalk from "chalk";

export async function limparTela() {
  console.clear();

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

export async function menuRetorno() {
  const { acao } = await inquirer.prompt({
    type: "list",
    name: "acao",
    message: chalk.white("O que deseja fazer agora?"),
    choices: [
      "🔙 Voltar ao menu principal",
      "➕ Adicionar novo gasto",
      "❌ Sair"
    ]
  });

  return acao;
}
