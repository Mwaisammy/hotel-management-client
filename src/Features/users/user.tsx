import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChangeRole from "./changeRole";
import { usersAPI, type TUser } from "./userAPI";

const User = () => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = usersAPI.useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const handleEdit = (user: TUser) => {
    setSelectedUser(user);
  };

  console.log("User:", userData);
  return (
    <div className="overflow-x-auto">
      <ChangeRole user={selectedUser} />
      <div className=" flex items-center justify-center">
        {userLoading && (
          <span className="loading loading-bars loading-lg">Loading users</span>
        )}
        {userError && (
          <p className="text-rose-500 text-center flex items-center justify-center bg-black rounded-sm p-4 w-fit">
            Error fetching users
          </p>
        )}
      </div>
      {userData && userData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-black text-white text-md lg:text-lg">
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((user) => (
                <tr
                  key={user.userId}
                  className="hover:bg-gray-700 border-b border-gray-400"
                >
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.firstname}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.lastname}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    <span
                      className={`px-2 py-1 rounded-sm text-white text-sm ${
                        user.role === "admin" ? "bg-red-600" : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    <span>
                      {user.isVerified ? (
                        <span className="bg-emerald-500 text-white rounded-sm px-2 py-1">
                          verified
                        </span>
                      ) : (
                        <span className="bg-rose-500 text-white rounded-sm px-2 py-1">
                          not verified
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="flex gap-4">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer"
                      onClick={() => {
                        handleEdit(user);
                        (
                          document.getElementById(
                            "role_modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      Change role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-rose-500 mt-4 ">Users not available</p>
      )}
    </div>
  );
};

export default User;
