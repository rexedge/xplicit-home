import { Category } from "@prisma/client";

export interface InventoryItemImage {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  inventoryItemId: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  images: InventoryItemImage[];
}

export type InventoryItemResponse = InventoryItem[] | undefined;
