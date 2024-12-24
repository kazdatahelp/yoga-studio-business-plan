export const calculateBreakEven = (fixedCosts: number, price: number, variableCosts: number) => {
  const contributionMargin = price - variableCosts;
  return fixedCosts / contributionMargin;
};

export const calculatePaybackPeriod = (initialInvestment: number, monthlyIncome: number) => {
  return initialInvestment / monthlyIncome;
};

export const calculateROI = (netProfit: number, investment: number) => {
  return (netProfit / investment) * 100;
};

export const calculateNPV = (cashFlows: number[], rate: number) => {
  return cashFlows.reduce((npv, cf, t) => {
    return npv + cf / Math.pow(1 + rate, t);
  }, 0);
};

export const calculateIRR = (cashFlows: number[], guess = 0.1) => {
  const maxIterations = 100;
  const tolerance = 1e-7;
  
  let rate = guess;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, rate);
    if (Math.abs(npv) < tolerance) {
      return rate;
    }
    
    const derivative = cashFlows.reduce((sum, cf, t) => {
      return sum - t * cf / Math.pow(1 + rate, t + 1);
    }, 0);
    
    rate = rate - npv / derivative;
  }
  
  return rate;
};