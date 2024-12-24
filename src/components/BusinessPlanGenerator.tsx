import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBusinessPlan } from '../context/BusinessPlanContext';

const BusinessPlanGenerator = () => {
  const { state, dispatch } = useBusinessPlan();
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    'Project Summary',
    'Market Analysis', 
    'Services',
    'Premises',
    'Personnel',
    'Marketing Strategy',
    'Financial Plan',
    'Implementation'
  ];

  const handleUpdateProjectSummary = () => {
    dispatch({
      type: 'UPDATE_PROJECT_SUMMARY',
      payload: {
        projectName: 'Yoga Studio Project',
        businessType: 'Service',
        totalInvestment: 7800000,
        paybackPeriod: 15
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Plan for DAMU Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">{steps[currentStep]}</h2>
          
          {currentStep === 0 && (
            <div>
              <p>Project Summary Details</p>
              <Button onClick={handleUpdateProjectSummary}>
                Update Project Summary
              </Button>
            </div>
          )}

          {state.errors.length > 0 && (
            <div className="mt-4 text-red-500">
              <h3>Errors:</h3>
              <ul>
                {state.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPlanGenerator;