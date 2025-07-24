import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import FeaturedHotels from "@/components/home/FeaturedHostels";
import bgImage from "@/assets/images/hotel-sunset-2.jpg";
import StickyHeader from "@/components/home/stickyHeader";

const Index = () => {
  return (
    <>
      {/* Sticky header appears on scroll */}
      <StickyHeader />

      {/* Hero Section with its own full-sized header */}
      <div
        className="min-h-screen relative bg-gradient-to-br from-primary/20 to-secondary/20"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white z-0" />

        <div className="relative z-10">
          <Header />
          <HeroSection />
        </div>
      </div>

      <main>
        <FeaturedHotels />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
