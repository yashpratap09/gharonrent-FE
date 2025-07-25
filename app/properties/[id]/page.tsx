// app/properties/[id]/page.tsx
import { Header } from "@/components/Header";
import PropertyDetails from "./PropertyDetails";
import { Toaster } from "@/components/ui/toaster";

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <PropertyDetails />
      <Toaster />
    </div>
  );
}

// 👇 This is required for static export to work
export async function generateStaticParams() {
  // Example: Replace with real IDs from your data source
  const properties = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ];

  return properties.map((property) => ({
    id: property.id,
  }));
}
