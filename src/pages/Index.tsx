import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import FeaturedHotels from "@/components/home/FeaturedHostels";
import bgImage from "@/assets/images/hotel-sunset-2.jpg";
import StickyHeader from "@/components/home/stickyHeader";
import { useEffect, useState } from "react";

const Index = () => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);
  }, []);
  return (
    <>
      {/* Sticky header appears on scroll */}
      <StickyHeader />

      {/* Hero Section with its own full-sized header */}
      <div
        className={`min-h-screen relative transition-all duration-700 ${
          bgLoaded ? "blur-0" : "blur-md"
        }`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#f8d9ab] z-0" />

        {/* Content Layer */}
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
