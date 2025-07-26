import { hotelsAPI, type THotel } from "./hotelsAPI";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateHotel from "./createHotel";
import UpdateHotel from "./updateHotel";
import DeleteHotel from "./deleteHotel";
import { Button } from "@/components/ui/button";
// import CreateRoom from "./createHotel";
// import UpdateRoom from "./updateRoom";
// import DeleteRoom from "./deleteHotel";
// import Updateroom from "./updateRoom";
// import Createroom from "./createRoom";
// import Deleteroom from "./deleteRoom";

const Hotel = () => {
  const [selectHotel, setSelectedRoom] = useState<THotel | null>(null);
  const [deleteHotel, setDeleteHotel] = useState<THotel | null>(null);
  const {
    data: hotelData,
    isLoading: RoomsLoading,
    // error: roomError,
  } = hotelsAPI.useGetHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const handleEdit = (hotel: THotel) => {
    setSelectedRoom(hotel);
  };

  //   hotelId: number;
  //     name: string;
  //     location: string;
  //     address: string;
  //     contactPhone: string;
  //     category: string;
  //     rating: string;

  console.log("Hotels:", hotelData);
  return (
    <div>
      <UpdateHotel hotel={selectHotel} />
      <DeleteHotel hotel={deleteHotel} />
      <CreateHotel hotel={selectHotel} />

      {RoomsLoading && <p>Loading...</p>}
      {hotelData && hotelData && hotelData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <div className="flex justify-center items-center m-4">
            <Button
              variant={"secondary"}
              className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
              onClick={() =>
                (
                  document.getElementById(
                    "create_hotel_modal"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              Create hotel
            </Button>
          </div>
          <table className="table table-sm">
            <thead>
              <tr className="bg-gray-800 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Contact Phone</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hotelData.map((hotel: THotel) => (
                <tr
                  key={hotel.hotelId}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.name}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.location}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.address}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.contactPhone}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.category}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {hotel.rating}
                  </td>

                  <td className="flex gap-4">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer"
                      onClick={() => {
                        handleEdit(hotel);
                        (
                          document.getElementById(
                            "update_hotel_modal"
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
                        setDeleteHotel(hotel);
                        (
                          document.getElementById(
                            "delete_hotel_modal"
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
        <p>hotel not found</p>
      )}
    </div>
  );
};

export default Hotel;
