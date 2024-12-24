export const validateBusinessPlanData = (data: any) => {
  const errors: string[] = [];

  // Validate executive summary
  if (!data.executiveSummary?.concept) {
    errors.push('Концепция бизнеса обязательна');
  }

  // Validate market analysis
  if (!data.marketAnalysis?.targetMarket) {
    errors.push('Описание целевого рынка обязательно');
  }

  // Validate financial plan
  if (!data.financialPlan?.initialInvestment) {
    errors.push('Начальные инвестиции обязательны');
  }

  return errors;
};

export const validateFinancialData = (data: any) => {
  const errors: string[] = [];

  if (data.revenue <= 0) {
    errors.push('Выручка должна быть положительным числом');
  }

  if (data.costs <= 0) {
    errors.push('Затраты должны быть положительным числом');
  }

  return errors;
};

export const validateMarketingPlan = (data: any) => {
  const errors: string[] = [];

  if (!data.channels || data.channels.length === 0) {
    errors.push('Укажите хотя бы один маркетинговый канал');
  }

  if (!data.budget || data.budget <= 0) {
    errors.push('Укажите корректный маркетинговый бюджет');
  }

  return errors;
};