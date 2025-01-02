"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<any>({});

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const handleUpdate = (
    category: string,
    index: number,
    field: any,
    value: any
  ) => {
    const updatedMenuItems = { ...menuItems };
    updatedMenuItems[category][index][field] = value;
    setMenuItems(updatedMenuItems);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuItems),
    });

    if (response.ok) {
      toast.success("Success", {
        description: "Menu updated successfully",
      });
    } else {
      toast.error("Error", {
        description: "Failed to update menu",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin: Manage Lounge Menu</h1>

      <Tabs defaultValue="drinks">
        <TabsList>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
        </TabsList>

        {Object.entries(menuItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            {/* @ts-expect-error: Property 'map' does not exist on type 'never'. */}
            {items.map((item: any, index: number) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        handleUpdate(category, index, "name", e.target.value)
                      }
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`price-${index}`}>Price</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleUpdate(
                              category,
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`category-${index}`}>Category</Label>
                        <Input
                          id={`category-${index}`}
                          value={item.category}
                          onChange={(e) =>
                            handleUpdate(
                              category,
                              index,
                              "category",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`description-${index}`}>
                        Description
                      </Label>
                      <Input
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) =>
                          handleUpdate(
                            category,
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <Button onClick={handleSubmit} className="mt-4">
        Save Changes
      </Button>
    </div>
  );
}
