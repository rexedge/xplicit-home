"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import fs from "fs";
import path from "path";

export async function createInventoryItem(data: {
  name: string;
  description: string;
  category: Category;
  quantity: number;
  price: number;
  imageUrls: string[];
}) {
  try {
    const item = await prisma.inventoryItem.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        quantity: data.quantity,
        price: data.price,
        images: {
          create: data.imageUrls.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
      },
    });

    revalidatePath(`/admin/inventory/${data.category.toLowerCase()}`);
    return { success: true, data: item };
  } catch (error) {
    console.error("Failed to create inventory item:", error);
    return { success: false, error: "Failed to create inventory item" };
  }
}

export async function getInventoryItems(category: Category) {
  try {
    const items = await prisma.inventoryItem.findMany({
      where: { category },
      include: {
        images: true,
      },
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("Failed to fetch inventory items:", error);
    return { success: false, error: "Failed to fetch inventory items" };
  }
}

export async function updateInventoryItem(
  id: string,
  data: {
    name?: string;
    description?: string;
    category?: Category;
    quantity?: number;
    price?: number;
    imageUrls?: string[];
  }
) {
  try {
    const item = await prisma.inventoryItem.update({
      where: { id },
      data: {
        ...data,
        images: data.imageUrls
          ? {
              deleteMany: {},
              create: data.imageUrls.map((url) => ({ url })),
            }
          : undefined,
      },
      include: {
        images: true,
      },
    });

    revalidatePath(`/admin/inventory/${item.category.toLowerCase()}`);
    return { success: true, data: item };
  } catch (error) {
    console.error("Failed to update inventory item:", error);
    return { success: false, error: "Failed to update inventory item" };
  }
}

export async function deleteInventoryItem(id: string) {
  try {
    const item = await prisma.inventoryItem.delete({
      where: { id },
      include: { images: true },
    });

    // Delete associated image files
    for (const image of item.images) {
      const filePath = path.join(process.cwd(), "public", image.url);
      fs.unlinkSync(filePath);
    }

    revalidatePath(`/admin/inventory/${item.category.toLowerCase()}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete inventory item:", error);
    return { success: false, error: "Failed to delete inventory item" };
  }
}
