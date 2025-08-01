import toast from "react-hot-toast";
import { hotelsAPI, type THotel } from "../hotels/hotelsAPI";

type DeleteBookingProps = {
  hotel: THotel | null;
};

const DeleteRoom = ({ hotel }: DeleteBookingProps) => {
  const [deletedRoom, { isLoading }] = hotelsAPI.useDeleteHotelMutation();
  const handleDelete = async () => {
    try {
      if (!hotel) {
        toast.error("hotel not found");
        return;
      }
      const response = await deletedRoom(hotel.hotelId);
      console.log("Delete hotel", response);
      toast.success("hotel deleted successfully!");
      (
        document.getElementById("delete_hotel_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete hotel. Please try again.");
    }
  };
  return (
    <dialog id="delete_hotel_modal" className="modal sm:modal-middle  ">
      <div className="modal-box bg-black border border-rose-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete hotel</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">hotel {hotel?.name}</span>?
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
                document.getElementById(
                  "delete_hotel_modal"
                ) as HTMLDialogElement
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

export default DeleteRoom;
