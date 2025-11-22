"use client";

export const runtime = 'edge';

import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PropertyDetails from "./PropertyDetails";
import { Toaster } from "@/components/ui/toaster";
import { useProperties } from "@/hooks/useProperties";
import { AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isAuthenticated } = useAuth();
  const {usePropertyBySlug } = useProperties();
  // Only call API if user is authenticated
  const { data, isLoading, isError } = usePropertyBySlug(slug, isAuthenticated);

  // Extract property and subscription from the response
  const property = data?.property;
  const subscription = data?.subscription;

  // Check if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 p-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-primary/10">
                <LogIn className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Login Required</h1>
            <p className="text-muted-foreground mb-2 text-lg">
              Please login to view property details, images, and more information.
            </p>
            <p className="text-muted-foreground mb-10">
              Create an account if you don&apos;t have one yet.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Link href={`/login?returnUrl=/${slug}`}>Login</Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href={`/signup?returnUrl=/${slug}`}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Loading skeleton */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
            
            <Card className="overflow-hidden">
              <Skeleton className="w-full h-96" />
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-20" />
                    ))}
                  </div>
                  <Skeleton className="h-32 w-full" />
                </Card>
              </div>
              <div>
                <Card className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 p-6">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-100 dark:bg-red-900">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The property you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/search">Browse Properties</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    );
  }

  // Debug: Log the data structure
  console.log('Page data:', data);
  console.log('Property:', property);
  console.log('Subscription:', subscription);

  return (
    <div className="min-h-screen">
      <Header />
      {/* Debug Info */}
      {subscription && (
        <div className="bg-yellow-100 p-4 text-center">
          <p className="text-yellow-800">
            <strong>Subscription:</strong> {subscription.packageName} | 
            <strong> Views Remaining:</strong> {subscription.remainingViews} | 
            <strong> Can View Full Details:</strong> {subscription.canViewFullDetails ? 'Yes' : 'No'}
          </p>
        </div>
      )}
      <PropertyDetails property={property} subscription={subscription} />
      <Footer />
      <Toaster />
    </div>
  );
}