import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import HotelCard from "../hotels/HotelCards";

const FeaturedHotels = () => {
  const { hotels } = useAppSelector((state) => state.hotels);

  // Show first 4 hotels as featured
  const featuredHotels = hotels.slice(0, 4);

  const handleBookHotel = (hotelId: string) => {
    console.log("Booking hotel:", hotelId);
    // Handle booking logic here
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Stays, About Comfort, Your Stay,
            <span className="block text-primary">Our Priority</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sunrise is a trusted platform connecting travelers with top hotels
            across the country
          </p>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onBook={handleBookHotel} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View More Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
