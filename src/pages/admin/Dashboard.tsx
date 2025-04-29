
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  totalContacts: number;
  pendingContacts: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    pendingContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total contacts
        const { count: totalContacts, error: totalError } = await supabase
          .from("contact_forms")
          .select("*", { count: "exact", head: true });

        // Get pending contacts
        const { count: pendingContacts, error: pendingError } = await supabase
          .from("contact_forms")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        if (totalError || pendingError) throw totalError || pendingError;

        setStats({
          totalContacts: totalContacts || 0,
          pendingContacts: pendingContacts || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: "Contatos",
      description: "Gerenciar solicitações de contato",
      value: stats.totalContacts,
      icon: <MessageSquare className="h-8 w-8" />,
      color: "bg-blue-500",
      path: "/admin/contacts",
      highlight: stats.pendingContacts > 0,
      badge: stats.pendingContacts > 0 ? `${stats.pendingContacts} pendentes` : undefined,
    },
    {
      title: "Configurações",
      description: "Gerenciar configurações do site",
      icon: <Settings className="h-8 w-8" />,
      color: "bg-purple-500",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Visualizar Site
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => (
            <Card 
              key={card.title} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${card.highlight ? 'ring-2 ring-yellow-400 dark:ring-yellow-600' : ''}`}
              onClick={() => navigate(card.path)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  {card.title}
                  {card.badge && (
                    <span className="text-xs font-normal px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {card.badge}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className={`${card.color} p-3 rounded-full text-white`}>
                  {card.icon}
                </div>
                {typeof card.value === 'number' && (
                  <span className="text-2xl font-bold">{card.value}</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
