export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-KZ').format(date);
};

export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0 && remainingMonths > 0) {
    return `${years} г ${remainingMonths} мес`;
  } else if (years > 0) {
    return `${years} г`;
  } else {
    return `${remainingMonths} мес`;
  }
};