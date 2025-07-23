import {
  Bed,
  CalendarCheck2,
  ChartNoAxesCombined,
  HeartPlus,
  Users,
  Wallet,
} from "lucide-react";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType;
  link: string;
};

export const adminDrawerData: DrawerData[] = [
  {
    id: "analytics",
    name: "Analytics",
    icon: ChartNoAxesCombined,
    link: "analytics",
  },
  {
    id: "rooms",
    name: "Rooms",
    icon: Bed,
    link: "rooms",
  },
  {
    id: "bookings",
    name: "Bookings",
    icon: CalendarCheck2,
    link: "bookings",
  },
  {
    id: "users",
    name: "Users",
    icon: Users,
    link: "users",
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
