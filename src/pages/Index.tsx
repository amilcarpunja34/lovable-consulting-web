
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/utils/animationVariants";

export default function Index() {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="flex min-h-screen flex-col"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </motion.main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
