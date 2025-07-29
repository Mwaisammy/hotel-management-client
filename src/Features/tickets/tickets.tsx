import { Button } from "@/components/ui/button";
import { ticketsAPI, type TSupportTicket } from "./ticketsAPI";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateTicketForm } from "../../pages/dashboard/UserDashboard/tickets/createUserTickets";
import DeleteTicket from "@/pages/dashboard/UserDashboard/tickets/deleteTicket";
import { UpdateTicket } from "./updateTicket";

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<TSupportTicket | null>(
    null
  );
  const [deletedTicket, setDeletedTicket] = useState<TSupportTicket | null>(
    null
  );
  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    // error: ticketError,
  } = ticketsAPI.useGetSupportTicketQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const handleEdit = (ticket: TSupportTicket) => {
    setSelectedTicket(ticket);
  };

  console.log("Tickets:", ticketsData);
  return (
    <div>
      <UpdateTicket ticket={selectedTicket} />
      <DeleteTicket ticket={deletedTicket} />
      <CreateTicketForm ticket={selectedTicket} />

      {ticketsLoading && <p>Loading...</p>}
      {ticketsData && ticketsData && ticketsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <div className="flex justify-center items-center m-4">
            <Button
              variant={"secondary"}
              className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
              onClick={() =>
                (
                  document.getElementById(
                    "create_ticket_modal"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              Create ticket
            </Button>
          </div>
          <table className="table table-sm">
            <thead>
              <tr className="bg-gray-800 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Ticket Id</th>
                <th className="px-4 py-2">User Id</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-10 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {ticketsData.map((ticket: TSupportTicket) => (
                <tr
                  key={ticket.ticketId}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {ticket.ticketId}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {ticket.userId}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-500 lg:text-base">
                    {ticket.description}
                  </td>
                  <td className="px-4 py-1 border-r border-gray-500 lg:text-base text-white text-sm font-medium">
                    <span
                      className={`px-1 py-1 rounded-md text-white text-xs font-medium ${
                        ticket.status === "Open"
                          ? "bg-yellow-500"
                          : ticket.status === "In Progress"
                          ? "bg-blue-500"
                          : ticket.status === "Resolved"
                          ? "bg-green-500"
                          : ticket.status === "Closed"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="flex gap-4">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer"
                      onClick={() => {
                        handleEdit(ticket);
                        (
                          document.getElementById(
                            "update_ticket_modal"
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
                        setDeletedTicket(ticket);
                        (
                          document.getElementById(
                            "delete_ticket_modal"
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
        <p>Tickets not found</p>
      )}
    </div>
  );
};

export default Tickets;
