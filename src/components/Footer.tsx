
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Agilmax<span className="text-primary-blue">Lda</span>
            </h3>
            <p className="text-slate-300 mb-6">
              Transformando desafios em oportunidades de crescimento para sua empresa.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-slate-300 hover:text-primary-blue transition-colors">Consultoria Estratégica</a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-primary-blue transition-colors">Gestão de Equipes</a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-primary-blue transition-colors">Inovação Corporativa</a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-primary-blue transition-colors">Transformação Digital</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-primary-blue transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#testimonials" className="text-slate-300 hover:text-primary-blue transition-colors">Cases de Sucesso</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary-blue transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-primary-blue transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
            <address className="text-slate-300 not-italic mb-6">
              Av. Paulista, 1000<br />
              São Paulo - SP<br />
              CEP: 01310-100<br /><br />
              <a href="tel:+551198765432" className="hover:text-primary-blue transition-colors">+55 (11) 9876-5432</a><br />
              <a href="mailto:contato@agilmax.com.br" className="hover:text-primary-blue transition-colors">contato@agilmax.com.br</a>
            </address>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
              className="text-white bg-primary-blue hover:bg-blue-700 inline-flex items-center"
            >
              <Mail className="mr-2 h-4 w-4" />
              Fale Conosco
            </Button>
          </div>
        </div>
        
        <hr className="border-slate-800 mb-8" />
        
        <div className="text-center text-slate-400">
          <p>© {new Date().getFullYear()} Agilmax Lda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
