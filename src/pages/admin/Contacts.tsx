
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CheckCircle, XCircle, Mail } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  interest: string;
  message: string | null;
  status: string;
  created_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_forms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar contatos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_forms")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      
      toast.success(`Status atualizado para: ${status}`);
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, status } : contact
        )
      );
    } catch (error: any) {
      toast.error("Erro ao atualizar status: " + error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case "contacted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Contatado</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Concluído</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const sendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gerenciar Contatos</h1>
        <Button onClick={fetchContacts} disabled={loading}>
          {loading ? "Carregando..." : "Atualizar"}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-slate-50 dark:bg-slate-800">
          <p className="text-muted-foreground">Nenhum contato encontrado.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Interesse</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    <div>{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                  </TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.interest}</TableCell>
                  <TableCell>{format(new Date(contact.created_at), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedContact(contact);
                          setDialogOpen(true);
                        }}
                      >
                        Detalhes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendEmail(contact.email)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedContact && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Contato</DialogTitle>
              <DialogDescription>
                Enviado em {format(new Date(selectedContact.created_at), "dd/MM/yyyy 'às' HH:mm")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="font-semibold">Informações Pessoais</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p>{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p>{selectedContact.phone || "Não informado"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p>{selectedContact.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interesse</p>
                    <p>{selectedContact.interest}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold">Mensagem</h3>
                <div className="mt-2 border rounded-md p-3 min-h-[100px] bg-slate-50 dark:bg-slate-800">
                  {selectedContact.message || "Nenhuma mensagem adicional."}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="mt-1">
                    <Select 
                      value={selectedContact.status}
                      onValueChange={(value) => updateStatus(selectedContact.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="contacted">Contatado</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    onClick={() => sendEmail(selectedContact.email)}
                    variant="outline"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedContact.id, "completed")}
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Concluído
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Contacts;
