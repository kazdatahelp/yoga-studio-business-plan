'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { ChevronLeft, ChevronRight, Check, ArrowRight, X } from 'lucide-react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';

interface FormData {
  [key: `${number}-${number}`]: string;
}

const MarketAnalysisForm: React.FC = () => {
  const { state, dispatch } = useBusinessPlan();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  const steps = [
    {
      title: 'Маркетинг',
      subSteps: [
        'Анализ рынка',
        'Целевая аудитория',
        'Конкуренты',
        'Продвижение',
        'Ценообразование'
      ]
    }
  ];

  const handleNext = () => {
    if (currentSubStep < steps[currentStep].subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(0);
    }
  };

  const handlePrevious = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps.length - 1);
    }
  };

  const calculateProgress = () => {
    const totalSteps = steps.reduce((acc, step) => acc + step.subSteps.length, 0);
    const completedSteps = steps.slice(0, currentStep).reduce((acc, step) => acc + step.subSteps.length, 0) + currentSubStep + 1;
    return (completedSteps / totalSteps) * 100;
  };

  const handleDataSave = (data: string) => {
    setFormData({
      ...formData,
      [`${currentStep}-${currentSubStep}`]: data
    });
    setIsModalOpen(false);

    // Update context state
    if (currentStep === 0 && currentSubStep === 0) {
      dispatch({
        type: 'UPDATE_MARKET_ANALYSIS',
        payload: {
          marketSize: Number(data) || 0
        }
      });
    }
  };

  const getCurrentData = () => {
    return formData[`${currentStep}-${currentSubStep}`] || '';
  };

  const InputForm = () => {
    const [inputValue, setInputValue] = useState(getCurrentData());
    const currentSubStepData = steps[currentStep].subSteps[currentSubStep];

    const isNumberInput = currentStep === 0 && currentSubStep === 0; // Only market size is number

    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              {currentSubStepData}
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {isNumberInput ? (
            <Input
              type="number"
              placeholder='Введите значение...'
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              className="min-h-[40px]"
            />
          ) : (
            <Textarea
              placeholder='Введите описание...'
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
              className="min-h-[200px]"
            />
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={() => handleDataSave(inputValue)}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">Маркетинговый план</CardTitle>
          <span className="text-sm font-normal">
            Этап {currentStep + 1} из {steps.length}
          </span>
        </div>
        <Progress value={calculateProgress()} className="w-full h-2" />
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
          <p className="text-sm text-gray-500">
            Подэтап {currentSubStep + 1} из {steps[currentStep].subSteps.length}
          </p>
        </div>
              
        <div className="grid gap-2">
          {steps[currentStep].subSteps.map((subStep, index) => (
            <Button
              key={index}
              variant={index === currentSubStep ? "default" : "outline"}
              className={`h-auto py-2 px-3 justify-between text-left ${
                index === currentSubStep ? 'bg-green-600' : ''
              } ${formData[`${currentStep}-${index}`] ? 'border-green-500' : ''}`}
              onClick={() => {
                setCurrentSubStep(index);
                if (index === currentSubStep) {
                  setIsModalOpen(true);
                }
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm">{subStep}</span>
                <div className="flex items-center">
                  {formData[`${currentStep}-${index}`] && (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {index === currentSubStep && <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 && currentSubStep === 0}
            className="flex items-center"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1}
            className="flex items-center"
            size="sm"
          >
            {currentStep === steps.length - 1 && currentSubStep === steps[currentStep].subSteps.length - 1 ? (
              <>
                Завершить
                <Check className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Далее
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
      
      <InputForm />
    </Card>
  );
};

export default MarketAnalysisForm;
