import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/formatting';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Costs = () => {
  const monthlyCosts = [
    {
      category: 'Аренда',
      amount: 500000,
      description: 'Помещение 150 м2'
    },
    {
      category: 'Зарплаты',
      amount: 1200000,
      description: 'Инструкторы и персонал'
    },
    {
      category: 'Коммунальные услуги',
      amount: 120000,
      description: 'Электричество, вода, отопление'
    },
    {
      category: 'Маркетинг',
      amount: 150000,
      description: 'Реклама и продвижение'
    },
    {
      category: 'Прочее',
      amount: 100000,
      description: 'Расходные материалы, ремонт'
    }
  ];

  const totalCosts = monthlyCosts.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ежемесячные расходы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {monthlyCosts.map((cost, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{cost.category}</h4>
                      <p className="text-sm text-gray-500">{cost.description}</p>
                    </div>
                    <span className="font-medium">{formatCurrency(cost.amount)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Итого в месяц:</span>
                <span className="text-xl font-bold">{formatCurrency(totalCosts)}</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={monthlyCosts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {monthlyCosts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Costs;