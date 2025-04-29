
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Json } from "@/integrations/supabase/types";

interface GeneralSettings {
  companyName: string;
  email: string;
  phone: string;
}

interface SocialSettings {
  linkedin: string;
  instagram: string;
  facebook: string;
}

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);
  
  const generalForm = useForm<GeneralSettings>({
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
    },
  });

  const socialForm = useForm<SocialSettings>({
    defaultValues: {
      linkedin: "",
      instagram: "",
      facebook: "",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        // Fetch general settings
        const { data: generalData, error: generalError } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "general")
          .single();

        if (generalError) throw generalError;
        
        // Fetch social settings
        const { data: socialData, error: socialError } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "social")
          .single();

        if (socialError) throw socialError;
        
        // Set form values with proper type assertions
        if (generalData && typeof generalData.value === 'object' && generalData.value !== null) {
          const generalSettings = generalData.value as Record<string, string>;
          generalForm.reset({
            companyName: generalSettings.companyName || "",
            email: generalSettings.email || "",
            phone: generalSettings.phone || ""
          });
        }
        
        if (socialData && typeof socialData.value === 'object' && socialData.value !== null) {
          const socialSettings = socialData.value as Record<string, string>;
          socialForm.reset({
            linkedin: socialSettings.linkedin || "",
            instagram: socialSettings.instagram || "",
            facebook: socialSettings.facebook || ""
          });
        }
      } catch (error: any) {
        toast.error("Erro ao carregar configurações: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [generalForm, socialForm]);

  const saveGeneralSettings = async (data: GeneralSettings) => {
    try {
      setSavingGeneral(true);
      
      const { error } = await supabase
        .from("site_settings")
        .update({ value: data as unknown as Json })
        .eq("key", "general");

      if (error) throw error;
      
      toast.success("Configurações gerais salvas com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao salvar configurações: " + error.message);
    } finally {
      setSavingGeneral(false);
    }
  };

  const saveSocialSettings = async (data: SocialSettings) => {
    try {
      setSavingSocial(true);
      
      const { error } = await supabase
        .from("site_settings")
        .update({ value: data as unknown as Json })
        .eq("key", "social");

      if (error) throw error;
      
      toast.success("Configurações de redes sociais salvas com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao salvar configurações: " + error.message);
    } finally {
      setSavingSocial(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações do Site</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações gerais do seu site.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Informações Gerais</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas da sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-4" 
                onSubmit={generalForm.handleSubmit(saveGeneralSettings)}
              >
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    {...generalForm.register("companyName")}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contato</Label>
                  <Input
                    id="email"
                    type="email"
                    {...generalForm.register("email")}
                    placeholder="contato@empresa.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone de Contato</Label>
                  <Input
                    id="phone"
                    {...generalForm.register("phone")}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <Button type="submit" disabled={savingGeneral}>
                  {savingGeneral ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Configure os links das suas redes sociais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-4" 
                onSubmit={socialForm.handleSubmit(saveSocialSettings)}
              >
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    {...socialForm.register("linkedin")}
                    placeholder="https://linkedin.com/company/seuempresa"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    {...socialForm.register("instagram")}
                    placeholder="https://instagram.com/seuempresa"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    {...socialForm.register("facebook")}
                    placeholder="https://facebook.com/seuempresa"
                  />
                </div>
                
                <Button type="submit" disabled={savingSocial}>
                  {savingSocial ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
