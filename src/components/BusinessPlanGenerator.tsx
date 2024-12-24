'use client'

import React, { useState, ChangeEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { ChevronLeft, ChevronRight, Check, ArrowRight, X } from 'lucide-react';
import { useBusinessPlan } from '../context/BusinessPlanContext';

interface Step {
  title: string;
  subSteps: string[];
}

interface FormData {
  [key: `${number}-${number}`]: string;
}

const BusinessPlanGenerator = () => {
  const { state } = useBusinessPlan();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  const steps: Step[] = [
    {
      title: 'Резюме',
      subSteps: [
        'Общая информация о проекте',
        'Цели и задачи',
        'Ключевые особенности',
        'Бизнес-модель'
      ]
    },
    {
      title: 'Введение',
      subSteps: [
        'Сумма финансирования',
        'Сроки кредитования',
        'Целевое использование'
      ]
    },
    {
      title: 'Концепция',
      subSteps: [
        'Описание компании',
        'Анализ отрасли',
        'Перспективы развития',
        'Конкурентные преимущества'
      ]
    },
    {
      title: 'Продукт',
      subSteps: [
        'Описание продукта',
        'Характеристики',
        'Стадия разработки',
        'Патенты'
      ]
    },
    {
      title: 'Производство',
      subSteps: [
        'Процесс производства',
        'Мощности',
        'Оборудование',
        'План производства'
      ]
    },
    {
      title: 'Маркетинг',
      subSteps: [
        'Анализ рынка',
        'Целевая аудитория',
        'Конкуренты',
        'Продвижение',
        'Ценообразование'
      ]
    },
    {
      title: 'Финансы',
      subSteps: [
        'Инвестиции',
        'Доходы',
        'Расходы',
        'Движение средств',
        'Точка безубыточности',
        'Источники финансирования',
        'Показатели NPV/IRR',
        'Риски'
      ]
    },
    {
      title: 'План внедрения',
      subSteps: [
        'Оборудование',
        'Процессы',
        'Помещение',
        'Сроки'
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
  };

  const getCurrentData = () => {
    return formData[`${currentStep}-${currentSubStep}`] || '';
  };

  const InputForm = () => {
    const [inputValue, setInputValue] = useState(getCurrentData());
    const currentSubStepData = steps[currentStep].subSteps[currentSubStep];

    const isNumberInput = 
      currentStep === 1 && (currentSubStep === 0 || currentSubStep === 1) || // Финансирование и сроки
      currentStep === 6 && [0, 1, 2, 4, 6].includes(currentSubStep); // Финансовые показатели

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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              className="min-h-[40px]"
            />
          ) : (
            <Textarea
              placeholder='Введите описание...'
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
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
    <div className="max-w-4xl mx-auto p-2">
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg">Бизнес-План для Фонда &quot;Даму&quot;</CardTitle>
            <span className="text-sm font-normal">
              Этап {currentStep + 1} из {steps.length}
            </span>
          </div>
          <Progress value={calculateProgress()} className="w-full h-2" />
        </CardHeader>

        <div className="px-4 py-2 border-b bg-gray-50">
          <div className="flex flex-wrap gap-1">
            {steps.map((step, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-8 px-2 py-1 ${
                  currentStep === index 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setCurrentStep(index);
                  setCurrentSubStep(0);
                }}
              >
                <span className="w-5 h-5 rounded-full inline-flex items-center justify-center mr-1 text-xs border">
                  {index + 1}
                </span>
                <span className="text-xs">{step.title}</span>
              </Button>
            ))}
          </div>
        </div>

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
      </Card>

      <Card className="mt-2">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">Рекомендации</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <ul className="space-y-1 text-sm">
            <li className="flex items-center">
              <Check className="w-3 h-3 mr-2 text-green-500" />
              Тщательно проработайте финансовую часть
            </li>
            <li className="flex items-center">
              <Check className="w-3 h-3 mr-2 text-green-500" />
              Уделите внимание анализу рисков
            </li>
            <li className="flex items-center">
              <Check className="w-3 h-3 mr-2 text-green-500" />
              Продемонстрируйте выгоду от бизнес-идеи
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <InputForm />
    </div>
  );
};

export default BusinessPlanGenerator;
