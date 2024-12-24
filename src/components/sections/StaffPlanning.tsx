import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatting';

const StaffPlanning = () => {
  const staffRoles = [
    {
      role: 'Управляющий',
      count: 1,
      salary: 350000,
      bonus: 'До 30% от прибыли',
      responsibilities: [
        'Общее руководство',
        'Развитие бизнеса',
        'Управление персоналом',
        'Работа с клиентами'
      ],
      requirements: [
        'Опыт управления от 2 лет',
        'Знание сферы фитнеса/йоги',
        'Навыки продаж'
      ]
    },
    {
      role: 'Инструктор йоги',
      count: 5,
      salary: 200000,
      bonus: 'За каждое занятие',
      responsibilities: [
        'Проведение занятий',
        'Составление программ',
        'Консультации'
      ],
      requirements: [
        'Сертификаты инструктора',
        'Опыт от 1 года',
        'Навыки коммуникации'
      ]
    },
    {
      role: 'Администратор',
      count: 2,
      salary: 180000,
      bonus: 'Процент от продаж',
      responsibilities: [
        'Работа с клиентами',
        'Продажа абонементов',
        'Ведение документации'
      ],
      requirements: [
        'Опыт работы от 1 года',
        'Знание CRM',
        'Навыки продаж'
      ]
    }
  ];

  const totalMonthlySalary = staffRoles.reduce((total, role) => {
    return total + (role.salary * role.count);
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Штатное расписание</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffRoles.map((role, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{role.role}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Количество:</span>
                      <span>{role.count} чел.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Оклад:</span>
                      <span>{formatCurrency(role.salary)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Бонусы:</span>
                      <span>{role.bonus}</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Обязанности:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Требования:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {role.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Фонд оплаты труда (в месяц):</span>
              <span className="text-xl font-bold">{formatCurrency(totalMonthlySalary)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPlanning;