import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserDrawer from "./UserDrawer";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <div className="flex items-center bg-[#f18a24] p-4">
        <Button
          onClick={handleDrawerToggle}
          className="mr-4 text-white text-2xl lg:hidden cursor-pointer "
        >
          {drawerOpen ? <X /> : <Menu />}
        </Button>

        <span className="text-white text-lg font-semibold">
          Welcome to User Dashboard
        </span>
      </div>
      <div className="flex overflow-x-hidden">
        <aside
          className={`bg-gradient-to-b from-[#f19c1c] to-[#f69477] w-68 min-h-screen fixed top-16 
      ${drawerOpen ? "" : "hidden"}
      lg:static lg:block
    `}
        >
          <div>
            <Button
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
              onClick={handleDrawerToggle}
              variant={"ghost"}
            >
              <X />
            </Button>

            <UserDrawer />
          </div>
        </aside>

        {/* Scrollable content area */}
        <main className="bg-[#cf9e90] text-white w-full min-h-screen overflow-auto">
          <h4 className="text-center text-2xl m-4">
            Welcome to User Dashboard
          </h4>
          <div className="p-4 min-w-[1000px] min-h-[500px]">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
