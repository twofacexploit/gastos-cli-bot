import dayjs from "dayjs";
import { getGastos, saveGastos } from "../../utils/db.js";

function ajudaAdd() {
  return (
`❌ *Formato inválido*

Use exatamente assim:
\`/add Descrição | Valor | Categoria | Pagamento\`

Exemplos:
• /add Mercado | 200 | Gastos Diários | PIX
• /add Netflix | 39.90 | Assinaturas | Cartão`
  );
}

export default {
  "/add": (texto) => {
    const partes = texto.replace("/add", "").split("|").map(p => p.trim());

    if (partes.length !== 4) {
      return ajudaAdd();
    }

    const [descricao, valorRaw, categoria, pagamento] = partes;

    const valor = Number(
      valorRaw.replace(",", ".")
    );

    if (!descricao || isNaN(valor) || valor <= 0 || !categoria || !pagamento) {
      return ajudaAdd();
    }

    const gasto = {
      data: dayjs().format("YYYY-MM-DD"),
      descricao,
      valor,
      categoria,
      formaPagamento: pagamento,
      tipo: categoria.toLowerCase().includes("fix")
        ? "Fixo"
        : "Variável"
    };

    const gastos = getGastos();
    gastos.push(gasto);
    saveGastos(gastos);

    return (
`✅ *Gasto adicionado com sucesso*

🧾 ${descricao}
💰 R$ ${valor.toFixed(2)}
📂 ${categoria}
💳 ${pagamento}`
    );
  }
};
