"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-2 justify-center items-center">
            <Image
              src="/logo.png"
              alt="Xplicit Home Logo"
              width={30}
              height={30}
            />
            <span className="font-bold text-lg">Xplicit Home</span>
          </div>
        </motion.div>
        <motion.ul
          className="flex space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li>
            <Link
              href="/services"
              className="hover:text-purple-300 transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-purple-300 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-purple-300 transition-colors"
            >
              Contact
            </Link>
          </li>
        </motion.ul>
      </nav>
    </header>
  );
}
