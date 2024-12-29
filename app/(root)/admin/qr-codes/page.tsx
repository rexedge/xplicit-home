"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminQRCodes() {
  const [tableNumber, setTableNumber] = useState("");

  const generateQRCodeUrl = (tableNumber: string) => {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/lounge-menu/${tableNumber}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin: Generate QR Codes</h1>

      <div className="mb-4">
        <Label htmlFor="tableNumber">Table Number</Label>
        <Input
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
        />
      </div>

      {tableNumber && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            QR Code for Table {tableNumber}
          </h2>
          <div className="inline-block p-4 bg-white rounded-lg shadow-md">
            <QRCode value={generateQRCodeUrl(tableNumber)} size={256} />
          </div>
          <p className="mt-4">
            Scan this code to access the menu for Table {tableNumber}
          </p>
        </div>
      )}
    </div>
  );
}
