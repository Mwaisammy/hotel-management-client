import { Button } from "@/components/ui/button";
import { usersAPI } from "@/Features/users/userAPI";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UpdateProfile from "./AdminDashboard/UpdateProfile";

const Profile = () => {
  const fullUser = useSelector((state: RootState) => state.user);
  const user = fullUser?.user;
  const user_id = user?.userId;
  console.log("user_id", user);
  const { data, isLoading, error } = usersAPI.useGetUserByIdQuery(
    user_id ?? 0,
    {
      skip: !user_id,
    }
  );

  console.log("user data", data);

  return (
    <div>
      {data && <UpdateProfile user={data} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading profile</p>
      ) : (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md h-screen">
          <h2 className="text-xl font-sembold mb-4  text-white">
            User Information
          </h2>
          <div>
            <div className="flex flex-col items-center mb-4 border border-white p-4 rounded-md text-white">
              <img
                src={
                  data?.imageUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="user-profile"
                className="size-[100px] object-cover rounded-full mr-4 border-2 border-gray-400"
              />
              <h3 className="font-semibold text-white ">
                Name: {data?.firstname} {data?.lastname}
              </h3>
              <h3 className="text-white ">Email: {data?.email}</h3>
              <h3 className="text-white ">Phone: {data?.contactPhone}</h3>
              <h3 className="text-white ">Address {data?.address}</h3>
              <h3 className="text-white ">Role: {data?.role}</h3>
              <h3 className="text-white ">
                Is Verified {data?.isVerified ? "Yes" : "No"}
              </h3>
            </div>
          </div>

          {/* update profile */}
          <div>
            <Button
              className="bg-emerald-400 hover:bg-emerald-600 text-white py-2 px-4 rounded-md cursor-pointer"
              onClick={() => {
                (
                  document.getElementById(
                    "update_profile_modal"
                  ) as HTMLDialogElement
                )?.showModal();
              }}
            >
              Update Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
