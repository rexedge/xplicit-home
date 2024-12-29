import { NextResponse } from "next/server";

// This is a mock database. In a real application, you'd use a proper database.
let menuItems = {
  drinks: [
    {
      name: "Xplicit Signature Cocktail",
      price: 15,
      description: "Our house special blend",
      category: "Alcoholic",
    },
    {
      name: "Relaxation Mocktail",
      price: 10,
      description: "Alcohol-free blend of fruits and herbs",
      category: "Non-Alcoholic",
    },
    // ... other items
  ],
  wellness: [
    {
      name: "Lavender Essential Oil",
      price: 20,
      description: "100% pure essential oil for relaxation",
      category: "Aromatherapy",
    },
    // ... other items
  ],
  merchandise: [
    {
      name: "Xplicit Home T-Shirt",
      price: 25,
      description: "Soft, premium cotton with our logo",
      category: "Branded Items",
    },
    // ... other items
  ],
};

export async function GET() {
  return NextResponse.json(menuItems);
}

export async function POST(request: Request) {
  const updates = await request.json();

  // Update the menu items
  Object.keys(updates).forEach((category) => {
    // @ts-expect-error: Property 'category' does not exist on type 'never'.
    if (menuItems[category]) {
      // @ts-expect-error: Property 'category' does not exist on type 'never'.
      menuItems[category] = updates[category];
    }
  });

  return NextResponse.json({ message: "Menu updated successfully" });
}
