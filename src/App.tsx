import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Pages
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./auth/login";
import Register from "./auth/register";
import VerifyUser from "./auth/verifyUser";
import Contact from "./pages/Contact";
import DashboardPage from "./pages/DashboardPage";
import Bookings from "./Features/bookings/bookings";
import { Toaster } from "react-hot-toast";
import User from "./Features/users/user";
import Rooms from "./Features/rooms/rooms";
import Hotel from "./Features/hotels/hotels";

const queryClient = new QueryClient();

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
    path: "/dashboard/main",
    element: <DashboardPage />,
    children: [
      {
        path: "analytics",
        element: <h1>Analytics</h1>,
      },
      {
        path: "profile",
        element: <h1>Profile</h1>,
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
        element: <h1>Support Tickets</h1>,
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

const App = () => {
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
