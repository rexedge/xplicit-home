"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryItem } from "@/types/inventory";
import {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  updateInventoryItem,
} from "@/actions/inventory";
import { toast } from "sonner";
import { ImageUploader } from "@/components/image-uploader";

export default function SalonInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    imageUrls: [] as string[],
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const result = await getInventoryItems("SALON");
    if (result.success && result.data) {
      setItems(result.data);
    } else {
      toast.error("Error", {
        description: result.error || "Failed to fetch inventory items",
      });
    }
    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...urls],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = currentItem
      ? await updateInventoryItem(currentItem.id, {
          ...formData,
          category: "SALON",
        })
      : await createInventoryItem({ ...formData, category: "SALON" });

    if (result.success) {
      toast.success(currentItem ? "Item Updated" : "Item Created", {
        description: `Successfully ${currentItem ? "updated" : "created"} inventory item.`,
      });
      setIsDialogOpen(false);
      fetchItems();
    } else {
      toast.error("Error", {
        description: result.error || "Failed to save inventory item",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteInventoryItem(id);
    if (result.success) {
      toast.success("Item Deleted", {
        description: "Successfully deleted inventory item.",
      });
      fetchItems();
    } else {
      toast.error("Error", {
        description: result.error || "Failed to delete inventory item",
      });
    }
  };

  const openDialog = (item?: InventoryItem) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        imageUrls: item.images.map((img) => img.url),
      });
    } else {
      setCurrentItem(null);
      setFormData({
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        imageUrls: [],
      });
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Salon Inventory Management</h1>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <DialogDescription>
              {currentItem
                ? "Edit the details of the salon inventory item."
                : "Enter the details of the new salon inventory item."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Images</Label>
              <ImageUploader onUpload={handleImageUpload} category="SALON" />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url || "/placeholder.svg"}
                    alt={`Item image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            <Button type="submit">
              {currentItem ? "Update" : "Create"} Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
