import toast from "react-hot-toast";
import { hotelsAPI, type TRoom } from "../rooms/hotelsAPI";
import { hotelsAPI } from "./hotelsAPI";

type DeleteBookingProps = {
  room: TRoom | null;
};

const DeleteRoom = ({ room }: DeleteBookingProps) => {
  const [deletedRoom, { isLoading }] = hotelsAPI.useDeleteRoomMutation();
  const handleDelete = async () => {
    try {
      if (!room) {
        toast.error("Room not found");
        return;
      }
      const response = await deletedRoom(room.roomId);
      console.log("Delete room", response);
      toast.success("Room deleted successfully!");
      (
        document.getElementById("delete_hotel_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete room. Please try again.");
    }
  };
  return (
    <dialog id="delete_hotel_modal" className="modal sm:modal-middle  ">
      <div className="modal-box bg-black border border-rose-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete room</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">Room {room?.roomType}</span>?
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
