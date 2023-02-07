export function formatadorMonetario(valor: number): string {
  let formataDecimal = valor.toFixed(2);
  let colocaVirgula = formataDecimal.replace(".", ",");
  let resultado = `R$ ${colocaVirgula}`;
  return resultado;
}