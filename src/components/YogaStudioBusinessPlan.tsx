import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Layout, FileText, TrendingUp, Calendar, Users, BarChart, Download, Home } from 'lucide-react';

const YogaStudioBusinessPlan = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [planData, setPlanData] = useState({});

  const navigation = [
    { id: 'home', name: 'Главная', icon: Home },
    { id: 'summary', name: 'Резюме', icon: FileText },
    { id: 'market', name: 'Анализ рынка', icon: BarChart },
    { id: 'marketing', name: 'Маркетинг', icon: TrendingUp },
    { id: 'operations', name: 'Операции', icon: Layout },
    { id: 'team', name: 'Персонал', icon: Users },
    { id: 'financial', name: 'Финансы', icon: Calendar }
  ];

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
            <Card>
              <CardHeader>
                <CardTitle>Основные показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Инвестиции</p>
                      <p className="text-2xl font-bold">7.8 млн ₸</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Окупаемость</p>
                      <p className="text-2xl font-bold">15 мес</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Рентабельность</p>
                      <p className="text-2xl font-bold">30%</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Прогресс разработки</h3>
                  <Progress value={35} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">
                    Заполнено 35% бизнес-плана
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YogaStudioBusinessPlan;