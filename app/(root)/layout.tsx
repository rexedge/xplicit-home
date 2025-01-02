import { auth } from "@/auth";
import Footer from "@/components/layout/footer";
import MainNavbar from "@/components/layout/nav-bar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="min-h-screen">
      <MainNavbar user={user} />
      {children}
      <Footer />
    </div>
  );
}
