
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Login efetuado com sucesso!");
        navigate("/admin");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Verifique seu email para confirmar o cadastro.");
      }
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro durante a autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Cadastro"} do Administrador</CardTitle>
          <CardDescription>
            {isLogin
              ? "Entre com suas credenciais para acessar o painel administrativo."
              : "Crie uma nova conta de administrador para gerenciar o site."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Carregando...</span>
            ) : isLogin ? (
              "Entrar"
            ) : (
              "Cadastrar"
            )}
          </Button>
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)} 
            className="px-0"
          >
            {isLogin
              ? "Não tem uma conta? Cadastre-se"
              : "Já possui uma conta? Entre"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
