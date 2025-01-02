import { Button } from "./ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="cta bg-black text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Indulge?</h2>
        <p className="text-xl mb-8">
          Book your premium experience at Xplicit Home today.
        </p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/services">View Services</Link>
        </Button>
      </div>
    </section>
  );
}
