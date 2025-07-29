import type { RootState } from "@/store/store";
import {
  bookingsAPI,
  type TBookings,
} from "../../../../Features/bookings/bookingsAPI";
import { useSelector } from "react-redux";
import CreateBooking from "@/Features/bookings/createBooking";

const UserBookings = () => {
  const fullUser = useSelector((state: RootState) => state.user);
  const user = fullUser?.user;
  const userId = user?.userId;
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    // error: bookingError,
  } = bookingsAPI.useGetBookingsByUserIdQuery(userId, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  console.log("user id", userId);

  console.log("Bookings:", bookingsData);
  return (
    <div>
      {bookingsLoading && <p>Loading...</p>}
      {bookingsData && bookingsData && bookingsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <div className="flex justify-center items-center m-4"></div>
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

export default UserBookings;
