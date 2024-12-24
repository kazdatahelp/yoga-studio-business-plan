import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, AlertTriangle } from 'lucide-react';

interface DataSource {
  name: string;
  description: string;
  lastUpdated?: string;
  status: 'ready' | 'pending' | 'error';
  type: 'import' | 'export';
}

const DataManagement = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dataSources: DataSource[] = [
    {
      name: 'Финансовые показатели',
      description: 'Доходы, расходы, прибыль',
      lastUpdated: '2024-01-15',
      status: 'ready',
      type: 'export'
    },
    {
      name: 'Клиентская база',
      description: 'Список клиентов и абонементов',
      lastUpdated: '2024-01-20',
      status: 'ready',
      type: 'export'
    },
    {
      name: 'Расписание занятий',
      description: 'Расписание и загрузка групп',
      lastUpdated: '2024-01-18',
      status: 'ready',
      type: 'export'
    },
    {
      name: 'Импорт посещений',
      description: 'Загрузка данных о посещениях',
      status: 'pending',
      type: 'import'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExport = (dataSource: DataSource) => {
    // Логика экспорта данных
    console.log(`Exporting ${dataSource.name}...`);
  };

  const getStatusColor = (status: DataSource['status']) => {
    switch (status) {
      case 'ready':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление данными</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Импорт данных</h3>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".csv,.xlsx"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Выбрать файл
                </Button>
                {selectedFile && (
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Импортировать
                  </Button>
                )}
              </div>
            </div>

            {selectedFile && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm">Выбранный файл: {selectedFile.name}</p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Доступные наборы данных</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSources.map((source, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-sm text-gray-500">{source.description}</p>
                          {source.lastUpdated && (
                            <p className="text-xs text-gray-400 mt-1">
                              Последнее обновление: {source.lastUpdated}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {source.status === 'error' && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          {source.type === 'export' && source.status === 'ready' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleExport(source)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Скачать
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagement;