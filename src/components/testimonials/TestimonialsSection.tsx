
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  imageUrl: string;
  featured: boolean;
}

// Example testimonials (in a real app, these would come from Supabase)
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Roberto Santos",
    role: "CEO",
    company: "Tech Solutions",
    quote: "A consultoria da Agilmax transformou completamente nossa abordagem estratégica. Os insights baseados em IA nos permitiram tomar decisões muito mais fundamentadas e aumentar nossa receita em 27% em apenas seis meses.",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    name: "Ana Ferreira",
    role: "Diretora de Operações",
    company: "Logística Express",
    quote: "Graças ao diagnóstico empresarial com IA da Agilmax, identificamos gargalos operacionais que nem sabíamos existir. A implementação das soluções recomendadas reduziu nossos custos operacionais em 18%.",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 3,
    name: "Carlos Mendes",
    role: "CFO",
    company: "Grupo Construção",
    quote: "O estudo de viabilidade econômica realizado pela Agilmax foi fundamental para nossa decisão de investimento. A precisão das projeções e a profundidade da análise nos deram total confiança para seguir em frente.",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 4,
    name: "Luciana Costa",
    role: "Diretora de Marketing",
    company: "Moda Brasil",
    quote: "A transformação digital conduzida pela Agilmax revolucionou nossa presença online e estratégia de marketing. Em três meses, vimos um aumento de 45% no engajamento digital e 32% em vendas online.",
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 5,
    name: "Paulo Oliveira",
    role: "Fundador",
    company: "Startup Inova",
    quote: "Como startup, precisávamos de direcionamento estratégico claro sem gastar fortunas. A Agilmax entregou exatamente isso, com um plano personalizado que nos ajudou a obter nosso primeiro investimento significativo.",
    imageUrl: "/placeholder.svg",
    featured: true
  }
];

export default function TestimonialsSection() {
  const isMobile = useIsMobile();
  
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-900">
      <div className="container-section">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">O Que Dizem Nossos Clientes</h2>
          <p className="section-subtitle">
            Resultados reais de empresas que transformamos com nossas soluções
          </p>
        </motion.div>

        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className={isMobile ? "basis-full" : "md:basis-1/2 lg:basis-1/2"}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="position-relative static" />
              <CarouselNext className="position-relative static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
