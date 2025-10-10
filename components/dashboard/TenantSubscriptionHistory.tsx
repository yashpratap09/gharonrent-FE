"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  History, 
  Calendar,
  Package,
  Eye,
  Clock,
  Star,
  Zap,
  Crown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import Link from "next/link";

interface SubscriptionStats {
  currentSubscription: any;
  totalSubscriptions: number;
  totalSpent: number;
  hasActiveSubscription: boolean;
}

interface SubscriptionHistory {
  subscriptions: any[];
  totalPages: number;
  currentPage: number;
  total: number;
}

const packageIcons = {
  Free: Eye,
  Basic: Clock,
  Standard: Star,
  Premium: Zap,
  Unlimited: Crown
};

export const TenantSubscriptionHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [history, setHistory] = useState<SubscriptionHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No authentication token found');
      }

      const [statsResponse, historyResponse] = await Promise.all([
        fetch('http://localhost:5000/api/tenant-payment/subscription-stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch('http://localhost:5000/api/tenant-payment/subscription-history?limit=10', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      if (!statsResponse.ok || !historyResponse.ok) {
        throw new Error('Failed to fetch subscription data');
      }

      const statsData = await statsResponse.json();
      const historyData = await historyResponse.json();

      setStats(statsData);
      setHistory(historyData);
    } catch (error: any) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getStatusBadge = (subscription: any) => {
    if (subscription.isExpired || subscription.status === 'expired') {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Expired
        </Badge>
      );
    }
    if (subscription.status === 'cancelled') {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    }
    if (subscription.status === 'active') {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        {subscription.status}
      </Badge>
    );
  };

  const getPackageIcon = (packageName: string) => {
    const IconComponent = packageIcons[packageName as keyof typeof packageIcons] || Package;
    return <IconComponent className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Overview */}
      {stats?.currentSubscription && (
        <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Current Subscription
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                  {getPackageIcon(stats.currentSubscription.packageName)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {stats.currentSubscription.packageName} Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ₹{stats.currentSubscription.packagePrice} • 
                    {stats.currentSubscription.daysRemaining > 0 
                      ? ` ${stats.currentSubscription.daysRemaining} days remaining`
                      : ' Expired'
                    }
                  </p>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(stats.currentSubscription)}
              </div>
            </div>

            {/* Usage Progress */}
            {stats.currentSubscription.packageDetails && (
              <div className="space-y-3">
                <h4 className="font-medium">Usage Statistics</h4>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Property Views</span>
                    <span>
                      {stats.currentSubscription.propertyViewsUsed} / {
                        stats.currentSubscription.propertyViewLimit === -1 
                          ? 'Unlimited' 
                          : stats.currentSubscription.propertyViewLimit
                      }
                    </span>
                  </div>
                  {stats.currentSubscription.propertyViewLimit !== -1 && (
                    <Progress 
                      value={(stats.currentSubscription.propertyViewsUsed / stats.currentSubscription.propertyViewLimit) * 100} 
                      className="h-2"
                    />
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Subscription Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-2">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats?.totalSubscriptions || 0}</p>
            <p className="text-sm text-muted-foreground">Total Subscriptions</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">₹{stats?.totalSpent || 0}</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-2">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">
              {stats?.currentSubscription?.remainingViews === -1 
                ? '∞' 
                : stats?.currentSubscription?.remainingViews || 0
              }
            </p>
            <p className="text-sm text-muted-foreground">Views Remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription History */}
      <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-500" />
            Subscription History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history?.subscriptions && history.subscriptions.length > 0 ? (
            <div className="space-y-4">
              {history.subscriptions.map((subscription) => (
                <div 
                  key={subscription._id} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                      {getPackageIcon(subscription.packageName)}
                    </div>
                    <div>
                      <h4 className="font-medium">{subscription.packageName} Plan</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(subscription.startDate), 'MMM dd, yyyy')} - {' '}
                          {format(new Date(subscription.endDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Views: {subscription.propertyViewsUsed} / {
                          subscription.propertyViewLimit === -1 
                            ? 'Unlimited' 
                            : subscription.propertyViewLimit
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{subscription.packagePrice}</p>
                    {getStatusBadge(subscription)}
                  </div>
                </div>
              ))}
              
              {history.totalPages > 1 && (
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {history.subscriptions.length} of {history.total} subscriptions
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Subscription History</h3>
              <p className="text-muted-foreground mb-4">
                You haven't subscribed to any plans yet.
              </p>
              <Button asChild>
                <Link href="/tenant-pricing">
                  Browse Plans
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild className="h-16 flex-col gap-2">
              <Link href="/tenant-pricing">
                <Package className="h-6 w-6" />
                Upgrade Plan
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2" asChild>
              <Link href="/search">
                <Eye className="h-6 w-6" />
                Browse Properties
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
