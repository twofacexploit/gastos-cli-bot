export function total(gastos) {
  return gastos.reduce((s, g) => s + g.valor, 0);
}

export function agrupar(gastos, campo) {
  return gastos.reduce((acc, g) => {
    acc[g[campo]] = (acc[g[campo]] || 0) + g.valor;
    return acc;
  }, {});
}
