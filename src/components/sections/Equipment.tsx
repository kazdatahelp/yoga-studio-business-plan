import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatting';

const Equipment = () => {
  const equipment = [
    {
      category: 'Коврики и пропсы',
      items: [
        { name: 'Коврики для йоги', quantity: 30, price: 15000 },
        { name: 'Блоки для йоги', quantity: 30, price: 3000 },
        { name: 'Ремни', quantity: 20, price: 2500 },
        { name: 'Одеяла', quantity: 20, price: 5000 }
      ]
    },
    {
      category: 'Аудио и видео',
      items: [
        { name: 'Аудиосистема', quantity: 1, price: 250000 },
        { name: 'Колонки', quantity: 4, price: 45000 },
        { name: 'Микрофон', quantity: 1, price: 35000 }
      ]
    },
    {
      category: 'Мебель и интерьер',
      items: [
        { name: 'Зеркала', quantity: 6, price: 45000 },
        { name: 'Шкафчики для раздевалки', quantity: 40, price: 12000 },
        { name: 'Скамейки', quantity: 4, price: 25000 }
      ]
    }
  ];

  const calculateTotal = () => {
    return equipment.reduce((total, category) => {
      return total + category.items.reduce((categoryTotal, item) => {
        return categoryTotal + (item.price * item.quantity);
      }, 0);
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Оборудование и инвентарь</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {equipment.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex}>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{item.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Количество:</span>
                          <span>{item.quantity} шт</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Цена за ед.:</span>
                          <span>{formatCurrency(item.price)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Итого:</span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Общая стоимость:</span>
              <span className="text-xl font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Equipment;