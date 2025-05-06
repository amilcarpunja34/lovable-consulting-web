
import { useState } from "react";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";
import { motion } from "framer-motion";

export interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
}

const servicesList: Service[] = [
  {
    id: 1,
    title: "Diagnóstico Empresarial com IA",
    shortDescription: "Análise completa do seu negócio com inteligência artificial.",
    fullDescription: "Nosso diagnóstico utiliza IA avançada para analisar todos os aspectos do seu negócio, identificando oportunidades de melhoria, gargalos operacionais e vantagens competitivas. Combinamos dados internos e externos para gerar insights acionáveis que impulsionam decisões estratégicas.",
    icon: "chart"
  },
  {
    id: 2,
    title: "Estudo de Viabilidade Econômica",
    shortDescription: "Avaliação detalhada para novos projetos e investimentos.",
    fullDescription: "Utilizando modelos preditivos de IA, nossa análise de viabilidade econômica avalia todas as variáveis relevantes para seu novo projeto ou investimento. Projetamos cenários realistas, analisamos riscos, e oferecemos recomendações baseadas em dados para maximizar suas chances de sucesso financeiro.",
    icon: "calculator"
  },
  {
    id: 3,
    title: "Consultoria Estratégica Personalizada",
    shortDescription: "Planejamento estratégico sob medida para seus objetivos.",
    fullDescription: "Nossa consultoria estratégica personalizada combina expertise humana com análises de IA para desenvolver planos de ação alinhados aos seus objetivos específicos. Trabalhamos em parceria com sua equipe para implementar mudanças significativas, monitorar resultados em tempo real e realizar ajustes ágeis quando necessário.",
    icon: "target"
  },
  {
    id: 4,
    title: "Otimização de Processos",
    shortDescription: "Reengenharia de processos para máxima eficiência.",
    fullDescription: "Identificamos ineficiências e redesenhamos fluxos de trabalho utilizando técnicas modernas de automação e IA. Nossa abordagem reduz custos, elimina redundâncias e aumenta a produtividade, resultando em processos mais enxutos e resultados superiores.",
    icon: "settings"
  },
  {
    id: 5,
    title: "Transformação Digital",
    shortDescription: "Modernização tecnológica guiada por estratégia.",
    fullDescription: "Guiamos sua empresa na adoção de tecnologias digitais transformadoras, alinhadas com seus objetivos de negócio. Desde a seleção de ferramentas até a implementação e treinamento, garantimos que sua transição digital seja suave, eficaz e gere valor mensurável em todas as áreas da organização.",
    icon: "smartphone"
  },
  {
    id: 6,
    title: "Análise Avançada de Dados",
    shortDescription: "Insights poderosos a partir dos seus dados corporativos.",
    fullDescription: "Transformamos seus dados brutos em insights estratégicos, utilizando algoritmos avançados de análise e visualização. Nossas soluções de business intelligence revelam padrões ocultos, tendências emergentes e oportunidades de crescimento que normalmente passariam despercebidos, permitindo decisões mais fundamentadas.",
    icon: "database"
  }
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container-section">
        <h2 className="section-title text-center">Nossos Serviços</h2>
        <p className="section-subtitle text-center">
          Soluções personalizadas para impulsionar o crescimento e a eficiência do seu negócio
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {servicesList.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onClick={() => setSelectedService(service)}
            />
          ))}
        </motion.div>
      </div>
      
      <ServiceModal 
        service={selectedService} 
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
}
