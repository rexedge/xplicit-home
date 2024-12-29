import { NextResponse } from "next/server";

// This is a mock database. In a real application, you'd use a proper database.
let orders: any = [];

export async function POST(request: Request) {
  const { tableNumber, items, paymentDetails } = await request.json();

  const order = {
    id: Date.now(),
    tableNumber,
    items,
    status: "paid",
    paymentDetails: {
      last4: paymentDetails.last4,
      // In a real app, you'd store a payment ID from your payment processor, not card details
    },
    createdAt: new Date(),
  };

  orders.push(order);

  return NextResponse.json({
    message: "Order placed and paid successfully",
    orderId: order.id,
  });
}

export async function GET(request: Request) {
  // In a real application, you'd want to add authentication here to ensure only staff can access this
  return NextResponse.json(orders);
}
