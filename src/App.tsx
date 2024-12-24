import React from 'react';
import BusinessPlanGenerator from './components/BusinessPlanGenerator';
import FinancialCalculator from './components/FinancialCalculator';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Yoga Studio Business Plan Generator</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <BusinessPlanGenerator />
        <FinancialCalculator />
      </div>
    </div>
  );
};

export default App;