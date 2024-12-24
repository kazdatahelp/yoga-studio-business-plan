'use client';

import React from 'react';
import { BusinessPlanProvider } from '../context/BusinessPlanContext';
import YogaStudioBusinessPlan from './YogaStudioBusinessPlan';

const BusinessPlanApp = () => {
  return (
    <BusinessPlanProvider>
      <YogaStudioBusinessPlan />
    </BusinessPlanProvider>
  );
};

export default BusinessPlanApp;
