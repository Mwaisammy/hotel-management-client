import { Button } from "@/components/ui/button";
import { bookingsAPI, type TBookings } from "./bookingsAPI";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateBooking from "./updateBooking";
import CreateBooking from "./createBooking";

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<TBookings | null>(
    null
  );
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    // error: bookingError,
  } = bookingsAPI.useGetBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const handleEdit = (booking: TBookings) => {
    setSelectedBooking(booking);
  };

  console.log("Bookings:", bookingsData);
  return (
    <div>
      <UpdateBooking booking={selectedBooking} />
      <CreateBooking booking={selectedBooking} />
      {bookingsLoading && <p>Loading...</p>}
      {bookingsData && bookingsData && bookingsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <div className="flex justify-center items-center m-4">
            <Button
              variant={"secondary"}
              className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
              onClick={() =>
                (
                  document.getElementById("create_modal") as HTMLDialogElement
                )?.showModal()
              }
            >
              Create booking
            </Button>
          </div>
          <table className="table table-sm">
            <thead>
              <tr className="bg-gray-800 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Room Id</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Check in date</th>
                <th className="px-4 py-2">Check out date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookingsData.map((booking: TBookings) => (
                <tr
                  key={booking.bookingId}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {booking.bookingId}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {booking.roomId}
                  </td>
                  <td className="px-2 py-1  border-r border-gray-500 lg:text-base text-white text-sm font-medium ">
                    <span
                      className={`px-2 py-1  rounded-md text-white text-sm font-medium ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-emerald-500"
                          : booking.bookingStatus === "Pending"
                          ? "bg-yellow-500"
                          : booking.bookingStatus === "Cancelled"
                          ? "bg-rose-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {booking.totalAmount}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>

                  <td className="flex gap-4">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer"
                      onClick={() => {
                        handleEdit(booking);
                        (
                          document.getElementById(
                            "update_modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      <PenBoxIcon />
                    </Button>
                    <Button variant={"destructive"} className="cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Bookings not found</p>
      )}
    </div>
  );
};

export default Bookings;
