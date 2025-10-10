"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Eye, Clock, Star, Zap, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { tenantPaymentApi } from "@/lib/api/tenantPayment";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const tenantPackages = [
  {
    name: "Free",
    icon: Eye,
    price: "Free",
    period: "Forever",
    duration: "30 days",
    propertyViews: "5 properties",
    description: "Perfect for casual property browsing",
    features: [
      "View 5 property details per month",
      "Basic property information only",
      "Property title and images",
      "Limited search results"
    ],
    limitations: [
      "Cannot view full property address",
      "Cannot see owner contact details",
      "Limited to 5 property views per month",
      "No priority support"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
    canViewAddress: false,
    canViewContact: false
  },
  {
    name: "Basic",
    icon: Clock,
    price: "₹50",
    period: "for 2 days",
    duration: "2 days",
    propertyViews: "Unlimited",
    description: "Short-term unlimited access for quick property hunting",
    features: [
      "Unlimited property views for 2 days",
      "Full property details access",
      "Owner contact information",
      "Complete address details",
      "Priority search results"
    ],
    limitations: [
      "Valid for 2 days only",
      "Basic customer support"
    ],
    buttonText: "Start 2-Day Access",
    buttonVariant: "default" as const,
    popular: true,
    canViewAddress: true,
    canViewContact: true
  },
  {
    name: "Standard",
    icon: Star,
    price: "₹199",
    period: "per month",
    duration: "30 days",
    propertyViews: "30 properties",
    description: "Ideal for serious property seekers",
    features: [
      "View 30 property details per month",
      "Full property information access",
      "Owner contact details",
      "Complete address information",
      "Advanced search filters",
      "Save favorite properties",
      "Email notifications for new properties"
    ],
    limitations: [
      "Limited to 30 property views per month"
    ],
    buttonText: "Choose Standard",
    buttonVariant: "default" as const,
    popular: false,
    canViewAddress: true,
    canViewContact: true
  },
  {
    name: "Premium",
    icon: Zap,
    price: "₹499",
    period: "per month",
    duration: "30 days",
    propertyViews: "500 properties",
    description: "For extensive property research and comparison",
    features: [
      "View 500 property details per month",
      "Full property information access",
      "Owner contact details",
      "Complete address information",
      "Advanced search filters",
      "Save unlimited favorite properties",
      "Priority email notifications",
      "Property comparison tool",
      "Market insights and trends"
    ],
    limitations: [
      "Limited to 500 property views per month"
    ],
    buttonText: "Choose Premium",
    buttonVariant: "default" as const,
    popular: false,
    canViewAddress: true,
    canViewContact: true
  },
  {
    name: "Unlimited",
    icon: Crown,
    price: "₹999",
    period: "per month",
    duration: "30 days",
    propertyViews: "Unlimited",
    description: "Complete access for property professionals and serious buyers",
    features: [
      "Unlimited property views for 30 days",
      "Full property information access",
      "Owner contact details",
      "Complete address information",
      "All advanced search filters",
      "Unlimited favorite properties",
      "Instant notifications",
      "Property comparison tool",
      "Market insights and analytics",
      "Priority customer support",
      "Virtual tour access",
      "Direct messaging with owners"
    ],
    limitations: [],
    buttonText: "Go Unlimited",
    buttonVariant: "default" as const,
    popular: false,
    canViewAddress: true,
    canViewContact: true
  }
];

export default function TenantPricingPage() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (packageName: string) => {
    console.log('Subscribe clicked for package:', packageName);
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a package.",
        variant: "destructive"
      });
      router.push('/login');
      return;
    }

    // Handle Free package
    if (packageName === 'Free') {
      try {
        setLoading(packageName);
        console.log('Attempting to activate free package...');
        
        await tenantPaymentApi.createOrder({ packageName });
        
        toast({
          title: "Success",
          description: "Free package activated successfully!",
        });
        router.push('/dashboard?tab=plan');
      } catch (error: any) {
        console.error('Free package activation error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to activate free package. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(null);
      }
      return;
    }

    // Handle paid packages with Razorpay
    try {
      setLoading(packageName);
      console.log('Creating order for package:', packageName);
      
      const orderData = await tenantPaymentApi.createOrder({ packageName });
      console.log('Order data received:', orderData);
      
      const options = {
        key: "rzp_test_RF7XfGz9LTnuym",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RentHaven - Tenant Subscription",
        description: `Tenant subscription for ${packageName} package`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            await tenantPaymentApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            toast({
              title: "Payment Successful",
              description: `${packageName} package activated successfully!`
            });
            
            router.push('/dashboard?tab=plan');
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Please contact support if amount was deducted.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment initiation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Tenant Subscription Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose the perfect plan to access detailed property information. 
              View owner contacts, addresses, and more with our tenant packages.
            </p>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Start with 5 free property views
            </Badge>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {tenantPackages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative shadow-2xl border-0 bg-background/80 backdrop-blur-xl ${
                    pkg.popular ? 'ring-2 ring-primary scale-105' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 mx-auto">
                      <pkg.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                    <div className="mt-3">
                      <span className="text-2xl font-bold">{pkg.price}</span>
                      {pkg.price !== "Free" && (
                        <span className="text-muted-foreground text-sm ml-1">/{pkg.period}</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>{pkg.propertyViews}</div>
                      <div>Valid for {pkg.duration}</div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">{pkg.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant={pkg.buttonVariant}
                      className={`w-full h-10 text-sm ${
                        pkg.buttonVariant === 'default' 
                          ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
                          : ''
                      }`}
                      onClick={() => handleSubscribe(pkg.name)}
                      disabled={loading === pkg.name}
                    >
                      {loading === pkg.name ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          Processing...
                        </>
                      ) : (
                        pkg.buttonText
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare features across different tenant subscription plans
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Property Details Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Free users see basic info only. Subscribers get full property details, 
                    owner contact information, and complete addresses.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Flexible Duration</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from 2-day quick access to monthly subscriptions. 
                    Perfect for short-term property hunting or long-term research.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Premium Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced search filters, property comparison tools, market insights, 
                    and priority customer support for premium subscribers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with our free plan or choose a subscription to access detailed property information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" onClick={() => handleSubscribe('Free')}>
                Start Free
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
