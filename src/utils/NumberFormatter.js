export function toVND(x) {
  if (x == null) return "n/a";

  return numberWithSpaces(
    x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
  );
}

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
