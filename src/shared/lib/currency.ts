export const formatMXN = (value: number): string => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return parseInt(value.toString()) === value
    ? `$${value}`
    : formatter.format(value);
};
