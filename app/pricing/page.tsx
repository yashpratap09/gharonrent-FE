"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, ArrowRight, Building2, User } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Flexible Pricing Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Whether you're a property owner looking to list rentals 
              or a tenant searching for your next home, we have a plan for you.
            </p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16 px-4 pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Host Pricing Card */}
              <Card className="relative shadow-2xl border-0 bg-card hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1">
                    For Property Owners
                  </Badge>
                </div>

                <CardHeader className="text-center pb-8 pt-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 mx-auto">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Host Pricing</CardTitle>
                  <CardDescription className="text-base mt-2">
                    List your properties and manage your rental business
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-semibold text-lg mb-2">Plans Include:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Free Basic Plan - List up to 2 properties
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Professional Plan - ₹999/month for 10 properties
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Enterprise Plan - ₹2,999/month for unlimited listings
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Advanced analytics and tenant screening
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Priority customer support
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group"
                  >
                    <Link href="/host-pricing" className="flex items-center justify-center">
                      View Host Plans
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Start listing your properties today
                  </p>
                </CardContent>
              </Card>

              {/* Tenant Pricing Card */}
              <Card className="relative shadow-2xl border-0 bg-card hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-1">
                    For Tenants
                  </Badge>
                </div>

                <CardHeader className="text-center pb-8 pt-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-4 mx-auto">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Tenant Pricing</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Find and book your perfect rental property
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-semibold text-lg mb-2">Plans Include:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Free Basic Plan - Browse all properties
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Premium Plan - ₹499/month for advanced filters
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Save favorite properties to wishlist
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Get instant notifications for new listings
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Direct messaging with property owners
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-500/90 hover:to-cyan-600/90 group"
                  >
                    <Link href="/tenant-pricing" className="flex items-center justify-center">
                      View Tenant Plans
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Find your perfect home now
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentHaven?</h2>
              <p className="text-lg text-muted-foreground">
                We provide the best platform for both property owners and tenants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Verified Listings</h3>
                  <p className="text-sm text-muted-foreground">
                    All properties are verified and authentic
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Our support team is always here to help
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Badge className="bg-primary text-white">✓</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Secure & Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
