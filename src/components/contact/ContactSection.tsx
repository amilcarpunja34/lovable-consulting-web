
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container-section">
        <h2 className="section-title text-center">Entre em Contato</h2>
        <p className="section-subtitle text-center">
          Estamos prontos para ajudar sua empresa a alcançar novos patamares
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
