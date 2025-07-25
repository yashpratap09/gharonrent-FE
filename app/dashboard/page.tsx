"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <UserDashboard />
      <Footer />
      <Toaster />
    </div>
  );
}