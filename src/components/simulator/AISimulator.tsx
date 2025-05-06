
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AISimulatorProps {
  onClose: () => void;
}

type Step = {
  id: number;
  question: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[];
};

type ResultType = {
  title: string;
  description: string;
  recommendedService: string;
  ctaText: string;
};

const simulatorSteps: Step[] = [
  {
    id: 1,
    question: "Qual é o principal desafio da sua empresa atualmente?",
    options: [
      { id: "growth", label: "Crescimento e Escalabilidade", value: "growth" },
      { id: "efficiency", label: "Eficiência Operacional", value: "efficiency" },
      { id: "digital", label: "Transformação Digital", value: "digital" },
      { id: "strategy", label: "Definição de Estratégia", value: "strategy" }
    ]
  },
  {
    id: 2,
    question: "Qual o tamanho da sua empresa?",
    options: [
      { id: "small", label: "Pequena (até 19 funcionários)", value: "small" },
      { id: "medium", label: "Média (20 a 99 funcionários)", value: "medium" },
      { id: "large", label: "Grande (100+ funcionários)", value: "large" }
    ]
  },
  {
    id: 3,
    question: "Qual horizonte de tempo você busca para resultados?",
    options: [
      { id: "short", label: "Curto prazo (até 3 meses)", value: "short" },
      { id: "medium", label: "Médio prazo (3 a 12 meses)", value: "medium" },
      { id: "long", label: "Longo prazo (mais de 12 meses)", value: "long" }
    ]
  }
];

