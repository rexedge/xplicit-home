"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function StaffOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll for updates every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("/api/order");
    if (response.ok) {
      const data = await response.json();
      const newOrders = data.filter(
        (order: any) =>
          !orders.some((existingOrder: any) => existingOrder.id === order.id)
      );
      setOrders(data);
      newOrders.forEach(handleNewOrder);
    }
  };

  const handleNewOrder = () => {
    toast.success("New Order", {
      description: "completion",
    });
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      toast.success("Order updated", {
        description: `Order ${orderId} has been marked as ${newStatus}.`,
      });
      fetchOrders();
    } else {
      toast("Error", {
        description: "Failed to update order status. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Staff: Manage Orders</h1>

      <div className="grid gap-4">
        {orders.map((order: any) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
              <CardDescription>Table {order.tableNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge>{order.status}</Badge>
              </div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="list-disc pl-5 mb-4">
                {order.items.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              {order.paymentDetails && (
                <p className="mb-4">
                  Paid with card ending in {order.paymentDetails.last4}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => updateOrderStatus(order.id, "in-progress")}
                >
                  Mark In Progress
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, "completed")}
                >
                  Mark Completed
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
