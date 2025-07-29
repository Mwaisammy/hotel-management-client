import { Users, Maximize, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TRoom } from "@/Features/rooms/roomsAPI";
import roomImg from "../../assets/images/hotel-3.jpg";

interface RoomCardProps {
  room: TRoom;
  onBook: (roomId: number) => void;
}

const RoomCard = ({ room, onBook }: RoomCardProps) => {
  const amenitiesArray = Array.isArray(room.amenities)
    ? room.amenities
    : typeof room.amenities === "string"
    ? room.amenities.split(",")
    : [];
  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
        !room.isAvailable ? "opacity-60" : ""
      }`}
    >
      {/* Room Image */}
      <div className="relative overflow-hidden">
        <img
          src={roomImg}
          alt={room.roomType}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant={room.isAvailable ? "default" : "secondary"}>
            {room.isAvailable ? "Available" : "Booked"}
          </Badge>
        </div>
        {/* {room.pricePerNight && (
          <div className="absolute top-4 right-4">
            <Badge variant="destructive" className="bg-red-500">
              Save ${room.pricePerNight - room.price}
            </Badge>
          </div>
        )} */}
      </div>

      <CardContent className="p-4">
        {/* Room Name and Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Room: {room.roomId}
            </h3>
            <Badge variant="outline">{room.roomType}</Badge>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{room.capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} guests</span>
          </div>
        </div>

        {/* Description
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {room.}
        </p> */}

        {/* Amenities */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {amenitiesArray
              .map((a) => a.trim())
              .slice(0, 3)
              .map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                >
                  <Check className="h-3 w-3" />
                  <span>{amenity}</span>
                </div>
              ))}
            {amenitiesArray.length > 3 && (
              <div className="text-xs text-muted-foreground px-2 py-1">
                +{amenitiesArray.length - 3} more
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            {room.pricePerNight && (
              <span className="text-sm text-muted-foreground line-through">
                ${room.pricePerNight}
              </span>
            )}
            <span className="text-2xl font-bold text-foreground">
              ${room.pricePerNight}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={() => onBook(room.roomId)}
          disabled={!room.isAvailable}
          className="px-6"
        >
          {room.isAvailable ? "Book Room" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
