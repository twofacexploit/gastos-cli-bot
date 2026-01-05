import dayjs from "dayjs";

/* ================= TOTAL ================= */
export function total(gastos) {
  return gastos.reduce((soma, g) => soma + Number(g.valor || 0), 0);
}

/* ================= AGRUPAR POR CATEGORIA ================= */
export function porCategoria(gastos) {
  return gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + Number(g.valor || 0);
    return acc;
  }, {});
}

/* ================= AGRUPAR POR PAGAMENTO ================= */
export function porPagamento(gastos) {
  return gastos.reduce((acc, g) => {
    acc[g.formaPagamento] =
      (acc[g.formaPagamento] || 0) + Number(g.valor || 0);
    return acc;
  }, {});
}

/* ================= FILTRAR POR PERÍODO ================= */
export function porPeriodo(gastos, dias) {
  return gastos.filter(g =>
    dayjs(g.data).isAfter(dayjs().subtract(dias, "day"))
  );
}
