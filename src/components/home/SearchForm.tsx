import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setLocation,
  setCheckIn,
  setCheckOut,
  setGuests,
} from "@/store/slices/searchSlice";

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { location, checkIn, checkOut, guests } = useAppSelector(
    (state) => state.search
  );

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching...", { location, checkIn, checkOut, guests });
  };

  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <Input
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Check-in
          </label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => dispatch(setCheckIn(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Check-out
          </label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => dispatch(setCheckOut(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Guests
          </label>
          <Input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => dispatch(setGuests(parseInt(e.target.value) || 1))}
            className="w-full"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          className="w-full md:w-auto px-12"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Hotels
        </Button>
      </div>
    </Card>
  );
};

export default SearchForm;
