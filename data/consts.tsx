import { Calendar, Library, ShoppingBag, UserIcon } from "lucide-react";

export const adminNavItem = [
  { name: "Dashboard", href: "/admin", icon: UserIcon },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Inventory", href: "/admin/inventory/lounge", icon: Library },
  { name: "Staff", href: "/admin/staff", icon: UserIcon },
];

export const staffNavItem = [
  { name: "Dashboard", href: "/staff", icon: UserIcon },
  { name: "My Schedule", href: "/staff/schedule", icon: Calendar },
];

export const customerNavItem = [
  { name: "Dashboard", href: "/customer", icon: UserIcon },
  { name: "My Appointments", href: "/customer/appointments", icon: Calendar },
  { name: "Book Service", href: "/customer/services", icon: ShoppingBag },
];
