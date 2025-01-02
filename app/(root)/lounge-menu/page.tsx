"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function LoungeMenu() {
  const [activeTab, setActiveTab] = useState("drinks");
  const [menuItems, setMenuItems] = useState<any>({});
  const [cart, setCart] = useState([]);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const addToCart = (item: any) => {
    // @ts-expect-error: Object is possibly 'null'.
    setCart([...cart, item]);
    toast.success("Added to cart", {
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePaymentSubmit = async (e: any) => {
    e.preventDefault();
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        paymentDetails: {
          last4: paymentDetails.cardNumber.slice(-4),
          // In a real app, you'd send this to a payment processor, not store it directly
        },
      }),
    });

    if (response.ok) {
      toast.success("Order placed and paid", {
        description: `Your order has been placed and paid for.`,
      });
      setCart([]);
      setIsPaymentDialogOpen(false);
    } else {
      toast.error("Error", {
        description: "Failed to place order. Please try again.",
      });
    }
  };

  const calculateTotal = () => {
    // @ts-expect-error: Object is possibly 'null'.
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-900">
          Xplicit Home Lounge Menu
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          </TabsList>
          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* @ts-expect-error: Property 'map' does not exist on type 'never'. */}
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                          <Badge>{item.category}</Badge>
                        </div>
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {cart.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                {/* @ts-expect-error: Object is possibly 'null'. */}
                <span>{item.name}</span>
                <div>
                  {/* @ts-expect-error: Object is possibly 'null'. */}
                  <span className="mr-4">${item.price.toFixed(2)}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
            </div>
            <div className="mt-4">
              <Dialog
                open={isPaymentDialogOpen}
                onOpenChange={setIsPaymentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full">Place Order and Pay</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                    <DialogDescription>
                      Enter your payment information to complete your order.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              expiryDate: e.target.value,
                            })
                          }
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentDetails.cvv}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cvv: e.target.value,
                            })
                          }
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Pay Now
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
