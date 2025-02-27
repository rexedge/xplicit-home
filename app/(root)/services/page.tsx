"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Star, Search } from "lucide-react";
import { services } from "./servicesData";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("salon");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const filteredServices = Object.entries(services).reduce(
    (acc, [category, items]) => {
      // @ts-expect-error: Object is possibly 'null'.
      acc[category] = items.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return acc;
    },
    {}
  );

  const handleBooking = (service: any) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-900">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover our range of premium services designed to enhance your
          beauty, wellness, and relaxation experience.
        </p>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="salon">Salon Services</TabsTrigger>
            <TabsTrigger value="spa">Spa Treatments</TabsTrigger>
            <TabsTrigger value="lounge">Lounge Experience</TabsTrigger>
          </TabsList>
          {Object.entries(filteredServices).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* @ts-expect-error: Property 'map' does not exist on type 'never'. */}
                {items.map((service: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <Image
                          src={service.image}
                          alt={service.name}
                          width={300}
                          height={200}
                          className="rounded-t-lg"
                        />
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-purple-700">
                            ₦{service.price}
                          </span>
                          <Badge variant="outline">{service.duration}</Badge>
                        </div>
                        <div className="mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`inline-block w-5 h-5 ${
                                i <
                                Math.round(
                                  service.reviews.reduce(
                                    // @ts-expect-error: Object is possibly 'null'.
                                    (acc, review) => acc + review.rating,
                                    0
                                  ) / service.reviews.length
                                )
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({service.reviews.length} reviews)
                          </span>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handleBooking(service)}
                        >
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book {selectedService?.name}</DialogTitle>
              <DialogDescription>
                Please select a date and time for your{" "}
                {selectedService?.name.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="border p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">
                What payment methods do you accept?
              </summary>
              <p className="mt-2">
                We accept all major credit cards, debit cards, and cash
                payments. We also offer gift cards which can be used for any of
                our services.
              </p>
            </details>
            <details className="border p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">
                Do I need to make an appointment?
              </summary>
              <p className="mt-2">
                While we do accept walk-ins when possible, we highly recommend
                making an appointment to ensure availability and minimize wait
                times.
              </p>
            </details>
            <details className="border p-4 rounded-lg">
              <summary className="font-medium cursor-pointer">
                What is your cancellation policy?
              </summary>
              <p className="mt-2">
                We kindly ask that you give us at least 24 hours notice if you
                need to cancel or reschedule your appointment. Late
                cancellations or no-shows may be subject to a fee.
              </p>
            </details>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
