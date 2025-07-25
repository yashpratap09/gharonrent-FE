"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserProfile } from "@/components/profile/UserProfile";
import { Toaster } from "@/components/ui/toaster";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <UserProfile />
      <Footer />
      <Toaster />
    </div>
  );
}