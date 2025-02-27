"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, DollarSign, Calendar, ShoppingBag } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the chart
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-purple-900">
          Admin Dashboard
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  title: "Total Customers",
                  value: "1,234",
                  icon: Users,
                  color: "bg-blue-500",
                },
                {
                  title: "Revenue",
                  value: "₦45,678",
                  icon: DollarSign,
                  color: "bg-green-500",
                },
                {
                  title: "Appointments",
                  value: "89",
                  icon: Calendar,
                  color: "bg-yellow-500",
                },
                {
                  title: "Products Sold",
                  value: "567",
                  icon: ShoppingBag,
                  color: "bg-red-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {item.title}
                      </CardTitle>
                      <item.icon
                        className={`h-4 w-4 text-white ${item.color} rounded-full p-1`}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "John Doe",
                      service: "Haircut",
                      date: "2023-07-01",
                      time: "14:00",
                    },
                    {
                      name: "Jane Smith",
                      service: "Massage",
                      date: "2023-07-02",
                      time: "10:30",
                    },
                    {
                      name: "Alice Johnson",
                      service: "Manicure",
                      date: "2023-07-03",
                      time: "16:15",
                    },
                  ].map((booking, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-semibold">{booking.name}</p>
                        <p className="text-sm text-gray-500">
                          {booking.service}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Shampoo", stock: 50, reorderPoint: 20 },
                    { name: "Conditioner", stock: 45, reorderPoint: 15 },
                    { name: "Hair Dye", stock: 30, reorderPoint: 10 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <p className="font-semibold">{item.name}</p>
                      <div className="text-right">
                        <p>Stock: {item.stock}</p>
                        <p className="text-sm text-gray-500">
                          Reorder at: {item.reorderPoint}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter staff name" />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" placeholder="Enter staff role" />
                    </div>
                  </div>
                  <Button type="submit">Add Staff Member</Button>
                </form>
                <div className="mt-6 space-y-4">
                  {[
                    { name: "Emma Wilson", role: "Hair Stylist" },
                    { name: "Michael Brown", role: "Massage Therapist" },
                    { name: "Sophia Lee", role: "Nail Technician" },
                  ].map((staff, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-semibold">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.role}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
