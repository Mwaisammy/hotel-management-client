import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { roomsAPI, type TRoom } from "@/Features/rooms/roomsAPI";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

type CreateRoomProps = {
  room: TRoom | null;
};

type CreateRoomInputs = {
  hotelId: number;
  roomType: string;
  pricePerNight: string;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
};

const schema = yup.object({
  hotelId: yup
    .number()
    .required("Hotel ID is required")
    .positive("Hotel ID must be a positive number")
    .integer("Hotel ID must be an integer"),
  roomType: yup.string().required("Room type is required"),
  pricePerNight: yup.string().required("Price is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number")
    .integer("Capacity must be an integer"),
  amenities: yup.string().required("Amenities are required"),
  isAvailable: yup.boolean().required("Availability is required"),
});

const CreateRoom = ({ room }: CreateRoomProps) => {
  const [createRoom, { isLoading }] = roomsAPI.useCreateRoomsMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRoomInputs>({
    resolver: yupResolver(schema),
  });

  const hotelId = watch("hotelId");

  useEffect(() => {
    if (room) {
      setValue("hotelId", room.hotelId);
      setValue("roomType", room.roomType);
      setValue("pricePerNight", room.pricePerNight);
      setValue("capacity", room.capacity);
      setValue("amenities", room.amenities);
      setValue("isAvailable", room.isAvailable, { shouldValidate: true });
    } else {
      reset();
    }
  }, [room, setValue, reset]);

  const onSubmit: SubmitHandler<CreateRoomInputs> = async (data) => {
    try {
      const response = await createRoom(data).unwrap();
      console.log("Room created:", response);
      toast.success("Room created successfully!");
      reset();
      (
        document.getElementById("create_room_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again.");
    }
  };

  return (
    <dialog id="create_room_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Room</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Hotel ID Selection */}
          <div className="dropdown">
            <label tabIndex={0} role="button">
              <Button variant="outline" className="text-black">
                {hotelId ? `Hotel ${hotelId}` : "Select Hotel ID"}
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
                      setValue("hotelId", num, { shouldValidate: true });
                    }}
                  >
                    Hotel {num}
                  </a>
                </li>
              ))}
            </ul>
            {errors.hotelId && (
              <span className="text-sm text-red-700">
                {errors.hotelId.message}
              </span>
            )}
          </div>

          {/* Room Type */}
          <label>
            Room Type
            <input
              type="text"
              {...register("roomType")}
              placeholder="e.g. Deluxe, Standard"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.roomType && (
            <span className="text-sm text-red-700">
              {errors.roomType.message}
            </span>
          )}

          {/* Price */}
          <label>
            Price Per Night
            <input
              type="number"
              {...register("pricePerNight")}
              placeholder="Enter price"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.pricePerNight && (
            <span className="text-sm text-red-700">
              {errors.pricePerNight.message}
            </span>
          )}

          {/* Amenities */}
          <label>
            Amenities
            <input
              type="text"
              {...register("amenities")}
              placeholder="e.g. WiFi, TV, AC"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.amenities && (
            <span className="text-sm text-red-700">
              {errors.amenities.message}
            </span>
          )}

          {/* Capacity */}
          <label>
            Capacity
            <input
              type="number"
              {...register("capacity")}
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.capacity && (
            <span className="text-sm text-red-700">
              {errors.capacity.message}
            </span>
          )}

          {/* Availability */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-white mr-4">Availability</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="true"
                    {...register("isAvailable", {
                      setValueAs: (v) => v === "true",
                    })}
                    className="radio radio-primary text-green-400"
                  />
                  Available
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="false"
                    {...register("isAvailable", {
                      setValueAs: (v) => v === "true",
                    })}
                    className="radio radio-primary text-rose-500"
                  />
                  Occupied
                </label>
              </div>
            </label>
            {errors.isAvailable && (
              <span className="text-sm text-red-700">
                {errors.isAvailable.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary border-2 border-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" />
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
                    "create_room_modal"
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

export default CreateRoom;
