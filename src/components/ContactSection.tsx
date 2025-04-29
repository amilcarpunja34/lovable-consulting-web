
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare, CalendarDays } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  interesse: string;
  mensagem: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    interesse: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interesse: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nome || !formData.email || !formData.empresa || !formData.interesse) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setIsSubmitting(false);
      setFormData({
        nome: "",
        email: "",
        empresa: "",
        telefone: "",
        interesse: "",
        mensagem: "",
      });
    }, 1000);

    // Note: In a real implementation with Supabase, you would add your API call here
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container-section">
        <h2 className="section-title text-center">Entre em Contato</h2>
        <p className="section-subtitle text-center">
          Estamos prontos para ajudar sua empresa a alcançar novos patamares
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Vamos conversar sobre seu negócio
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Preencha o formulário e um de nossos consultores entrará em contato em até 24 horas para agendar uma consultoria inicial gratuita.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Telefone</h4>
                  <p className="text-slate-600 dark:text-slate-300">+55 (11) 9876-5432</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email</h4>
                  <p className="text-slate-600 dark:text-slate-300">contato@consultapro.com.br</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="h-6 w-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Agende uma visita</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Av. Paulista, 1000, São Paulo - SP <br />
                    Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo <span className="text-red-500">*</span></Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@empresa.com"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa <span className="text-red-500">*</span></Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interesse">Interesse <span className="text-red-500">*</span></Label>
                <Select onValueChange={handleSelectChange} value={formData.interesse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma área de interesse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estrategia">Consultoria Estratégica</SelectItem>
                    <SelectItem value="gestao">Gestão de Equipes</SelectItem>
                    <SelectItem value="inovacao">Inovação Corporativa</SelectItem>
                    <SelectItem value="outros">Outros Serviços</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva brevemente sua necessidade..."
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Agendar Consultoria
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
