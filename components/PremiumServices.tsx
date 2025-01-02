"use client";

import ServiceCard from "./ServiceCard";

export default function PremiumServices() {
  return (
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
  );
}
