import fs from "fs-extra";
import inquirer from "inquirer";
import dayjs from "dayjs";

const DB_DIR = "./database";
const DB_FILE = "./database/gastos.json";

/* ================== GARANTIR DATABASE ================== */
function garantirDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR);
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeJSONSync(DB_FILE, []);
  }
}

/* ================== ADICIONAR GASTO ================== */
export async function adicionarGasto() {
  garantirDB();

  const respostas = await inquirer.prompt([
    {
      type: "input",
      name: "descricao",
      message: "Descrição do gasto:",
      validate: v => v ? true : "Informe uma descrição"
    },
    {
      type: "input",
      name: "valor",
      message: "Valor (R$):",
      validate: v => !isNaN(v) && Number(v) > 0
        ? true
        : "Informe um valor válido"
    },
    {
      type: "list",
      name: "categoria",
      message: "Categoria:",
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
      type: "input",
      name: "formaPagamento",
      message: "Forma de pagamento (PIX, Débito, Crédito, Dinheiro):",
      default: "PIX"
    }
  ]);

  const gasto = {
    data: dayjs().format("YYYY-MM-DD"),
    descricao: respostas.descricao,
    categoria: respostas.categoria,
    formaPagamento: respostas.formaPagamento,
    valor: Number(respostas.valor),
    tipo: respostas.categoria === "Contas Fixas" ? "Fixo" : "Variável"
  };

  const gastos = fs.readJSONSync(DB_FILE);
  gastos.push(gasto);
  fs.writeJSONSync(DB_FILE, gastos, { spaces: 2 });

  console.log("\n✅ Gasto registrado com sucesso!\n");
}
