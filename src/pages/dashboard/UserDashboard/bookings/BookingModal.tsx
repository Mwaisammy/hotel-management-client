import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookingsAPI, type TBookings } from "@/Features/bookings/bookingsAPI";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { hotelsAPI } from "@/Features/hotels/hotelsAPI";

type CreateBookingProps = {
  booking: TBookings | null; //can be null if no booking is selected
};

type CreateBookingInputs = {
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  bookingStatus: string;
};

// {
//   "userId": 2,
//   "roomId": 5,
//   "checkInDate": "2025-07-06T00:00:00.000Z",
//   "checkOutDate": "2025-09-10T00:00:00.000Z",
//   "totalAmount": 20000,
//   "bookingStatus": "Pending"
// }

const schema = yup.object({
  userId: yup
    .number()
    .required("User ID is required")
    .positive("User ID must be a positive number")
    .integer("User ID must be an integer"),

  roomId: yup
    .number()
    .required("Room ID is required")
    .positive("Room ID must be a positive number")
    .integer("Room ID must be an integer"),
  totalAmount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .integer("Amount must be an integer"),
  checkOutDate: yup.string().required("Check out string string is required"),
  checkInDate: yup.string().required("Check in string is required"),
  bookingStatus: yup.string().required("Booking status is required"),
});

const BookingModal = ({ booking }: CreateBookingProps) => {
  const {
    data: hotelData,
    isLoading: hotelLoading,
    // error: roomError,
  } = hotelsAPI.useGetHotelByIdQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const [createBooking, { isLoading }] = bookingsAPI.useCreateBookingsMutation({
    fixedCacheKey: "CreateBooking",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBookingInputs>({
    resolver: yupResolver(schema),
  });

  const roomId = watch("roomId");
  const userId = watch("userId");

  useEffect(() => {
    if (booking) {
      setValue("totalAmount", booking.totalAmount);
      setValue(
        "checkInDate",
        new Date(booking.checkInDate).toISOString().slice(0, 10)
      );
      setValue(
        "checkOutDate",
        new Date(booking.checkOutDate).toISOString().slice(0, 10)
      );

      setValue("roomId", booking.roomId);
    } else {
      reset();
    }
  }, [booking, setValue, reset]);

  const onSubmit: SubmitHandler<CreateBookingInputs> = async (data) => {
    try {
      const response = await createBooking(data).unwrap(); //expect a success/error message
      console.log("Create booking", response);
      toast.success("Booking created successfully!");
      reset(); // Clear the form after successful submission
      (
        document.getElementById("user_booking_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <dialog id="user_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create booking</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="dropdown">
            <>
              <div className="dropdown">
                <label tabIndex={0} role="button" className="">
                  <Button variant={"outline"} className="text-black">
                    {userId ? `User ${userId}` : "Select User ID"}
                  </Button>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-black rounded-box z-10 w-52 p-2 shadow-sm"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num}>
                      <a
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          setValue("userId", num, { shouldValidate: true });
                        }}
                      >
                        user {num}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {errors.userId && (
                <span className="text-sm text-red-700">
                  {errors.userId.message}
                </span>
              )}

              {/* You can remove the original input for roomId, as this replaces it */}
            </>
          </div>
          <div className="dropdown">
            <>
              <div className="dropdown">
                <label tabIndex={0} role="button" className="">
                  <Button variant={"outline"} className="text-black">
                    {roomId ? `Room ${roomId}` : "Select Room ID"}
                  </Button>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-black rounded-box z-10 w-52 p-2 shadow-sm"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num}>
                      <a
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          setValue("roomId", num, { shouldValidate: true });
                        }}
                      >
                        Room {num}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {errors.roomId && (
                <span className="text-sm text-red-700">
                  {errors.roomId.message}
                </span>
              )}

              {/* You can remove the original input for roomId, as this replaces it */}
            </>
          </div>

          {errors.roomId && (
            <span className="text-sm text-red-700">
              {errors.roomId.message}
            </span>
          )}

          <label htmlFor="">
            Amount
            <input
              type="number"
              {...register("totalAmount")}
              placeholder="Amount is Required"
              className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
            />
          </label>

          {errors.totalAmount && (
            <span className="text-sm text-red-700">
              {errors.totalAmount.message}
            </span>
          )}
          <label htmlFor="">
            Check in date
            <input
              type="date"
              {...register("checkInDate")}
              className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
            />
          </label>

          {errors.checkInDate && (
            <span className="text-sm text-red-700">
              {errors.checkInDate.message}
            </span>
          )}
          <label htmlFor="">Check out date</label>
          <input
            type="date"
            {...register("checkOutDate")}
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.checkOutDate && (
            <span className="text-sm text-red-700">
              {errors.checkOutDate.message}
            </span>
          )}

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4 text-white">Status</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Confirmed"
                    {...register("bookingStatus")}
                    className="radio radio-primary text-green-400"
                  />
                  Confirmed
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Pending"
                    {...register("bookingStatus")}
                    className="radio radio-primary text-yellow-400"
                  />
                  Pending
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Cancelled"
                    {...register("bookingStatus")}
                    className="radio radio-primary text-rose-500"
                  />
                  Cancelled
                </label>
              </div>
            </label>
          </div>
          {errors.bookingStatus && (
            <span className="text-sm text-red-700">
              {errors.bookingStatus.message}
            </span>
          )}

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary  border-2 border-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" />{" "}
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                (
                  document.getElementById(
                    "user_booking_modal"
                  ) as HTMLDialogElement
                )?.close();
                reset();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;
