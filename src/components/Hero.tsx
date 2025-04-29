
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.gpteng.co/videos/aerial-business-city.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transformamos desafios em <br className="hidden md:block" />
            <span className="text-primary-blue">oportunidades de crescimento</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Consultoria estratégica para empresas que buscam resultados excepcionais e soluções inovadoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-primary text-lg px-8 py-6"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Agende uma Consultoria
            </Button>
            <Button 
              className="btn-secondary text-lg px-8 py-6"
              variant="outline" 
              onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
            >
              Conheça Nossos Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-20">
        <button
          onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
}
