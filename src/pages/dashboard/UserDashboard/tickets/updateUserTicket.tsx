import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import {
  ticketsAPI,
  type TSupportTicket,
} from "../../../../Features/tickets/ticketsAPI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type TicketFormData = {
  ticket: TSupportTicket | null;
};

type CreateTicketInputs = {
  user_id: number;
  subject: string;
  description: string;
  status: string;
};

const ticketSchema = yup.object({
  user_id: yup.number().required("User ID is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

export const UpdateUserTicket = ({ ticket }: TicketFormData) => {
  const fullUser = useSelector((state: RootState) => state.user);
  const user = fullUser?.user;
  const userId = user?.userId;

  const [updateTicket, { isLoading }] = ticketsAPI.useUpdateticketMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTicketInputs>({
    resolver: yupResolver(ticketSchema),
  });

  useEffect(() => {
    if (userId !== undefined) {
      setValue("user_id", userId);
    }

    if (ticket) {
      setValue("subject", ticket.subject);
      setValue("description", ticket.description);
      setValue("status", ticket.status);
    } else {
      reset({ user_id: userId || 0 });
    }
  }, [ticket, userId, setValue, reset]);

  const onSubmit: SubmitHandler<CreateTicketInputs> = async (data) => {
    if (!ticket?.ticketId) {
      toast.error("Ticket ID not available for update");
      return;
    }

    const payload = {
      userId: data.user_id,
      subject: data.subject,
      description: data.description,
      status: data.status || "Open",
    };

    try {
      console.log("Payload being submitted:", payload);
      await updateTicket({ id: ticket.ticketId, ...payload }).unwrap();
      toast.success("Ticket updated successfully");
      reset({ user_id: userId });
      (
        document.getElementById("update_user_ticket_modal") as HTMLDialogElement
      )?.close();
    } catch (err) {
      toast.error("Failed to update ticket");
      console.error("Error updating ticket:", err);
    }
  };

  if (userId === undefined) return null;

  return (
    <dialog id="update_user_ticket_modal" className="modal sm:modal-middle">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg"
      >
        <div>
          <label className="block font-medium text-sm text-white">
            User ID
          </label>
          <input
            {...register("user_id")}
            readOnly
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white"
            placeholder="User ID"
          />
          {errors.user_id && (
            <p className="text-red-500 text-sm">{errors.user_id.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-white">
            Subject
          </label>
          <input
            {...register("subject")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-white">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Describe the issue"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-white">Status</label>
          <input
            {...register("status")}
            value="Open"
            readOnly
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Updating..." : "Update Ticket"}
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            type="button"
            onClick={() => {
              (
                document.getElementById(
                  "update_ticket_modal"
                ) as HTMLDialogElement
              )?.close();
              reset({ user_id: userId });
            }}
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
