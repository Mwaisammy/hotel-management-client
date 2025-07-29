// src/pages/HotelRoomsPage.tsx
import { useParams } from "react-router-dom";
import { roomsAPI } from "@/Features/rooms/roomsAPI";
import RoomCard from "@/components/rooms/roomsCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HotelRoomsPage = () => {
  const { hotelId } = useParams(); // expects /hotels/:hotelId/rooms route

  const {
    data: rooms,
    isLoading,
    error,
  } = roomsAPI.useGetRoomByHotelIdQuery(Number(hotelId)); // Make sure your hook exists and accepts hotelId

  const handleBookRoom = (roomId: number) => {
    console.log("Book room clicked:", roomId);
    // You can navigate or open a modal here
  };
  console.log("Rooms", rooms);

  if (isLoading) return <p>Loading rooms...</p>;
  if (error) return <p>Failed to load rooms.</p>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms?.map((room) => (
            <RoomCard key={room.roomId} room={room} onBook={handleBookRoom} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelRoomsPage;
