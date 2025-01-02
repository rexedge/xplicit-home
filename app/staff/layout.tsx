import { auth } from "@/auth";
import StaffNavbar from "@/components/layout/staff-navbar";
import { $Enums } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Staff Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  if (!session || !session.user) return redirect("/sign-in");
  if (user && user.role === $Enums.Role.ADMIN) return redirect("/admin");
  if (user && user.role === $Enums.Role.SUPERADMIN) return redirect("/admin");
  if (user && user.role === $Enums.Role.USER) return redirect("/customer");

  return (
    <div className="min-h-screen flex flex-col">
      <StaffNavbar user={user} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
