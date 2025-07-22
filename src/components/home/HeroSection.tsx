import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Find amazing hotels, compare prices, and
            <span className="text-primary block">
              book your dream vacation easily
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect accommodation for your next adventure with our
            comprehensive hotel booking platform
          </p>

          {/* Search Form */}
          <div className="mt-12">
            <SearchForm />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="px-8">Explore Hotels</button>
            <button className="px-8">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
