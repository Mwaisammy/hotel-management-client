import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { roomsAPI, type TRoom } from "@/Features/rooms/roomsAPI";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

type CreateRoomProps = {
  room: TRoom | null; //can be null if no  is selected
};

type CreateRoomInputs = {
  hotelId: number;
  roomType: string;
  pricePerNight: string;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
};

//  "hotelId": 2,
//         "roomType": "Ocean delux",
//         "pricePerNight": "356000.00",
//         "capacity": 5,
//         "amenities": "Balcony, Fireplace, WiFi",
//         "isAvailable": true

const schema = yup.object({
  hotelId: yup
    .number()
    .required("Hotel ID is required")
    .positive("Hotel ID must be a positive number")
    .integer("Hotel ID must be an integer"),
  roomType: yup.string().required("Check out string string is required"),

  pricePerNight: yup.string().required("Price is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity  must be a positive number")
    .integer("Capacity must be an integer"),
  amenities: yup.string().required("amenities is required"),
  isAvailable: yup.boolean().required(" isAvailable is required"),
});

const CreateRoom = ({ room }: CreateRoomProps) => {
  const [createdRooms, { isLoading }] = roomsAPI.useCreateRoomsMutation({
    fixedCacheKey: "Create",
  });

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
      setValue("hotelId", room?.hotelId);
      setValue("roomType", room?.roomType);
      setValue("pricePerNight", room?.pricePerNight);
      setValue("capacity", room?.capacity);
      setValue("amenities", room?.amenities);
      setValue("isAvailable", room?.isAvailable || false, {
        shouldValidate: true,
      });
      setValue("hotelId", room?.hotelId);
    } else {
      reset();
    }
  }, [room, setValue, reset]);

  const onSubmit: SubmitHandler<CreateRoomInputs> = async (data) => {
    try {
      const response = await createdRooms(data).unwrap(); //expect a success/error message
      console.log("Create room", response);
      toast.success(" Room created successfully!");
      reset(); // Clear the form after successful submission
      (
        document.getElementById("create_room_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error creating :", error);
      toast.error("Failed to create . Please try again.");
    }
  };

  return (
    <dialog id="create_room_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Room</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="dropdown">
            <>
              <div className="dropdown">
                <label tabIndex={0} role="button" className="">
                  <Button variant={"outline"} className="text-black">
                    {hotelId ? `Hotel ${hotelId}` : "Select hotel ID"}
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
              </div>

              {errors.hotelId && (
                <span className="text-sm text-red-700">
                  {errors.hotelId.message}
                </span>
              )}

              {/* You can remove the original input for roomId, as this replaces it */}
            </>
          </div>
          <label htmlFor="">
            Price per night
            <input
              type="number"
              {...register("pricePerNight")}
              placeholder="Price is Required"
              className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
            />
          </label>

          {errors.pricePerNight && (
            <span className="text-sm text-red-700">
              {errors.pricePerNight.message}
            </span>
          )}
          <label htmlFor="">
            Amenities
            <input
              type="date"
              {...register("amenities")}
              className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
            />
          </label>

          {errors.amenities && (
            <span className="text-sm text-red-700">
              {errors.amenities.message}
            </span>
          )}
          <label htmlFor="">Capacity</label>
          <input
            type="number"
            {...register("capacity")}
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.capacity && (
            <span className="text-sm text-red-700">
              {errors.capacity.message}
            </span>
          )}

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4 text-white">Availability</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="true"
                    {...register("isAvailable")}
                    className="radio radio-primary text-green-400"
                  />
                  Available
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="false"
                    {...register("isAvailable")}
                    className="radio radio-primary text-rose-500"
                  />
                  Occupied
                </label>
              </div>
            </label>
          </div>
          {errors.isAvailable && (
            <span className="text-sm text-red-700">
              {errors.isAvailable.message}
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
                  document.getElementById("create_modal") as HTMLDialogElement
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
