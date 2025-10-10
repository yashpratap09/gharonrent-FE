"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "../shared/PropertyCard";
import { TransactionHistory } from "../shared/TransactionHistory";
import { PlanCard } from "../shared/PlanCard";
import { PaymentHistory } from "./PaymentHistory";
import { TenantSubscriptionHistory } from "./TenantSubscriptionHistory";
import { useWishlistContext } from "@/providers/WishlistProvider";
import { recentlyViewedApi, RecentlyViewedItem } from "@/lib/api/recentlyViewed";
import { getImageUrl } from "@/lib/utils";
import GridCard from "@/components/properties/GridCard";
import { Property } from "@/lib/api/properties";
import { 
  Heart, 
  Eye, 
  CreditCard, 
  Package,
  Search,
  MapPin,
  Calendar,
  TrendingUp,
  Loader2
} from "lucide-react";
import Link from "next/link";

interface TenantDashboardProps {
  user: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const mockStats = {
  totalViewed: 24,
  totalWishlisted: 8,
  totalInquiries: 12,
  activeSearches: 3
};

export const TenantDashboard = ({ user, activeTab, onTabChange }: TenantDashboardProps) => {
  const { wishlistItems, loading: wishlistLoading } = useWishlistContext();
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [recentlyViewedStats, setRecentlyViewedStats] = useState({ totalViewed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recentlyViewedData, stats] = await Promise.all([
          recentlyViewedApi.getRecentlyViewed(10),
          recentlyViewedApi.getStats()
        ]);
        setRecentlyViewed(recentlyViewedData);
        setRecentlyViewedStats(stats);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    totalViewed: recentlyViewedStats.totalViewed,
    totalWishlisted: wishlistItems.length,
    totalInquiries: 12, // Keep mock for now
    activeSearches: 3 // Keep mock for now
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-2">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalViewed}</p>
            <p className="text-sm text-muted-foreground">Properties Viewed</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mx-auto mb-2">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalWishlisted}</p>
            <p className="text-sm text-muted-foreground">Wishlisted</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalInquiries}</p>
            <p className="text-sm text-muted-foreground">Inquiries Sent</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-2">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{stats.activeSearches}</p>
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
                {wishlistLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading wishlist...</span>
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No items in wishlist yet</p>
                  </div>
                ) : (
                  wishlistItems.slice(0, 2).map((item) => {
                    // Safety check for incomplete data
                    if (!item.propertyId || !item.propertyId.title) {
                      return null;
                    }
                    
                    return (
                      <div key={item._id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                        <img
                          src={getImageUrl(item.propertyId.propertyImages?.[0]?.imagePath || '')}
                          alt={item.propertyId.title || 'Property'}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            // Fallback image on error
                            (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.propertyId.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {typeof item.propertyId.location === 'string' ? item.propertyId.location : 'Location not available'}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            ₹{item.propertyId.rent?.toLocaleString() || 'N/A'}/mo
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
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
                {recentlyViewed.slice(0, 2).map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                    <img
                      src={getImageUrl(item.propertyId.propertyImages[0]?.imagePath)}
                      alt={item.propertyId.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.propertyId.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {typeof item.propertyId.location === 'string' ? item.propertyId.location : 'Location not available'}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ₹{item.propertyId.rent.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
                {recentlyViewed.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No recently viewed properties</p>
                )}
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
                My Wishlist ({wishlistItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <GridCard key={item._id} property={item.propertyId} />
                ))}
                {wishlistItems.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No properties in wishlist</h3>
                    <p className="text-muted-foreground mb-4">
                      Start adding properties to your wishlist to see them here.
                    </p>
                    <Button asChild>
                      <Link href="/search">Browse Properties</Link>
                    </Button>
                  </div>
                )}
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
                {recentlyViewed.map((item: any) => (
                  <GridCard key={item._id} property={item.propertyId} />
                ))}
                {recentlyViewed.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No recently viewed properties</h3>
                    <p className="text-muted-foreground mb-4">
                      Properties you view will appear here for easy access.
                    </p>
                    <Button asChild>
                      <Link href="/search">Start Browsing</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <TenantSubscriptionHistory />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};