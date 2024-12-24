import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, DollarSign, Users, Building, Activity } from 'lucide-react';

const RiskAnalysis = () => {
  const risks = [/* ... предыдущий код с рисками ... */];

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'Высокая':
        return 'bg-red-100 text-red-800';
      case 'Средняя':
        return 'bg-yellow-100 text-yellow-800';
      case 'Низкая':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Высокий':
        return 'bg-red-100 text-red-800';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-800';
      case 'Низкий':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Анализ рисков
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {risks.map((riskCategory, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <riskCategory.icon className="h-5 w-5" />
                    {riskCategory.category}
                  </h3>
                  <div className="space-y-4">
                    {riskCategory.items.map((risk, riskIndex) => (
                      <Card key={riskIndex}>
                        <CardContent className="p-4">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{risk.name}</h4>
                              <div className="flex gap-2">
                                <Badge className={getProbabilityColor(risk.probability)}>
                                  {risk.probability}
                                </Badge>
                                <Badge className={getImpactColor(risk.impact)}>
                                  {risk.impact}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-2">
                              <h5 className="text-sm font-medium mb-1">Меры по снижению:</h5>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {risk.mitigation.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Матрица рисков</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-1/4"></th>
                      <th className="p-2 text-center bg-green-100">Низкий ущерб</th>
                      <th className="p-2 text-center bg-yellow-100">Средний ущерб</th>
                      <th className="p-2 text-center bg-red-100">Высокий ущерб</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 font-medium">Высокая вероятность</td>
                      <td className="p-2 bg-yellow-50 text-center">3</td>
                      <td className="p-2 bg-red-50 text-center">4</td>
                      <td className="p-2 bg-red-100 text-center">5</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Средняя вероятность</td>
                      <td className="p-2 bg-green-50 text-center">2</td>
                      <td className="p-2 bg-yellow-50 text-center">3</td>
                      <td className="p-2 bg-red-50 text-center">4</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Низкая вероятность</td>
                      <td className="p-2 bg-green-50 text-center">1</td>
                      <td className="p-2 bg-green-50 text-center">2</td>
                      <td className="p-2 bg-yellow-50 text-center">3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysis;