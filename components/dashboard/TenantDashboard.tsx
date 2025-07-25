"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "../shared/PropertyCard";
import { TransactionHistory } from "../shared/TransactionHistory";
import { PlanCard } from "../shared/PlanCard";
import { 
  Heart, 
  Eye, 
  CreditCard, 
  Package,
  Search,
  MapPin,
  Calendar,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

interface TenantDashboardProps {
  user: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Mock data
const mockWishlist = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "Downtown, Mumbai",
    price: 45000,
    beds: 2,
    baths: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
    type: "Apartment",
    addedDate: "2024-03-15"
  },
  {
    id: "2",
    title: "Cozy Studio Near IT Park",
    address: "Whitefield, Bangalore",
    price: 25000,
    beds: 1,
    baths: 1,
    area: 600,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=400&auto=format&fit=crop",
    type: "Studio",
    addedDate: "2024-03-10"
  }
];

const mockRecentlyViewed = [
  {
    id: "3",
    title: "Luxury Villa with Garden",
    address: "Bandra West, Mumbai",
    price: 85000,
    beds: 4,
    baths: 3,
    area: 2500,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop",
    type: "Villa",
    viewedDate: "2024-03-18"
  },
  {
    id: "4",
    title: "Spacious Family Home",
    address: "Koramangala, Bangalore",
    price: 65000,
    beds: 3,
    baths: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
    type: "House",
    viewedDate: "2024-03-17"
  }
];

const mockStats = {
  totalViewed: 24,
  totalWishlisted: 8,
  totalInquiries: 12,
  activeSearches: 3
};

export const TenantDashboard = ({ user, activeTab, onTabChange }: TenantDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-2">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{mockStats.totalViewed}</p>
            <p className="text-sm text-muted-foreground">Properties Viewed</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mx-auto mb-2">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold">{mockStats.totalWishlisted}</p>
            <p className="text-sm text-muted-foreground">Wishlisted</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{mockStats.totalInquiries}</p>
            <p className="text-sm text-muted-foreground">Inquiries Sent</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-2">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{mockStats.activeSearches}</p>
            <p className="text-sm text-muted-foreground">Active Searches</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
          <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Wishlist */}
            <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Recent Wishlist
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => onTabChange("wishlist")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockWishlist.slice(0, 2).map((property) => (
                  <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{property.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.address}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ₹{property.price.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  Recently Viewed
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => onTabChange("viewed")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentlyViewed.slice(0, 2).map((property) => (
                  <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{property.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.address}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ₹{property.price.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild className="h-20 flex-col gap-2">
                  <Link href="/search">
                    <Search className="h-6 w-6" />
                    Search Properties
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => onTabChange("wishlist")}>
                  <Heart className="h-6 w-6" />
                  View Wishlist
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  Schedule Visit
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => onTabChange("plan")}>
                  <Package className="h-6 w-6" />
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                My Wishlist ({mockWishlist.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWishlist.map((property) => (
                  <PropertyCard key={property.id} property={property} showRemoveFromWishlist />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viewed" className="space-y-6">
          <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Recently Viewed Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRecentlyViewed.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <PlanCard user={user} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionHistory userRole="tenant" />
        </TabsContent>
      </Tabs>
    </div>
  );
};