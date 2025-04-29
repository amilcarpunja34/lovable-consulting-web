
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Settings, MessageSquare, LogOut, Home } from "lucide-react";

const AdminLayout = () => {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);
  
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { to: "/admin/contacts", label: "Contatos", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/admin/settings", label: "Configurações", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-slate-200 dark:hover:bg-slate-800"
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden absolute top-4 left-4">
          <Button size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                onClick={closeSheet}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                signOut();
                closeSheet();
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
