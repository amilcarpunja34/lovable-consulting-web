
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AISimulator from "../simulator/AISimulator";

export default function HeroSection() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950">
      {/* Background animated pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Consultoria Inteligente para Empresas que Querem Crescer com Propósito
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-10">
              Utilizamos IA avançada para diagnosticar, otimizar e escalar seu negócio 
              com estratégias baseadas em dados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                size="lg"
                onClick={scrollToServices}
                className="bg-primary-blue hover:bg-blue-700 text-white text-lg"
              >
                Conheça os Serviços
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              
              <Dialog open={isSimulatorOpen} onOpenChange={setIsSimulatorOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/80 bg-transparent hover:bg-white/10 text-white text-lg"
                  >
                    Simule sua Necessidade
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <AISimulator onClose={() => setIsSimulatorOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="mt-16 animate-bounce flex justify-center">
              <ChevronDown className="h-8 w-8 text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
