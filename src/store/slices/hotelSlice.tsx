import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Hotel {
  hotelId: number;
  name: string;
  location: string;
  address?: string;
  contactPhone?: string;
  category?: string;
  rating: number;
  price: number;
  description: string;
  amenities: string[];
  image: string;
}

interface HotelState {
  hotels: Hotel[];
  featuredHotels: Hotel[];
  loading: boolean;
}

const initialState: HotelState = {
  hotels: [
    {
      hotelId: 1,
      name: "Luxury Resort & Spa",
      location: "Bali, Indonesia",
      price: 299,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=400",
      description: "Experience ultimate luxury in our beachfront resort",
      amenities: ["Pool", "Spa", "Restaurant", "Beach Access"],
    },
    {
      hotelId: 2,
      name: "Mountain View Lodge",
      location: "Swiss Alps",
      price: 450,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=400",
      description: "Breathtaking mountain views and cozy accommodation",
      amenities: ["Ski Access", "Fireplace", "Restaurant", "Spa"],
    },
    {
      hotelId: 3,
      name: "Urban Boutique Hotel",
      location: "New York City",
      price: 189,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=400",
      description: "Modern comfort in the heart of the city",
      amenities: ["Gym", "Restaurant", "Business Center", "WiFi"],
    },
    {
      hotelId: 4,
      name: "Tropical Paradise Resort",
      location: "Maldives",
      price: 599,
      rating: 5.0,
      image: "/placeholder.svg?height=300&width=400",
      description: "Overwater bungalows in paradise",
      amenities: ["Private Beach", "Spa", "Water Sports", "Fine Dining"],
    },
  ],
  featuredHotels: [],
  loading: false,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    setFeaturedHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.featuredHotels = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setHotels, setFeaturedHotels, setLoading } = hotelSlice.actions;
export default hotelSlice.reducer;
