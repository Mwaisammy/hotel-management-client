import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { ticketsAPI, type TSupportTicket } from "./ticketsAPI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type TicketFormData = {
  ticket: TSupportTicket | null;
};

type CreateTicketInputs = {
  subject: string;
  description: string;
  status: string;
};

const ticketSchema = yup.object({
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

export const CreateTicketForm = ({ ticket }: TicketFormData) => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.id || user.userId;
  const [createTicket, { isLoading }] = ticketsAPI.useCreateTicketsMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue, // ✅ Added here
    formState: { errors },
  } = useForm<CreateTicketInputs>({
    resolver: yupResolver(ticketSchema),
  });

  useEffect(() => {
    if (ticket) {
      setValue("subject", ticket.subject);
      setValue("description", ticket.description);
      setValue("status", ticket.status);
    } else {
      reset();
    }
  }, [ticket, setValue, reset]);

  const onSubmit: SubmitHandler<CreateTicketInputs> = async (data) => {
    try {
      await createTicket(data).unwrap();
      toast.success("Ticket created successfully");
      reset();
      (
        document.getElementById("create_ticket_modal") as HTMLDialogElement
      )?.close();
    } catch (err) {
      toast.error("Failed to create ticket");
      console.error(err);
    }
  };

  return (
    <dialog id="create_ticket_modal" className="modal sm:modal-middle">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg"
      >
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
          <select
            {...register("status")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-black text-white"
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Submitting..." : "Submit Ticket"}
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            type="button"
            onClick={() => {
              (
                document.getElementById("create_modal") as HTMLDialogElement
              )?.close();
              reset();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
