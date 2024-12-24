import React, { createContext, useReducer, useContext, Dispatch } from 'react';

// Types for business plan state
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

// Initial state
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

// Action types
type Action = 
  | { type: 'UPDATE_PROJECT_SUMMARY'; payload: Partial<BusinessPlanState['projectSummary']> }
  | { type: 'UPDATE_MARKET_ANALYSIS'; payload: Partial<BusinessPlanState['marketAnalysis']> }
  | { type: 'UPDATE_FINANCIAL_PLAN'; payload: Partial<BusinessPlanState['financialPlan']> }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' };

// Reducer function
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

// Context and Provider
const BusinessPlanContext = createContext<{
  state: BusinessPlanState;
  dispatch: Dispatch<Action>;
} | undefined>(undefined);

export const BusinessPlanProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(businessPlanReducer, initialState);

  return (
    <BusinessPlanContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessPlanContext.Provider>
  );
};

// Custom hook for using the context
export const useBusinessPlan = () => {
  const context = useContext(BusinessPlanContext);
  if (context === undefined) {
    throw new Error('useBusinessPlan must be used within a BusinessPlanProvider');
  }
  return context;
};