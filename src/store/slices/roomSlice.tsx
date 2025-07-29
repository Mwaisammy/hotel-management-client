import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  size: string;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  available: boolean;
}

interface RoomState {
  rooms: Room[];
  loading: boolean;
}

const initialState: RoomState = {
  rooms: [
    // Luxury Resort & Spa rooms
    {
      id: "1-1",
      hotelId: "1",
      name: "Ocean View Suite",
      type: "Suite",
      price: 399,
      originalPrice: 499,
      size: "45 sqm",
      capacity: 2,
      amenities: ["Ocean View", "Balcony", "Minibar", "Room Service"],
      images: ["/placeholder.svg?height=300&width=400"],
      description:
        "Luxurious suite with stunning ocean views and private balcony",
      available: true,
    },
    {
      id: "1-2",
      hotelId: "1",
      name: "Garden Villa",
      type: "Villa",
      price: 599,
      size: "65 sqm",
      capacity: 4,
      amenities: ["Private Garden", "Kitchen", "Living Room", "Pool Access"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Spacious villa with private garden and pool access",
      available: true,
    },
    {
      id: "1-3",
      hotelId: "1",
      name: "Deluxe Room",
      type: "Deluxe",
      price: 299,
      size: "35 sqm",
      capacity: 2,
      amenities: ["City View", "WiFi", "Air Conditioning", "Safe"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Comfortable deluxe room with modern amenities",
      available: false,
    },
    // Mountain View Lodge rooms
    {
      id: "2-1",
      hotelId: "2",
      name: "Alpine Suite",
      type: "Suite",
      price: 550,
      size: "50 sqm",
      capacity: 3,
      amenities: ["Mountain View", "Fireplace", "Balcony", "Ski Storage"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Cozy suite with fireplace and breathtaking mountain views",
      available: true,
    },
    {
      id: "2-2",
      hotelId: "2",
      name: "Chalet Room",
      type: "Standard",
      price: 350,
      size: "30 sqm",
      capacity: 2,
      amenities: ["Mountain View", "Heating", "WiFi", "Coffee Machine"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Traditional chalet-style room with mountain charm",
      available: true,
    },
    // Urban Boutique Hotel rooms
    {
      id: "3-1",
      hotelId: "3",
      name: "Executive Suite",
      type: "Suite",
      price: 289,
      size: "40 sqm",
      capacity: 2,
      amenities: ["City View", "Work Desk", "Coffee Machine", "Smart TV"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Modern executive suite perfect for business travelers",
      available: true,
    },
    {
      id: "3-2",
      hotelId: "3",
      name: "Standard Room",
      type: "Standard",
      price: 189,
      size: "25 sqm",
      capacity: 2,
      amenities: ["WiFi", "Air Conditioning", "Safe", "Mini Fridge"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Comfortable standard room in the heart of the city",
      available: true,
    },
    // Tropical Paradise Resort rooms
    {
      id: "4-1",
      hotelId: "4",
      name: "Overwater Bungalow",
      type: "Bungalow",
      price: 899,
      originalPrice: 1199,
      size: "55 sqm",
      capacity: 2,
      amenities: [
        "Ocean Access",
        "Glass Floor",
        "Private Deck",
        "Butler Service",
      ],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Exclusive overwater bungalow with direct ocean access",
      available: true,
    },
    {
      id: "4-2",
      hotelId: "4",
      name: "Beach Villa",
      type: "Villa",
      price: 699,
      size: "70 sqm",
      capacity: 4,
      amenities: ["Beach Access", "Private Pool", "Garden", "Kitchen"],
      images: ["/placeholder.svg?height=300&width=400"],
      description: "Luxurious beach villa with private pool and garden",
      available: true,
    },
  ],
  loading: false,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    bookRoom: (state, action: PayloadAction<string>) => {
      const room = state.rooms.find((r) => r.id === action.payload);
      if (room) {
        room.available = false;
      }
    },
  },
});

export const { setRooms, setLoading, bookRoom } = roomSlice.actions;
export default roomSlice.reducer;
