import { auth } from "@/auth";
import AdminNavbar from "@/components/layout/admin-navbar";
import { $Enums } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  if (!session || !session.user) return redirect("/sign-in");
  if (user && user.role === $Enums.Role.USER) return redirect("/customer");
  if (user && user.role === $Enums.Role.STAFF) return redirect("/staff");

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar user={user} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
