"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <section className="hero bg-purple-900 text-white py-20">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Xplicit Home – Where Beauty, Relaxation, and Luxury Meet
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience premium salon services, rejuvenating spa treatments, and
            a vibrant lounge atmosphere.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-purple-100"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="services py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Premium Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Salon Services"
              description="Premium haircuts, styling, and beauty treatments for men and women."
              image="/salon.jpg"
            />
            <ServiceCard
              title="Spa Treatments"
              description="Luxurious massages, facials, and relaxation therapies for ultimate wellness."
              image="/spa.jpg"
            />
            <ServiceCard
              title="Lounge Experience"
              description="Vibrant social space with refreshments and entertainment."
              image="/lounge.jpg"
            />
          </div>
        </div>
      </section>

      <section className="cta bg-black text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Indulge?</h2>
          <p className="text-xl mb-8">
            Book your premium experience at Xplicit Home today.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            View Services
          </Button>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-clip">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
