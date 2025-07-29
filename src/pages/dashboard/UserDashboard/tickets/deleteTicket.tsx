import toast from "react-hot-toast";
import {
  ticketsAPI,
  type TSupportTicket,
} from "../../../../Features/tickets/ticketsAPI";

type DeleteTicketProp = {
  ticket: TSupportTicket | null;
};

const DeleteUserTicket = ({ ticket }: DeleteTicketProp) => {
  const [deleteTicket, { isLoading }] = ticketsAPI.useDeleteticketMutation();
  const handleDelete = async () => {
    try {
      if (!ticket) {
        toast.error("ticket not found");
        return;
      }
      const response = await deleteTicket(ticket.ticketId);
      console.log("Delete ticket", response);
      toast.success("Ticket deleted successfully!");
      (
        document.getElementById("delete_user_ticket_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete ticket. Please try again.");
    }
  };
  return (
    <dialog id="delete_user_ticket_modal" className="modal sm:modal-middle  ">
      <div className="modal-box bg-black border border-rose-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete ticket</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">ticket {ticket?.description}</span>?
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
                  "delete_user_ticket_modal"
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

export default DeleteUserTicket;
