
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  client: string;
  company: string;
  position: string;
  text: string;
  avatar: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      client: "Ana Silva",
      company: "TechSolutions SA",
      position: "CEO",
      text: "A consultoria transformou completamente nossa visão estratégica. Em seis meses, aumentamos o faturamento em 40% e expandimos para dois novos mercados.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 2,
      client: "Ricardo Mendes",
      company: "Inovare Industrial",
      position: "Diretor de Operações",
      text: "Implementamos as recomendações de otimização de processos e reduzimos custos operacionais em 25%. A equipe de consultoria nos proporcionou insights valiosos.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 3,
      client: "Camila Ferreira",
      company: "BioHealth Brasil",
      position: "Diretora de Marketing",
      text: "A consultoria estratégica nos ajudou a reposicionar nossa marca no mercado e lançar uma linha de produtos que se tornou líder no segmento em apenas um ano.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-800">
      <div className="container-section">
        <h2 className="section-title text-center">Cases de Sucesso</h2>
        <p className="section-subtitle text-center">
          Veja o que nossos clientes dizem sobre nossa consultoria
        </p>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 md:p-10 shadow-lg dark:bg-slate-700/50">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.client}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${
                                i < testimonial.rating 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl italic mb-6">
                          "{testimonial.text}"
                        </p>
                        <div className="mt-auto">
                          <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.client}</h4>
                          <p className="text-primary-blue font-medium">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevSlide} 
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-primary-blue hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-primary-blue w-6" 
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <button 
              onClick={nextSlide} 
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-primary-blue hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
