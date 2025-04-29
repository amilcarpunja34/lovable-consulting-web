
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection"; // Updated import path
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data.session);
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            asChild
            className="rounded-full h-14 w-14 shadow-lg"
            variant="default"
          >
            <Link to="/admin" title="Painel Administrativo">
              <Shield className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      )}
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Index;
