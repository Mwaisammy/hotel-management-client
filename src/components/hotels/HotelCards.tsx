import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@/store/slices/hotelSlice";

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotelId: string) => void;
}

const HotelCard = ({ hotel, onBook }: HotelCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "pool":
        return <Waves className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "restaurant":
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Hotel Image */}
      <div className="relative overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground"
          >
            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
            {hotel.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Hotel Name and Location */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hotel.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="flex items-center gap-2 mt-3">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-muted-foreground"
              title={amenity}
            >
              {getAmenityIcon(amenity)}
              <span className="hidden sm:inline">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">
              ${hotel.price}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
        </div>

        {/* Book Button */}
        <Button onClick={() => onBook?.(hotel.id)} className="px-6">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
