import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessPlan } from '../../context/BusinessPlanContext';

const MarketAnalysisForm: React.FC = () => {
  const { state, dispatch } = useBusinessPlan();
  const [formData, setFormData] = useState({
    marketSize: state.marketAnalysis.marketSize || 0,
    targetAudience: state.marketAnalysis.targetAudience.join(', ') || '',
    competitors: state.marketAnalysis.competitors.join(', ') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marketSize' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    if (formData.marketSize <= 0) {
      errors.push('Market size must be a positive number');
    }
    if (formData.targetAudience.trim() === '') {
      errors.push('Target audience is required');
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
        type: 'UPDATE_MARKET_ANALYSIS',
        payload: {
          marketSize: formData.marketSize,
          targetAudience: formData.targetAudience.split(',').map(item => item.trim()),
          competitors: formData.competitors.split(',').map(item => item.trim())
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="marketSize">Market Size (KZT)</Label>
            <Input
              id="marketSize"
              name="marketSize"
              type="number"
              value={formData.marketSize}
              onChange={handleChange}
              placeholder="Total market value"
              required
            />
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="e.g., Young professionals, Fitness enthusiasts"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple audiences with commas
            </p>
          </div>

          <div>
            <Label htmlFor="competitors">Key Competitors</Label>
            <Input
              id="competitors"
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
              placeholder="e.g., Local yoga studios, Fitness centers"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple competitors with commas
            </p>
          </div>

          <Button type="submit" className="w-full">
            Save Market Analysis
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketAnalysisForm;