import HeroSection from "@/components/HeroSection";
import PremiumServices from "@/components/PremiumServices";
import CallToAction from "@/components/CallToAction";
import { auth } from "@/auth";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home(props: {
  searchParams: Promise<{ r: string }>;
}) {
  const searchParams = await props.searchParams;

  const session = await auth();
  const user = session?.user;
  if (searchParams.r !== "false") {
    if (user && user.role === $Enums.Role.SUPERADMIN) return redirect("/admin");
    if (user && user.role === $Enums.Role.ADMIN) return redirect("/admin");
    if (user && user.role === $Enums.Role.USER) return redirect("/customer");
    if (user && user.role === $Enums.Role.STAFF) return redirect("/staff");
  }
  return (
    <main>
      <HeroSection />
      <PremiumServices />
      <CallToAction />
    </main>
  );
}
