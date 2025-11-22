"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { paymentApi } from "@/lib/api/payment";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const pricingPlans = [
  {
    name: "Basic",
    icon: Star,
    price: "Free",
    period: "Forever",
    description: "Perfect for individual property owners getting started",
    features: [
      "List up to 2 properties",
      "Basic property photos (up to 5 per listing)",
      "Standard listing visibility",
      "Email support",
      "Basic property analytics",
      "Mobile app access",
      "Property status updates"
    ],
    limitations: [
      "No featured listings",
      "Limited customer support",
      "Basic search visibility"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    icon: Zap,
    price: "₹999",
    period: "per month",
    description: "Ideal for serious property owners and small rental businesses",
    features: [
      "List up to 10 properties",
      "Premium property photos (up to 15 per listing)",
      "Featured listings (2 per month)",
      "Priority customer support",
      "Advanced property analytics",
      "Virtual tour integration",
      "Tenant screening assistance",
      "Rent collection reminders",
      "Legal document templates",
      "Property maintenance tracking"
    ],
    limitations: [],
    buttonText: "Start Professional",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "₹2,999",
    period: "per month",
    description: "Comprehensive solution for property management companies",
    features: [
      "Unlimited property listings",
      "Professional photography service",
      "Unlimited featured listings",
      "Dedicated account manager",
      "Comprehensive analytics dashboard",
      "Custom branding options",
      "API access for integrations",
      "Bulk property management tools",
      "Advanced tenant screening",
      "Automated rent collection",
      "Legal compliance assistance",
      "24/7 priority support",
      "Marketing campaign management",
      "Multi-user team access"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    buttonVariant: "default" as const,
    popular: false
  }
];

const additionalServices = [
  {
    name: "Professional Photography",
    price: "₹2,500",
    description: "High-quality photos that make your property stand out"
  },
  {
    name: "Virtual Tour Creation",
    price: "₹5,000",
    description: "360° virtual tours to showcase your property remotely"
  },
  {
    name: "Property Verification",
    price: "₹1,500",
    description: "Complete property verification and documentation"
  },
  {
    name: "Tenant Background Check",
    price: "₹500",
    description: "Comprehensive background verification for potential tenants"
  }
];

export default function HostPricingPage() {
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

  const handleSubscribe = async (planName: string) => {
    console.log('Subscribe clicked for plan:', planName);
    console.log('User authenticated:', isAuthenticated);
    console.log('User data:', user);
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      router.push('/login?returnUrl=/host-pricing');
      return;
    }

    if (planName === 'Enterprise') {
      router.push('/contact');
      return;
    }

    // Handle Basic (free) plan
    if (planName === 'Basic') {
      try {
        setLoading(planName);
        console.log('Attempting to create order for Basic plan...');
        const orderData = await paymentApi.createOrder({ planName });
        console.log('Basic plan order response:', orderData);
        toast({
          title: "Success",
          description: "Basic plan activated successfully!",
        });
        router.push('/dashboard?tab=plan');
      } catch (error: any) {
        console.error('Free plan activation error:', error);
        console.error('Error details:', error.response?.data);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to activate free plan. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(null);
      }
      return;
    }

    // Handle paid plans with Razorpay
    try {
      setLoading(planName);
      console.log('Creating order for plan:', planName);
      const orderData = await paymentApi.createOrder({ planName });
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
        name: "RentHaven",
        description: `Subscription for ${planName} plan`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            await paymentApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            toast({
              title: "Payment Successful",
              description: `${planName} plan activated successfully!`
            });
            
            router.push('/dashboard');
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if amount was deducted.",
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
        description: error.response?.data?.message || "Failed to initiate payment. Please try again.",
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
        <section className="py-32 px-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="inline-block mb-6">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 px-6 py-3 text-sm font-semibold rounded-full">
                🏢 Host Plans
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                Grow Your Rental Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              List properties, reach more tenants, and manage your rental business with powerful tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3">
                <span className="text-primary text-xl">✓</span>
                <span className="text-sm font-medium">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3">
                <span className="text-primary text-xl">✓</span>
                <span className="text-sm font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3">
                <span className="text-primary text-xl">✓</span>
                <span className="text-sm font-medium">No Hidden Fees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`group relative rounded-2xl transition-all duration-500 ${
                    plan.popular
                      ? 'md:scale-105 flex flex-col'
                      : ''
                  }`}
                >
                  {/* Card Background */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/50'
                        : 'bg-card border border-border/50 group-hover:border-primary/30'
                    }`}
                  />

                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 font-semibold shadow-lg">
                        ⭐ MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-primary to-purple-600 text-white'
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    }`}>
                      <plan.icon className="w-7 h-7" />
                    </div>

                    {/* Plan Name & Price */}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.price !== "Free" && (
                        <span className="text-muted-foreground text-sm ml-2">/{plan.period}</span>
                      )}
                    </div>

                    {/* Plan Details */}
                    <div className="mb-6 pb-6 border-b border-border/50">
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Button
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={loading === plan.name}
                      className={`w-full h-12 font-semibold rounded-xl transition-all duration-300 ${
                        plan.buttonVariant === 'default'
                          ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl hover:scale-105'
                          : 'border-2 border-primary text-primary hover:bg-primary/5 hover:scale-105'
                      }`}
                    >
                      {loading === plan.name ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        plan.buttonText
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Enhance your listings with our professional services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {additionalServices.map((service, index) => (
                <Card key={index} className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing FAQ</h2>
              <p className="text-xl text-muted-foreground">
                Common questions about our pricing plans
              </p>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                    immediately, and we'll prorate any charges or credits.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">
                    No setup fees for any plan. You only pay the monthly subscription fee. 
                    Additional services are charged separately as needed.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. 
                    All payments are processed securely through encrypted channels.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not 
                    satisfied, contact us within 30 days for a full refund.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who trust RentHaven to manage their rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}