import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookingsAPI, type TBookings } from "@/Features/bookings/bookingsAPI";
import { toast } from "react-hot-toast";

type updateBookingProps = {
  booking: TBookings | null; //can be null if no booking is selected
};

type updateBookingInputs = {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  bookingStatus: string;
};

const schema = yup.object({
  bookingStatus: yup.string().required("Booking status is required"),

  roomId: yup
    .number()
    .required("Room ID is required")
    .positive("Room ID must be a positive number")
    .integer("Room ID must be an integer"),
  totalAmount: yup
    .number()
    .required("Room ID is required")
    .positive("Room ID must be a positive number")
    .integer("Room ID must be an integer"),
  checkOutDate: yup.string().required("Check out string string is required"),
  checkInDate: yup.string().required("Check in string is required"),
});

const UpdateBooking = ({ booking }: updateBookingProps) => {
  const [updateBooking, { isLoading }] = bookingsAPI.useUpdateBookingsMutation({
    fixedCacheKey: "UpdateBooking",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<updateBookingInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (booking) {
      setValue("bookingStatus", booking.bookingStatus);
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

  const onSubmit: SubmitHandler<updateBookingInputs> = async (data) => {
    if (!booking) {
      toast.error("No booking selected for update");
      return;
    }
    try {
      const result = await updateBooking({
        ...data,
        id: booking.bookingId,
      });

      if ("error" in result) {
        toast.error("Failed to update booking");
        console.error(result.error);
      } else {
        toast.success("booking updated successfully");
        console.log("booking was updated successfully", result.data);
        reset();
        (document.getElementById("update_modal") as HTMLDialogElement)?.close();
      }
    } catch (error) {
      toast.error("booking failed to update");
      console.log(error);
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();
    }
  };

  return (
    <dialog id="update_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update booking</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label htmlFor="">
            Room ID
            <input
              type="number"
              {...register("roomId")}
              placeholder="Room ID"
              className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
            />
          </label>
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
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                (
                  document.getElementById("update_modal") as HTMLDialogElement
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

export default UpdateBooking;
