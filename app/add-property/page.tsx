"use client";

import { Header } from "@/components/Header";
import AddProperty from "@/app/add-property/AddProperty";
import { Toaster } from "@/components/ui/toaster";

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AddProperty />
      <Toaster />
    </div>
  );
}