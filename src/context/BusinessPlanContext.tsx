'use client';

import React, { createContext, useReducer, useContext } from 'react';

interface BusinessPlanState {
  projectSummary: {
    projectName: string;
    businessType: string;
    totalInvestment: number;
    paybackPeriod: number;
  };
  marketAnalysis: {
    marketSize: number;
    targetAudience: string[];
    competitors: string[];
  };
  financialPlan: {
    investment: number;
    expectedRevenue: number;
    profitability: number;
    breakEvenPoint: number;
  };
  errors: string[];
}

type Action =
  | { type: 'UPDATE_PROJECT_SUMMARY'; payload: Partial<BusinessPlanState['projectSummary']> }
  | { type: 'UPDATE_MARKET_ANALYSIS'; payload: Partial<BusinessPlanState['marketAnalysis']> }
  | { type: 'UPDATE_FINANCIAL_PLAN'; payload: Partial<BusinessPlanState['financialPlan']> }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' };

const initialState: BusinessPlanState = {
  projectSummary: {
    projectName: '',
    businessType: '',
    totalInvestment: 0,
    paybackPeriod: 0
  },
  marketAnalysis: {
    marketSize: 0,
    targetAudience: [],
    competitors: []
  },
  financialPlan: {
    investment: 0,
    expectedRevenue: 0,
    profitability: 0,
    breakEvenPoint: 0
  },
  errors: []
};

function businessPlanReducer(state: BusinessPlanState, action: Action): BusinessPlanState {
  switch (action.type) {
    case 'UPDATE_PROJECT_SUMMARY':
      return {
        ...state,
        projectSummary: { ...state.projectSummary, ...action.payload }
      };
    case 'UPDATE_MARKET_ANALYSIS':
      return {
        ...state,
        marketAnalysis: { ...state.marketAnalysis, ...action.payload }
      };
    case 'UPDATE_FINANCIAL_PLAN':
      return {
        ...state,
        financialPlan: { ...state.financialPlan, ...action.payload }
      };
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      };
    default:
      return state;
  }
}

type BusinessPlanContextType = {
  state: BusinessPlanState;
  dispatch: React.Dispatch<Action>;
};

const BusinessPlanContext = createContext<BusinessPlanContextType | undefined>(undefined);

export function BusinessPlanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(businessPlanReducer, initialState);

  return (
    <BusinessPlanContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessPlanContext.Provider>
  );
}

export function useBusinessPlan() {
  const context = useContext(BusinessPlanContext);
  if (context === undefined) {
    throw new Error('useBusinessPlan must be used within a BusinessPlanProvider');
  }
  return context;
}
