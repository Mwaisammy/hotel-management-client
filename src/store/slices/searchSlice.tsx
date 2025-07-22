import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  filters: {
    priceRange: [number, number];
    rating: number;
    amenities: string[];
  };
}

const initialState: SearchState = {
  location: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  filters: {
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCheckIn: (state, action: PayloadAction<string>) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action: PayloadAction<string>) => {
      state.checkOut = action.payload;
    },
    setGuests: (state, action: PayloadAction<number>) => {
      state.guests = action.payload;
    },
    updateFilters: (
      state,
      action: PayloadAction<Partial<SearchState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetSearch: () => {
      return initialState;
    },
  },
});

export const {
  setLocation,
  setCheckIn,
  setCheckOut,
  setGuests,
  updateFilters,
  resetSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
