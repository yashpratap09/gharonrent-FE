"use client";

export const runtime = 'edge';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvancedSearchResults } from "@/app/search/[...params]/AdvancedSearchResults";
import { Toaster } from "@/components/ui/toaster";

export default function SearchRootPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AdvancedSearchResults />
      <Footer />
      <Toaster />
    </div>
  );
}