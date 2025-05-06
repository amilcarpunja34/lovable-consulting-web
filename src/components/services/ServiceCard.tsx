
import { ArrowRight, ChartBar, Calculator, Target, Settings, Smartphone, Database } from 'lucide-react';
import { Service } from './ServicesSection';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'chart':
        return <ChartBar className="h-10 w-10 text-primary-blue" />;
      case 'calculator':
        return <Calculator className="h-10 w-10 text-primary-blue" />;
      case 'target':
        return <Target className="h-10 w-10 text-primary-blue" />;
      case 'settings':
        return <Settings className="h-10 w-10 text-primary-blue" />;
      case 'smartphone':
        return <Smartphone className="h-10 w-10 text-primary-blue" />;
      case 'database':
        return <Database className="h-10 w-10 text-primary-blue" />;
      default:
        return <ChartBar className="h-10 w-10 text-primary-blue" />;
    }
  };

  return (
    <div
      className="service-card group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:shadow-lg hover:border-primary-blue/30"
      onClick={onClick}
    >
      <div className="mb-4">{getIcon(service.icon)}</div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
        {service.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        {service.shortDescription}
      </p>
      
      <button className="flex items-center text-primary-blue font-medium group-hover:text-blue-700 transition-all">
        <span>Saiba Mais</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
