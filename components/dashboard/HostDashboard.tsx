"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "../shared/PropertyCard";
import { TransactionHistory } from "../shared/TransactionHistory";
import { PlanCard } from "../shared/PlanCard";
import { 
  Home, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";

interface HostDashboardProps {
  user: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Mock data for host
const mockHostProperties = [
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
    status: "active",
    views: 156,
    inquiries: 12,
    listedDate: "2024-02-15"
  },
  {
    id: "2",
    title: "Luxury Villa with Garden",
    address: "Bandra West, Mumbai",
    price: 85000,
    beds: 4,
    baths: 3,
    area: 2500,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop",
    type: "Villa",
    status: "rented",
    views: 89,
    inquiries: 8,
    listedDate: "2024-01-20"
  }
];

const mockHostStats = {
  totalProperties: 5,
  activeListings: 3,
  totalViews: 1250,
  totalInquiries: 45,
  monthlyRevenue: 180000,
  occupancyRate: 85
};

export const HostDashboard = ({ user, activeTab, onTabChange }: HostDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-2">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{mockHostStats.totalProperties}</p>
            <p className="text-sm text-muted-foreground">Total Properties</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{mockHostStats.activeListings}</p>
            <p className="text-sm text-muted-foreground">Active Listings</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-2">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{mockHostStats.totalViews}</p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 mx-auto mb-2">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">{mockHostStats.totalInquiries}</p>
            <p className="text-sm text-muted-foreground">Inquiries</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 mx-auto mb-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-xl font-bold">₹{(mockHostStats.monthlyRevenue / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mx-auto mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold">{mockHostStats.occupancyRate}%</p>
            <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Properties */}
            <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-500" />
                  Recent Properties
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => onTabChange("properties")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockHostProperties.slice(0, 2).map((property) => (
                  <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{property.title}</h4>
                        <Badge variant={property.status === "active" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{property.address}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{property.views} views</span>
                        <span>{property.inquiries} inquiries</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month&apos;s Views</span>
                    <span className="font-semibold">324</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">New Inquiries</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Rate</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      4.8
                    </span>
                  </div>
                </div>
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
                  <Link href="/add-property">
                    <Plus className="h-6 w-6" />
                    Add Property
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => onTabChange("inquiries")}>
                  <MessageSquare className="h-6 w-6" />
                  View Inquiries
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Analytics
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Manage Tenants
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-500" />
                My Properties ({mockHostProperties.length})
              </CardTitle>
              <Button asChild>
                <Link href="/add-property">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHostProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    isHost 
                    showManageActions 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-6">
          <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                Recent Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Inquiry management will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <PlanCard user={user} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionHistory userRole="host" />
        </TabsContent>
      </Tabs>
    </div>
  );
};