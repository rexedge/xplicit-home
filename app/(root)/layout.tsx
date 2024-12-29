import Footer from "@/components/layout/footer";
import MainNavbar from "@/components/layout/nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
