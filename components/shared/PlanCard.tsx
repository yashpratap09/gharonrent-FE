"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Check, 
  Calendar,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";

interface PlanCardProps {
  user: any;
}

// Mock plan data
const planFeatures = {
  basic: {
    name: "Basic",
    price: 0,
    features: ["2 Property Listings", "Basic Support", "Standard Visibility"],
    limits: { properties: 2, photos: 5 }
  },
  professional: {
    name: "Professional",
    price: 999,
    features: ["10 Property Listings", "Priority Support", "Featured Listings", "Analytics"],
    limits: { properties: 10, photos: 15 }
  },
  enterprise: {
    name: "Enterprise",
    price: 2999,
    features: ["Unlimited Listings", "24/7 Support", "Custom Branding", "API Access"],
    limits: { properties: "unlimited", photos: "unlimited" }
  }
};

export const PlanCard = ({ user }: PlanCardProps) => {
  const currentPlan = planFeatures.professional; // Mock current plan
  const usageStats = {
    propertiesUsed: 3,
    photosUsed: 45,
    featuredListings: 2
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
              <p className="text-muted-foreground">
                ₹{currentPlan.price}/month • Renews on March 31, 2024
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Auto-renewal ON
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Button variant="outline">
                Manage Plan
              </Button>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="space-y-4">
            <h4 className="font-semibold">Usage This Month</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Properties Listed</span>
                  <span>{usageStats.propertiesUsed} / {currentPlan.limits.properties}</span>
                </div>
                {/* <Progress 
                  value={Math.min(100, Math.max(0, (usageStats.propertiesUsed / currentPlan.limits.properties) * 100 || 0))} 
                  className="h-2"
                /> */}
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Photos Uploaded</span>
                  <span>{usageStats.photosUsed} / {currentPlan.limits.photos * currentPlan.limits.properties}</span>
                </div>
                {/* <Progress 
                  value={Math.min(100, Math.max(0, (usageStats.photosUsed / (currentPlan.limits.photos * currentPlan.limits.properties)) * 100 || 0))} 
                  className="h-2"
                /> */}
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Featured Listings</span>
                  <span>{usageStats.featuredListings} / 2</span>
                </div>
                {/* <Progress 
                  value={Math.min(100, Math.max(0, (usageStats.featuredListings / 2) * 100 || 0))} 
                  className="h-2"
                /> */}
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div>
            <h4 className="font-semibold mb-3">Plan Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Upgrade Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enterprise Plan */}
            <div className="p-6 rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-bold">Enterprise Plan</h3>
              </div>
              <p className="text-3xl font-bold mb-2">₹2,999<span className="text-lg font-normal">/month</span></p>
              <p className="text-muted-foreground mb-4">Perfect for property management companies</p>
              
              <div className="space-y-2 mb-6">
                {planFeatures.enterprise.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full" asChild>
                <Link href="/host-pricing">
                  Upgrade to Enterprise
                </Link>
              </Button>
            </div>

            {/* Add-on Services */}
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Add-on Services</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <h4 className="font-medium">Professional Photography</h4>
                    <p className="text-sm text-muted-foreground">High-quality property photos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹2,500</p>
                    <Button size="sm" variant="outline">Add</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <h4 className="font-medium">Virtual Tour</h4>
                    <p className="text-sm text-muted-foreground">360° property walkthrough</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹5,000</p>
                    <Button size="sm" variant="outline">Add</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Recent Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Mar 1, 2024", amount: 999, status: "Paid", invoice: "INV-001" },
              { date: "Feb 1, 2024", amount: 999, status: "Paid", invoice: "INV-002" },
              { date: "Jan 1, 2024", amount: 999, status: "Paid", invoice: "INV-003" }
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded border">
                <div>
                  <p className="font-medium">{bill.date}</p>
                  <p className="text-sm text-muted-foreground">Invoice #{bill.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{bill.amount}</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};