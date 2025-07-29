import {
  Bed,
  CalendarCheck2,
  ChartNoAxesCombined,
  HeartPlus,
  Hotel,
  User2,
  Wallet,
} from "lucide-react";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType;
  link: string;
};

export const UserDrawerData: DrawerData[] = [
  {
    id: "analytics",
    name: "Analytics",
    icon: ChartNoAxesCombined,
    link: "analytics",
  },
  {
    id: "profile",
    name: "Profile",
    icon: User2,
    link: "profile",
  },

  {
    id: "bookings",
    name: "Bookings",
    icon: CalendarCheck2,
    link: "bookings",
  },

  {
    id: "payments",
    name: "Payments",
    icon: Wallet,
    link: "payments",
  },
  {
    id: "supportTicket",
    name: "Support Tickets",
    icon: HeartPlus,
    link: "support-tickets",
  },
];
