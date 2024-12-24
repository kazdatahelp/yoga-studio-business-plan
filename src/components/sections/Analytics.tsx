import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '@/lib/formatting';

const Analytics = () => {
  const monthlyData = [
    { month: 'Янв', revenue: 2500000, clients: 150, newClients: 45, avgTicket: 16667, retention: 85 },
    { month: 'Фев', revenue: 2700000, clients: 165, newClients: 40, avgTicket: 16364, retention: 87 },
    { month: 'Мар', revenue: 2900000, clients: 180, newClients: 50, avgTicket: 16111, retention: 88 },
    { month: 'Апр', revenue: 3100000, clients: 195, newClients: 48, avgTicket: 15897, retention: 86 },
    { month: 'Май', revenue: 3300000, clients: 210, newClients: 52, avgTicket: 15714, retention: 89 },
    { month: 'Июн', revenue: 3500000, clients: 225, newClients: 55, avgTicket: 15556, retention: 90 }
  ];

  const packageData = [
    { name: 'Разовое занятие', value: 20 },
    { name: 'Абонемент 4 занятия', value: 35 },
    { name: 'Абонемент 8 занятий', value: 30 },
    { name: 'Абонемент 12 занятий', value: 15 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const kpis = [
    {
      title: 'Выручка за месяц',
      value: formatCurrency(monthlyData[monthlyData.length - 1].revenue),
      change: '+12%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Активных клиентов',
      value: monthlyData[monthlyData.length - 1].clients,
      change: '+8%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Средний чек',
      value: formatCurrency(monthlyData[monthlyData.length - 1].avgTicket),
      change: '-2%',
      trend: 'down',
      icon: Activity
    }
  ];

  const statistics = [
    {
      title: 'Удержание клиентов',
      value: `${monthlyData[monthlyData.length - 1].retention}%`,
      details: 'За последний месяц'
    },
    {
      title: 'Новые клиенты',
      value: monthlyData[monthlyData.length - 1].newClients,
      details: 'За последний месяц'
    },
    {
      title: 'Средняя загрузка',
      value: '65%',
      details: 'Заполняемость групп'
    },
    {
      title: 'Повторные покупки',
      value: '75%',
      details: 'Продление абонементов'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Аналитика</CardTitle>
        </CardHeader>
        <CardContent>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {kpis.map((kpi, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                    </div>
                    <kpi.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="mt-2 flex items-center">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Выручка" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Package Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Распределение абонементов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {packageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statistics.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="text-sm text-gray-500">{stat.title}</h3>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;