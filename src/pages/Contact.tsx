import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";
import contactImage from "@/assets/images/sunset-3.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `url(${contactImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)",
          }}
          className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 "
        >
          <div
            className="absolute inset-0 bg-black/30 opacity-15"
            aria-hidden="true"
          />

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black/50 mb-6">
              Contact <span className="bg-sun">Us</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're here to help you plan your perfect stay. Get in touch with
              our team for personalized assistance.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
