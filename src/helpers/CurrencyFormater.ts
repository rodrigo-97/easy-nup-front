export function formatCurrency(amount?: number) {
  return (
    amount &&
    Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      amount
    )
  );
}