const resultMap: Record<string, Record<string, Record<string, ResultType>>> = {
  growth: {
    small: {
      short: {
        title: "Consultoria Estratégica de Crescimento Rápido",
        description: "Baseado nas suas respostas, recomendamos nossa Consultoria Estratégica com foco em crescimento acelerado para pequenas empresas.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Agendar Consultoria de Crescimento"
      },
      medium: {
        title: "Plano de Expansão Sustentável",
        description: "Para sua empresa de pequeno porte com objetivos de médio prazo, recomendamos nosso Plano de Expansão Sustentável.",
        recommendedService: "Estudo de Viabilidade Econômica",
        ctaText: "Conhecer Plano de Expansão"
      },
      long: {
        title: "Planejamento Estratégico de Longo Prazo",
        description: "Para objetivos de longo prazo, recomendamos nosso serviço de Planejamento Estratégico que estabelece bases sólidas para o futuro.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Planejamento Estratégico"
      }
    },
    medium: {
      short: {
        title: "Aceleração de Crescimento para Médias Empresas",
        description: "Nossa análise indica que você precisa de uma estratégia de aceleração rápida adequada para o porte da sua empresa.",
        recommendedService: "Diagnóstico Empresarial com IA",
        ctaText: "Iniciar Aceleração de Crescimento"
      },
      medium: {
        title: "Estratégia de Expansão para Médio Porte",
        description: "Recomendamos nosso programa de expansão para médias empresas, com resultados projetados para os próximos 12 meses.",
        recommendedService: "Estudo de Viabilidade Econômica",
        ctaText: "Ver Estratégia de Expansão"
      },
      long: {
        title: "Transformação Organizacional Completa",
        description: "Para médias empresas com visão de longo prazo, recomendamos nossa Transformação Organizacional Completa.",
        recommendedService: "Transformação Digital",
        ctaText: "Começar Transformação Organizacional"
      }
    },
    large: {
      short: {
        title: "Otimização de Performance Corporativa",
        description: "Para grandes empresas que buscam resultados rápidos, nossa Otimização de Performance é ideal.",
        recommendedService: "Otimização de Processos",
        ctaText: "Iniciar Otimização de Performance"
      },
      medium: {
        title: "Estratégia de Mercado Baseada em IA",
        description: "Recomendamos nossa Estratégia de Mercado Baseada em IA, ideal para grandes corporações com objetivos de médio prazo.",
        recommendedService: "Análise Avançada de Dados",
        ctaText: "Explorar Estratégia de Mercado"
      },
      long: {
        title: "Transformação Digital Corporativa",
        description: "Para grandes empresas com visão de longo prazo, nossa Transformação Digital Corporativa é a solução ideal.",
        recommendedService: "Transformação Digital",
        ctaText: "Iniciar Transformação Digital"
      }
    }
  },
  efficiency: {
    small: {
      short: {
        title: "Otimização Rápida de Processos",
        description: "Para pequenas empresas que precisam de eficiência imediata, recomendamos nossa Otimização Rápida de Processos.",
        recommendedService: "Otimização de Processos",
        ctaText: "Começar Otimização Rápida"
      },
      medium: {
        title: "Reengenharia de Processos",
        description: "Nossa Reengenharia de Processos é ideal para pequenas empresas que buscam melhorias significativas em médio prazo.",
        recommendedService: "Otimização de Processos",
        ctaText: "Explorar Reengenharia de Processos"
      },
      long: {
        title: "Transformação Operacional Completa",
        description: "Recomendamos nossa Transformação Operacional Completa para resultados duradouros em pequenas empresas.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Transformação Operacional"
      }
    },
    medium: {
      short: {
        title: "Diagnóstico e Correção de Eficiência",
        description: "Para médias empresas que precisam de resultados rápidos, nosso Diagnóstico e Correção de Eficiência é ideal.",
        recommendedService: "Diagnóstico Empresarial com IA",
        ctaText: "Iniciar Diagnóstico de Eficiência"
      },
      medium: {
        title: "Automação Inteligente de Processos",
        description: "Nossa solução de Automação Inteligente é perfeita para médias empresas com objetivos de médio prazo.",
        recommendedService: "Transformação Digital",
        ctaText: "Conhecer Automação Inteligente"
      },
      long: {
        title: "Excelência Operacional Contínua",
        description: "Para médias empresas com visão de longo prazo, recomendamos nosso programa de Excelência Operacional Contínua.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Explorar Excelência Operacional"
      }
    },
    large: {
      short: {
        title: "Otimização Corporativa Rápida",
        description: "Nossa Otimização Corporativa Rápida é projetada para grandes empresas que precisam de resultados imediatos.",
        recommendedService: "Otimização de Processos",
        ctaText: "Iniciar Otimização Corporativa"
      },
      medium: {
        title: "Transformação de Eficiência Empresarial",
        description: "Para grandes empresas com objetivos de médio prazo, recomendamos nossa Transformação de Eficiência Empresarial.",
        recommendedService: "Análise Avançada de Dados",
        ctaText: "Ver Transformação de Eficiência"
      },
      long: {
        title: "Reestruturação Operacional Estratégica",
        description: "Nossa Reestruturação Operacional Estratégica é ideal para grandes organizações com visão de longo prazo.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Reestruturação Estratégica"
      }
    }
  },
  digital: {
    small: {
      short: {
        title: "Digitalização Rápida para Pequenas Empresas",
        description: "Nossa solução de Digitalização Rápida é ideal para pequenas empresas que precisam de transformação digital imediata.",
        recommendedService: "Transformação Digital",
        ctaText: "Iniciar Digitalização Rápida"
      },
      medium: {
        title: "Transformação Digital Escalável",
        description: "Para pequenas empresas com objetivos de médio prazo, recomendamos nossa Transformação Digital Escalável.",
        recommendedService: "Transformação Digital",
        ctaText: "Explorar Transformação Digital"
      },
      long: {
        title: "Estratégia Digital Completa",
        description: "Nossa Estratégia Digital Completa é perfeita para pequenas empresas com visão de futuro digital.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Estratégia Digital"
      }
    },
    medium: {
      short: {
        title: "Aceleração Digital para Médias Empresas",
        description: "Nossa Aceleração Digital é projetada para médias empresas que precisam de transformação rápida.",
        recommendedService: "Transformação Digital",
        ctaText: "Iniciar Aceleração Digital"
      },
      medium: {
        title: "Transformação Digital Integrada",
        description: "Para médias empresas com objetivos de médio prazo, recomendamos nossa Transformação Digital Integrada.",
        recommendedService: "Transformação Digital",
        ctaText: "Ver Transformação Integrada"
      },
      long: {
        title: "Estratégia de Inovação Digital",
        description: "Nossa Estratégia de Inovação Digital é ideal para médias empresas com visão de longo prazo.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Explorar Inovação Digital"
      }
    },
    large: {
      short: {
        title: "Transformação Digital Corporativa Rápida",
        description: "Nossa solução de Transformação Digital Corporativa Rápida é projetada para grandes empresas que precisam de resultados imediatos.",
        recommendedService: "Transformação Digital",
        ctaText: "Iniciar Transformação Corporativa"
      },
      medium: {
        title: "Roadmap de Transformação Digital",
        description: "Para grandes empresas com objetivos de médio prazo, recomendamos nosso Roadmap de Transformação Digital.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Ver Roadmap Digital"
      },
      long: {
        title: "Estratégia de Liderança Digital",
        description: "Nossa Estratégia de Liderança Digital é ideal para grandes organizações que desejam liderar seu setor digitalmente.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Explorar Liderança Digital"
      }
    }
  },
  strategy: {
    small: {
      short: {
        title: "Direcionamento Estratégico Rápido",
        description: "Nossa solução de Direcionamento Estratégico Rápido é ideal para pequenas empresas que precisam de clareza imediata.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Direcionamento Estratégico"
      },
      medium: {
        title: "Planejamento Estratégico para Pequenas Empresas",
        description: "Para pequenas empresas com visão de médio prazo, recomendamos nosso Planejamento Estratégico especializado.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Conhecer Planejamento Estratégico"
      },
      long: {
        title: "Estratégia de Crescimento Sustentável",
        description: "Nossa Estratégia de Crescimento Sustentável é perfeita para pequenas empresas com visão de longo prazo.",
        recommendedService: "Estudo de Viabilidade Econômica",
        ctaText: "Explorar Crescimento Sustentável"
      }
    },
    medium: {
      short: {
        title: "Revisão Estratégica para Médias Empresas",
        description: "Nossa Revisão Estratégica é projetada para médias empresas que precisam de ajustes rápidos em sua direção.",
        recommendedService: "Diagnóstico Empresarial com IA",
        ctaText: "Iniciar Revisão Estratégica"
      },
      medium: {
        title: "Planejamento Estratégico Competitivo",
        description: "Para médias empresas com objetivos de médio prazo, recomendamos nosso Planejamento Estratégico Competitivo.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Ver Planejamento Competitivo"
      },
      long: {
        title: "Estratégia de Crescimento e Inovação",
        description: "Nossa Estratégia de Crescimento e Inovação é ideal para médias empresas com visão de futuro.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Explorar Crescimento e Inovação"
      }
    },
    large: {
      short: {
        title: "Alinhamento Estratégico Corporativo",
        description: "Nosso Alinhamento Estratégico Corporativo é projetado para grandes empresas que precisam de coesão estratégica rápida.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Iniciar Alinhamento Estratégico"
      },
      medium: {
        title: "Estratégia Corporativa Integrada",
        description: "Para grandes empresas com objetivos de médio prazo, recomendamos nossa Estratégia Corporativa Integrada.",
        recommendedService: "Consultoria Estratégica Personalizada",
        ctaText: "Ver Estratégia Corporativa"
      },
      long: {
        title: "Visão Estratégica de Longo Prazo",
        description: "Nossa Visão Estratégica de Longo Prazo é ideal para grandes organizações que desejam planejar seu futuro com segurança.",
        recommendedService: "Estudo de Viabilidade Econômica",
        ctaText: "Explorar Visão Estratégica"
      }
    }
  }
};

