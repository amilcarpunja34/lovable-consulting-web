
import { Phone, Mail, CalendarDays } from "lucide-react";

export default function ContactInfo() {
  return (
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
  );
}
