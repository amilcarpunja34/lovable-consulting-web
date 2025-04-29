
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, Star, Check } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card 
      className="service-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`w-16 h-16 rounded-full bg-primary-blue/10 flex items-center justify-center mb-6 transition-all duration-300 ${hovered ? 'bg-primary-blue text-white' : 'text-primary-blue'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary-blue mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-200">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default function ServicesSection() {
  const services = [
    {
      icon: <Briefcase size={28} />,
      title: "Consultoria Estratégica",
      description: "Desenvolvemos estratégias personalizadas para impulsionar o crescimento do seu negócio.",
      features: [
        "Análise competitiva do mercado",
        "Definição de objetivos claros",
        "Planejamento estratégico",
        "Monitoramento de resultados"
      ]
    },
    {
      icon: <Users size={28} />,
      title: "Gestão de Equipes",
      description: "Transformamos equipes em alto desempenho com metodologias comprovadas.",
      features: [
        "Desenvolvimento de liderança",
        "Otimização de processos",
        "Programas de capacitação",
        "Cultura organizacional"
      ]
    },
    {
      icon: <Star size={28} />,
      title: "Inovação Corporativa",
      description: "Implementamos soluções inovadoras para manter sua empresa à frente da concorrência.",
      features: [
        "Design thinking aplicado",
        "Transformação digital",
        "Criação de novos produtos",
        "Otimização de processos"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container-section">
        <h2 className="section-title text-center">Nossos Serviços</h2>
        <p className="section-subtitle text-center">
          Soluções personalizadas para cada etapa do desenvolvimento do seu negócio
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
