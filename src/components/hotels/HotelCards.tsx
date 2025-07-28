import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Waves,
  Utensils,
  ShieldCheck,
  ConciergeBell,
  ShowerHead,
  Thermometer,
  AlarmClock,
  KeyRound,
  Leaf,
  PawPrint,
  Plug,
  Lock,
  BedDouble,
  Fan,
  Tv,
  Snowflake,
  Dumbbell,
  Globe, // For Lake View
  Sun,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import type { Hotel } from "@/store/slices/hotelSlice";
import hotelIMG from "@/assets/images/hotel-3.jpg";
import type { THotel } from "@/Features/hotels/hotelsAPI";

interface HotelCardProps {
  hotel: THotel;
  onBook?: (hotelId: number) => void;
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
      case "free breakfast":
        return <Coffee className="h-4 w-4" />;
      case "gym":
        return <Dumbbell className="h-4 w-4" />;
      case "air conditioning":
      case "ac":
        return <Snowflake className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "fan":
        return <Fan className="h-4 w-4" />;
      case "bed":
      case "double bed":
        return <BedDouble className="h-4 w-4" />;
      case "dining":
      case "kitchen":
      case "meals":
        return <Utensils className="h-4 w-4" />;
      case "security":
        return <ShieldCheck className="h-4 w-4" />;
      case "reception":
        return <ConciergeBell className="h-4 w-4" />;
      case "shower":
        return <ShowerHead className="h-4 w-4" />;
      case "heater":
      case "temperature control":
        return <Thermometer className="h-4 w-4" />;
      case "alarm":
        return <AlarmClock className="h-4 w-4" />;
      case "key":
        return <KeyRound className="h-4 w-4" />;
      case "safe":
        return <Lock className="h-4 w-4" />;
      case "eco-friendly":
        return <Leaf className="h-4 w-4" />;
      case "pet friendly":
        return <PawPrint className="h-4 w-4" />;
      case "charging station":
      case "power outlet":
        return <Plug className="h-4 w-4" />;
      case "lake view":
        return <Globe className="h-4 w-4" />;
      case "nature trails":
        return <MapPin className="h-4 w-4" />;
      case "fireplace":
        return <Flame className="h-4 w-4" />;
      case "beach access":
        return <Sun className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const amenities = Array.isArray(hotel.amenities)
    ? hotel.amenities
    : typeof hotel.amenities === "string"
    ? hotel.amenities.split(",")
    : [];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Hotel Image */}
      <div className="relative overflow-hidden">
        <img
          src={hotelIMG}
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
        <div className="flex flex-wrap gap-2 mt-4">
          {amenities
            .map((a) => a.trim())
            .slice(0, 4)
            .map((amenity, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-1 text-xs text-muted-foreground"
                title={amenity}
              >
                {getAmenityIcon(amenity)}
                <span className="hidden sm:inline">{amenity}</span>
              </div>
            ))}
        </div>
        {/* Amenities */}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-foreground">
              Ksh{Math.floor(hotel.price)}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          variant={"secondary"}
          onClick={() => onBook?.(hotel.hotelId)}
          className="px-6 bg-[#e6ddda] hover:bg-[#b47a61] transition-all duration-300 ease-in-out cursor-pointer"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
