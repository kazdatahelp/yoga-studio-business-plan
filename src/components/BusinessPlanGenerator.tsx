import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBusinessPlan } from '../context/BusinessPlanContext';

import ProjectSummaryForm from './forms/ProjectSummaryForm';
import MarketAnalysisForm from './forms/MarketAnalysisForm';

const BusinessPlanGenerator = () => {
  const { state, dispatch } = useBusinessPlan();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Project Summary', component: ProjectSummaryForm },
    { title: 'Market Analysis', component: MarketAnalysisForm },
    'Services',
    'Premises',
    'Personnel',
    'Marketing Strategy',
    'Financial Plan',
    'Implementation'
  ];

  const CurrentStepComponent = typeof steps[currentStep] !== 'string' 
    ? steps[currentStep].component 
    : null;

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Plan for DAMU Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">
            {typeof steps[currentStep] === 'string' 
              ? steps[currentStep] 
              : steps[currentStep].title}
          </h2>
          
          {CurrentStepComponent ? <CurrentStepComponent /> : (
            <div className="text-center text-gray-500">
              Step not implemented yet
            </div>
          )}

          {state.errors.length > 0 && (
            <div className="mt-4 text-red-500">
              <h3 className="font-semibold">Validation Errors:</h3>
              <ul className="list-disc list-inside">
                {state.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep} 
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPlanGenerator;