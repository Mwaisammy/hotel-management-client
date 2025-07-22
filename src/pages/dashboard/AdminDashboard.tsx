import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import AdminDrawer from "./AdminDashboard/aside/AdminDrawer";
import Footer from "@/components/layout/Footer";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <div className="flex items-center bg-blue-600 p-4">
        <Button
          onClick={handleDrawerToggle}
          className="mr-4 text-white text-2xl lg:hidden cursor-pointer "
        >
          {drawerOpen ? <X /> : <Menu />}
        </Button>

        <span className="text-white text-lg font-semibold">
          Welcome to Admin Dashboard
        </span>
      </div>
      <div className="flex">
        <aside
          className={`bg-blue-400 w-68 min-h-screen fixed top-16 
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

            <AdminDrawer />
          </div>
        </aside>
        <main className="bg-gray-900 text-white w-full min-h-screen">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
