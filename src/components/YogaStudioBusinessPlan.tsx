'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Layout, FileText, TrendingUp, Calendar, Users, BarChart, Download, Home, Check } from 'lucide-react';
import { useBusinessPlan } from '../context/BusinessPlanContext';
import BusinessPlanGenerator from './BusinessPlanGenerator';

const YogaStudioBusinessPlan = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const { state } = useBusinessPlan();

  const isSectionComplete = (id: string) => {
    switch (id) {
      case 'summary':
        return Boolean(state.projectSummary.projectName);
      case 'market':
        return state.marketAnalysis.marketSize > 0;
      case 'financial':
        return state.financialPlan.investment > 0;
      default:
        return false;
    }
  };

  const calculateProgress = () => {
    const totalSections = navigation.length - 1; // Excluding home
    const completedSections = navigation.slice(1).filter(item => isSectionComplete(item.id)).length;
    return (completedSections / totalSections) * 100;
  };

  const navigation = [
    { id: 'home', name: 'Обзор', icon: Home },
    { id: 'plan', name: 'Бизнес-План', icon: FileText }
  ];

  const renderSection = () => {
    if (currentSection === 'home') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Основные показатели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Инвестиции</p>
                  <p className="text-2xl font-bold">{state.financialPlan.investment.toLocaleString('ru-RU')} ₸</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Окупаемость</p>
                  <p className="text-2xl font-bold">{state.projectSummary.paybackPeriod} мес</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Рентабельность</p>
                  <p className="text-2xl font-bold">{state.financialPlan.profitability}%</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Прогресс разработки</h3>
              <Progress value={calculateProgress()} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">
                Заполнено {Math.round(calculateProgress())}% бизнес-плана
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Следующие шаги</h3>
              <div className="space-y-2">
                {navigation.slice(1).map((item, index) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setCurrentSection(item.id)}
                  >
                    <span className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </span>
                    {isSectionComplete(item.id) ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (currentSection === 'plan') {
      return <BusinessPlanGenerator />;
    }

    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-500">Раздел в разработке</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="font-semibold text-lg">Бизнес-План Студии Йоги</span>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Скачать PDF
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-64 bg-white shadow-sm min-h-screen p-4">
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant={currentSection === item.id ? 'default' : 'ghost'}
              className="w-full justify-start mb-1"
              onClick={() => setCurrentSection(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </div>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default YogaStudioBusinessPlan;
