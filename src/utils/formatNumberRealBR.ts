export function formatToReal(valor: string | number): string {
  const numero =
    typeof valor === 'string'
      ? Number(valor.replace(/\./g, '').replace(',', '.'))
      : valor;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numero);
}
