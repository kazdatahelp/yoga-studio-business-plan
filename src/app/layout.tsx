import './globals.css';
import { Inter } from 'next/font/google';
import { BusinessPlanProvider } from '../context/BusinessPlanContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Бизнес-План Студии Йоги',
  description: 'Генератор бизнес-плана по требованиям ДАМУ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.className}>
      <body className="min-h-screen bg-background">
        <BusinessPlanProvider>
          {children}
        </BusinessPlanProvider>
      </body>
    </html>
  )
}
