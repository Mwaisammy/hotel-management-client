import { Button } from "@/components/ui/button";
import { usersAPI } from "@/Features/users/userAPI";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UpdateProfile from "./AdminDashboard/UpdateProfile";

const Profile = () => {
  const fullUser = useSelector((state: RootState) => state.user);
  const user = fullUser?.user;
  const user_id = user?.user_id;
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
        <div className="bg-[#f2daa7] p-6 rounded-lg shadow-md h-screen">
          <h2 className="text-xl font-sembold mb-4">User Information</h2>
          <div>
            <div className="flex flex-col items-center mb-4 border border-black p-4 rounded-md">
              <img
                src={
                  data?.imageUrl ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="user-profile"
                className="size-[100px] object-cover rounded-full mr-4 border-2 border-gray-400"
              />
              <h3 className="font-semibold text-black ">
                Name: {data?.firstname} {data?.lastname}
              </h3>
              <h3 className="text-black ">Email: {data?.email}</h3>
              <h3 className="text-black ">Phone: {data?.address}</h3>
              <h3 className="text-black ">Role: {data?.role}</h3>
              <h3 className="text-black ">
                Is Verified {data?.isVerified ? "Yes" : "No"}
              </h3>
            </div>
          </div>

          {/* update profile */}
          <div>
            <Button
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
