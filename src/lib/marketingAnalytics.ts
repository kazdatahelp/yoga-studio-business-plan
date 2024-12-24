export const calculateCAC = (marketingCosts: number, newCustomers: number) => {
  return marketingCosts / newCustomers;
};

export const calculateLTV = (averageMonthlyRevenue: number, churnRate: number) => {
  return averageMonthlyRevenue / churnRate;
};

export const calculateConversionRate = (conversions: number, visitors: number) => {
  return (conversions / visitors) * 100;
};

export const calculateChurnRate = (customersLost: number, totalCustomers: number) => {
  return (customersLost / totalCustomers) * 100;
};

export const calculateROAS = (revenue: number, adSpend: number) => {
  return revenue / adSpend;
};