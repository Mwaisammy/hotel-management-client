import { Button } from "@/components/ui/button";
import {
  ticketsAPI,
  type TSupportTicket,
} from "../../../../Features/tickets/ticketsAPI";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateTicketForm } from "./createUserTickets";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { UpdateUserTicket } from "./updateUserTicket";
import DeleteUserTicket from "./deleteTicket";

const UserTickets = () => {
  const [selectedTicket, setSelectedticket] = useState<TSupportTicket | null>(
    null
  );
  const [deletedTicket, setDeletedTicket] = useState<TSupportTicket | null>(
    null
  );

  const fullUser = useSelector((state: RootState) => state.user);
  const user = fullUser?.user;
  const userId = user?.userId;

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError,
    error,
    refetch,
  } = ticketsAPI.useGetTicketByUserIdQuery(userId, {
    skip: userId === undefined,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  console.log("Tickets Data:", ticketsData);
  useEffect(() => {
    console.log("User ID:", userId);
  }, [userId]);

  useEffect(() => {
    if (deletedTicket === null) {
      refetch(); // refetch tickets after deletion modal is closed
    }
  }, [deletedTicket, refetch]);

  if (userId === undefined) {
    return <p>Loading user...</p>;
  }

  if (ticketsLoading) {
    return <p>Loading tickets...</p>;
  }

  if (isError) {
    return <p>Error loading tickets: {(error as Error)?.message}</p>;
  }

  const handleEdit = (ticket: TSupportTicket) => {
    setSelectedticket(ticket);
  };
  return (
    <div>
      {/* Ticket Modals */}
      <DeleteUserTicket ticket={deletedTicket} />
      <UpdateUserTicket ticket={selectedTicket} />
      <CreateTicketForm ticket={selectedTicket} />

      {/* Create Ticket Button */}
      <Button
        variant={"secondary"}
        className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer mb-4"
        onClick={() =>
          (
            document.getElementById("create_ticket_modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        Create ticket
      </Button>

      {/* Tickets Table */}
      {ticketsData && ticketsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ticketsData.map((ticket: TSupportTicket) => (
            <div
              key={ticket.ticketId}
              className="card bg-gray-800 rounded-sm shadow-xl border border-gray-700 text-white"
            >
              <div className="card-body">
                <h2 className="card-title">
                  Ticket #{ticket.ticketId}
                  <div
                    className={`badge text-white ${
                      ticket.status === "Open"
                        ? "bg-yellow-400 rounded-sm p-1"
                        : ticket.status === "In Progress"
                        ? "bg-blue-400  rounded-sm p-1"
                        : ticket.status === "Resolved"
                        ? "bg-green-400  rounded-sm p-1"
                        : ticket.status === "Closed"
                        ? "bg-red-400  rounded-sm p-1"
                        : "bg-gray-400  rounded-sm p-1"
                    }`}
                  >
                    {ticket.status}
                  </div>
                </h2>

                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Subject:</span>{" "}
                  {ticket.subject}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">User ID:</span>{" "}
                  {ticket.userId}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Description:</span>
                  {ticket.description}
                </p>

                <div className="card-actions justify-end mt-4">
                  <Button
                    variant={"secondary"}
                    className="btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      handleEdit(ticket);
                      (
                        document.getElementById(
                          "update_user_ticket_modal"
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    <PenBoxIcon className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="btn-sm"
                    onClick={() => {
                      setDeletedTicket(ticket);
                      (
                        document.getElementById(
                          "delete_user_ticket_modal"
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default UserTickets;