export default function AISimulator({ onClose }: AISimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLastStep = currentStep === simulatorSteps.length;
  
  const handleNext = (optionValue: string) => {
    const currentQuestion = simulatorSteps[currentStep];
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));
    
    if (currentStep < simulatorSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(currentStep + 1);
        
        // Log simulator usage to Supabase
        logSimulationToSupabase();
      }, 1500);
    }
  };
  
  const logSimulationToSupabase = async () => {
    try {
      await supabase.from('simulator_logs').insert({
        answers: answers,
        result: getResult()
      });
    } catch (error) {
      console.error('Error logging simulation:', error);
    }
  };
  
  const getResult = () => {
    const challenge = answers[1] || 'strategy';
    const size = answers[2] || 'medium';
    const timeframe = answers[3] || 'medium';
    
    return resultMap[challenge]?.[size]?.[timeframe] || {
      title: "Consultoria Estratégica Personalizada",
      description: "Recomendamos nossa Consultoria Estratégica personalizada para atender às necessidades específicas da sua empresa.",
      recommendedService: "Consultoria Estratégica Personalizada",
      ctaText: "Agendar Consultoria"
    };
  };
  
  const handleSchedule = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Solicitação recebida! Em breve entraremos em contato.");
      onClose();
    }, 1500);
  };
  
  const renderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-t-primary-blue border-r-primary-blue border-b-slate-200 border-l-slate-200 animate-spin"></div>
            <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-primary-blue" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mt-4">
            Nossa IA está analisando suas respostas...
          </p>
        </div>
      );
    }
    
    if (isLastStep) {
      const result = getResult();
      
      return (
        <div className="py-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">Análise Concluída</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Com base nas suas respostas, identificamos a solução ideal para sua empresa.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2 text-primary-blue">
              {result.title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              {result.description}
            </p>
            <div className="bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Serviço Recomendado:
              </span>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                {result.recommendedService}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={handleSchedule}
              className="w-full bg-primary-blue hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processando...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  {result.ctaText}
                </>
              )}
            </Button>
          </div>
        </div>
      );
    }
    
    const currentQuestion = simulatorSteps[currentStep];
    
    return (
      <div className="py-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          Etapa {currentStep + 1} de {simulatorSteps.length}
        </p>
        
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className="w-full text-left p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              onClick={() => handleNext(option.value)}
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-200">
                  {option.label}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center text-slate-900 dark:text-white">
          <Zap className="h-5 w-5 text-primary-blue mr-2" />
          Simulador Inteligente
        </DialogTitle>
        <DialogDescription>
          Responda algumas perguntas para descobrir a solução ideal para sua empresa.
        </DialogDescription>
      </DialogHeader>
      
      {renderContent()}
    </>
  );
}
