"use client";

import { Header } from "@/components/Header";
import SearchResults from "@/app/search/SearchResults";
import { Toaster } from "@/components/ui/toaster";

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchResults />
      <Toaster />
    </div>
  );
}