"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Home as HomeIcon, Building2, Users, Warehouse, ArrowRight } from "lucide-react";

const cities = [
  { name: "Chandigarh", lati: 30.7333148, longi: 76.7794179 },
  { name: "Mohali", lati: 30.7046486, longi: 76.7178726 },
  { name: "Zirakpur", lati: 30.6425496, longi: 76.8173359 },
  { name: "Panchkula", lati: 30.6942091, longi: 76.860565 },
  { name: "Kharar", lati: 30.7498676, longi: 76.6411094 },
  { name: "Gurugram", lati: 28.4594965, longi: 77.0266383 },
  { name: "Noida", lati: 28.5355161, longi: 77.3910265 },
  { name: "Delhi", lati: 28.7040592, longi: 77.1024902 }
];

const propertyTypes = [
  { id: 1, name: "flat", icon: HomeIcon, color: "from-blue-500 to-cyan-600" },
  { id: 3, name: "pg", icon: Users, color: "from-purple-500 to-pink-600" },
  { id: 4, name: "room", icon: Building2, color: "from-orange-500 to-red-600" },
  { id: 5, name: "commercial", icon: Warehouse, color: "from-green-500 to-emerald-600" }
];

const generateSearchUrl = (propertyType: string, city: string, lati: number, longi: number) => {
  const cityName = city.replace(/\s+/g, "-");
  const propertyName = propertyType.replace(/\s+/g, "-");
  return `/search/${propertyName}-for-rent-in-${cityName}/${propertyType}/${lati}/${longi}`;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Property Types Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Property
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse by property type and find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.id} className="shadow-xl border-0 bg-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${type.color} h-32 flex items-center justify-center`}>
                      <Icon className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold capitalize mb-2">{type.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        Browse {type.name}s available for rent in your area
                      </p>
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                        <Link href={generateSearchUrl(type.name, cities[0].name, cities[0].lati, cities[0].longi)}>
                          View {type.name}s
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Popular Cities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore properties in major cities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {cities.map((city) => (
              <Card key={city.name} className="shadow-lg border-0 bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 h-24 flex items-center justify-center group-hover:from-primary/30 group-hover:to-purple-600/30 transition-colors">
                    <MapPin className="h-12 w-12 text-primary" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{city.name}</h3>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <Button 
                          key={type.id}
                          asChild 
                          variant="ghost" 
                          className="w-full justify-start text-sm hover:text-primary"
                        >
                          <Link href={generateSearchUrl(type.name, city.name, city.lati, city.longi)}>
                            <span className="capitalize">{type.name}</span>
                            <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City + Property Type Grid Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Browse by City & Type
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quick access to popular property searches
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {propertyTypes.map((type) => (
              <div key={type.id} className="mb-12">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${type.color} p-3 rounded-lg mr-4`}>
                    {type.icon && <type.icon className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold capitalize">{type.name}s for Rent</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cities.map((city) => (
                    <Button
                      key={`${type.id}-${city.name}`}
                      asChild
                      variant="outline"
                      className="h-auto py-4 px-4 text-left justify-start hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <Link href={generateSearchUrl(type.name, city.name, city.lati, city.longi)}>
                        <div>
                          <div className="font-semibold capitalize">{type.name}</div>
                          <div className="text-sm opacity-75">{city.name}</div>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-card text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">8+</div>
                <p className="text-muted-foreground">Cities Covered</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-card text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">4+</div>
                <p className="text-muted-foreground">Property Types</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-card text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <p className="text-muted-foreground">Active Listings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Features />
      <FAQ />
      <Footer />
      <Toaster />
    </div>
  );
}