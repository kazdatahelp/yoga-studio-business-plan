export const validateBusinessPlan = (planData: any) => {
  const errors: string[] = [];

  const requiredSections = [
    'projectSummary', 
    'marketAnalysis', 
    'financialPlan'
  ];

  requiredSections.forEach(section => {
    if (!planData[section]) {
      errors.push(`Missing required section: ${section}`);
    }
  });

  if (planData.financialPlan) {
    const { investment, paybackPeriod, profitability } = planData.financialPlan;
    
    if (investment < 5000000) {
      errors.push('Minimum investment should be 5,000,000 KZT');
    }

    if (paybackPeriod > 36) {
      errors.push('Payback period should not exceed 36 months');
    }

    if (profitability < 15) {
      errors.push('Minimum profitability should be 15%');
    }
  }

  return errors;
};