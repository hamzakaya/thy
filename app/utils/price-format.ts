export default function priceFormat(num: number, currency = "TRY") {
  const numberFormat = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
  });

  return numberFormat.format(num);
}
