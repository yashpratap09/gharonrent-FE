"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TenantDashboard } from "./TenantDashboard";
import { HostDashboard } from "./HostDashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Bell,
  Shield,
  Star
} from "lucide-react";
import Link from "next/link";

// Mock user data - replace with actual user context/API
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
  role: "tenant", // Change to "host" to see host dashboard
  verified: true,
  rating: 4.8,
  totalReviews: 24,
  plan: "Professional"
};

export const UserDashboard = () => {
  const [user] = useState(mockUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.role === "host" ? "default" : "secondary"}>
                  {user.role === "host" ? "Property Host" : "Tenant"}
                </Badge>
                {user.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {user.role === "host" && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    {user.rating}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Role-based Dashboard Content */}
        {user.role !== "tenant" ? (
          <TenantDashboard user={user} />
        ) : (
          <HostDashboard user={user} />
        )}
      </div>
    </div>
  );
};