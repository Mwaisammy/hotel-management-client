import toast from "react-hot-toast";
import {
  bookingsAPI,
  type TBookings,
} from "../../Features/bookings/bookingsAPI";

type DeleteBookingProps = {
  booking: TBookings | null;
};

const DeleteBooking = ({ booking }: DeleteBookingProps) => {
  const [deleteBooking, { isLoading }] = bookingsAPI.useDeleteBookingsMutation({
    fixedCacheKey: "deleteTodo", //used to prevent cache invalidation issues - in simple terms, it helps to keep the cache consisten
  });
  const handleDelete = async () => {
    try {
      if (!booking) {
        toast.error("booking not found");
        return;
      }
      const response = await deleteBooking(booking.bookingId);
      console.log("Delete booking", response);
      toast.success("booking deleted successfully!");
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };
  return (
    <dialog id="delete_modal" className="modal sm:modal-middle  ">
      <div className="modal-box bg-black border border-rose-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete booking</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            booking ID: {booking?.bookingId}
          </span>
          ?
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-error border-2 border-rose-500"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-white" />{" "}
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            className="btn "
            type="button"
            onClick={() =>
              (
                document.getElementById("delete_modal") as HTMLDialogElement
              )?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteBooking;
