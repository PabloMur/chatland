export function generarNumeroAleatorio() {
  var numero = Math.floor(Math.random() * 90000) + 10000;
  return numero;
}

export function passwordsAreEqual(pOne: string, pTwo: string) {
  return pOne === pTwo;
}
