import { Link } from "react-router";

import { UserDrawerData } from "./userDrawerData";

const UserDrawer = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-white p-4 border-b-2 border-gray-700">
        Dashboard Menu
      </h2>

      <ul>
        {UserDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center p-3 text-sm hover:text-gray-800 space-x-3 border-b-2 border-transparent hover:border-white  hover:bg-[#ffbb0065] text-gray-700"
            >
              <item.icon />

              <span className="text-xl text-gray-100 mb-2">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDrawer;
