import { Button } from "@/components/ui/button";
import { roomsAPI, type TRoom } from "./roomsAPI";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateRoom from "./createRoom";
import UpdateRoom from "./updateRoom";
import DeleteRoom from "./deleteRoom";
// import Updateroom from "./updateRoom";
// import Createroom from "./createRoom";
// import Deleteroom from "./deleteRoom";

const Rooms = () => {
  const [selectedroom, setSelectedRoom] = useState<TRoom | null>(null);
  const [deletedroom, setDeleteRoom] = useState<TRoom | null>(null);
  const {
    data: RoomsData,
    isLoading: RoomsLoading,
    // error: roomError,
  } = roomsAPI.useGetRoomQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const handleEdit = (room: TRoom) => {
    setSelectedRoom(room);
  };

  console.log("Rooms:", RoomsData);
  return (
    <div>
      <UpdateRoom room={selectedroom} />
      <DeleteRoom room={deletedroom} />
      <CreateRoom room={selectedroom} />

      {RoomsLoading && <p>Loading...</p>}
      {RoomsData && RoomsData && RoomsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <div className="flex justify-center items-center m-4">
            <Button
              variant={"secondary"}
              className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
              onClick={() =>
                (
                  document.getElementById(
                    "create_room_modal"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              Create Room
            </Button>
          </div>
          <table className="table table-sm">
            <thead>
              <tr className="bg-gray-800 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Room Id</th>
                <th className="px-4 py-2">Hotel Id</th>
                <th className="px-4 py-2">Room type</th>
                <th className="px-4 py-2">Price per night</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Amenities</th>
                <th className="px-4 py-2">Is available</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {RoomsData.map((room: TRoom) => (
                <tr
                  key={room.roomId}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.roomId}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.hotelId}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.roomType}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.pricePerNight}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.capacity} people
                  </td>

                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {room.amenities}
                  </td>
                  <td className="px-2 py-1  border-r border-gray-500 lg:text-base text-white text-sm font-medium ">
                    <span
                      className={`px-2 py-1  rounded-md text-white text-sm font-medium ${
                        room.isAvailable ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Occupied"}
                    </span>
                  </td>

                  <td className="flex gap-4">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer"
                      onClick={() => {
                        handleEdit(room);
                        (
                          document.getElementById(
                            "update_room_modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      <PenBoxIcon />
                    </Button>
                    <Button
                      variant={"destructive"}
                      className="cursor-pointer"
                      onClick={() => {
                        setDeleteRoom(room);
                        (
                          document.getElementById(
                            "delete_room_modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Room not found</p>
      )}
    </div>
  );
};

export default Rooms;
