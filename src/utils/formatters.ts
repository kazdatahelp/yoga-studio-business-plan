export const formatCurrency = (value: number, currency: string = 'KZT') => {
  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: currency
  }).format(value);
};

export const percentageFormatter = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};