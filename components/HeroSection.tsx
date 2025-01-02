"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
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
          Experience premium salon services, rejuvenating spa treatments, and a
          vibrant lounge atmosphere.
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
  );
}
