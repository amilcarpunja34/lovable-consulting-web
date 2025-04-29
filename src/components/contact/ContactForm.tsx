
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  interesse: string;
  mensagem: string;
}

export default function ContactForm() {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Save to Supabase
      const { error } = await supabase.from("contact_forms").insert({
        name: formData.nome,
        email: formData.email,
        company: formData.empresa,
        phone: formData.telefone || null,
        interest: formData.interesse,
        message: formData.mensagem || null,
      });

      if (error) throw error;

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        empresa: "",
        telefone: "",
        interesse: "",
        mensagem: "",
      });
    } catch (error: any) {
      toast.error("Erro ao enviar mensagem: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
}
