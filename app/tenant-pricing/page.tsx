"use client";

import { useState, useEffect } from "react";
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
  const [razorpayReady, setRazorpayReady] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpay = () => {
      // Check if script already exists
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        setRazorpayReady(true);
        return;
      }

      // Create and append script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayReady(true);
        console.log('Razorpay script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const handleSubscribe = async (packageName: string) => {
    console.log('Subscribe clicked for package:', packageName);
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a package.",
        variant: "destructive"
      });
      router.push('/login?returnUrl=/tenant-pricing');
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
      
      // Wait for Razorpay to be available
      if (!window.Razorpay) {
        // If Razorpay is not available, wait a bit and try again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay script failed to load. Please refresh the page and try again.');
      }
      
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
      <Header />
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <div className="inline-block mb-4 md:mb-6">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold rounded-full border border-primary/30">
                🏠 Tenant Subscription Plans
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                Find Your Perfect Home
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Unlock complete property details, connect with owners directly, and discover your ideal rental with confidence.
            </p>
            
            {/* Benefits Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-full px-4 py-3 hover:border-primary/40 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-xs md:text-sm font-medium">5 Free Views</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-full px-4 py-3 hover:border-primary/40 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-xs md:text-sm font-medium">No Card Needed</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-full px-4 py-3 hover:border-primary/40 transition-all duration-300">
                <span className="text-primary text-lg">✓</span>
                <span className="text-xs md:text-sm font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
  <div className="max-w-7xl mx-auto text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Choose Your <span className="text-primary">Perfect Plan</span>
    </h2>
    <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
      Access verified properties, owner contact details, and advanced search tools.
    </p>
  </div>

  {/* Cards */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {tenantPackages.map((pkg, i) => (
      <div
        key={i}
        className={`relative group rounded-3xl p-[1px] transition-all duration-500 ${
          pkg.popular
            ? "bg-gradient-to-br from-primary to-purple-600 shadow-xl scale-105"
            : "bg-gradient-to-br from-slate-200/40 to-transparent shadow-sm hover:shadow-lg"
        }`}
      >
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 h-full flex flex-col backdrop-blur-md">
          
          {/* Popular Badge */}
          {pkg.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
              Most Popular
            </span>
          )}

          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
            pkg.popular
              ? "bg-white/20 text-white"
              : "bg-primary/10 text-primary group-hover:bg-primary/20"
          }`}>
            <pkg.icon className="w-7 h-7" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold">{pkg.name}</h3>

          {/* Price */}
          <p className="mt-4 mb-6">
            <span className="text-4xl font-black text-primary">{pkg.price}</span>
            {pkg.price !== "Free" && (
              <span className="text-sm text-muted-foreground ml-1">/{pkg.period}</span>
            )}
          </p>

          {/* Features */}
          <div className="flex-grow space-y-3 text-left">
            {pkg.features.slice(0, 5).map((f, idx) => (
              <p key={idx} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" /> {f}
              </p>
            ))}
          </div>

          {/* Button */}
          <Button
            className={`mt-8 w-full rounded-xl h-12 text-base font-semibold ${
              pkg.popular
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-primary/90 text-white hover:bg-primary"
            }`}
            disabled={loading === pkg.name}
            onClick={() => handleSubscribe(pkg.name)}
          >
            {loading === pkg.name ? "Processing..." : pkg.buttonText}
          </Button>
        </div>
      </div>
    ))}
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
