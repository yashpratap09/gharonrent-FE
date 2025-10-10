/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import Link from "next/link";
import { useProperties } from "@/hooks/useProperties";


export const FeaturedProperties = () => {
  const { useFeaturedProperties,  toggleFavorite, isTogglingFavorite } = useProperties();
const { data: featuredPropertiesData, isLoading: featuredPropertiesLoading } = useFeaturedProperties(); // when you need user properties
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium rental properties
          </p>
        </div>

        {featuredPropertiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPropertiesData?.slice(0, 4).map((property) => (
            <Card key={property._id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-card">
              <div className="relative overflow-hidden">
                <img
                  src={property.propertyImages[0]?.imagePath || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {property.propertyType}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleFavorite(property._id)}
                  disabled={isTogglingFavorite}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                </button>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="text-lg font-semibold">
                    ₹{property.rent.toLocaleString()}/mo
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                <p className="text-muted-foreground text-sm flex items-center mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.address}
                </p>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedroom} beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.washroom} baths
                  </span>
                  <span className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.squareFeet} sq.ft
                  </span>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/properties/${property._id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/search">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};