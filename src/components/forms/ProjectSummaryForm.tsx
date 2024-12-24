import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessPlan } from '../../context/BusinessPlanContext';

const ProjectSummaryForm: React.FC = () => {
  const { state, dispatch } = useBusinessPlan();
  const [formData, setFormData] = useState({
    projectName: state.projectSummary.projectName || '',
    businessType: state.projectSummary.businessType || '',
    totalInvestment: state.projectSummary.totalInvestment || 0,
    paybackPeriod: state.projectSummary.paybackPeriod || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Investment') || name.includes('Period') 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: string[] = [];
    if (formData.projectName.trim() === '') {
      errors.push('Project name is required');
    }
    if (formData.totalInvestment < 5000000) {
      errors.push('Minimum investment should be 5,000,000 KZT');
    }
    if (formData.paybackPeriod > 36) {
      errors.push('Payback period should not exceed 36 months');
    }

    // Clear previous errors
    dispatch({ type: 'CLEAR_ERRORS' });

    // Add new errors if any
    errors.forEach(error => 
      dispatch({ type: 'ADD_ERROR', payload: error })
    );

    // Update state if no errors
    if (errors.length === 0) {
      dispatch({
        type: 'UPDATE_PROJECT_SUMMARY',
        payload: formData
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="e.g., Yoga Studio"
              required
            />
          </div>

          <div>
            <Label htmlFor="totalInvestment">Total Investment (KZT)</Label>
            <Input
              id="totalInvestment"
              name="totalInvestment"
              type="number"
              value={formData.totalInvestment}
              onChange={handleChange}
              placeholder="Minimum 5,000,000 KZT"
              min={5000000}
              required
            />
          </div>

          <div>
            <Label htmlFor="paybackPeriod">Payback Period (Months)</Label>
            <Input
              id="paybackPeriod"
              name="paybackPeriod"
              type="number"
              value={formData.paybackPeriod}
              onChange={handleChange}
              placeholder="Maximum 36 months"
              max={36}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Save Project Summary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectSummaryForm;