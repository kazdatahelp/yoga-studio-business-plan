import { useState } from 'react';
import { validateBusinessPlan } from '../utils/damuValidation';

export const useBusinessPlanData = () => {
  const [planData, setPlanData] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  const updatePlanData = (section: string, data: any) => {
    const updatedPlanData = {
      ...planData,
      [section]: data
    };

    setPlanData(updatedPlanData);
    
    const validationErrors = validateBusinessPlan(updatedPlanData);
    setErrors(validationErrors);
  };

  return {
    planData,
    errors,
    updatePlanData
  };
};