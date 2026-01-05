import inquirer from "inquirer";

/* ================= LIMPAR TELA ================= */
export async function limparTela() {
  console.clear();
}

/* ================= MENU DE RETORNO ================= */
export async function menuRetorno() {
  await inquirer.prompt({
    type: "list",
    name: "voltar",
    message: "O que deseja fazer?",
    choices: [
      "⬅️ Voltar ao menu principal",
      "❌ Sair"
    ]
  });

  // NÃO limpa a tela aqui
}
