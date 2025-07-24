import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { hotelsAPI, type THotel } from "@/Features/hotels/hotelsAPI";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type CreateHotelProps = {
  hotel: THotel | null;
};

type UpdateHotelInputs = {
  name: string;
  location: string;
  address: string;
  contactPhone: string;
  category: string;
  rating: number;
};

const schema = yup.object({
  name: yup.string().required("Hotel ID is required"),

  location: yup.string().required("Hotel location is required"),
  contactPhone: yup.string().required("Contact phone is required"),
  rating: yup
    .number()
    .required("rating is required")
    .positive("rating must be a positive number")
    .integer("rating must be an integer"),
  address: yup.string().required("address are required"),
  category: yup.string().required("Category is required"),
});

const UpdateHotel = ({ hotel }: CreateHotelProps) => {
  const [updatedHotel, { isLoading }] = hotelsAPI.useUpdateHotelMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateHotelInputs>({
    resolver: yupResolver(schema),
  });

  const category = watch("category");

  useEffect(() => {
    if (hotel) {
      setValue("name", hotel.name);
      setValue("location", hotel.location);
      setValue("rating", hotel.rating);
      setValue("contactPhone", hotel.contactPhone);
      setValue("address", hotel.address);
      setValue("rating", hotel.rating, { shouldValidate: true });
    } else {
      reset();
    }
  }, [hotel, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateHotelInputs> = async (data) => {
    try {
      if (!hotel) {
        toast.error("No room selected for update");
        return;
      }
      const result = await updatedHotel({
        ...data,
        id: hotel.hotelId,
      });
      console.log("Hotel updates:", result);
      toast.success("Hotel updated successfully!");
      reset();
      (
        document.getElementById("update_hotel_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel. Please try again.");
    }
  };

  return (
    <dialog id="update_hotel_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 border border-blue-500 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update hotel</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Hotel Name Selection */}
          <label>
            Hotel name
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Maasai Mara resort"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>

          {/* hotel location */}
          <label>
            Hotel location
            <input
              type="text"
              {...register("location")}
              placeholder="e.g. Nairobi, Kenya"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.location && (
            <span className="text-sm text-red-700">
              {errors.location.message}
            </span>
          )}

          {/* Price */}
          <label>
            Hotel address
            <input
              type="text"
              {...register("address")}
              placeholder="P.O Box 1901 Maasai Mara, Taita Taveta"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.address && (
            <span className="text-sm text-red-700">
              {errors.address.message}
            </span>
          )}

          {/* contactPhone */}
          <label>
            Contact phone
            <input
              type="text"
              {...register("contactPhone")}
              placeholder="e.g. 0712378901"
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.contactPhone && (
            <span className="text-sm text-red-700">
              {errors.contactPhone.message}
            </span>
          )}

          {/* hotel type */}
          <div className="dropdown">
            <label
              tabIndex={0}
              role="button"
              className="flex gap-4 items-center"
            >
              Hotel category{" "}
              <Button
                variant="outline"
                className="text-black flex items-center gap-2"
              >
                {category || "Select category"}

                <ChevronDown />
              </Button>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black rounded-box z-10 w-52 p-2 shadow-sm"
            >
              {[
                "Budget",
                "Mid-range hotel",
                "Luxury hotel",
                "Ultra luxury hotel",
                "Palace hotel",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("category", category, { shouldValidate: true });
                    }}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
            {errors.category && (
              <span className="text-sm text-red-700">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* rating */}
          <label>
            Rating
            <input
              type="number"
              {...register("rating")}
              className="input w-full p-2 bg-white text-gray-800 rounded"
            />
          </label>
          {errors.rating && (
            <span className="text-sm text-red-700">
              {errors.rating.message}
            </span>
          )}

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary border-2 border-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-white" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                (
                  document.getElementById(
                    "update_hotel_modal"
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

export default UpdateHotel;
