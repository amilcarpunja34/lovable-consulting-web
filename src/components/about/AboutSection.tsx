
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { 
  slideUp, 
  slideInFromLeft, 
  slideInFromRight, 
  staggerContainer 
} from "@/utils/animationVariants";
import { AnimatedElement, AnimatedContainer } from "@/components/ui/animated-element";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedElement variants={slideInFromLeft} className="mb-8">
              <h2 className="section-title">Sobre a Agilmax</h2>
            </AnimatedElement>

            <AnimatedContainer variants={staggerContainer} className="space-y-8">
              <AnimatedElement variants={slideUp} className="space-y-2">
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                  Nossa Missão
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Descomplicar a transformação digital com IA acessível, tornando tecnologias complexas
                  em ferramentas práticas para o crescimento do seu negócio.
                </p>
              </AnimatedElement>
              
              <AnimatedElement variants={slideUp} className="space-y-2">
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                  Nossa Visão
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ser referência em consultoria estratégica baseada em dados até 2030, 
                  ajudando empresas a tomar decisões mais inteligentes e precisas.
                </p>
              </AnimatedElement>
              
              <AnimatedElement variants={slideUp}>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                  Nossos Valores
                </h3>
                <motion.div 
                  className="grid grid-cols-3 gap-4 mt-3"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {["Inovação", "Transparência", "Resultados"].map((value, index) => (
                    <motion.div
                      key={value}
                      className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center hover-lift"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring" } }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <p className="font-bold text-primary-blue">{value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedElement>
              
              <AnimatedElement variants={slideUp} className="flex items-center">
                <Badge className="py-2 px-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      transition: { repeat: Infinity, repeatDelay: 3, duration: 0.5 } 
                    }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                  <span className="font-medium">Tecnologia IA Proprietária</span>
                </Badge>
              </AnimatedElement>
            </AnimatedContainer>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg"
                  alt="Tecnologia de Consultoria com IA"
                  className="w-full h-auto"
                  style={{ minHeight: "400px" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -right-6 bg-primary-blue rounded-full p-6 shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Zap className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
