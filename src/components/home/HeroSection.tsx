import SearchForm from "./SearchForm";
// import bgImage from "../../assets/images/hotel-sunset-2.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      /> */}

      {/* Gradient overlay for smooth fade into next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white z-0" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 mt-[180px]">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-yellow-100 drop-shadow">
            Find amazing hotels, compare prices, and
            <span className="text-orange-200 block">
              book your dream vacation easily
            </span>
          </h1>

          <p className="text-lg text-yellow-100 md:text-xl max-w-2xl mx-auto">
            Discover the perfect accommodation for your next adventure with our
            comprehensive hotel booking platform
          </p>

          {/* Search Form */}
          <div className="mt-12">
            <SearchForm />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300">
              🌴 Explore Hotels
            </button>
            <button className="bg-white text-primary px-8 py-3 rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-300">
              ✨ Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
