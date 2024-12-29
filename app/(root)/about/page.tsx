import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Xplicit Home
          </h1>
          <p className="text-xl md:text-2xl">
            Where Beauty, Relaxation, and Luxury Meet
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Founded in 2023, Xplicit Home was born from a vision to create a
                sanctuary where beauty, wellness, and social connection
                seamlessly intertwine. Our founders, seasoned professionals in
                the beauty and hospitality industries, recognized a gap in the
                market for a truly integrated experience that caters to the
                modern individual's diverse needs.
              </p>
              <p className="text-lg">
                From our state-of-the-art salon and spa facilities to our
                vibrant lounge area, every aspect of Xplicit Home has been
                meticulously designed to offer our clients an unparalleled
                experience of luxury and care.
              </p>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/images/about-story.jpg"
                alt="Xplicit Home Salon"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for perfection in every service we offer, ensuring that our clients receive nothing but the best.",
              },
              {
                title: "Innovation",
                description:
                  "We constantly seek new techniques and technologies to enhance our services and stay ahead of industry trends.",
              },
              {
                title: "Sustainability",
                description:
                  "We are committed to eco-friendly practices and products that are good for our clients and the planet.",
              },
            ].map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "Founder & CEO",
                image: "/images/team-jane.jpg",
              },
              {
                name: "John Smith",
                role: "Head Stylist",
                image: "/images/team-john.jpg",
              },
              {
                name: "Emily Brown",
                role: "Spa Director",
                image: "/images/team-emily.jpg",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-purple-900">
              Experience Xplicit Home
            </h2>
            <p className="text-lg mb-8">
              Ready to indulge in our premium services? Book your appointment
              today and step into a world of luxury and relaxation.
            </p>
            <Button asChild size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
