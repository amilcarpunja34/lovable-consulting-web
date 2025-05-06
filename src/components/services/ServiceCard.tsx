
import { ArrowRight, ChartBar, Calculator, Target, Settings, Smartphone, Database } from 'lucide-react';
import { Service } from './ServicesSection';
import { motion } from 'framer-motion';
import { buttonHover } from '@/utils/animationVariants';

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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "var(--card-hover-bg, #f9fafb)",
        borderColor: "var(--card-hover-border, #e5e7eb)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
      className="service-card group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-100 dark:border-slate-700 transition-all duration-300"
      onClick={onClick}
    >
      <motion.div 
        className="mb-4 relative"
        initial={{ rotate: 0 }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 }
        }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.05, 1],
            transition: { duration: 1.5, repeat: Infinity }
          }}
        >
          {getIcon(service.icon)}
        </motion.div>
        <motion.div 
          className="absolute -inset-2 bg-blue-100 dark:bg-blue-900/30 rounded-full z-[-1]" 
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-primary-blue transition-colors">
        {service.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        {service.shortDescription}
      </p>
      
      <motion.button 
        className="flex items-center text-primary-blue font-medium group-hover:text-blue-700 transition-all"
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
      >
        <span>Saiba Mais</span>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
