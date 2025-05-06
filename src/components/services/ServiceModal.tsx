
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "./ServicesSection";
import { useState } from "react";

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [showCalendly, setShowCalendly] = useState(false);

  const handleScheduleClick = () => {
    setShowCalendly(true);
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
      setShowCalendly(false);
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        {!showCalendly ? (
          <div className="mt-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                {service.fullDescription}
              </p>

              <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
                  Como podemos ajudar você?
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Agende uma consulta gratuita para discutirmos como este serviço pode 
                  ser personalizado para atender às necessidades específicas da sua empresa.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleScheduleClick}
                className="bg-primary-blue hover:bg-blue-700 text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Consulta Gratuita
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 h-[400px] w-full">
            <div className="flex justify-center items-center h-full border border-dashed border-slate-300 dark:border-slate-700 rounded-md p-4">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Aqui será integrado o widget do Calendly para agendamento.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  (Integração completa exige a configuração do Calendly)
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
