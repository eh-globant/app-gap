/**
 * Format number to currency
 * @param {number} amount - Amount
 * @param {string} [currency='MXN'] - Currency code (MXN, USD, EUR)
 * @param {string} [locale='es-MX'] - Regional
 * @returns {string} Formated cost
 */
export const formatPrice = (
  amount: number | null | undefined,
  currency: string = "MXN",
  locale: string = "es-MX"
): string => {
  // Validate if it is null
  if (amount === null || amount === undefined || isNaN(amount)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
