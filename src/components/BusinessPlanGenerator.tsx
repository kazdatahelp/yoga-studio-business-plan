import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const BusinessPlanGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Plan for DAMU Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
        {/* Step-specific content will be added */}
      </CardContent>
    </Card>
  );
};

export default BusinessPlanGenerator;