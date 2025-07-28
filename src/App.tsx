import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "./store/store";

// Pages
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./auth/login";
import Register from "./auth/register";
import VerifyUser from "./auth/verifyUser";
import Contact from "./pages/Contact";
import Bookings from "./Features/bookings/bookings";
import { Toaster } from "react-hot-toast";
import User from "./Features/users/user";
import Rooms from "./Features/rooms/rooms";
import Hotel from "./Features/hotels/hotels";
import Tickets from "./Features/tickets/tickets";
import Profile from "./pages/dashboard/profile";
import AdminDashboard from "./pages/dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard/UserDashboard";

const queryClient = new QueryClient();

const App = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.user.user?.role === "admin"
  );
  const isUser = useSelector(
    (state: RootState) => state.user.user?.role === "user"
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/hotels",
      element: <Hotels />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/register/verify",
      element: <VerifyUser />,
    },
    {
      path: "/dashboard/admin",
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: "analytics",
          element: <h1>Analytics</h1>,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "users",
          element: <User />,
        },
        {
          path: "payments",
          element: <h1>Payments</h1>,
        },
        {
          path: "support-tickets",
          element: <Tickets />,
        },
        {
          path: "hotels",
          element: <Hotel />,
        },
      ],
    },
    {
      path: "/dashboard/user",
      element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
          path: "analytics",
          element: <h1>Analytics</h1>,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "users",
          element: <User />,
        },
        {
          path: "payments",
          element: <h1>Payments</h1>,
        },
        {
          path: "support-tickets",
          element: <Tickets />,
        },
        {
          path: "hotels",
          element: <Hotel />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
