
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="section-title">Sobre a Agilmax</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Nossa Missão</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Descomplicar a transformação digital com IA acessível, tornando tecnologias complexas
                  em ferramentas práticas para o crescimento do seu negócio.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Nossa Visão</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Ser referência em consultoria estratégica baseada em dados até 2030, 
                  ajudando empresas a tomar decisões mais inteligentes e precisas.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Nossos Valores</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center">
                    <p className="font-bold text-primary-blue">Inovação</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center">
                    <p className="font-bold text-primary-blue">Transparência</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center">
                    <p className="font-bold text-primary-blue">Resultados</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Badge className="py-2 px-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <Zap className="h-4 w-4" /> 
                  <span className="font-medium">Tecnologia IA Proprietária</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                <img 
                  src="/placeholder.svg" 
                  alt="Tecnologia de Consultoria com IA"
                  className="w-full h-auto"
                  style={{ minHeight: "400px" }}
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-primary-blue rounded-full p-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
