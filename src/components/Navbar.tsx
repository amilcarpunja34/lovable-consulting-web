
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#services" },
    { name: "Cases", href: "#testimonials" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-primary-blue dark:text-white">
              Agilmax<span className="text-primary-blue">Lda</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-700 dark:text-slate-200 hover:text-primary-blue dark:hover:text-primary-blue transition font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
              >
                Fale Conosco
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Controls */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg animate-fade-in">
            <ul className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block text-slate-700 dark:text-slate-200 hover:text-primary-blue dark:hover:text-primary-blue font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Button 
                  className="btn-primary w-full"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                    setIsMenuOpen(false);
                  }}
                >
                  Fale Conosco
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
